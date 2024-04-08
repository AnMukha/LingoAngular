import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatInputComponent } from "../../components/chat-input/chat-input.component";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LessonMessagesService } from '../../services/lesson-messages.service';
import { CommonModule } from '@angular/common';
import { FixedTextDirective } from '../../directives/fixed-text.directive';

import * as marked from 'marked';
import { Lesson, LessonsService } from '../../services/lessons-service';

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
  
  constructor(private http: HttpClient, private route: ActivatedRoute, public messagesService: LessonMessagesService, private lessonsService: LessonsService) {                  
  }
  @ViewChild(ChatInputComponent) input!: ChatInputComponent;

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const lessonId = params.get('id');
      if (lessonId)
        this.messagesService.loadLessonMessages(lessonId);
        this.lesson = await this.lessonsService.getLesson(lessonId!);
    });  
  }

  public lesson: Lesson | null = null;

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
      this.http.post("lessons/" + this.lesson?.lessonId + "/submitMessage", { id: "", content: textToSubmit }).subscribe(() => {
        this.input.reset();
        this.http.put("lessons/" + this.lesson?.lessonId + "/progressLesson", null).subscribe(() => {
        if (this.lesson?.lessonId)
          this.messagesService.loadLessonMessages(this.lesson?.lessonId);
        });
      });
    }
  }


  getMarkdown(text: string): string {
    return marked.parse(text) as any;
  }


}
