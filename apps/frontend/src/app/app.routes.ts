import { Route } from '@angular/router';
import { UsersListContainerComponent } from './features/users/containers/users-list-container/users-list-container.component';
import { UsersContainerComponent } from './features/users/containers/users-container/users-container.component';
import { MainContainerComponent } from './features/main/containers/main-container/main-container.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: 'users',
        component: UsersListContainerComponent,
      },
      {
        path: 'users/create',
        component: UsersContainerComponent,
      },
      {
        path: 'users/:id',
        component: UsersContainerComponent,
      },
    ],
  },
];
