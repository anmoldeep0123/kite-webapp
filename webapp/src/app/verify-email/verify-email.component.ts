import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {VerifyEmailService} from '../service/verify-email.service';
import {Router} from '@angular/router';
import {AlertService} from '../service/alert.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  customerId: string;
  generateOtpCounter = 0;
  generateOtpBtn = true;
  otpCounter = true;
  otpForm: FormGroup;
  otpValue: number;

  constructor(private verifyEmailService: VerifyEmailService, private router: Router, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.userEmail = sessionStorage.getItem('email');
    this.customerId = sessionStorage.getItem('cusId');
    this.otpForm = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.pattern('\\d{6}')]),
    });
  }

  generateOtp() {
    this.submitted = true;
    this.generateOtpCounter = this.generateOtpCounter + 1;
    this.loading = true;
    this.generateOtpBtn = false;
    setTimeout(() => this.generateOtpBtn = true, 60000);
    this.verifyEmailService.sendOtp({
      cusId: this.customerId,
      email: this.userEmail,
      ct: this.generateOtpCounter
    }).subscribe((data: any) => {
        this.alertService.success('Email notification sent. Please request for new Otp after 1min.', true);
        this.loading = false;
        this.otpCounter = data.response.ctLeft;
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  verifyOtp() {
    this.submitted = true;
    this.otpValue = this.otpForm.value;
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
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
