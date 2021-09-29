import { Table } from './common.types';

export interface CreateRoleReq {
  description?: string;
  name?: string;
}

export enum GenericStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  RESET = 'RESET',
}
export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  RESET = 'RESET',
}

export interface RoleRes extends Table {
  description?: string;
  genericStatus?: GenericStatus;
  lastStatusChangeReason?: string;
  name?: string;
  privileges?: any[];
  status?: Status;
  users?: any[];
}
