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
export interface InstructorDeployed extends Table, DeployInstructor {
  instructor: Instructor;
}
