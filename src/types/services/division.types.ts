/* eslint-disable no-unused-vars */
import { Table } from '..';
import { AcademyInfo } from './academy.types';
import { ProgramInfo } from './program.types';

export interface DivisionInfo extends Table, DivisionCreateInfo {
  generic_status: Status;
  last_status_change_reason: null;
  academy: AcademyInfo;
  departments: [];
  programs: ProgramInfo;
}

export interface DivisionCreateInfo {
  id: string | number;
  academy_id: string;
  code: string;
  description: string;
  division_type: string;
  name: string;
  parent_id: string;
}

export enum Status {
  ACTIVE,
  INACTIVE,
  DELETED,
  RESET,
}
