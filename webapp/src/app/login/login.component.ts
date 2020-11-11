import {Component, OnInit} from '@angular/core';
import {AlertService} from '../service/alert.service';
import {AuthenticationService} from '../service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      passwd: new FormControl('', Validators.required)
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.passwd.value)
      .subscribe((data: any) => {
          sessionStorage.setItem('currentUser', data.response.cusId);
          this.authenticationService.currentUserSubject.next(data.response.cusId);
          if (data && data.redirectTo === 'Kite-Authentication') {
            const apiKey = data.response.ak;
            window.location.href = (`https://kite.zerodha.com/connect/login?v=3&api_key=${apiKey}`);
          } else if (data && data.redirectTo === 'TradeBull-Dashboard') {
            console.log('hello');
            if (data.response.sts === 'VALIDATED') {
              this.router.navigate(['/profile']);
            } else if (data.response.sts === 'REGISTERED') {
              this.router.navigate(['/verifyEmail']);
            } else if (data.response.sts === 'PROFILE') {
              this.router.navigate(['/registerbroker']);
            } else if (data.response.sts === 'BROKER') {
              this.router.navigate(['/dashboard']);
            }
          }
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
