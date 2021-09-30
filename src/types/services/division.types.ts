/* eslint-disable no-unused-vars */
import { Table } from '..';
import { AcademyInfo } from './academy.types';
import { ProgramInfo } from './program.types';

export interface DivisionInfo extends Table {
  generic_status: Status;
  last_status_change_reason: null;
  name: string;
  code: string;
  description: string;
  academy_id: string;
  academy: AcademyInfo;
  departments: [];
  division_type: string;
  programs: ProgramInfo;
}

export enum Status {
  ACTIVE,
  INACTIVE,
  DELETED,
  RESET,
}
