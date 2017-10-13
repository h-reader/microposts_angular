import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL_COMPATIBILITY_MODE, MatInputModule, MatButtonModule, MatIconModule, MatToolbarModule, MatCardModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './common/auth/auth.service';
import { ValidationService } from './common/validation/validation.service';
import { ServiceLocator } from './common/service-locator';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
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
    ValidationService,
    { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true },    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
 }
