import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { UsersInterface } from '../interfaces/users.interface';
import { env } from '../../../../env/env';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  env = env;
  constructor(private http: HttpClient) {}

  read(id: string): Observable<UsersInterface> {
    return this.http
      .get<UsersInterface>(`${this.env.api}/users/${id}`)
      .pipe(delay(500));
  }

  create(data: UsersInterface): Observable<UsersInterface> {
    return this.http
      .post<UsersInterface>(`${this.env.api}/users`, data)
      .pipe(delay(500));
  }

  update(data: UsersInterface): Observable<UsersInterface> {
    return this.http
      .patch<UsersInterface>(`${this.env.api}/users/${data.id}`, data)
      .pipe(delay(500));
  }

  delete(id: string): Observable<UsersInterface> {
    return this.http
      .delete<UsersInterface>(`${this.env.api}/users/${id}`)
      .pipe(delay(500));
  }
}
