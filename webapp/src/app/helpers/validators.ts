import {FormControl, FormGroup} from '@angular/forms';
import {format} from 'url';
import {DatePipe} from '@angular/common';

export function confirmPassword() { // here we have the 'passwords' group
  return (group: FormGroup) => {
    const pass = group.get('passwd').value;
    const confirmPass = group.get('cnfmPasswd').value;

    return pass === confirmPass ? null : {confirmPassword: true};
  };
}

export function checkForFutureDates(ctrl: FormControl) { // here we have the 'passwords' group
  // const test = DatePipe.prototype.transform(new Date(), 'yyyy-mm-dd');
  if (ctrl.value > Date.now()) {
    return {checkForFutureDates: true};
  } else {
    return null;
  }
}

