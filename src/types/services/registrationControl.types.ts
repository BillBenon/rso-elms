import { GenericStatus, Table } from '..';
import { AcademyCreateInfo, AcademyInfo } from './academy.types';

export interface IRegistrationControlCreateInfo {
  academy_id: string;
  actual_end_date: string;
  actual_start_date: string;
  description: string;
  expected_end_date: string;
  expected_start_date: string;
  id: string | number;
  academy?: AcademyInfo;
}

export interface IRegistrationControlInfo
  extends IRegistrationControlCreateInfo,
    Table,
    AcademyCreateInfo {
  academy: AcademyInfo;
  generic_status: GenericStatus;
}
