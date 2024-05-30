import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListFacade } from '../../facades/users-list.facade';
import { UsersListComponent } from '../../components/users-list/users-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UsersFilterInterface } from '../../interfaces/users-list.interface';
import { UsersInterface } from '../../interfaces/users.interface';
import { UsersFacade } from '../../facades/users.facade';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-list-container',
  standalone: true,
  imports: [
    CommonModule,
    UsersListComponent,
    MatToolbarModule,
    MatButton,
    MatProgressBarModule,
    MatPaginator,
    MatPaginatorModule,
    RouterLink,
  ],
  templateUrl: './users-list-container.component.html',
  styleUrl: './users-list-container.component.scss',
})
export class UsersListContainerComponent implements OnInit, AfterViewInit {
  constructor(public usersListFacade: UsersListFacade) {}

  ngOnInit(): void {
    this.usersListFacade.initStore();
  }

  ngAfterViewInit(): void {
    this.usersListFacade.read({ pageIndex: 0, pageSize: 10 });
  }

  onFilter(value: UsersFilterInterface): void {
    this.usersListFacade.read(value);
  }

  onActive(data: UsersInterface): void {
    this.usersListFacade.update(data);
  }

  onDelete(id: string): void {
    this.usersListFacade.delete(id);
  }
}
