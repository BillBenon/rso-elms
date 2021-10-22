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
  handleNext: () => void;
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

export enum IEligibleClassEnum {
  MULTIPLE_CLASSES = 'MULTIPLE_CLASSES',
  SINGLE_CLASS = 'SINGLE_CLASS',
}

export enum IAccessTypeEnum {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export enum IContentFormatEnum {
  MP4 = 'MP4',
  PNG = 'PNG',
  DOC = 'DOC',
  PDF = 'PDF',
}

export enum IEvaluationType {
  PENDING = 'PENDING',
  ON_GOING = 'ON_GOING',
  UNMARKED = 'UNMARKED',
  MARKING = 'MARKING',
  MARKED = 'MARKED',
  CANCELED = 'CANCELED',
}

export interface IEvaluationCreate {
  access_type: string;
  allow_submission_time: string;
  classification: IEvaluationClassification;
  content_format: string;
  due_on: string | null;
  eligible_group: string;
  evaluation_status: string;
  evaluation_type: IEvaluationTypeEnum;
  exam_instruction: string;
  id: string | number;
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
