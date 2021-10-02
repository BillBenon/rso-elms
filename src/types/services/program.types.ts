/* eslint-disable no-unused-vars */
import { Table } from '..';
import { GenericStatus } from './common.types';
import { DivisionInfo } from './division.types';
import { UserInfo } from './user.types';

export interface ProgramInfo extends CreateProgramInfo, Table {
  generic_status: GenericStatus;
  department: DivisionInfo;
  incharge: UserInfo;
}

export interface CreateProgramInfo {
  code: string;
  current_admin_id: string;
  department_id: string;
  description: string;
  name: string;
  type: ProgramType;
}

export enum ProgramType {
  SHORT_COURSE = 'SHORT_COURSE',
  ACADEMIC = 'ACADEMIC',
}
