import { GenericStatus } from '..';
/* eslint-disable no-unused-vars */
import { Table } from '..';
import { AcademyInfo } from './academy.types';
import { ILevel } from './levels.types';
export interface Student extends Table {
  reg_number: string;
  user: UserInfo;
  academy: AcademyInfo;
  registered_on: string;
}

export interface UserInfo extends Table {
  academy: AcademyInfo;
  acdemic_year_id: string;
  activated: boolean;
  active_session: boolean;
  age_range: string;
  authorities: [];
  email: string;
  enabled: boolean;
  first_name: string;
  image_url: string;
  institution_id: string;
  institution_name: string;
  is_otp_active: boolean | null;
  last_name: string;
  level: null;
  login_try: number;
  otp: string;
  password: string;
  password_reset_period_in_days: number;
  person: PersonInfo;
  phone: number;
  pin: number;
  profile_status: ProfileStatus | null;
  reset_date: string;
  send_communication_msg: SendCommunicationMsg | null;
  token: string;
  user_type: UserType;
  username: string;
}

export interface Incharge extends Table {
  institution_id: string;
  since_on: string;
  user: UserInfo;
  academy: AcademyInfo;
  description: string;
}

export interface PersonInfo extends Table {
  birth_date: string;
  blood_group: BloodGroup;
  current_rank: string;
  current_rank_id: string;
  date_of_commission: string;
  date_of_issue: string;
  date_of_last_promotion: string;
  doc_type: DocType;
  document_expire_on: string;
  empNo: string;
  father_names: string;
  first_name: string;
  last_name: string;
  marital_status: MaritalStatus;
  mother_names: string;
  nid: string;
  other_rank: string;
  phone_number: string;
  place_of_birth: string;
  place_of_birth_description: string;
  place_of_issue: string;
  rank_depart: string;
  sex: GenderStatus;
  spouse_name: string;
  //to be added
  religion: string;
  residence_location_id: string;
  place_of_residence: string;
  nationality: string;
}
export interface ExperienceInfo{
  attachment_id: string;
  description:	string;
  end_date:	string;
  id:	number;
  level:	string;
  location:	string;
  occupation: string;
  person_id: string;
  proof: string;
  start_date: string;
  type: string;
}
export interface UpdateExperienceInfo{
  attachment_id: string;
  description:	string;
  end_date:	string;
  id:	number;
  level:	string;
  location:	string;
  occupation: string;
  person_id: string;
  proof: string;
  start_date: string;
  type: string;
}
export interface UpdateUserInfo {
  academic_program_level_id: string;
  academy_id: string;
  activation_key: string;
  birth_date: string;
  blood_group: string;
  current_rank_id: string;
  date_of_commission: string;
  date_of_issue: string;
  date_of_last_promotion: string;
  doc_type: DocType;
  document_expire_on: string;
  education_level: EducationLevel;
  email: string;
  emp_no: string;
  father_names: string;
  first_name: string;
  id: string;
  intake_program_id: string;
  last_name: string;
  marital_status: MaritalStatus;
  mother_names: string;
  next_of_keen_proculation_reason: string;
  nid: string;
  other_rank: string;
  password: string;
  password_reset_period_in_days: number;
  person_id: string;
  phone: string;
  place_of_birth: string;
  place_of_birth_description: string;
  place_of_issue: string;
  place_of_residence: string;
  profile_status: ProfileStatus;
  rank_depart: string;
  relationship_with_next_of_ken: string;
  reset_date: string;
  residence_location_id: number;
  sex: GenderStatus;
  spouse_name: string;
  user_type: UserType;
  send_communication_msg: SendCommunicationMsg;
  username: string;
  send_communication_msg: SendCommunicationMsg;
}

export interface CreateUserInfo {
  activation_key: string;
  academy_id: string;
  birth_date: string;
  deployed_on: string;
  deployment_number: string;
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
  intake_id: string;
  nationality: string;
  document_expire_on: string;
  send_communication_msg: SendCommunicationMsg;
}
export interface UserView
  extends Pick<UserInfo, 'id' | 'first_name' | 'last_name' | 'image_url'> {
  selected?: boolean;
}

export type UserTypes = {
  id: string;
  username: string;
  'full name': string;
  email: string;
  'ID Card': string;
  academy: string;
  status: GenericStatus;
  user_type: UserType;
};

export interface PersonDetail
  extends Pick<
    PersonInfo,
    | 'first_name'
    | 'last_name'
    | 'phone_number'
    | 'sex'
    | 'place_of_birth'
    | 'place_of_birth_description'
    | 'birth_date'
    | 'religion'
    | 'blood_group'
    | 'father_names'
    | 'mother_names'
    | 'marital_status'
    | 'spouse_name'
    | 'residence_location_id'
    | 'place_of_residence'
  > {}
export interface EmploymentDetail
  extends Pick<
    PersonInfo,
    | 'empNo'
    | 'current_rank_id'
    | 'other_rank'
    | 'rank_depart'
    | 'place_of_issue'
    | 'date_of_issue'
    | 'date_of_commission'
    | 'date_of_last_promotion'
  > {}

export interface AccountDetail
  extends Pick<UserInfo, 'username' | 'pin' | 'send_communication_msg' | 'password'> {
  confirm_password: string;
}

export enum GenderStatus {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
export enum ProfileStatus {
  COMPLETD = 'COMPLETD',
  INCOMPLETE = 'INCOMPLETE',
}

export enum MaritalStatus {
  MARRIED = 'MARRIED',
  SINGLE = 'SINGLE',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
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
export enum ExperienceType {
  GENERAL_EDUCATION=  'GENERAL_EDUCATION',
  CURRIER_COURSE_EDUCATION = "CURRIER_COURSE_EDUCATION",
  EMPLOYMENT = "EMPLOYMENT",
  INTERNATIONAL_CERTIFICATION = "INTERNATIONAL_CERTIFICATION",
  INTERNATIONAL_MISSION = "INTERNATIONAL_MISSION",
  TRAINING = "TRAINING",
  
}

export enum BloodGroup {
  'A+' = 'A+',
  'A-' = 'A-',
  'B+' = 'B+',
  'B-' = 'B-',
  'AB+' = 'AB+',
  'AB-' = 'AB-',
  'O+' = 'O+',
  'O-' = 'O-',
}

export enum UserType {
  ANONYMOUS = 'ANONYMOUS',
  SYSTEM = 'SYSTEM',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  INSTRUCTOR = 'INSTRUCTOR',
  STUDENT = 'STUDENT',
}

export enum SendCommunicationMsg {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  BOTH = 'BOTH',
}

export interface IImportUser {
  intake: string;
  academicProgramLevelId: string;
  academicYearId: string;
  academyId: string;
  intakeProgramId: string;
  userType: UserType;
  file: File | null;
}

export interface IImportUserRes {
  failures: {
    [index: string]: string;
  };
}
