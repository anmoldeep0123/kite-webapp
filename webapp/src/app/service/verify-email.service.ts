import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class VerifyEmailService {

  constructor(private http: HttpClient) {
  }

  sendOtp(userDetails) {
    return this.http.post<any>(`/tb/ui/v1/users/emailotp`, userDetails);
  }

  checkOtp(otpDetails) {
    return this.http.post<any>(`/tb/ui/v1/users/otp`, otpDetails);
  }
}
