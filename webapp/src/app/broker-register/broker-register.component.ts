import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ProfileRegisterService} from '../service/profile-register.service';
import {AlertService} from '../service/alert.service';
import * as CryptoJS from 'crypto-js';
import {AesUtil} from '../helpers/aesUtil';

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
  encryptaS: any;
  encryptaK: any;
  iv: any;
  salt: any;

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
    this.encrypt();
    if (this.brokerForm.invalid) {
      return;
    }

    this.loading = true;
    this.profileRegisterService.registerBroker('zrd', this.brokerForm.value,
      this.salt.toString(CryptoJS.enc.Hex), this.iv.toString(CryptoJS.enc.Hex))
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

  encrypt() {
    this.salt = CryptoJS.lib.WordArray.random(128 / 8);
    this.iv = CryptoJS.lib.WordArray.random(128 / 8);
    console.log('salt  ' + this.salt);
    console.log('iv  ' + this.iv);
    const key128Bits = CryptoJS.PBKDF2('Secret Passphrase', this.salt, {keySize: 128 / 32});
    console.log('key128Bits ' + key128Bits);
    const key128Bits100Iterations = CryptoJS.PBKDF2('Secret Passphrase', this.salt, {
      keySize: 128 / 32,
      iterations: 100
    });
    console.log('key128Bits100Iterations ' + key128Bits100Iterations);
    this.encryptaS = CryptoJS.AES.encrypt(this.brokerForm.value.aS, key128Bits100Iterations, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).ciphertext.toString(CryptoJS.enc.Base64);
    this.encryptaK = CryptoJS.AES.encrypt(this.brokerForm.value.aK, key128Bits100Iterations, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).ciphertext.toString(CryptoJS.enc.Base64);
    this.brokerForm.get('aS').setValue(this.encryptaS);
    this.brokerForm.get('aK').setValue(this.encryptaK);
    console.log('encryptaS   ' + this.encryptaS);
    console.log('encryptaK   ' + this.encryptaK);
  }
}
