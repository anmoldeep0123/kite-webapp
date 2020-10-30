import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {ProfileRegisterService} from '../service/profile-register.service';
import {AlertService} from '../service/alert.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private router: Router, private profileRegisterService: ProfileRegisterService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      fullName: new FormControl(''),
      gender: new FormControl(''),
      nickName: new FormControl(''),
      address: new FormControl(''),
      dob: new FormControl('')
    });
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
