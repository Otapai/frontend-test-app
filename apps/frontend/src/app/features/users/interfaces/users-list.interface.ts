import { UsersInterface } from './users.interface';

export interface UsersListInterface {
  count: number;
  items: UsersInterface[];
}

export  interface UsersPaginationListInterface {
  data: UsersInterface[];
  first: number;
  items: number;
  last: number;
  next: number;
  pages: number;
}

export interface UsersFilterInterface {
  filter?: boolean;
  pagination?: boolean;
  pageIndex?: number;
  pageSize?: 5 | 10 | 20;
  [index: symbol]: string | number;
}
