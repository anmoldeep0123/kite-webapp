import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserRegister} from '../models/user-register';


@Injectable({providedIn: 'root'})
export class VerifyEmailService {
  private currentUserSubject: BehaviorSubject<UserRegister>;
  public currentUser: Observable<UserRegister>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserRegister>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserRegister {
    return this.currentUserSubject.value;
  }

  sendOtp(userDetails) {
    return this.http.post<any>(`https://35.187.245.85:8080/tb/ui/v1/users/emailotp`, userDetails);
  }

  checkOtp(otpDetails) {
    return this.http.post<any>(`https://35.187.245.85:8080/tb/ui/v1/users/otp`, otpDetails);
  }
}
