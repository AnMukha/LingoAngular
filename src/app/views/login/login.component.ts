import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import LoginService from '../../services/login-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';  
  constructor(private router: Router, private loginService: LoginService) { }

  async login() {   
    const loginResult = await this.loginService.login(this.email, this.password);
    if (loginResult.success) {
      this.router.navigate(['/main']);
    } else {
      this.errorMessage = loginResult.errorMessage;
    }
  }
  
}
