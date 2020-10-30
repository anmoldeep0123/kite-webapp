import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from "@angular/forms";
import {first} from "rxjs/operators";
import {ProfileRegisterService} from "../service/profile-register.service";
import {AlertService} from "../service/alert.service";

@Component({
  selector: 'app-broker-register',
  templateUrl: './broker-register.component.html',
  styleUrls: ['./broker-register.component.scss']
})
export class BrokerRegisterComponent implements OnInit {
  showUrls: boolean = false;
  brokerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private router: Router, private profileRegisterService: ProfileRegisterService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.brokerForm = new FormGroup({
      brokerName: new FormControl('zerodha'),
      clientId: new FormControl(''),
      apiKey: new FormControl(''),
      apiSecret: new FormControl(''),
    });
  }

  // tslint:disable-next-line:typedef
  skip() {
    this.router.navigate(['/dashboard']);
  }

  updateBroker() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.brokerForm.invalid) {
      return;
    }

    this.loading = true;
    this.profileRegisterService.registerBroker(this.brokerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Broker registration successful', true);
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  generateBrokerRegURL() {
    this.showUrls = true;
  }
}
