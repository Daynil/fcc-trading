export interface User {
  username: string;
}

export interface Credentials {
  loggedIn: boolean;
  user: User;
}