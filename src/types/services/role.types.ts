/* eslint-disable no-unused-vars */
import { PrivilegeRes } from '..';
import { GenericStatus, Table } from './common.types';

export interface CreateRoleReq {
  description?: string;
  name?: string;
  academy_id?: string;
  institution_id?: string;
  type: RoleType;
}

export interface RoleRes extends Table {
  description: string;
  name: string;
  academyId: string;
  status: GenericStatus;
  academy_id: string;
  institution_id: string;
  type: RoleType;
}

export enum RoleApplyOn {
  ACADEMY = 'ACADEMY',
  INSTITUTION = 'INSTITUTION',
}

export interface RoleResWithPrevilages extends RoleRes {
  role_privileges: PrivilegeRes[];
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

export enum RoleType {
  ACADEMY = 'ACADEMY',
  INSTITUTION = 'INSTITUTION',
}
