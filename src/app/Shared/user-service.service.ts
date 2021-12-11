import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public email: string = '';
  public password: string = '';

  public token: string | undefined = undefined;
  public isAuthorized: BehaviorSubject<boolean | undefined> =
    new BehaviorSubject<boolean | undefined>(undefined);

  public refreshSubscription: number | undefined = undefined;

  constructor(private httpClient: HttpClient, private cookie: CookieService) {
    if (this.cookie.check('login') && this.cookie.check('password')) {
      const email = this.cookie.get('login');
      const password = this.cookie.get('password');
      this.login(email, password);
    } else {
      this.isAuthorized.next(false);
    }
  }

  private signIn() {
    let formdata = new FormData();
    formdata.append('username', this.email);
    formdata.append('password', this.password);
    return this.httpClient.post<{ access_token: string }>(
      environment.apiUrl + '/users/token/',
      formdata
    );
  }

  private startRefreshment() {
    this.stopRefreshment();
    setInterval(() => {
      this.signIn().subscribe({
        next: (data: { access_token: string }) => {
          this.token = data.access_token;
        },
        error: (data: any) => {
          this.logout();
          console.error(data);
        },
      });
    }, 5 * 60 * 1000);
  }

  private stopRefreshment() {
    if (this.refreshSubscription != undefined) {
      clearInterval(this.refreshSubscription);
    }
  }

  public login(email: string, password: string): Promise<void> {
    this.email = email;
    this.password = password;
    let result = new Promise<void>((resolve, reject) => {
      this.signIn().subscribe({
        next: (data: { access_token: string }) => {
          this.cookie.set('login', this.email, 1, '/');
          this.cookie.set('password', this.password, 1, '/');
          this.token = data.access_token;
          this.isAuthorized.next(true);
          this.startRefreshment();
          this.getInfo();
          resolve();
        },
        error: (data: any) => {
          this.logout();
          console.error(data);
          reject();
        },
      });
    });
    return result;
  }

  public logout(): void {
    if (this.cookie.check('login')) this.cookie.delete('login', '/');
    if (this.cookie.check('password')) this.cookie.delete('password', '/');
    this.token = undefined;
    this.isAuthorized.next(false);
    this.stopRefreshment();
    this.email = '';
    this.password = '';
  }

  public getInfo(): void {}

  public registry(email: string, password: string): Promise<Object> {
    return this.httpClient
      .post(environment.apiUrl + '/users/', {
        email: email,
        password: password,
        is_admin: false,
      })
      .toPromise();
  }
}