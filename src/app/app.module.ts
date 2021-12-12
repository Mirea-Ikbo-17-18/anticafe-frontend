import { NgModule } from '@angular/core';
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
