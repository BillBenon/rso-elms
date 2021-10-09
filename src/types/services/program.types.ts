/* eslint-disable no-unused-vars */
import { Table } from '..';
import { GenericStatus } from './common.types';
import { DivisionInfo } from './division.types';
import { IntakeInfo } from './intake.types';
import { UserInfo } from './user.types';

export interface ProgramInfo extends CreateProgramInfo, Table {
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
  status: ProgramStatus;
}

export interface CreateAcademicProgramLevel {
  endg_flow: number;
  id: string;
  level_id?: number;
  program_id: string;
  starting_flow: number;
}

export enum ProgramStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ProgramType {
  SHORT_COURSE = 'SHORT_COURSE',
  ACADEMIC = 'ACADEMIC',
}
export interface IntakeProgramInfo extends Table {
  intake: IntakeInfo;
  program: ProgramInfo;
  description: string;
}
