import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserRegister} from '../models/user-register';


@Injectable({providedIn: 'root'})
export class VerifyEmailService {
  private currentUserSubject: BehaviorSubject<UserRegister>;
  public currentUser: Observable<UserRegister>;

  constructor(private http: HttpClient) {
  }

  sendOtp(userDetails) {
    return this.http.post<any>(`/tb/ui/v1/users/emailotp`, userDetails);
  }

  checkOtp(otpDetails) {
    return this.http.post<any>(`/tb/ui/v1/users/otp`, otpDetails);
  }
}
