import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Option } from '../Interfaces/option';
import { Room } from '../Interfaces/room';
import { UserInfo } from '../Interfaces/userInfo';
import { UserService } from './user-service.service';
import { Reservation } from '../Interfaces/reservation';
import { DatePipe } from '@angular/common';
import { MessageModal } from './message-modal.service';

@Injectable({
  providedIn: 'root',
})
export class BookingModalService {
  private startDate: Date = new Date();
  private endDate: Date = new Date();
  public isVisible: boolean = false;
  public room: Room | undefined = undefined;
  public selectedOptions: Option[] = [];
  public animationState: string = 'stay';
  public cost: number = 0;
  public date: string = '';
  public parsedDate: Date | undefined;
  public currTime: number | undefined;
  public timeRange: number[] = [];
  public occupiedTimes: number[] = [];
  public startTime: number | undefined;
  public endTime: number | undefined;
  public userInfo: UserInfo = {
    email: '',
    phone_number: '',
    first_name: '',
    second_name: '',
    is_admin: false,
  };

  constructor(
    private user: UserService,
    private http: HttpClient,
    private datePipe: DatePipe,
    private message: MessageModal
  ) {}

  public open(room: Room): void {
    this.startDate = new Date();
    this.startDate.setHours(0, 0, 0);
    this.endDate.setDate(this.startDate.getDate() + 14);
    this.endDate.setHours(23, 59, 59);
    this.startTime = undefined;
    this.endTime = undefined;
    this.room = room;
    if (this.user.isAuthorized.value === true) {
      this.user.getInfo().then((info: UserInfo) => {
        this.userInfo = info;
        this.userInfo.first_name =
          this.userInfo.first_name === null ? '' : this.userInfo.first_name;
        this.userInfo.second_name =
          this.userInfo.second_name === null ? '' : this.userInfo.second_name;
        this.userInfo.phone_number =
          this.userInfo.phone_number === null ? '' : this.userInfo.phone_number;
      });
    }
    this.timeRange = [];
    for (let hour = room.start; hour < room.finish; hour++) {
      this.timeRange.push(hour);
    }
    this.selectedOptions = [];
    this.date = '';
    this.parsedDate = undefined;
    this.isVisible = true;
    this.animationState = 'apear';
    this.recalculateCost();
    setTimeout(() => {
      this.animationState = 'stay';
    }, 350);
  }

  public close(): void {
    this.animationState = 'leave';
    setTimeout(() => {
      this.animationState = 'stay';
      this.isVisible = false;
    }, 350);
  }

  public recalculateCost(): void {
    if (this.room) {
      this.cost = this.room?.cost;
      this.selectedOptions.forEach((option) => {
        this.cost += option.cost;
      });
      if (this.startTime != undefined && this.endTime != undefined) {
        this.cost *= this.endTime - this.startTime + 1;
      }
    }
  }

  public changeDate(event: InputEvent | string): void {
    this.parsedDate = new Date(<string>event);
    if (
      !(this.parsedDate.getTime() === this.parsedDate.getTime()) ||
      this.parsedDate < this.startDate ||
      this.parsedDate > this.endDate
    )
      this.parsedDate = undefined;
    else {
      this.startTime = undefined;
      this.endTime = undefined;
      let date = new Date();
      if (
        this.parsedDate.getMonth() === date.getMonth() &&
        this.parsedDate.getDate() === date.getDate()
      )
        this.currTime = date.getHours();
      else this.currTime = undefined;
      this.getOccupiedTimes(this.parsedDate);
    }
  }

  public getOccupiedTimes(date: Date) {
    date = new Date(date);
    let dateQuery = new HttpParams();
    dateQuery = dateQuery.append(
      'start',
      <string>this.datePipe.transform(date, 'yyyy-MM-dd')
    );
    date.setDate(date.getDate() + 1);
    dateQuery = dateQuery.append(
      'finish',
      <string>this.datePipe.transform(date, 'yyyy-MM-dd')
    );
    if (this.room != undefined) {
      this.http
        .get<Reservation[]>(
          environment.apiUrl +
            '/rooms/' +
            this.room.id.toString() +
            '/reservations/',
          { params: dateQuery }
        )
        .subscribe((data: Reservation[]) => {
          console.log(data);
          this.occupiedTimes = [];
          data.forEach((reservation: Reservation) => {
            let start: number = new Date(reservation.start).getHours();
            let end: number = new Date(reservation.finish).getHours();
            for (let hour: number = start; hour < end; hour++)
              this.occupiedTimes.push(hour);
          });
        });
    }
  }

  public book(): void {
    if (
      this.room != undefined &&
      this.parsedDate != undefined &&
      this.startTime != undefined &&
      this.endTime != undefined
    ) {
      let date = new Date(this.parsedDate);
      console.log(date);
      console.log(this.parsedDate);
      let body = {
        reservation: {
          cost: this.cost,
          start: this.datePipe.transform(
            new Date(date.setHours(this.startTime)),
            'yyyy-MM-ddTHH:00:00'
          ),
          finish: this.datePipe.transform(
            new Date(date.setHours(this.endTime + 1, 59, 59)),
            'yyyy-MM-ddTHH:00:00'
          ),
          email: this.userInfo.email,
          first_name: this.userInfo.first_name,
          second_name: this.userInfo.second_name,
          phone_number: this.userInfo.phone_number,
        },
        options: this.selectedOptions.map((option: Option) => {
          return option.id;
        }),
      };
      if (this.user.isAuthorized.value === true) {
        this.http
          .post(
            environment.apiUrl +
              '/rooms/' +
              this.room.id.toString() +
              '/reservations/',
            body,
            { headers: this.user.getTokenHeader() }
          )
          .toPromise()
          .then(() => {
            this.close();
            this.message.open('Бронь успешно создана');
          })
          .catch((error) => {
            this.message.open('Не удалось создать бронь');
            console.error(error);
          });
      } else {
        this.http
          .post(
            environment.apiUrl +
              '/rooms/' +
              this.room.id.toString() +
              '/reservations/',
            body
          )
          .toPromise()
          .then(() => {
            this.close();
            this.message.open('Бронь успешно создана');
          })
          .catch((error) => {
            this.message.open('Не удалось создать бронь');
            console.error(error);
          });
      }
    }
  }
}
