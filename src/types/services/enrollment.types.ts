import { Table } from '..';
import { InstructorProgram } from './instructor.types';
import {
  LevelIntakeProgram,
  PromotionStatus,
  StudentIntakeProgram,
} from './intake-program.types';
/* eslint-disable no-unused-vars */
export enum EnrollmentStatus {
  PENDING,
  NEW,
  RETAKE = 'RETAKE',
  DISMISSED = 'DISMISSED',
}

export enum EnrollmentMode {
  NEW = 'NEW',
  RECURRING = 'RECURRING',
}

export interface EnrollInstructorProgram {
  instructor_id: string;
  intake_program_id: string;
}

export interface InstructorAssignModule {
  course_module_id: string | number;
  intake_program_instructor_id: number;
}

export interface EnrollInstructorLevel {
  academic_year_program_intake_level_id: number;
  intake_program_instructor_id: number;
}

export interface EnrollStudentToLevel {
  academic_year_program_level_id: number;
  completed_on: string;
  enroled_on: string;
  enrolment_mode: EnrollmentMode;
  enrolment_status: EnrollmentStatus;
  intake_program_student_id: number;
  position: number;
  promotion_status: PromotionStatus;
}

export interface StudentLevel extends Table, EnrollStudentToLevel {
  academic_year_program_level: LevelIntakeProgram;
  intake_program_student: StudentIntakeProgram;
}

export interface EnrollModuleSubject {
  description: string;
  enrolmed_on: string;
  intake_academic_level_enrolment_id: number;
  intake_academic_year_level_period_id: number;
  intake_program_module_level_id: number;
  marks_obtained: number;
  module_enrolment_status: ModuleEnrollStatus;
}

export interface EnrollStudentToProgram {
  completed_on: string;
  employee_number: string;
  enroled_on: string;
  enrolment_mode: EnrollmentMode;
  enrolment_status: StudentApproval;
  intake_program_id: string;
  other_rank: string;
  rank_id: string;
  rank_institution: string;
  student_id: string;
  third_party_reg_number: string;
}

export interface EnrollInstructorLevelInfo extends Table {
  intake_program_instructor: InstructorProgram;
  academic_year_program_intake_level: LevelIntakeProgram;
  // academic_program_level: AcademicProgramLevel;
  // academic_year: IAcademicYearInfo;
}

export interface ApproveStudents {
  intake_program_student_id: number;
  status: StudentApproval;
}

export enum StudentApproval {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ModuleEnrollStatus {
  PENDING = 'PENDING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  SUSPENDED = 'SUSPENDED',
  DROPOUT = 'DROPOUT',
}
