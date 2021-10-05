/* eslint-disable no-unused-vars */
import { GenericStatus, Table } from '..';
import { AcademyInfo } from './academy.types';
import { ProgramInfo } from './program.types';

export interface DivisionInfo extends Table, DivisionCreateInfo {
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
  parent_id?: string;
  academy?: AcademyInfo;
}

export enum Status {
  ACTIVE,
  INACTIVE,
  DELETED,
  RESET,
}
