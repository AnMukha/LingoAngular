import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonProgressService {

  constructor(private http: HttpClient) {     
  }

  public async progressLesson(lessonId: string) {
    await firstValueFrom(this.http.post(`lessons/${lessonId}/progress`, {}));
  }
}
