import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UsersListInterface,
  UsersPaginationListInterface,
} from '../../interfaces/users-list.interface';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { UsersInterface } from '../../interfaces/users.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbar,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'userName', 'active', 'toolbar'];
  form: FormGroup = this.fb.group({
    userName: ['', []],
  });

  @Input() usersList!: UsersPaginationListInterface | null;
  @Output() filter = new EventEmitter();
  @Output() delete = new EventEmitter<string>();
  @Output() active = new EventEmitter<UsersInterface>();
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngAfterViewInit(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.onFilter(this.form.value);
    });
  }

  pagination(event: PageEvent): void {
    const { pageIndex, pageSize } = event;
    this.filter.emit({ pageIndex, pageSize, pagination: true });
    this.routeParam({ pageIndex, pageSize });
  }

  onFilter(value: FormData): void {
    this.filter.emit({ ...value, pageIndex: 0, pageSize: 10, filter: true });
    this.routeParam({ pageIndex: 0, pageSize: this.paginator.pageSize });
  }

  routeParam(param: { pageIndex: number; pageSize: number }) {
    this.router
      .navigate(['', 'users'], {
        queryParams: param,
      })
      .then();
  }

  goPage(id: string) {
    this.router.navigate(['', 'users', id]).then();
  }

  onActive(data: UsersInterface): void {
    data.active = !data.active;
    this.active.emit(data);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }
}
