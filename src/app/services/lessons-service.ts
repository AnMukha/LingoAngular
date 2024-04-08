
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Period } from './lesson-messages.service';
import { ScenarioOptions } from './scenarios.service';

@Injectable({ providedIn: 'root' })
export class LessonsService {
            
    public lessons: Lesson[] = [];

    constructor(private http: HttpClient) {        
        firstValueFrom(this.http.get<Lesson[]>('lessons')).then(data => {
            this.lessons = data;        
        });
    }

    public deleteLesson(lessonId: string) {
        this.http.delete(`lessons/${lessonId}`).subscribe(() => {
            this.lessons = this.lessons.filter(l => l.lessonId !== lessonId);
        });
    }

    getMessagesCount() {
         return this.lessons.reduce((acc, l) => acc + l.messagesCount, 0);
    }
        

    getLessonsInPeriod(period: Period): any {
        return this.lessons.filter(l => new Date(l.created) >= period.from && new Date(l.created) <= period.to);
    }

    getLesson(lessonId: string): Promise<Lesson> {
        return firstValueFrom(this.http.get<Lesson>(`lessons/${lessonId}`));
    }

}

export class Lesson {
    public lessonId: string | null = null;
    public lessonType: string = "";
    public title:  string = "";
    public preface: string = "";
    public created!: string;
    public scenario: string = "";
    public messagesCount: number = 0;
    public lowQualityCount: number = 0;
    public revisedCount: number = 0;
}