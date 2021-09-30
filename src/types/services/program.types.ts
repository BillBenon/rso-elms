/* eslint-disable no-unused-vars */
import { Table } from '..';
import { GenericStatus } from './common.types';
import { DivisionInfo } from './division.types';

export interface ProgramInfo extends CreateProgramInfo, Table {
  generic_status: GenericStatus;
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
