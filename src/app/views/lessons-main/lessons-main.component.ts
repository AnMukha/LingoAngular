import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Lesson, LessonsService } from '../../services/lessons-service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lessons-main',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './lessons-main.component.html',
  styleUrl: './lessons-main.component.css'
})
export class LessonsMainComponent {

  public activeMenu: string = 'newLesson';

  constructor(router: Router) { 
    this.activeMenu = router.url.split('/')[2];
  }

  
}
