import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class UrlAndTokenInterceptor implements HttpInterceptor {
  constructor() { }

  private baseUrl: string = environment.baseUrl;
  private token: string = localStorage.getItem('token') || '';

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
        url: `${this.baseUrl}/${request.url}`,
        setHeaders: {
            Authorization: `Bearer ${this.token}`
        }
    });
    return next.handle(request);
}
}