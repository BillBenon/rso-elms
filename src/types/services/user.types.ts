import { GenericStatus } from '..';
/* eslint-disable no-unused-vars */
import { Table } from '..';
import { ExperienceType } from './../index';
import { AcademyInfo } from './academy.types';
import { InstitutionInfo } from './institution.types';
import { ILevel } from './levels.types';

export interface UserInfo extends CreateUserInfo, Table {
  pin: string;
  age_range: string;
  token: string;
  person: PersonInfo;
  academy: AcademyInfo;
  institution_id: string;
  activated: boolean;
  active_session: boolean;
  image_url: string;
  password_reset_period_in_days: number;
  reset_date: string;
  level: ILevel;
  status: GenericStatus;
  login_try: number;
  enabled: boolean;
  authorities: [];
}
export interface PersonInfo extends Table {
  first_name: string;
  father_names: string;
  mother_names: string;
  last_name: string;
  phone_number: string;
  birth_date: string;
  doc_type: DocType;
  marital_status: MaritalStatus;
  sex: GenderStatus;
  place_of_birth: string;
  ///////////////////
  nationality: string;
  spouse_name: string;
  place_of_birth_description: string;
  blood_group: string;
  religion: string;
  place_of_residence: string;
  residence_location_id: number;
  languages: string;
  current_rank: string;
  other_rank: string;
  rank_depart: string;
  date_of_commission: string;
  date_of_last_promotion: string;
  ///////////////////
  nid: string;
  document_expire_on: string;
}

interface ExperienceInfo {
  attachment_id: string;
  description: string;
  end_date: string;
  level: string;
  location: string;
  occupation: string;
  person_id: string;
  proof: string;
  start_date: string;
  type: ExperienceTypeStatus;
}

export interface CreateUserInfo {
  activation_key: string;
  academy_id: string;
  birth_date: string;
  doc_type: DocType;
  education_level: EducationLevel;
  email: string;
  father_names: string;
  first_name: string;
  academic_program_level_id: string;
  intake_program_id: string;
  last_name: string;
  marital_status: MaritalStatus;
  mother_names: string;
  next_of_keen_proculation_reason: string;
  nid: string;
  password: string;
  password_reset_period_in_days: number;
  person_id: string;
  phone: string;
  place_of_birth: string;
  place_of_residence: string;
  residence_location_id: number;
  relationship_with_next_of_ken: string;
  reset_date: string;
  sex: GenderStatus;
  user_type: UserType;
  username: string;
}

export enum GenderStatus {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum ExperienceTypeStatus {
  GENERAL_EDUCATION,
  CURRIER_COURSE_EDUCATION,
  EMPLOYMENT,
  INTERNATIONAL_CERTIFICATION,
  INTERNATIONAL_MISSION,
  TRAINING,
}

export enum MaritalStatus {
  MARRIED = 'MARRIED',
  SINGLE = 'SINGLE',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
  OTHER = 'OTHER',
}

export enum EducationLevel {
  ILLITERATE = 'ILLITERATE',
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  MASTERS = 'MASTERS',
  PHD = 'PHD',
  BACHELOR = 'BACHELOR',
}

export enum DocType {
  NID = 'NID',
  PASSPORT = 'PASSPORT',
  ARMY_CARD = 'ARMY_CARD',
  POLICE_CARD = 'POLICE_CARD',
  NISS_CARD = 'NISS_CARD',
  RCS_CARD = 'RCS_CARD',
  OTHER = 'OTHER',
}

export enum UserType {
  ANONYMOUS = 'ANONYMOUS',
  SYSTEM = 'SYSTEM',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  INSTRUCTOR = 'INSTRUCTOR',
  STUDENT = 'STUDENT',
}
