import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UrlAndTokenInterceptor } from './services/url-token-interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'  
})
export class AppComponent {
  title = 'LingoFront';
}
