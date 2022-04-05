/* eslint-disable no-unused-vars */
import { IStudent } from './class.types';
import { EnrollmentStatus } from './enrollment.types';
import { IclassWorkGroupInfo } from './evaluation.types';

interface ISubjectReport {
  adminId: 'string';
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
