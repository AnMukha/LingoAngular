import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatInputComponent } from "../../components/chat-input/chat-input.component";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LessonMessagesService } from '../../services/lesson-messages.service';
import { CommonModule } from '@angular/common';
import { FixedTextDirective } from '../../directives/fixed-text.directive';

import * as marked from 'marked';

interface DirtyCheckResult {
    fixedText: string;
    corrections: string;
}

@Component({
    selector: 'app-lesson-main',
    standalone: true,
    templateUrl: './lesson-main.component.html',
    styleUrl: './lesson-main.component.css',
    imports: [CommonModule, ChatInputComponent, FixedTextDirective]
})
export class LessonMainComponent  {  
  
  constructor(private http: HttpClient, private route: ActivatedRoute, public messagesService: LessonMessagesService) {                  
  }
  @ViewChild(ChatInputComponent) input!: ChatInputComponent;

  private lessonId: string | null = null;

  async sumbitCurrent() {    
    var newText = this.input.getTextToFix();
    if (newText)
    {
      var checkResult = await firstValueFrom(this.http.post<DirtyCheckResult>("lessons/dirtyCheck", { text: newText}));
      this.input.addFixedText(newText, checkResult.fixedText, checkResult.corrections);
    }
  }

  sumbitMessage() { 
    var textToSubmit = this.input.getTextToSumbit();
    if (textToSubmit)
    {
      this.http.post("lessons/" + this.lessonId + "/submitMessage", { id: "", content: textToSubmit }).subscribe(() => {
        this.input.reset();
        this.http.put("lessons/" + this.lessonId + "/progressLesson", null).subscribe(() => {
        if (this.lessonId)
          this.messagesService.loadLessonMessages(this.lessonId);
        });
      });
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.lessonId = params.get('id');
      if (this.lessonId)
        this.messagesService.loadLessonMessages(this.lessonId);
    });  
  }

  getMarkdown(text: string): string {
    return marked.parse(text) as any;
  }


}
