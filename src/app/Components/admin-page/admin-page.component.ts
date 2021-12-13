import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Shared/admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  constructor(private router: Router, public user: AdminService) {}

  ngOnInit(): void {
    this.user.isAuthorized.subscribe((isAuthorized: boolean | undefined) => {
      if (isAuthorized === false) {
        this.router.navigate(['/admin/login']);
      }
    });
  }

  public logout(): void {
    this.user.logout();
  }

  public initDB(): void {
    this.user.initDB();
  }
}
