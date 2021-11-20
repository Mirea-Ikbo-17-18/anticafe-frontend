import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../Interfaces/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @Input() room: Room = {
    id: -1,
    name: 'Vice City',
    description:
      'Представь себя крутейшим боссом GTA, устраивай вечеринки, трать деньги и весело танцуй, но помни, полиция и мафия не дремлет даже сейчас!',
    cost: 3500,
    start: 9,
    finish: 21,
    options: [],
  };
  constructor() {}

  ngOnInit(): void {}
}
