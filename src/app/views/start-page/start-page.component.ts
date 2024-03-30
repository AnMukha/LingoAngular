import { Component } from '@angular/core';
import LoginService from '../../services/login-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})

export class StartPageComponent {
  logined: boolean = false;

  constructor(private loginService: LoginService) { }
  
  async ngOnInit() {
    this.logined = this.loginService.isLogined();
  }
  
  logout() {
    this.loginService.logOut();

  }

}
