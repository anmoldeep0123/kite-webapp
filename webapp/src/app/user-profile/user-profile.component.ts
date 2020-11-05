import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {ProfileRegisterService} from '../service/profile-register.service';
import {AlertService} from '../service/alert.service';
import {DatePipe} from '@angular/common';
import {checkForFutureDates} from '../helpers/validators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers:[DatePipe]
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private router: Router, private profileRegisterService: ProfileRegisterService,
              private alertService: AlertService, private datepipe: DatePipe) {
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      fn: new FormControl('', Validators.required),
      gdr: new FormControl('', Validators.required),
      ln: new FormControl('', Validators.required),
      dob: new FormControl('' , [checkForFutureDates])
    });
    this.profileForm.valueChanges.subscribe(() => console.log(this.profileForm.value));
  }

  updateProfile() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;
    this.profileRegisterService.profile(this.profileForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Profile registration successful', true);
          this.loading = false;
          this.router.navigate(['/registerbroker']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

  skip() {
    this.router.navigate(['/registerbroker']);
  }
}
