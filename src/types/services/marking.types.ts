/* eslint-disable no-unused-vars */

import { Table } from '..';
import {
  IEvaluationInfo,
  IEvaluationQuestion,
  IMultipleChoice,
} from './evaluation.types';
import { Student } from './user.types';

export interface SampleQuestionInfo {
  question: string;
  mark: number;
}

export interface MarkingRequired {
  answer_id: string;
  mark: number;
}

export interface MarkingCorrection {
  marked: boolean;
  markScored: number;
  answerId: string;
}

export interface IManualMarking {
  evaluation_id: string;
  marks: number;
  student_id: string;
}

export interface EvaluationStudent {
  admin_id: string;
}

export interface IManualMarkingInfo {
  evaluation: IEvaluationInfo;
  obtained_mark: number;
  student: EvaluationStudent;
}

export interface StudentMarkingAnswer extends Table {
  id: '';
  mark_scored: number;
  marked: boolean;
  evaluation_question: IEvaluationQuestion;
  multiple_choice_answer: IMultipleChoice;
  open_answer: string;
}

export interface FinalizeMarking {
  remarks: string;
  available: string;
}

export interface StudentEvaluationInfo extends Table {
  id: string;
  student: Student;
  evaluation: IEvaluationInfo;
  work_time: number;
  code: string;
  marking_status: string;
  remark: string;
  obtained_mark: number;
}

export interface MarkAllEvaluationQuestions {
  studentEvaluation: string;
  correction: MarkingCorrection[];
}

export interface StudentAnswerInfo {
  openAnswer: string;
  markScored: number;
  marked: boolean;
  id: string;
  question: SampleQuestionInfo;
}
