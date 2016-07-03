import { Book } from './book.model';

export interface User {
  username: string;
  name: string;
  city: string;
  state: string;
}

export interface Credentials {
  loggedIn: boolean;
  user: User;
}