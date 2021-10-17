import { ValueType } from '..';

export enum IEvaluationTypeEnum {
  EXAM = 'EXAM',
  CAT = 'CAT',
  GROUP_WORK = 'GROUP_WORK',
  QUIZ = 'QUIZ',
}

export enum IQuestionaireTypeEnum {
  MULTIPLE = 'MULTIPLE',
  FIELD = 'FIELD',
  OPEN = 'OPEN',
  HYBRID = 'HYBRID',
}

export interface IEvaluationProps {
  values: any;
  handleChange: (_e: ValueType) => any;
  handleNext: () => void;
  handleProgramsChange?: (_e: ValueType) => any;
  isLoading?: boolean;
  handleGoBack: () => void;
  handleAddQuestion?: () => void;
}

export enum ISubmissionTypeEnum {
  FILE = 'FILE',
  ONLINE_TEXT = 'ONLINE_TEXT',
}

export enum IEvaluationClassification {
  MODULAR = 'MODULAR',
  SUBJECT = 'SUBJECT',
}

export interface IEvaluationCreate {
  access_type: string;
  allow_submission_time: string;
  classification: IEvaluationClassification;
  content_format: string;
  due_on: string;
  eligible_group: string;
  evaluation_status: string;
  evaluation_type: IEvaluationTypeEnum;
  exam_instruction: string;
  id: number;
  intake_level_class_id: number;
  is_consider_on_report: boolean;
  marking_reminder_date: string;
  maximum_file_size: number;
  name: string;
  questionaire_type: IQuestionaireTypeEnum;
  subject_academic_year_period_id: number;
  submision_type: ISubmissionTypeEnum;
  time_limit: string;
  total_mark: number;
}
