import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {AlertService} from '../service/alert.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {confirmPassword} from '../helpers/validators';

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
      phnNum: new FormControl('', [Validators.required, Validators.pattern('^\\d{10}$')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^([\\w+-.%]+@[\\w-.]+\\.[A-Za-z]{1,})$')]),
      passwd: new FormControl('', [Validators.required, Validators.minLength(4)]),
      cnfmPasswd: new FormControl('')
    }, confirmPassword('passwd', 'cnfmPasswd'));
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.registerForm.value)
      .subscribe((data: any) => {
          sessionStorage.setItem('cusId', data.response.cusId);
          sessionStorage.setItem('sts', data.response.sts);
          sessionStorage.setItem('email', data.response.email);
          this.alertService.success('User Registration successful', true);
          this.loading = false;
          this.router.navigate(['/verifyEmail']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
