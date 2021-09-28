import { Table } from './common.types';

export interface CreateRoleReq {
  description: string;
  name: string;
}

enum GenericStatus {
  ACTIVE,
  INACTIVE,
  RESET,
}
enum Status {
  ACTIVE,
  INACTIVE,
  RESET,
}

export interface RoleRes extends Table {
  description: string;
  genericStatus: GenericStatus;
  lastStatusChangeReason: string;
  name: string;
  privileges: any[];
  status: Status;
  users: any[];
}
