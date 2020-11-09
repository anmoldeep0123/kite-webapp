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
  iterationCount = 1000;
  keySize = 128;
  passphrase = 'a3y5cdef1897';
  aesUtil = new AesUtil();
  selectedBroker: string;
  broker: string;


  constructor(private router: Router, private profileRegisterService: ProfileRegisterService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.brokerForm = new FormGroup({
      bn: new FormControl(''),
      cId: new FormControl(''),
      aK: new FormControl(''),
      aS: new FormControl(''),
    });
    this.brokerForm.get('bn').valueChanges.subscribe(() => (this.brokerForm.get('bn').value === 'zrd') ? (this.selectedBroker = 'Zerodha') :
      this.selectedBroker = 'AliceBlue');
  }

  // tslint:disable-next-line:typedef
  skip() {
    this.router.navigate(['/dashboard']);
  }

  updateBroker() {
    this.submitted = true;
    // this.encrypt();
    const four = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    const salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    this.aesUtil.aesUtil(this.keySize, this.iterationCount);
    const encryptaS = this.aesUtil.encrypt(salt, four, this.passphrase, this.brokerForm.value.aS);
    const decryptaS = this.aesUtil.decrypt(salt, four, this.passphrase, encryptaS);
    console.log('encrypt', encryptaS);
    console.log('decrypt', decryptaS);
    const encryptaK = this.aesUtil.encrypt(salt, four, this.passphrase, this.brokerForm.value.aK);
    this.brokerForm.get('aS').setValue(encryptaS);
    this.brokerForm.get('aK').setValue(encryptaK);
    // stop here if form is invalid
    if (this.brokerForm.invalid) {
      return;
    }

    this.loading = true;
    this.profileRegisterService.registerBroker(this.brokerForm.get('bn').value, this.brokerForm.value, salt, four)
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

  selectedBrokerHandler() {
    (this.brokerForm.get('bn').value === 'zrd') ? (this.selectedBroker = 'Zerodha') :
      this.selectedBroker = 'AliceBlue';
  }

  // encrypt(){
  //   const salt = CryptoJS.lib.WordArray.random(128 / 8);
  //   const iv = CryptoJS.lib.WordArray.random(128 / 8);
  //   console.log('salt  ' + salt );
  //   console.log('iv  ' + iv );
  //   const key128Bits = CryptoJS.PBKDF2('Secret Passphrase', salt, { keySize: 128 / 32 });
  //   console.log( 'key128Bits ' + key128Bits);
  //   const key128Bits100Iterations = CryptoJS.PBKDF2('Secret Passphrase', salt, { keySize: 128 / 32, iterations: 100 });
  //   console.log( 'key128Bits100Iterations ' + key128Bits100Iterations);
  //   const encryptaS = CryptoJS.AES.encrypt(this.brokerForm.value.aS, key128Bits100Iterations, { iv : iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7  });
  //   const encryptaK = CryptoJS.AES.encrypt(this.brokerForm.value.aK, key128Bits100Iterations, { iv : iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7  });
  //   console.log('encrypted   ' + encrypted  );
  // }
}
