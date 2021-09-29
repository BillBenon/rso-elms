import { GenericStatus, Table } from './common.types';

export interface CreateRoleReq {
  description: string;
  name: string;
}

export interface RoleRes extends Table {
  description: string;
  genericStatus: GenericStatus;
  lastStatusChangeReason: string;
  name: string;
  privileges: any[];
  status: GenericStatus;
  users: any[];
}
