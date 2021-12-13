import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../Interfaces/userInfo';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public invalidData: boolean = false;
  public email: string = '';
  public password: string = '';

  public token: string | undefined = undefined;
  public isAuthorized: BehaviorSubject<boolean | undefined> =
    new BehaviorSubject<boolean | undefined>(undefined);

  public refreshSubscription: number | undefined = undefined;

  constructor(private httpClient: HttpClient, private cookie: CookieService) {
    if (this.cookie.check('adminLogin') && this.cookie.check('adminPassword')) {
      const email = this.cookie.get('adminLogin');
      const password = this.cookie.get('adminPassword');
      this.login(email, password);
    } else {
      this.isAuthorized.next(false);
    }
  }
  private createTokenHeader(token: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
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
          this.token = data.access_token;
          this.isAdmin().then((data: boolean) => {
            if (data === true) {
              this.cookie.set('adminLogin', this.email, 1, '/');
              this.cookie.set('adminPassword', this.password, 1, '/');
              this.startRefreshment();
              this.isAuthorized.next(true);
              resolve();
            } else {
              this.invalidData = true;
              this.logout();
              reject();
            }
          });
        },
        error: (data: any) => {
          this.invalidData = true;
          this.logout();
          console.error(data);
          reject();
        },
      });
    });
    return result;
  }

  public logout(): void {
    if (this.cookie.check('adminLogin')) this.cookie.delete('adminLogin', '/');
    if (this.cookie.check('adminPassword'))
      this.cookie.delete('adminPassword', '/');
    this.token = undefined;
    this.isAuthorized.next(false);
    this.stopRefreshment();
    this.email = '';
    this.password = '';
  }

  public getTokenHeader(): HttpHeaders {
    if (this.token === undefined) throw new Error('token is not set');
    return this.createTokenHeader(this.token);
  }

  public isAdmin(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.httpClient
        .get<UserInfo>(environment.apiUrl + '/users/', {
          headers: this.getTokenHeader(),
        })
        .toPromise()
        .then((info: UserInfo) => {
          resolve(info.is_admin);
        });
    });
  }

  public initDB() {
    this.httpClient
      .post(
        environment.apiUrl + '/admin/init/',
        {},
        {
          headers: this.getTokenHeader(),
        }
      )
      .subscribe();
  }
}
