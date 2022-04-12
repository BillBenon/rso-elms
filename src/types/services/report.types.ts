/* eslint-disable no-unused-vars */
import { AcademyInfo } from './academy.types';
import { IStudent } from './class.types';
import { Status } from './division.types';
import { EnrollmentStatus } from './enrollment.types';
import { IclassWorkGroupInfo } from './evaluation.types';
import { InstitutionInfo } from './institution.types';
import { UserType } from './user.types';

interface ISubjectReport {
  adminId: string;
  classWorkGroups: IclassWorkGroupInfo[];
  id: string;
  title: string;
}

export enum PromotionStatus {
  PROMOTED = 'PROMOTED',
  RETAKE = 'RETAKE',
  DISMISSED = 'DISMISSED',
  PENDING = 'PENDING',
}

export interface PromotionParams {
  reportId: string;
  levelId: string;
  classId: string;
}

export interface PromotionType {
  id: string;
  promotion_status: PromotionStatus;
  enrolment_status: EnrollmentStatus;
  intake_academic_level_enrolment_id: string;
  next_intake_academic_level_enrolment_id: '';
  position: number;
  final_level: boolean;
}

export interface IStudentSujectPerformance {
  exam_marks: number;
  exam_obtained_marks: number;
  id: string;
  obtained_marks: number;
  quiz_marks: number;
  quiz_obtained_marks: number;
  subject: ISubjectReport;
  total_marks: number;
}

export interface IOverallStudentPerformance {
  exam_marks: number;
  exam_obtained_marks: number;
  id: string;
  obtained_marks: number;
  position: number;
  total_students: number;
  quiz_marks: number;
  quiz_obtained_marks: number;
  student: IStudent;
  subject_marks: IStudentSujectPerformance[];
  total_marks: number;
  promotion_status: PromotionStatus;
}

interface EvClass {
  adminId: string;
  className: string;
  id: string;
}

interface EvPeriod {
  id: string;
  adminId: string;
}
export interface IOverallLevelPerformance {
  created_at: string;
  exam_marks: number;
  exam_obtained_marks: number;
  id: string;
  intake_academic_year_period: EvPeriod;
  intake_level_class: EvClass;
  last_updated_at: string;
  obtained_marks: number;
  position: number;
  promotion_status: PromotionStatus | null;
  quiz_marks: number;
  quiz_obtained_marks: number;
  student: EvStudent;
  subject_marks: ISubjectMarks[];
  total_marks: number;
  total_students: number;
}

interface ISubjectMarks {
  created_at: string;
  exam_marks: number;
  exam_obtained_marks: number;
  id: string;
  last_updated_at: string;
  obtained_marks: number;
  quiz_marks: number;
  quiz_obtained_marks: number;
  subject: ISubject;
  total_marks: number;
}
interface ISubject {
  adminId: string;
  id: string;
  moduleEnrollmentId: string;
  title: string;
}

export interface IPerformanceTable {
  id: string;
  reg_number: string;
  [index: string]: string | number;
}
export interface IQuestionPerformance {
  obtainedTotal: number;
  question: string;
  questionTotal: number;
}
export interface IEvaluationPerformance {
  id: string;
  student: IStudent;
  questionPoints: IQuestionPerformance[];
}

export interface IModuleTermPerformance {
  id: string;
  student: IStudent;
  evaluationAttempts: [
    {
      evaluationId: string;
      evaluationName: string;
      maximum: number;
      obtained: number;
    },
  ];
}

interface EvUser {
  academy: AcademyInfo;
  academyId: string;
  adminId: string;
  createdOn: string;
  id: string;
  institution: InstitutionInfo;
  institutionId: string;
  passwordResetPeriodInDays: number;
  status: Status;
  token: string;
  userType: UserType;
  username: string;
}

interface EvStudent {
  admin_id: string;
  id: string;
  reg_number: string;
  since_on: string;
}

export interface ISubjective {
  created_by: string;
  created_on: string;
  id: string;
  last_modification_on: string;
  marker: EvUser;
  student: EvStudent;
  subjective_label: TermFormSection;
  subjective_value: string;
  term: string;
  updated_by: string;
}

export interface InformativeReport {
  dsAssessments: [];
  evaluationAttempts: {
    evaluationId: string;
    evaluationName: string;
    id: string;
    maximum: number;
    obtained: number;
  }[];
  student: EvStudent;
  studentSubjective: ISubjective[];
  term: string;
}

export interface ISubjectiveForm {
  studentId: string;
  subjectiveLabel: TermFormSection | TermFormComment;
  subjectiveValue: string;
  termId: string;
}

export interface DSAssessForm {
  term: number;
  label: string;
  receiver: string;
  value: string;
  week: number;
}

export interface IEditSubjectiveForm extends ISubjectiveForm {
  id: string;
}

export interface TwetForm {
  id: string;
  pen_picture: string;
  student_id: string;
  term: string;
}

export interface TwetReport extends TwetForm {
  student: EvStudent;
}

export interface DSAssessReport {
  term: number;
  week: number;
  author: EvUser;
  critique_rows: { id: string; label: string; value: string }[];
  id: string;
  receiver: EvUser;
}

export enum TermFormSection {
  INTRODUCTION = 'INTRODUCTION',
  WRITTEN_WORK = 'WRITTEN_WORK',
  ORAL_WORK = 'ORAL_WORK',
  ATTITUDE_TO_WORK = 'ATTITUDE_TO_WORK',
  PRATICAL_ABILITY = 'PRATICAL_ABILITY',
  EXTRACURRICULAR_ACTIVITY = 'EXTRACURRICULAR_ACTIVITY',
  SUMMARY = 'SUMMARY',
}
export enum TermFormComment {
  INTELLECTUAL_COMPETENCE = 'INTELLECTUAL_COMPETENCE',
  PROFESSIONAL_COMPETENCE = 'PROFESSIONAL_COMPETENCE',
  PERSONAL_QUALITIES = 'PERSONAL_QUALITIES',
}
