import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeRx } from 'gerx';
import { UsersListState } from '../states/users-list.state';
import { UsersFilterInterface, UsersPaginationListInterface } from '../interfaces/users-list.interface';
import { UsersInterface } from '../interfaces/users.interface';

@Injectable({
    providedIn: 'root',
})
export class UsersListFacade {
    constructor(
        public geRx: GeRx,
        private state: UsersListState
    ) {}

    initStore(): void {
        this.geRx.addEntity(
            this.state.entityName,
            this.state.geRxMethods,
            this.state,
            { memorySize: 1 }
        );
    }

    read(filter?: UsersFilterInterface): void {
      this.geRx.read(this.state.entityName, filter);
    }

    update(data: UsersInterface): void {
      this.geRx.update(this.state.entityName, data);
    }

    delete(id: string): void {
      this.geRx.delete(this.state.entityName, id);
    }

    getData$$(): Observable<UsersPaginationListInterface[]> {
        return this.geRx.getData$$(this.state.entityName);
    }

    getData$(): Observable<UsersPaginationListInterface> {
        return this.geRx.getData$(this.state.entityName);
    }

    getData(): UsersPaginationListInterface {
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
