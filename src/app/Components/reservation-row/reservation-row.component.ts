import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Room } from '../../Interfaces/room';
import { Reservation } from '../../Interfaces/reservation';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reservation-row',
  templateUrl: './reservation-row.component.html',
  styleUrls: ['./reservation-row.component.scss'],
})
export class ReservationRowComponent implements OnInit {
  @Input() reservation: Reservation | undefined;
  @Input() index: number = 0;
  @Input() isAdmin: boolean = false;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();
  public roomName: string = '';
  public canDelete: boolean = false;
  public isExpanded: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    if (this.reservation != undefined) {
      this.reservation.start = new Date(this.reservation.start);
      this.reservation.finish = new Date(this.reservation.finish);
      if (this.reservation.start > new Date() || this.isAdmin) {
        this.canDelete = true;
      } else {
        this.canDelete = false;
      }
      this.httpClient
        .get<Room[]>(environment.apiUrl + '/rooms/')
        .toPromise()
        .then((rooms: Room[]) => {
          for (let index = 0; index < rooms.length; index++) {
            if (rooms[index].id === this.reservation?.room_id) {
              this.roomName = rooms[index].name;
              break;
            }
          }
        });
    }
  }

  public toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  public delete(): void {
    if (this.reservation != undefined) this.deleted.next(this.reservation.id);
  }
}
