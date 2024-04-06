import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonMessagesService {

  constructor(private http: HttpClient) {     
  }

  public messages: LessonMessage[] = [];

  public loadLessonMessages(lessonId: string) {    
    this.http.get<LessonMessageDto[]>(`lessons/${lessonId}/messages`).subscribe(data => {
      this.messages = data.map(m => {
        const message = new LessonMessage();
        message.id = m.messageId;
        message.content = m.content;
        message.correctedContent = m.correctedContent;
        message.corrections = m.corrections;
        message.isUserMessage = m.messageType === 'UserMessage';
        return message;
      });
    });
  }

  public async getNextWordHint(currentText: string, position: number): Promise<string[]> {
    return await firstValueFrom(this.http.post<string[]>("lessons/hint", { text: currentText, position: position }));
  }

}

export class LessonMessage {
  public id!: string;
  public content?: string;
  public correctedContent?: string;
  public corrections?: string;
  public isUserMessage: boolean = false;
}


class LessonMessageDto {
  public messageId!: string;
  public content?: string;
  public correctedContent?: string;
  public corrections?: string;
  public messageType?: string;
}

export class Period {
  public name!: string;
  public from!: Date;
  public to!: Date;      
  }
