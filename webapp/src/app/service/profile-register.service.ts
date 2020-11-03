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
    this.currentUserSubject = new BehaviorSubject<UserRegister>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserRegister {
    return this.currentUserSubject.value;
  }

  profile(profile: UserProfile) {
    return this.http.post<any>(`/tb/ui/v1/actions/users/profile`, {profile});
  }

  registerBroker(brokerType, broker: BrokerRegisteration) {
    return this.http.post<any>(`/tb/ui/v1/actions/users/broker`, {
      zrd: broker});
  }
}
