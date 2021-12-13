import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/Interfaces/reservation';
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
    is_admin: false,
  };
  public reservations: Reservation[] = [];
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
          this.getReservations();
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
    this.changeUser.open(this.userInfo, this.user.password);
  }

  public getReservations(): void {
    this.user.getReservations().then((reservations: Reservation[]) => {
      this.reservations = reservations;
    });
  }

  public deleteReservation(index: number): void {
    console.log(index);
    this.user.deleteReservations(index);
    this.getReservations();
  }
}
