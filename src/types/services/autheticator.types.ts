export interface LoginInfo {
  username: string;
  password: string;
}

export interface LoginRes {
  username: string;
  token: string;
}

export interface Table {
  id: string;
  createdAt: string;
  updatedAt: string;
}
