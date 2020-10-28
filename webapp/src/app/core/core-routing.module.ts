import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    component: HomeComponent,
    children: [{path: '**', redirectTo: 'welcome', pathMatch: 'full'}]
  }
];

@NgModule({
  imports: [
   RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class CoreRoutingModule {
}
