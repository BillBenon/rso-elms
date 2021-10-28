import { Table } from '..';

export interface IAcademicYearInfo extends Table {
  name: string;
  academyId: string;
  planned_start_on: string;
  planned_end_on: string;
  total_num_students: number;
  total_num_instructors: number;
  total_num_programs: number;
  total_num_faculties: number;
  total_num_departments: number;
  status: IAcademicYearStatus;
}

export enum IAcademicYearStatus {
  INITIAL = 'INITIAL',
  STARTED = 'STARTED',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED',
}

export interface ICreateAcademicYear {
  academyId: string;
  actualAtartOn: string;
  actualEndOn: string;
  id: string | number;
  name: string;
  plannedEndOn: string;
  plannedStartOn: string;
  status: IAcademicYearStatus;
}
