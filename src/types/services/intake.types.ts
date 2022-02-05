/* eslint-disable no-unused-vars */
import { GenericStatus, Table } from '..';
import { ProgramInfo } from './program.types';
import { IRegistrationControlInfo } from './registrationControl.types';

export interface IntakeInfo {
  id: string | number;
  title: string;
  actual_end_date: Date | string;
  actual_start_date: Date | string;
  code: string;
  description: string;
  expected_end_date: Date | string;
  expected_start_date: Date | string;
  intake_status: IntakeStatus;
  period_type: PeriodType;
  registration_control_id: string;
  registration_control?: IRegistrationControlInfo;
  total_num_students: number;
}

export interface ExtendedIntakeInfo extends Table, IntakeInfo {
  registration_control: IRegistrationControlInfo;
  registration_control_id: string;
}

export interface CreateIntakeProgram {
  description: '';
  intake_id: string;
  intake_program_id: '';
  program_id: string;
  status: GenericStatus;
}
export interface IntakeProgram extends Table {
  intake: IntakeInfo;
  program: ProgramInfo;
  description: string;
}

export interface IntakeProgramsRes extends Table {
  description: string;
  intake: ExtendedIntakeInfo[];
  programs: IntakeProgram[];
}

export interface IntakePrograms extends Table {
  description: string;
  intake_id: string;
  programs: IntakeProgram[];
}

export interface IntakeProgramsCreate {
  description: string;
  intak_id: string;
  programs: CreateIntakeProgram[];
}

// intake status enum
export enum IntakeStatus {
  STARTED = 'STARTED',
  SUSPENDED = 'SUSPENDED',
  VOIDED = 'VOIDED',
  CLOSED = 'CLOSED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  OPENED = 'OPENED',
}

export enum PeriodType {
  TRIMESTER = 'TRIMESTER',
  COMPLETE = 'COMPLETE',
  SEMESTER = 'SEMESTER',
}
