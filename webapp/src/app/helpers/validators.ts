import {FormGroup} from '@angular/forms';

export function confirmPassword(passwd, cnfmPasswd) { // here we have the 'passwords' group
  return (group: FormGroup) => {
    const pass = group.get('passwd').value;
    const confirmPass = group.get('cnfmPasswd').value;

    return pass === confirmPass ? null : {confirmPassword: true};
  };
}
