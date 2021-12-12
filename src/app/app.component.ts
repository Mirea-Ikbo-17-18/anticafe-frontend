import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Антикафе IKBO17';

  constructor() {
    console.log('А шо это вы делаете в моём холодильнике?');
  }
}
