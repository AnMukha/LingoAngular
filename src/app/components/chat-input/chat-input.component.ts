import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FixedTextDirective } from '../../directives/fixed-text.directive';
import { Observable, timeout } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LessonMessagesService } from '../../services/lesson-messages.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FixedTextDirective, CommonModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css'  
})
export class ChatInputComponent implements AfterViewChecked {  
// завершенные предложения в тексте.
// Подсказка: на табуляцию вставляется слово в позиции курсора. При попытке редактирования слово попадает в текст, запистывается как подсказанное.
// 
// 
  
  // - вводимый новый текст - редактируется в div.
  // - если слово было принято как подсказка, оно запоминается в динамической части; отдельно есть подсказанные слова в статической части.
  // Процедура вывода: выводится статика с ошибками - нужно поделить строку на участки и собрать в цикле элементы.
  // Дальше выводится динамический текст. Динамический текст можно извлекать и отрправлять в момент подписки. При редактировании можно оценивать 
  // завершенные предложения в тексте.
  // Подсказка: на табуляцию вставляется слово в позиции курсора. При попытке редактирования слово попадает в текст, запистывается как подсказанное.
  // 
  // 
  @ViewChild('editedSpan') editedSpanRef!: ElementRef;
  @ViewChild('editedPostfixSpan') editedPostfixSpanRef!: ElementRef;

  private confirmedContentFixed: string = "";
  private confirmedContentOriginal: string = "";  
  public corrections: string = "";
  public editedContent: string = "";
  public editedContentPostfix: string = "";
  private hintedWords: string[] = [];
  private hintPosition: number | null = null;  
  public hintText: string = "";
  private hints: string[] = [];
  private needMoveCursorAfterHint: boolean = false;
  private needMoveCursorToPos: number | null = null;
  //public showEditSpan: boolean = true;
  //private bindingDamaged: boolean = true;

  constructor (protected lessonMessagesService: LessonMessagesService) {    
  }

  ngOnInit() {    
  }

  ngAfterViewChecked(): void {
    if (this.needMoveCursorAfterHint) {            
      this.moveCursorAfterHint();      
      this.needMoveCursorAfterHint = false;
    }
    if (this.needMoveCursorToPos!=null) {      
      this.moveCursorToPos(this.needMoveCursorToPos);
      this.needMoveCursorToPos = null;
    }
  }

  public getTextToFix(): string {    
    this.updateEditedFromHtml();
    return this.editedContent;
  }

  public getTextToSumbit(): string {
    this.updateEditedFromHtml();
    return this.confirmedContentOriginal + this.editedContent + this.hintText + this.editedContentPostfix;
  }

  public reset() {
    this.editedContent = "";
    this.editedContentPostfix = "";
    this.hintText = "";
    this.confirmedContentFixed = "";
    this.confirmedContentOriginal = "";
    this.corrections = "";
    this.hintedWords = [];
    this.hintPosition = null;
    this.needMoveCursorAfterHint = false;
    this.needMoveCursorToPos = null;
    //this.showEditSpan = true;
    //this.bindingDamaged = true;
    this.editedSpanRef.nativeElement.textContent = this.editedContent;
  }

  public addFixedText(originalText: string, fixedText: string, corrections: string) {
    this.confirmedContentOriginal += originalText;
    this.confirmedContentFixed += fixedText;
    this.corrections += corrections;
    this.editedContent = this.editedContent.substring(originalText.length);
    //if (this.editedContent == "") {    
      //this.editedContent = "";      
      //this.bindingDamaged = true;      
    //}
    this.needMoveCursorToPos = 0;
    this.editedSpanRef.nativeElement.textContent = this.editedContent;
    console.log("editedContent: "+this.editedContent);
  }
    
  isSpace(c: string) {
    return /\s/.test(c);
  }

  onKeyDownWhenEdit(e: any) {    
    if (e.key === 'Tab' || e.keyCode === 9) {        
      e.preventDefault();      
      if (this.hintText=="..loaded..") {
        return;
      }
      if (this.hintText!="") {
        this.hintText = this.getNextHintText(this.hints, this.hintText);
        return;
      }
      this.updateEditedFromHtml();
      if (this.editedContent.length < 2)
        return;
      let cursorPos = this.getCursorPosition();
      this.needMoveCursorAfterHint = true;
      this.hintText = "..loaded..";      
      var content = this.editedContent;
      this.editedContent = content.substring(0, cursorPos);
      if (this.editedContent.length>0 && !this.isSpace(this.editedContent[this.editedContent.length-1]))
        this.editedContent += " ";
      this.editedContentPostfix = content.substring(cursorPos!);
      if (this.editedContentPostfix.length>0 && this.editedContentPostfix[0]!=" ")
        this.editedContentPostfix = " "+this.editedContentPostfix;
      
      this.editedSpanRef.nativeElement.textContent = this.editedContent;

      this.lessonMessagesService.getNextWordHint(this.editedContent + this.editedContentPostfix, cursorPos!).then((hints) => {
        {
          if (this.hintText=="..loaded..") {
            this.hints = hints;
            this.hintText = hints[0];
          }          
        }
      });
      
    } 
    else if (this.hintText == "..loaded.." || (this.hintText!="" && (e.key === 'Backspace' || e.keyCode === 8 || e.key === 'Escape' || e.keyCode === 27))) {
      if (this.hintText != "..loaded..")
        e.preventDefault();
      this.hintText = "";
      this.needMoveCursorToPos = this.editedContent.length;
      this.editedContent = this.editedContent+this.editedContentPostfix;
      this.editedContentPostfix = "";      
      this.editedSpanRef.nativeElement.textContent = this.editedContent;
    }
    else if (this.hintText!="") {      
      setTimeout(() =>  this.applyHint());
    }            
  }

  getNextHintText(hints: string[], hintText: string): string {
    var index = hints.indexOf(hintText);
    if (index == hints.length-1)
      return hints[0];
    return hints[index+1];
  }

  updateEditedFromHtml() {
    if (this.editedSpanRef)
      this.editedContent = this.editedSpanRef.nativeElement.textContent;
  }

  onContentClick() {
    if (this.hintText!="")
      this.applyHint();
      const inputElement: HTMLInputElement = this.editedSpanRef.nativeElement;      
      inputElement?.focus(); 
  }

  onContentBlur() {
    if (this.hintText!="") 
      this.applyHint();
  }

  onInput() {
    //if (this.editedSpanRef.nativeElement.textContent.length == 0) {
      //this.bindingDamaged = true;      
    //}
    /*if (this.editedSpanRef.nativeElement.textContent.length != 0 && this.bindingDamaged) {
      this.bindingDamaged = false;
      this.updateEditedFromHtml()
      this.showEditSpan = false;
      var cursorPosition = this.getCursorPosition();
      setTimeout(() => {        
        this.showEditSpan = true;
        this.needMoveCursorToPos = cursorPosition!;        
      });
    }*/
    //var cursorPos = this.getCursorPosition();
    //if (cursorPos!=null)
//      this.needMoveCursorToPos = cursorPos;
    this.editedContent = this.editedSpanRef.nativeElement.textContent;
  }

  applyHint(moveCursor: boolean = true) {
    if (moveCursor)
      this.needMoveCursorToPos = this.editedContent.length+this.hintText.length + this.getCursorPosition()!;
    var editedContentPostfix = this.editedPostfixSpanRef.nativeElement.textContent;
    this.editedContent = this.editedContent + this.hintText + editedContentPostfix;
    this.hintText = "";
    this.editedContentPostfix = "";
    this.editedSpanRef.nativeElement.textContent = this.editedContent;
  }
  

  /*saveCursorPosition(){
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      this.savedCursorPos =  sel.getRangeAt(0).startOffset;
    }    
  }*/

  moveCursorAfterHint() {
    const range = document.createRange();
    const sel = window.getSelection();
    const inputElement: HTMLInputElement = this.editedPostfixSpanRef.nativeElement;
          
    range.setStart(inputElement.childNodes[0], 0);
    range.collapse(true);      
    sel!.removeAllRanges();
    sel!.addRange(range);  
  }

  moveCursorToPos(pos: number) {

    const inputElement: HTMLInputElement = this.editedSpanRef.nativeElement;
    setTimeout(() => {
      inputElement.focus();
      try
      {
        const range = document.createRange();
        const sel = window.getSelection();
            
        if (inputElement.childNodes[0].nodeValue?.length??999 < pos) {
          range.setStart(inputElement.childNodes[0], pos);
          range.collapse(true);      
          sel!.removeAllRanges();
          sel!.addRange(range);    
        }
      }
      catch (e) {
        console.log("Error: "+e);
      }          
    }, 0);
  }

  getCursorPosition(): number | undefined {
    const selection = window.getSelection();
    if (!selection!.rangeCount) return undefined; // No selection available
  
    const range = selection!.getRangeAt(0);
    const clonedRange = range.cloneRange();
    clonedRange.selectNodeContents(range.startContainer);
    clonedRange.setEnd(range.endContainer, range.endOffset);
    const cursorPosition = clonedRange.toString().length;
  
    console.log('Cursor position:', cursorPosition);
    return cursorPosition;
  }

  handlePaste(event: ClipboardEvent): void {    
    event.preventDefault();
    this.updateEditedFromHtml();
    let text = '';
    if (event.clipboardData) {
      text = event.clipboardData.getData('text/plain');
    } else if ((window as any).clipboardData) { // For IE
      text = (window as any).clipboardData.getData('Text');
    }
    var cursorPos = this.getCursorPosition();    
    this.editedContent = this.editedContent.substring(0, cursorPos) + text + this.editedContent.substring(cursorPos!)+" ";
    this.needMoveCursorToPos = cursorPos! + text.length;
    this.editedSpanRef.nativeElement.textContent = this.editedContent;
  }
    
}

// Контент состоит из:
// - проверенный текст с сервера; для текста сохраняется исходник; текст ренденится с ошибками и не может редактироваться.
// - вводимый новый текст - редактируется в div.
// - если слово было принято как подсказка, оно запоминается в динамической части; отдельно есть подсказанные слова в статической части.
// Процедура вывода: выводится статика с ошибками - нужно поделить строку на участки и собрать в цикле элементы.
// Дальше выводится динамический текст. Динамический текст можно извлекать и отрправлять в момент подписки. При редактировании можно оценивать 
// завершенные предложения в тексте.
// Подсказка: на табуляцию вставляется слово в позиции курсора. При попытке редактирования слово попадает в текст, запистывается как подсказанное.
// 
// 
