
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
class LoginService {
    constructor(private http: HttpClient) {
        this.email = localStorage.getItem('email') || '';
        this.logined = localStorage.getItem('logined') === 'true';
    }

    private email: string = '';
    private logined: boolean = false;


    async login(email: string, password: string): Promise<LoginResult> {
        try 
        {            
            var result = await firstValueFrom(this.http.post<LoginResponse>('login', { userName: email, password: password }));                                    
            if (result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('email', email);
                localStorage.setItem('logined', true.toString());
                this.email = email;
                this.logined = true;
                return { success: true, errorMessage: ''};
            }
            else 
            {
                return { success: false, errorMessage: result.message};
            }
        } catch (error) {
            return { success: false, errorMessage: "Server is not available. Please try again later."};
        }                
    }

    public isLogined(): boolean {
        return this.logined;
    }

    public getLoginedEmail(): string {
        return this.email;
    }

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('logined');
        this.logined = false;
    }

}

class LoginResult {
    success: boolean  = false;
    errorMessage: string = '';
}

class LoginResponse {
    token: string | null = null;
    message: string = '';
    userName: string = '';
}

export default LoginService;
export { LoginResult };