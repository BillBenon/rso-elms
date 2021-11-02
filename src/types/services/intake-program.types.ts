/* eslint-disable no-unused-vars */
import { Table } from '..';
import { IntakeInfo } from './intake.types';
import { ProgramInfo } from './program.types';

export interface IntakeProgParam {
  id: string;
  intakeProg: string;
}

export interface IntakeProgramInfo extends Table {
  intake: IntakeInfo;
  program: ProgramInfo;
  description: string;
}

export interface CreateLevelsIntakeProgram {
  academic_period_id: string;
  academic_program_level_id: string;
  academic_year_id: string;
  academic_year_program_intake_level_id: number;
  actual_end_on: string;
  actual_start_on: string;
  id: number;
  incharge_id: string;
  intake_program_id: string;
  planed_end_on: string;
  planed_start_on: string;
  progress_status: ProgressStatus;
}

// intake program progress status enum
export enum ProgressStatus {
  STARTED = 'STARTED',
  SUSPENDED = 'SUSPENDED',
  VOIDED = 'VOIDED',
  CLOSED = 'CLOSED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  OPENED = 'OPENED',
}
