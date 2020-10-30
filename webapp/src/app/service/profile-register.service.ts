import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserRegister} from '../models/user-register';
import {UserProfile} from '../models/user-profile';
import {BrokerRegisteration} from '../models/broker-registeration';


@Injectable({providedIn: 'root'})
export class ProfileRegisterService {
  private currentUserSubject: BehaviorSubject<UserRegister>;
  public currentUser: Observable<UserRegister>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserRegister>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserRegister {
    return this.currentUserSubject.value;
  }

  profile(profile: UserProfile) {
    return this.http.post<any>(`https://35.187.245.85:8080/ka/ui/v1/users/profile`, {profile});
  }

  registerBroker(broker: BrokerRegisteration) {
    return this.http.post<any>(`https://35.187.245.85:8080/ka/ui/v1/users/broker`, {broker});
  }
}
