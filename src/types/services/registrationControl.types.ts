import { Table } from '..';
import { AcademyCreateInfo, AcademyInfo } from './academy.types';

export interface IRegistrationControlCreateInfo {
  academy_id: string;

  description: string;
  expected_end_date: string;
  expected_start_date: string;
  academy?: AcademyInfo;
}

export interface IRegistrationControlInfo
  extends IRegistrationControlCreateInfo,
    Table,
    AcademyCreateInfo {
  academy: AcademyInfo;
}
