/* eslint-disable no-unused-vars */

import { Table } from '..';
import { IEvaluationQuestion, IMultipleChoice } from './evaluation.types';

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

export interface studentMarkingAnswer extends Table {
  id: '';
  mark_scored: number;
  marked: boolean;
  evaluation_question: IEvaluationQuestion;
  multiple_choice_answer: IMultipleChoice;
  open_answer: string;
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
