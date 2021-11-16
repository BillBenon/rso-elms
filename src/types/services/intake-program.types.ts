/* eslint-disable no-unused-vars */
import { Table } from '..';
import { IAcademicYearInfo } from './academicyears.types';
import { IntakeInfo, IntakeStatus } from './intake.types';
import { ProgramLevel } from './levels.types';
import { ProgramInfo } from './program.types';
import { Incharge } from './user.types';

export interface IntakeProgParam {
  id: string;
  intakeId: string;
  intakeProg: string;
}

export interface IntakeProgramInfo extends Table {
  intake: IntakeInfo;
  program: ProgramInfo;
  description: string;
}

export interface LevelIntakeProgram extends Table {
  academic_year: IAcademicYearInfo;
  intake_program: IntakeProgramInfo;
  academic_program_level: ProgramLevel;
  incharge: Incharge;
  planed_start_on: string;
  planed_end_on: string;
  actual_start_on: string;
  actual_end_on: string;
  progress_status: ProgressStatus;
  academic_year_id: string;
  intake_program_id: string;
  academic_program_level_id: string;
  incharge_id: string;
}

export interface CreateLevelIntakeProgram {
  academic_period_id: string;
  academic_program_level_id: string;
  academic_year_id: string;
  academic_year_program_intake_level_id: number;
  actual_end_on: string;
  actual_start_on: string;
  incharge_id: string;
  intake_program_id: string;
  planed_end_on: string;
  planed_start_on: string;
  progress_status: ProgressStatus;
}

export interface AddLevelToModule {
  academic_year_program_intake_level_id: number;
  actual_end_on: string;
  actual_start_on: string;
  credits: number;
  incharge_id: string;
  intake_status: IntakeModuleStatus;
  marks: number;
  module_id: string;
  module_participation: ModuleParticipation;
  pass_mark: number;
  planned_end_on: string;
  planned_start_on: string;
  weight: number;
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

export enum ModuleParticipation {
  COMPULSORY = 'COMPULSORY',
  OPTIONAL = 'OPTIONAl',
}

export enum IntakeModuleStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  ONGOING = 'ONGOING',
  SUSPENDED = 'SUSPENDED',
  COMPLETED = 'COMPLETED',
  VOIDED = 'VOIDED',
}
