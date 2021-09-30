/* eslint-disable no-unused-vars */
import { Table } from '..';
import { AcademyInfo } from './academy.types';
import { GenericStatus } from './common.types';
import { InstitutionInfo } from './institution.types';

export interface UserInfo extends CreateUserInfo, Table {
  generic_status: GenericStatus;
  last_status_change_reason: string;
  pin: string;
  age_range: string;
  token: string;
  //   person: PersonInfo;
  academy: AcademyInfo;
  institution_id: InstitutionInfo;
  activated: boolean;
  active_session: boolean;
  image_url: string;
  password_reset_period_in_days: number;
  reset_date: string;
  preferred_language: string;
  level: string;
  status: GenericStatus;
  login_try: number;
  enabled: boolean;
  authorities: [];
}

export interface CreateUserInfo {
  activation_key: string;
  birth_date: string;
  doc_type: DocType;
  education_level: EducationLevel;
  email: string;
  father_names: string;
  first_name: string;
  intake_id: string;
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
  relationship_with_next_of_ken: string;
  reset_date: string;
  residence_location_id: number;
  sex: GenderStatus;
  user_type: UserType;
  username: string;
}

export enum GenderStatus {
  MALE,
  FEMALE,
}

export enum MaritalStatus {
  MARRIED,
  SINGLE,
  DIVORCED,
  WIDOWED,
  OTHER,
}

export enum EducationLevel {
  NONE,
  PRIMARY,
  SECONDARY,
  PHD,
  MASTERS,
  BACHELORA,
  NOT_KNOWING_WRITE_NOR_READ,
}

export enum DocType {
  NID,
  PASSPORT,
  ARM_CARD,
  POLICE_CARD,
  NISS_CARD,
  RCS_CARD,
  OTHER,
}

export enum UserType {
  ANONYMOUS,
  SYSTEM,
  SUPE_ADMIN,
  ADMIN,
  OIC,
  INSTRUCTOR,
  STUDENT,
  DG,
  STUDENT_INSTRUCTOR,
  ADMIN_INSTRUCTOR,
  ADMIN_STUDENT,
  VISITOR,
}
