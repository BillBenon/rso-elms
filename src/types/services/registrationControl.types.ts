import { Table } from '..';
import { AcademyCreateInfo } from './academy.types';

export interface IRegistrationControlCreateInfo {
  academy_id: string;
  actual_end_date: string;
  actual_start_date: string;
  description: string;
  expected_end_date: string;
  expected_start_date: string;
}

export interface IRegistrationControlInfo
  extends IRegistrationControlCreateInfo,
    Table,
    AcademyCreateInfo {
  academy: AcademyCreateInfo;
  academy_id: string;
}
