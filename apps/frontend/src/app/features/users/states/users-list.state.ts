import { Injectable } from '@angular/core';
import { GeRx, GeRxMethods } from 'gerx';
import { UsersListService } from '../services/users-list.service';
import { Observable, of } from 'rxjs';
import {
  UsersFilterInterface,
  UsersPaginationListInterface,
} from '../interfaces/users-list.interface';
import { UsersInterface } from '../interfaces/users.interface';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersListState {
  public entityName = 'users-list';
  public geRxMethods: GeRxMethods = {
    read: {
      main: this.read,
    },
    update: {
      main: this.update,
      success: this.success,
    },
    delete: {
      main: this.delete,
      success: this.success,
    },
  };

  constructor(
    private service: UsersListService,
    private userService: UsersService,
    public geRx: GeRx,
    private activateRoute: ActivatedRoute
  ) {}

  read(
    filter?: UsersFilterInterface
  ): Observable<UsersPaginationListInterface> {
    return this.service.read(filter);
  }

  update(data: UsersInterface): Observable<UsersInterface> {
    return this.userService.update(data);
  }

  delete(id: string): Observable<UsersInterface> {
    return this.userService.delete(id);
  }

  success(): Observable<void> {
    this.geRx.read(this.entityName, {
      pageIndex: +this.activateRoute.snapshot.queryParams['pageIndex'] || 0,
      pageSize: +this.activateRoute.snapshot.queryParams['pageSize'] || 10,
    });
    return of();
  }
}
