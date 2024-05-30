import { Injectable } from '@angular/core';
import { GeRxMethods } from 'gerx';
import { UsersService } from '../services/users.service';
import { UsersInterface } from '../interfaces/users.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersState {
  public entityName = 'users';
  public geRxMethods: GeRxMethods = {
    create: {
      main: this.create,
      success: this.createSuccess,
    },
    read: {
      main: this.read,
    },
    update: {
      main: this.update,
    },
    delete: {
      main: this.delete,
    },
  };

  constructor(private service: UsersService, private router: Router) {}

  read(id: string): Observable<UsersInterface> {
    return this.service.read(id);
  }

  create(data: UsersInterface): Observable<UsersInterface> {
    return this.service.create(data);
  }

  createSuccess(data: UsersInterface): Observable<boolean> {
    this.router.navigate(['', 'users', data.id]).then();
    return of();
  }

  update(data: UsersInterface): Observable<UsersInterface> {
    return this.service.update(data);
  }

  delete(id: string): Observable<UsersInterface> {
    return this.service.delete(id);
  }
}
