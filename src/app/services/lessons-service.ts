
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LessonsService {
        
    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);
    public lessons$ = this.lessonsSubject.asObservable();

    constructor(private http: HttpClient) {
        this.LoadLessons();
    }  
    
    LoadLessons() {
        this.http.get<Lesson[]>('chats').subscribe(data => {
            this.lessonsSubject.next(data);
          });
    }

    AddLesson(newLesson: Lesson) {
        const currentLessons = this.lessonsSubject.value;
        const updatedLessons = [...currentLessons, newLesson];
        this.lessonsSubject.next(updatedLessons);
        this.http.post('chats', newLesson).subscribe(() => this.LoadLessons());
      }    
      
}

export class Lesson {
    public chatId: string | null = null;
    public chatType: string = "";
    public title:  string = "";
}