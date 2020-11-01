import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {VerifyEmailService} from '../service/verify-email.service';
import {Router} from '@angular/router';
import {AlertService} from '../service/alert.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  userEmail: string;
  otpValue: string;
  customerId: string;
  generateOtpCounter: number = 0;
  generateOtpBtn: boolean = true;

  constructor(private verifyEmailService: VerifyEmailService, private router: Router, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('email');
    this.customerId = localStorage.getItem('cusId');
  }

  generateOtp() {
    this.submitted = true;
    this.generateOtpCounter = this.generateOtpCounter + 1;
    this.loading = true;
    this.verifyEmailService.sendOtp({
      cusId: this.customerId,
      email: this.userEmail,
      ct: this.generateOtpCounter
    }).subscribe((data: any) => {
        this.alertService.success('Email notification sent', true);
        this.loading = false;
        this.generateOtpBtn = data.response.ctLeft;
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  verifyOtp() {
    this.submitted = true;

    this.loading = true;
    this.verifyEmailService.checkOtp({
      cusId: this.customerId,
      email: this.userEmail,
      e_otp: this.otpValue
    })
      .pipe(first())
      .subscribe((data: any) => {
          this.alertService.success('Customer validated successfully', true);
          if (data.response.vld) {
            this.router.navigate(['/profile']);
          } else {
            this.alertService.error('Invalid Otp, Please enter 6 digit Otp sent to your registered email', true);
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
