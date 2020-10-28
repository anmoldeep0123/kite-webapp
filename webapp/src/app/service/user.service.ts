import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserRegister} from "../models/user-register";


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserRegister[]>(`/users`);
  }

  register(user: UserRegister) {
    return this.http.post(`/ka/ui/v1/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
