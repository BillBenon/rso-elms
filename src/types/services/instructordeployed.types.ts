import { Table } from '..';
import { AcademyInfo } from './academy.types';
import { UserInfo } from './user.types';

export interface InstructorDeployed extends Table {
  institution_id: string;
  since_on: string;
  user: UserInfo;
  academy: AcademyInfo;
  description: string;
}
