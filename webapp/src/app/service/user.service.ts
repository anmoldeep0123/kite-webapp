import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserRegister} from '../models/user-register';


@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }
}
