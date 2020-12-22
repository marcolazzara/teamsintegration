import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatExpansionModule, MatFormFieldModule, MatInputModule, MatIconModule, MatGridListModule, MatSnackBarModule, MatCardModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HomePageComponent } from './home-page/home-page.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent
  ],
  imports: [

    FlatpickrModule.forRoot(),

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserModule, MatIconModule, NgbModalModule, FlatpickrModule, MatMenuModule, MatListModule,
    FormsModule, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatGridListModule,
    MatSnackBarModule,
    MatFormFieldModule,
    AppRoutingModule, MatInputModule,
    MatExpansionModule, MatFormFieldModule, BrowserAnimationsModule, MatCardModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
