import { Table } from '..';
import { AcademyInfo } from './academy.types';

export interface InstitutionInfo extends Table {
  academies: AcademyInfo[];
  current_admin_id: string;
  email: string;
  fax_number: string;
  full_address: string;
  generic_status: string;
  last_status_change_reason: string;
  mission: string;
  moto: string;
  name: string;
  phone_number: string;
  post_code: string;
  short_name: string;
  website_link: string;
}
