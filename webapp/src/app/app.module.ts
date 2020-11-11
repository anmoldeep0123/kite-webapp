import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AlertComponent} from './common/alert/alert.component';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {BrokerRegisterComponent} from './broker-register/broker-register.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {DatePipe} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {FormErrorComponent} from './common/form-error/form-error.component';
import {FormErrorContainerComponent} from './common/form-error-container/form-error-container.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {UserConfigComponent} from './user-config/user-config.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    UserProfileComponent,
    BrokerRegisterComponent,
    VerifyEmailComponent,
    FormErrorComponent,
    FormErrorContainerComponent,
    DashboardComponent,
    UserConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    ClipboardModule,
    OverlayModule,
    MatSlideToggleModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
