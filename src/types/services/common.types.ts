/* eslint-disable no-unused-vars */
export interface Response<T = unknown> {
  data: T;
  message: string;
  status: string;
  timestamp: string;
  error?: string;
}

export interface Table {
  id: number | string;
  created_by_id: string;
  created_by_username: string;
  created_on: string;
  updated_by_id: string;
  updated_by_username: string;
  updated_on: string;
  generic_status: GenericStatus;
  last_status_change_reason: string;
}

export enum GenericStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  RESET = 'RESET',
  DELETED = 'DELETED',
}

export interface SortedContent<T = unknown> {
  content: T;
  totalPages: number;
  totalElements: number;
  last: false;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface FilterOptions {
  page?: number;
  pageSize?: number;
  userType?: string;
  sortyBy?: string;
}
