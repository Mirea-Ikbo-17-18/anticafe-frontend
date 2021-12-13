import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Shared/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';

  constructor(private router: Router, public user: AdminService) {}

  ngOnInit(): void {
    this.user.isAuthorized.subscribe((isAuthorized: boolean | undefined) => {
      if (isAuthorized) {
        this.router.navigate(['/admin']);
      }
    });
  }

  public logIn(): void {
    if (this.username.length > 0 && this.password.length > 0) {
      this.user.login(this.username, this.password).finally();
    }
  }

  public removeError(): void {
    if (this.user.invalidData) this.user.invalidData = false;
  }
}
