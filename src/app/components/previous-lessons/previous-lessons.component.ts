import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LessonsService } from '../../services/lessons-service';
import { LessonMenuComponent } from "../lesson-menu/lesson-menu.component";
import { from } from 'rxjs';
import { Period } from '../../services/lesson-messages.service';

@Component({
    selector: 'app-previous-lessons',
    standalone: true,
    templateUrl: './previous-lessons.component.html',
    styleUrl: './previous-lessons.component.css',
    imports: [CommonModule, LessonMenuComponent]
})

export class PreviousLessonsComponent {

  constructor(public lessonsService: LessonsService) { 

  }  

  public periods: Period[] = this.initPeriods();  

  public deleteLesson(lessonId: string) {
    this.lessonsService.deleteLesson(lessonId);
  }

  public initPeriods(): Period[] {
    let periods: Period[] = [];
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();     
    periods.push({name:'Today', from: new Date(year, month, day, 0, 0, 0), to: new Date(year, month, day, 23,59,59 )});
    periods.push({name:'Yesterday', from: new Date(year, month, day - 1, 0, 0, 0), to: new Date(year, month, day - 1, 23,59,59 )});
    periods.push({name:'Last 7 days', from: new Date(year, month, day - 7, 0, 0, 0), to: new Date(year, month, day - 2, 23,59,59 )});
    periods.push({name:'Last 30 days', from: new Date(year, month, day - 30, 0, 0, 0), to: new Date(year, month, day - 8, 23,59,59 )});
    periods.push({name:'Later then 30 days', from: new Date(year, month, day - 30, 0, 0, 0), to: new Date(year, month, day - 31, 23,59,59 )});
    
    return periods;
  }
 
}


