import { StudentApproval } from './enrollment.types';
import { GenericStatus } from '..';
/* eslint-disable no-unused-vars */
import { Table } from '..';
import { AcademyInfo } from './academy.types';
import { RankRes } from './rank.types';
import { StudentIntakeProgram } from './intake-program.types';
import { InstitutionInfo } from './institution.types';
export interface Student extends Table {
  reg_number: string;
  user: UserInfo;
  academy_id: string;
  registered_on: string;
}

export interface UserInfo extends Table {
  username: string;
  first_name: string;
  last_name: string;
  pin: number;
  phone: string;
  age_range: string;
  otp: string;
  is_otp_active: string;
  send_communication_msg: SendCommunicationMsg;
  email: string;
  token: string;
  person: PersonInfo;
  academy: AcademyInfo;
  institution_id: string;
  profile_attachment_id: string;
  institution_name: string;
  user_type: UserType;
  activated: boolean;
  active_session: boolean;
  image_url: string;
  password_reset_period_in_days: number;
  reset_date: string;
  level: string;
  login_try: number;
  profile_status: ProfileStatus;
  acdemic_year_id: string;
  institution: InstitutionInfo;
  enabled: boolean;
  authorities: [];
  otp_active: string;
}

export interface IntakeLevelProgramInfo extends Table {
  student: Student;
}
export interface StudentLevel {
  id: number;
  intake_program_student: StudentIntakeProgram;
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
  document_expire_on: string;
  place_of_birth: string;
  current_rank: RankRes;
  date_of_issue: string;
  date_of_commission: string;
  date_of_last_promotion: string;
  place_of_issue: string;
  current_rank_id: string;
  other_rank: string;
  rank_depart: string;
  blood_group: BloodGroup;
  place_of_birth_description: string;
  spouse_name: string;
  place_of_birth_id: string;
  residence_location_id: number;
  education_level: EducationLevel;
  nid: string;
  empNo: string;
  //to be added
  religion: string;
  place_of_residence: string;
  nationality: string;
}
export interface UpdateExperienceInfo {
  attachment_id: string;
  description: string;
  end_date: string;
  id: number;
  level: string;
  location: string;
  occupation: string;
  person_id: string;
  proof: string;
  start_date: string;
  type: string;
}
export interface UpdateUserInfo {
  person: any;
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
  nid: string;
  other_rank: string;
  // password: string;
  password_reset_period_in_days: number;
  person_id: string;
  phone: string;
  place_of_birth: string;
  place_of_birth_description: string;
  place_of_issue: string;
  place_of_residence: string;
  profile_status: ProfileStatus;
  rank_depart: string;
  reset_date: string;
  residence_location_id: number;
  sex: GenderStatus;
  spouse_name: string;
  user_type: UserType;
  send_communication_msg: SendCommunicationMsg;
  username: string;
}

export interface EditUser {
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
  // academic_program_level_id: string;
  intake_program_id: string;
  last_name: string;
  marital_status: MaritalStatus;
  mother_names: string;
  nid: string;
  password_reset_period_in_days: number;
  person_id: string;
  phone: string;
  place_of_birth: string;
  place_of_residence: string;
  residence_location_id: number;
  reset_date: string;
  sex: GenderStatus;
  user_type: UserType;
  username: string;
  nationality: string;
  document_expire_on: string;
  send_communication_msg: SendCommunicationMsg;
  profile_status: ProfileStatus;
  id: string;
  spouse_name: string;
}

export interface CreateUserInfo extends EditUser {
  password: string;
}
export interface UserView
  extends Pick<UserInfo, 'id' | 'first_name' | 'last_name' | 'image_url'> {
  selected?: boolean;
}

export interface AcademyUserType {
  id: string | number;
  username: string;
  'full name': string;
  email: string;
  'ID Card': string;
  status: StudentApproval | GenericStatus;
  user_type: UserType;
}

export interface UserTypes extends AcademyUserType {
  academy: string;
}
export interface BasicPersonInfo
  extends Pick<
    PersonInfo,
    | 'first_name'
    | 'last_name'
    | 'phone_number'
    | 'sex'
    | 'birth_date'
    | 'residence_location_id'
    | 'place_of_residence'
    | 'nationality'
    | 'nid'
    | 'doc_type'
    | 'document_expire_on'
    | 'marital_status'
    | 'spouse_name'
> {
  email: string;
  relationship: string;
  user_id: string;
}

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
    | 'doc_type'
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
  extends Pick<UserInfo, 'username' | 'pin' | 'send_communication_msg'> {}

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
  program: string;
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
