import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../../components/users/users.component';
import { MatButton } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersFacade } from '../../facades/users.facade';
import { ActivatedRoute } from '@angular/router';
import { UsersInterface } from '../../interfaces/users.interface';

@Component({
  selector: 'app-users-container',
  standalone: true,
  imports: [
    CommonModule,
    UsersComponent,
    MatButton,
    MatProgressBarModule,
    MatToolbarModule,
  ],
  templateUrl: './users-container.component.html',
  styleUrl: './users-container.component.scss',
})
export class UsersContainerComponent implements OnInit, AfterViewInit {
  id = this.activatedRoute.snapshot.params['id'];

  constructor(
    private activatedRoute: ActivatedRoute,
    public usersFacade: UsersFacade
  ) {}

  ngOnInit(): void {
    this.usersFacade.initStore();
  }

  ngAfterViewInit(): void {
    if (this.id) {
      this.usersFacade.read(this.id);
    }
  }

  onSubmit(data: UsersInterface): void {
    if (this.id) {
      this.usersFacade.update(data);
    } else {
      this.usersFacade.create(data);
    }
  }
}
