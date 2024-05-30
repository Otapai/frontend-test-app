import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  UsersFilterInterface,
  UsersPaginationListInterface,
} from '../interfaces/users-list.interface';
import { env } from '../../../../env/env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersListService {
  env = env;
  constructor(private http: HttpClient) {}

  read(
    filter?: UsersFilterInterface
  ): Observable<UsersPaginationListInterface> {
    let params = new HttpParams();
    for (const keyParam of Object.keys(filter || {})) {
      if (
        filter?.filter &&
        keyParam !== 'pageIndex' &&
        keyParam !== 'pageSize'
      ) {
        params = params.append(
          keyParam,
          (filter as { [key: string]: string | number })[keyParam]
        );
      }
      if (keyParam === 'pageIndex') {
        params = params.append(
          '_page',
          (filter as { [key: string]: number })['pageIndex'] + 1
        );
      }
      if (keyParam === 'pageSize') {
        params = params.append(
          '_per_page',
          (filter as { [key: string]: number })['pageSize']
        );
      }
    }

    return this.http.get<UsersPaginationListInterface>(
      `${this.env.api}/users`,
      { params: params }
    );
  }

}
