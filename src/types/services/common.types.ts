export interface Response<T = unknown> {
  data: T;
  message: string;
  status: string;
  timestamp: string;
}

export interface Table {
  id: number;
  createdById: string;
  createdByUsername: string;
  createdOn: string;
  updatedById: string;
  updatedByUsername: string;
  updatedOn: string;
}
