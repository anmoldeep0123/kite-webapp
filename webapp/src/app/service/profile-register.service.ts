import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserProfile} from '../models/user-profile';
import {BrokerRegisteration} from '../models/broker-registeration';


@Injectable({providedIn: 'root'})
export class ProfileRegisterService {

  constructor(private http: HttpClient) {
  }

  profile(profile: UserProfile) {
    return this.http.post<any>(`/tb/ui/v1/actions/users/profile`, {profile});
  }

  registerBroker(brokerType, broker: BrokerRegisteration) {
    return this.http.post<any>(`/tb/ui/v1/actions/users/broker`, {
      zrd: broker
    });
  }
}
