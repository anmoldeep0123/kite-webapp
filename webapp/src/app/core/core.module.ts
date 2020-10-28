import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CoreRoutingModule} from './core-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CoreRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent],
  exports: [],
  providers: [],
  entryComponents: []
})
export class CoreModule {
}
