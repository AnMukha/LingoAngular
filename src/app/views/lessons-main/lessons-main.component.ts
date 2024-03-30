import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Lesson, LessonsService } from '../../services/lessons-service';

@Component({
  selector: 'app-lessons-main',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lessons-main.component.html',
  styleUrl: './lessons-main.component.css'
})
export class LessonsMainComponent {

  constructor(private lessonsService: LessonsService) { }

  lessons: Lesson[] = [];

  async ngOnInit() {
    this.lessonsService.lessons$.subscribe(lessons => {
      this.lessons = lessons;
    });    
  }

  addNewLesson() {
    this.lessonsService.AddLesson({ chatId: null, chatType: "translation", title: "new lesson"});
  }

}
