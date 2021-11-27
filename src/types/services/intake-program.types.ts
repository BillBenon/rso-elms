/* eslint-disable no-unused-vars */
import { Table } from '..';
import { IAcademicPeriodInfo } from './academicperiod.types';
import { IAcademicYearInfo } from './academicyears.types';
import { EnrollmentMode, EnrollmentStatus } from './enrollment.types';
import { IntakeInfo, IntakeProgram, IntakeStatus } from './intake.types';
import { ProgramLevel } from './levels.types';
import { ModuleInfo } from './modules.types';
import { AcademicProgramLevel, ProgramInfo } from './program.types';
import { Student, UserInfo } from './user.types';
import { Incharge } from './user.types';

export interface IntakeProgParam {
  id: string;
  intakeId: string;
  intakeProg: string;
}
export interface IntakeLevelParam extends IntakeProgParam {
  level: string;
}

export interface IntakeProgramInfo extends Table {
  intake: IntakeInfo;
  program: ProgramInfo;
  description: string;
}

export interface AddIntakeProgramLevelPeriod {
  academic_period_id: string;
  academic_program_intake_level_id: number;
  actual_end_on: string;
  actual_start_on: string;
  planed_end_on: string;
  planed_start_on: string;
  status: PeriodProgressStatus;
}

export interface IntakeProgramLevelPeriodInfo extends Table {
  academic_year_program_intake_level: LevelIntakeProgram;
  academic_period: IAcademicPeriodInfo;
  planed_start_on: string;
  planed_end_on: string;
  actual_start_on: string;
  actual_end_on: string;
  progress_status: ProgressStatus;
  academic_year_program_intake_level_id: string;
  academic_period_id: string;
  academic_program_intake_level: LevelIntakeProgram;
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

export interface IntakeLevelModule extends Table, AddLevelToModule {
  academic_year_program_intake_level: AcademicProgramLevel;
  incharge: Incharge;
  module: ModuleInfo;
}

export interface CreateLevelIntakeProgram {
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

export interface StudentIntakeProgramLevel extends Table {
  intake_program_student: StudentIntakeProgram;
  academic_year_program_level: LevelIntakeProgram;
  enrolment_status: EnrollmentStatus;
  promotion_status: PromotionStatus;
  position: number;
  intake_program_student_id: number;
  academic_year_program_level_id: number;
}
export interface StudentIntakeProgram extends Table {
  student: Student;
  intake_program: IntakeProgram;
  enrolment_status: EnrollmentStatus;
  enrolment_mode: string;
  rank: string;
  rank_institution: string;
  other_rank: string;
  employee_number: string;
  third_party_reg_number: string;
  enroled_on: string;
  completed_on: string;
}

//intake program period progress status enum
export enum PeriodProgressStatus {
  PENDING = 'PENDING',
  OPENED = 'OPENED',
  STARTED = 'STARTED',
  ONGOING = 'ONGOING',
  SUSPENDED = 'SUSPENDED',
  COMPLETED = 'COMPLETED',
  VOIDED = 'VOIDED',
  CLOSED = 'CLOSED',
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

export enum PromotionStatus {
  PROMOTED = 'PROMOTED',
  RETAKE = 'RETAKE',
  DISMISSED = 'DISMISSED',
  PENDING = 'PENDING',
}
