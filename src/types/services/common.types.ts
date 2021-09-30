/* eslint-disable no-unused-vars */
export interface Response<T = unknown> {
  data: T;
  message: string;
  status: string;
  timestamp: string;
}

export interface Table {
  id: number | string;
  created_by_id: string;
  created_by_username: string;
  created_on: string;
  updated_by_id: string;
  updated_by_username: string;
  updated_on: string;
}

export enum GenericStatus {
  ACTIVE,
  INACTIVE,
  RESET,
}
