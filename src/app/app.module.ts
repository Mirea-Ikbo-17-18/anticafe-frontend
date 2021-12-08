import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
