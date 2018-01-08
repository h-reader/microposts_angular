import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL_COMPATIBILITY_MODE, MatInputModule, MatButtonModule,
  MatIconModule, MatToolbarModule, MatCardModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './common/auth/auth.service';
import { MessageService } from './common/message/message.service';
import { MicropostService } from './micropost/micropost.service';
import { ComponentService } from './common/component/component.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { MicropostEntryComponent } from './micropost-entry/micropost-entry.component';
import { MicropostListComponent } from './micropost-list/micropost-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    MicropostEntryComponent,
    MicropostListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
  ],
  providers: [
    AuthService,
    MessageService,
    MicropostService,
    ComponentService,
    { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
 }
