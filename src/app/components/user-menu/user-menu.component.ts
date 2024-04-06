import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'user-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {
  
  @Output() onLogoutClick: EventEmitter<string> = new EventEmitter();
  @Output() onNativeLanguageClick: EventEmitter<string> = new EventEmitter();
  
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
    this.onLogoutClick.emit();
  }

  public onRenameClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.menuVisible = false;
    this.onNativeLanguageClick.emit();
  }

}
