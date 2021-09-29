/* eslint-disable no-unused-vars */
import { Table } from '..';
import { DivisionInfo } from './division.types';

export interface ProgramInfo extends CreateProgramInfo, Table {
  generic_status: string;
  department: DivisionInfo;
}

export interface CreateProgramInfo {
  code: string;
  department_id: string;
  description: string;
  name: string;
  type: ProgramType;
}

export enum ProgramType {
  SHORT_COURSE,
  ACADEMIC,
}
