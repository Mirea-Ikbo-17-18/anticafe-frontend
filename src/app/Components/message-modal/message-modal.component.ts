import { Component, OnInit } from '@angular/core';
import { MessageModal } from 'src/app/Shared/message-modal.service';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
})
export class MessageModalComponent implements OnInit {
  constructor(public data: MessageModal) {}

  ngOnInit(): void {}
}
