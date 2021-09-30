import { Table } from '..';
import { AcademyInfo } from './academy.types';

export interface BasicInstitutionInfo {
  current_admin_id: string;
  email: string;
  fax_number: string;
  full_address: string;
  generic_status: string;
  mission: string;
  moto: string;
  name: string;
  phone_number: string;
  post_code: string;
  short_name: string;
  website_link: string;
  head_office_location_id?: number;
}

export interface InstitutionInfo extends Table, BasicInstitutionInfo {
  last_status_change_reason: string;
  academies: AcademyInfo[];
}
