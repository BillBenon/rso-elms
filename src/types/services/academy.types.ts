import { Status, Table } from '..';
import { InstitutionInfo } from './institution.types';

export interface AcademyInfo extends AcademyCreateInfo, Table {
  generic_status: Status;
  last_status_change_reason: string;
  institution: InstitutionInfo;
}

export interface AcademyCreateInfo {
  //   academic_years	[...]
  // divisions	[...]
  // instructors	[...]
  // registration_periods	[...]
  // students	[...]
  // users:	[...]
  current_admin_id: string;
  email: string;
  fax_number: string;
  full_address: string;
  head_office_location_id: number;
  institution_id: string;
  mission: string;
  moto: string;
  name: string;
  phone_number: string;
  postal_code: string;
  short_name: string;
  website_link: string;
}
