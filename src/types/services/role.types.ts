import { PrivilegeRes } from '..';
import { GenericStatus, Table } from './common.types';

export interface CreateRoleReq {
  description?: string;
  name?: string;
}

export interface RoleRes extends Table {
  description: string;
  name: string;
  status: GenericStatus;
}

export interface RoleResWithPrevilages extends RoleRes {
  privileges: PrivilegeRes[];
}

export interface RolePrivilege extends Table {
  status: string;
  assigned_on: string;
  role_id: string;
  privilege_id: string;
  role: RoleRes;
  privilege: PrivilegeRes;
}

export interface AddPrivilegeRoleType {
  roleId: string;
  privileges: string;
}
