import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {AlertService} from '../service/alert.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      ref: new FormControl('', Validators.required),
      phnNum: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      passwd: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .subscribe((data: any) => {
          localStorage.setItem('cusId', data.response.cusId);
          localStorage.setItem('sts', data.response.sts);
          localStorage.setItem('email', data.response.email);
          this.alertService.success('User Registration successful', true);
          this.router.navigate(['/verifyEmail']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
