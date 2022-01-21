/* eslint-disable no-unused-vars */
export enum PrivilegeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum PrivilegeFeatureType {
  ADMIN = 'ADMIN',
  EVALUATION = 'EVALUATION',
  REPORTING = 'REPORTING',
  INTERACTIVE_LEARNING = 'INTERACTIVE_LEARNING',
}

export interface PrivilegeUpdate {
  id: string;
  name: string;
  status: PrivilegeStatus;
  description: string;
  feature_type: PrivilegeFeatureType;
}

export interface PrivilegeRes extends PrivilegeUpdate {}

export enum Privileges {
  CAN_ACCESS_EVALUATIONS = 'CAN_ACCESS_EVALUATIONS',
  CAN_CREATE_EVALUATION = 'CAN_CREATE_EVALUATION',
  CAN_MODIFY_EVALUATION = 'CAN_MODIFY_EVALUATION',
  CAN_DELETE_EVALUATION = 'CAN_DELETE_EVALUATION',
  CAN_ACCESS_USERS = 'CAN_ACCESS_USERS',
  CAN_CREATE_USER = 'CAN_CREATE_USER',
  CAN_MODIFY_USER = 'CAN_MODIFY_USER',
  CAN_DELETE_USER = 'CAN_DELETE_USER',
  CAN_MODIFY_INTAKE = 'CAN_MODIFY_INTAKE',
  CAN_ACCESS_PROGRAMS_IN_INTAKE = 'CAN_ACCESS_PROGRAMS_IN_INTAKE',
}
