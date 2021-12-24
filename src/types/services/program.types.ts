/* eslint-disable no-unused-vars */
import { Table } from '..';
import { DivisionInfo } from './division.types';
import { ILevel } from './levels.types';
import { Incharge, UserInfo } from './user.types';

export interface ProgramInfo extends CreateProgramInfo, Table {
  department: DivisionInfo;
  incharge: Incharge;
  current_admin_names: string;
  total_num_modules: number;
}

export interface CreateProgramInfo {
  code: string;
  in_charge_id: string;
  department_id: string;
  description: string;
  name: string;
  type: ProgramType;
  status: ProgramStatus;
}

export interface UpdateProgramInfo {
  code: string;
  in_charge_id: string;
  department_id: string;
  description: string;
  name: string;
  id: string | number;
  type: ProgramType;
  status: ProgramStatus;
}

export interface CreateAcademicProgramLevel {
  endg_flow: number;
  level_id?: number;
  program_id: string;
  starting_flow: number;
}

export interface AcademicProgramLevel extends CreateAcademicProgramLevel, Table {
  level: ILevel;
  program: ProgramInfo;
}

export enum ProgramStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ProgramType {
  SHORT_COURSE = 'SHORT_COURSE',
  ACADEMIC = 'ACADEMIC',
}
