import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { LandingComponent } from './Components/landing/landing.component';
import { RoomsComponent } from './Components/rooms/rooms.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactsComponent } from './Components/contacts/contacts.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { BookingModalComponent } from './Components/booking-modal/booking-modal.component';
import { OstComponent } from './Components/ost/ost.component';
import { RoomComponent } from './Components/room/room.component';
import { AuthModalComponent } from './Components/auth-modal/auth-modal.component';
import { TimeSelectorComponent } from './Components/time-selector/time-selector.component';
import { MessageModalComponent } from './Components/message-modal/message-modal.component';
import { OptionSelectorComponent } from './Components/option-selector/option-selector.component';
import { ChangeProfileModalComponent } from './Components/change-profile-modal/change-profile-modal.component';
import { DatePipe } from '@angular/common';
import { AdminPageComponent } from './Components/admin-page/admin-page.component';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import { ReservationViewerComponent } from './Components/reservation-viewer/reservation-viewer.component';
import { ReservationRowComponent } from './Components/reservation-row/reservation-row.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LandingComponent,
    RoomsComponent,
    AboutComponent,
    ContactsComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    BookingModalComponent,
    OstComponent,
    RoomComponent,
    AuthModalComponent,
    TimeSelectorComponent,
    MessageModalComponent,
    OptionSelectorComponent,
    ChangeProfileModalComponent,
    AdminPageComponent,
    AdminLoginComponent,
    ReservationViewerComponent,
    ReservationRowComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
