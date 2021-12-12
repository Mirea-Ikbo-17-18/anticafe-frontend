import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Shared/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router, public user: UserService) {}

  ngOnInit(): void {
    this.user.isAuthorized.subscribe({
      next: (data: boolean | undefined) => {
        if (data === false) this.router.navigate(['/']);
      },
    });
  }
}
