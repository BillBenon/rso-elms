import { IStudent } from './class.types';

interface ISubjectReport {
  adminId: 'string';
  classWorkGroups: Object;
  id: string;
  title: string;
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
  quiz_marks: number;
  quiz_obtained_marks: number;
  student: IStudent;
  subject_marks: IStudentSujectPerformance[];
  total_marks: number;
}
