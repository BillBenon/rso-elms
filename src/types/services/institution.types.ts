import { Table } from '..';
import { AcademyInfo } from './academy.types';
import { GenericStatus } from './common.types';
import { LocationInfo } from './location.types';

export interface BasicInstitutionInfo {
  current_admin_id: string;
  email: string;
  fax_number: string;
  full_address: string;
  generic_status: GenericStatus;
  mission: string;
  moto: string;
  name: string;
  phone_number: string;
  postal_code: string;
  short_name: string;
  website_link: string;
  head_office_location_id?: number;
  id: number | string;
}

export interface InstitutionInfo extends Table, BasicInstitutionInfo {
  academies: AcademyInfo[];
  villages: LocationInfo;
  village_id: string;
}

export interface AddInstitutionLogo {
  id: string;
  info: FormData;
}
