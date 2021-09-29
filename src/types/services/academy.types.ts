import { Table } from '..';

export interface AcademyInfo extends AcademyCreateInfo, Table {
  generic_status: string;
  created_by_username: string;
}

export interface AcademyCreateInfo {
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
