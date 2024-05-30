import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeRx } from 'gerx';
import { UsersState } from '../states/users.state';
import { UsersInterface } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  constructor(public geRx: GeRx, private state: UsersState) {}

  initStore(): void {
    this.geRx.addEntity(
      this.state.entityName,
      this.state.geRxMethods,
      this.state,
      { memorySize: 1 }
    );
  }

  read(id: string): void {
    this.geRx.read(this.state.entityName, id);
  }

  create(data: UsersInterface): void {
    this.geRx.create(this.state.entityName, data);
  }

  update(data: UsersInterface): void {
    this.geRx.update(this.state.entityName, data);
  }

  getData$$(): Observable<any> {
    return this.geRx.getData$$(this.state.entityName);
  }

  getData$(): Observable<any> {
    return this.geRx.getData$(this.state.entityName);
  }

  getData(): any {
    return this.geRx.getData(this.state.entityName);
  }

  loading$(): Observable<boolean> {
    return this.geRx.loading$(this.state.entityName);
  }

  loading(): boolean {
    return this.geRx.loading(this.state.entityName);
  }

  removeStore(): void {
    this.geRx.deleteEntity(this.state.entityName);
  }
}
