import { Table } from '..';
import { AcademyInfo } from './academy.types';
import { IntakeProgram } from './intake.types';
import { UserInfo } from './user.types';

export interface DeployInstructor {
  academy_id: string;
  deployed_on: string;
  deployment_number: string;
  description: string;
  instructor_id: string;
}

export interface EnrollInstructorProgram {
  instructor_id: string;
  intake_program_id: string;
}

export interface EnrollInstructorLevel {
  academicProgramLevelId: string;
  academicYearId: string;
  intakeProgramInstructorId: number;
}

export interface InstructorProgram extends Table {
  instructor: Instructor;
  intake_program: IntakeProgram;
}

export interface Instructor extends Table {
  institution_id: string;
  since_on: string;
  user: UserInfo;
  academy: AcademyInfo;
  description: string;
}

export interface InstructorDeployed extends Table, DeployInstructor {}
