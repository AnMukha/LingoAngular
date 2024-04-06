import { Component } from '@angular/core';
import LoginService from '../../services/login-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserMenuComponent } from "../../components/user-menu/user-menu.component";

@Component({
    selector: 'app-start-page',
    standalone: true,
    templateUrl: './start-page.component.html',
    styleUrl: './start-page.component.css',
    imports: [CommonModule, FormsModule, UserMenuComponent]
})

export class StartPageComponent {
  public logined: boolean = false;

  constructor(private loginService: LoginService) { }
  
  async ngOnInit() {
    this.logined = this.loginService.isLogined();
  }
  
  logout() {
    this.loginService.logOut();
    this.logined = this.loginService.isLogined();
  }

  selectNativeLanguage () {
  }

}
