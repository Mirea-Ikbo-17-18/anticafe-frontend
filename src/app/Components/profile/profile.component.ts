import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeProfileModalService } from 'src/app/Shared/change-profile-modal.service';
import { UserService } from 'src/app/Shared/user-service.service';
import { UserInfo } from '../../Interfaces/userInfo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public userInfo: UserInfo = {
    email: '',
    phone_number: '',
    first_name: '',
    second_name: '',
  };
  constructor(
    private router: Router,
    private changeUser: ChangeProfileModalService,
    public user: UserService
  ) {}

  ngOnInit(): void {
    this.user.isAuthorized.subscribe({
      next: (data: boolean | undefined) => {
        if (data === false) this.router.navigate(['/']);
        if (data === true) {
          this.updateInfo();
        }
      },
    });
    this.changeUser.saved.subscribe(() => {
      this.updateInfo();
    });
  }

  public updateInfo(): void {
    this.user.getInfo().then((info: UserInfo) => {
      this.userInfo = info;
    });
  }

  public changeData(): void {
    this.changeUser.open(this.userInfo);
  }
}
