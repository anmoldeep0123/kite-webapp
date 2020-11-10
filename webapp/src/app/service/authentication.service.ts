import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserRegister} from '../models/user-register';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string>(sessionStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`/tb/ui/v1/users/login`, {username, password});
    // login successful if there's a jwt token in the response
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // sessionStorage.setItem('currentUser', data.response.cusId);
        // this.currentUserSubject.next(data.response.cusId)
  }

  register(user: UserRegister) {
    return this.http.post(`/tb/ui/v1/users/register`, user)
      .pipe(map((data: any) => {
        // login successful if there's a jwt token in the response
        if (data.response && data.response.sts === 'REGISTERED') {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('currentUser', JSON.stringify(data.response.cusId));
          this.currentUserSubject.next(data.response.cusId);
        }
        return data;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.clear();
    this.currentUserSubject.next(null);
  }
}
