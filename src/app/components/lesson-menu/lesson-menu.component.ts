import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'lesson-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-menu.component.html',
  styleUrl: './lesson-menu.component.css'
})
export class LessonMenuComponent {

  @Input() lessonId!: string;
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Output() onRemove: EventEmitter<string> = new EventEmitter();
  
  constructor() { }

  public menuVisible: boolean = false;

  public onClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.menuVisible = true;
  }

  public onBlur(event: FocusEvent) {
    this.menuVisible = false;
  }

  public onDeleteClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.menuVisible = false
    this.onDelete.emit(this.lessonId);
  }

  public onRenameClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.menuVisible = false;
    this.onRemove.emit(this.lessonId);
  }

}
