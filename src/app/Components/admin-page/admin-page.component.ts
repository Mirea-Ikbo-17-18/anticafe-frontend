import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Shared/admin.service';
import { Reservation } from '../../Interfaces/reservation';
import { Room } from '../../Interfaces/room';
import { SelectOption } from '../../Interfaces/selectOption';
import { Option } from '../../Interfaces/option';
import { ShortRoom } from '../../Interfaces/shortRoom';
import { SiteInfo } from '../../Interfaces/siteInfo';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  public siteInfo: SiteInfo = { title: '', description: '' };
  public reservations: Reservation[] = [];
  public rooms: SelectOption[] = [];
  public roomForTime: SelectOption | undefined;
  public startTime: number | null = null;
  public endTime: number | null = null;

  public roomForOptions: SelectOption | undefined;
  public allOptions: Option[] = [];
  public roomOptions: SelectOption[] = [];
  public availableOptions: SelectOption[] = [];
  public selectedOption: SelectOption | undefined;
  public removedOptions: number[] = [];
  public addedOptions: number[] = [];
  constructor(private router: Router, public user: AdminService) {}

  ngOnInit(): void {
    this.user.isAuthorized.subscribe((isAuthorized: boolean | undefined) => {
      if (isAuthorized === false) {
        this.router.navigate(['/admin/login']);
      }
      if (isAuthorized === true) {
        this.getReservations();
        this.getRooms();
        this.getAllOptions();
        this.getSiteInfo();
      }
    });
  }

  public logout(): void {
    this.user.logout();
  }

  public initDB(): void {
    this.user.initDB();
  }

  public getSiteInfo(): void {
    this.user.getSiteInfo().then((info: SiteInfo) => {
      this.siteInfo = info;
    });
  }

  public updateSiteInfo(): void {
    this.user.updateSiteInfo(this.siteInfo);
  }

  public getReservations(): void {
    this.user.getReservations().then((reservations: Reservation[]) => {
      this.reservations = reservations;
    });
  }

  public deleteReservation(index: number): void {
    this.user.deleteReservations(index);
    this.getReservations();
  }

  public getRooms(): void {
    this.user.getRooms().then((rooms: Room[]) => {
      this.rooms = rooms.map((room: Room) => {
        return { id: room.id, name: room.name };
      });
    });
  }

  public getRoom(id: number): Promise<Room> {
    return new Promise<Room>((resolve) => {
      this.user.getRooms().then((rooms: Room[]) => {
        for (let index = 0; index < rooms.length; index++) {
          const element = rooms[index];
          if (element.id === id) resolve(element);
        }
      });
    });
  }

  public validateWorkHours(): boolean {
    return (
      this.startTime != null &&
      this.endTime != null &&
      this.startTime > 0 &&
      this.endTime < 24 &&
      this.startTime < this.endTime
    );
  }

  public getWorkHours(): void {
    if (this.roomForTime != undefined) {
      this.getRoom(this.roomForTime.id).then((room: Room) => {
        this.startTime = room.start;
        this.endTime = room.finish;
      });
    }
  }

  public updateWorkHours(): void {
    if (this.roomForTime != undefined) {
      this.getRoom(this.roomForTime.id).then((room: Room) => {
        if (this.startTime != null && this.endTime != null) {
          let shortRoom: ShortRoom = {
            name: room.name,
            description: room.description,
            cost: room.cost,
            image_id: room.image_id,
            start: this.startTime,
            finish: this.endTime,
          };
          this.user.updateRoom(shortRoom, room.id);
        }
      });
    }
  }

  public getAllOptions(): void {
    this.user.getAllOptions().then((options: Option[]) => {
      this.allOptions = options;
    });
  }

  public getRoomOptions(): void {
    if (this.roomForOptions != undefined) {
      this.getRoom(this.roomForOptions.id).then((room: Room) => {
        this.roomOptions = room.options.map((option: Option) => {
          return { id: option.id, name: option.name };
        });
        this.getAvailableOptions();
      });
    }
  }

  public getAvailableOptions(): void {
    this.availableOptions = [];
    this.allOptions.forEach((option: Option) => {
      for (let index = 0; index < this.roomOptions.length; index++) {
        if (option.id === this.roomOptions[index].id) return;
      }
      this.availableOptions.push({ id: option.id, name: option.name });
    });
  }

  public selectRoomForOptions(): void {
    if (this.roomForOptions != undefined) {
      this.removedOptions = [];
      this.addedOptions = [];
      this.getRoomOptions();
    }
  }

  public addOption(): void {
    if (this.selectedOption != undefined) {
      this.roomOptions.push(this.selectedOption);
      this.getAvailableOptions();
      let index = this.removedOptions.indexOf(this.selectedOption.id);
      if (index != -1) this.removedOptions.splice(index, 1);
      index = this.addedOptions.indexOf(this.selectedOption.id);
      if (index === -1) this.addedOptions.push(this.selectedOption.id);
      this.selectedOption = undefined;
    }
  }

  public removeOption(option: SelectOption): void {
    let index = this.roomOptions.findIndex((roomOption: SelectOption) => {
      return option.id === roomOption.id;
    });
    if (index != -1) this.roomOptions.splice(index, 1);
    this.getAvailableOptions();
    index = this.addedOptions.indexOf(option.id);
    if (index != -1) this.addedOptions.splice(index, 1);
    index = this.removedOptions.indexOf(option.id);
    if (index === -1) this.removedOptions.push(option.id);
  }

  public saveOptions(): void {
    if (this.roomForOptions != undefined) {
      this.user.saveRoomOptions(
        this.roomForOptions.id,
        this.removedOptions,
        this.addedOptions
      );
      this.removedOptions = [];
      this.addedOptions = [];
    }
  }

  public getStatistics(): void {
    this.user.getStatistics().then((data: any) => {
      const blob = new Blob([data], { type: 'text/csv' });
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = url;
      link.download = 'Statistics.csv';
      link.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.remove();
      }, 100);
    });
  }
}
