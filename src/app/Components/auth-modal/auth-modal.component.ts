import { Component, OnInit } from '@angular/core';
import { AuthModalService } from '../../Shared/auth-modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent implements OnInit {
  constructor(public data: AuthModalService) {}

  ngOnInit(): void {}
}
