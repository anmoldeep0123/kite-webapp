import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ProfileRegisterService} from '../service/profile-register.service';
import {AlertService} from '../service/alert.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-broker-register',
  templateUrl: './broker-register.component.html',
  styleUrls: ['./broker-register.component.scss']
})
export class BrokerRegisterComponent implements OnInit {
  showUrls = false;
  brokerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  redirectUrl: string;
  postbackUrl: string;

  constructor(private router: Router, private profileRegisterService: ProfileRegisterService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.brokerForm = new FormGroup({
      cId: new FormControl(''),
      aK: new FormControl(''),
      aS: new FormControl(''),
    });
  }

  // tslint:disable-next-line:typedef
  skip() {
    this.router.navigate(['/dashboard']);
  }

  updateBroker() {
    this.submitted = true;
    const salt = bcrypt.genSaltSync(10);
    this.brokerForm.get('aS').setValue(bcrypt.hashSync(this.brokerForm.value.aS, salt));
    this.brokerForm.get('aK').setValue(bcrypt.hashSync(this.brokerForm.value.aK, salt));

    // stop here if form is invalid
    if (this.brokerForm.invalid) {
      return;
    }

    this.loading = true;
    this.profileRegisterService.registerBroker('zrd', this.brokerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Broker registration successful', true);
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  generateBrokerRegURL() {
    this.showUrls = true;
    this.redirectUrl = `https://${window.location.hostname}:${window.location.port}/tb/ui/v1/kdev/${this.brokerForm.get('cId').value}/get`;
    this.postbackUrl = `https://${window.location.hostname}:${window.location.port}/tb/ui/v1/kdev/${this.brokerForm.get('cId').value}/back`;
  }
}
