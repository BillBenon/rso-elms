/* eslint-disable no-unused-vars */
export enum IEvaluationTypeEnum {
  EXAM = 'EXAM',
  CAT = 'CAT',
  GROUP_WORK = 'GROUP_WORK',
  QUIZ = 'QUIZ',
}

export enum IQuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  OPEN = 'OPEN',
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
  MODULE = 'MODULE',
  SUBJECT = 'SUBJECT',
}

export enum IEligibleClassEnum {
  MULTIPLE = 'MULTIPLE',
  SINGLE = 'SINGLE',
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

export enum IEvaluationStatus {
  PENDING = 'PENDING',
  ON_GOING = 'ON_GOING',
  UNMARKED = 'UNMARKED',
  MARKING = 'MARKING',
  MARKED = 'MARKED',
  CANCELED = 'CANCELED',
}

export enum IEligibleGroup {
  MULTIPLE_CLASSES = 'MULTIPLE_CLASSES',
  SINGLE_CLASS = 'SINGLE_CLASS',
}

export enum IEvaluationApprovalStatus {
  DRAFT = 'DRAFT',
  REVIEWING = 'REVIEWING',
  APPROVING = 'APPROVING',
  REVIEWED_TO_APPROVE = 'REVIEWED_TO_APPROVE',
  RETURNED = 'REVIEWED_TO_APPROVE',
  APPROVED = 'APPROVED',
}

export interface IEvaluationCreate {
  access_type: string;
  academy_id: string;
  instructor_id: string;
  allow_submission_time: string;
  class_ids: string;
  subject_academic_year_period_id: string;
  classification: IEvaluationClassification;
  content_format: string;
  due_on: string;
  eligible_group: string;
  evaluation_status: IEvaluationStatus;
  evaluation_type: IEvaluationTypeEnum;
  exam_instruction: string;
  is_consider_on_report: boolean;
  marking_reminder_date: string;
  maximum_file_size: number | string;
  name: string;
  id: '';
  questionaire_type: IQuestionaireTypeEnum;
  submision_type: ISubmissionTypeEnum;
  time_limit: number;
  total_mark: number;
}

export interface IEvaluationInfo {
  id: string;
  name: string;
  academy_id: string;
  subject_academic_year_period: string;
  access_type: IAccessTypeEnum;
  evaluation_type: IEvaluationTypeEnum;
  questionaire_type: IQuestionaireTypeEnum;
  exam_instruction: string;
  submision_type: ISubmissionTypeEnum;
  total_mark: number;
  evaluation_status: IEvaluationStatus;
  eligible_group: IEligibleGroup;
  classification: IEvaluationClassification;
  allow_submission_time: string;
  due_on: string;
  time_limit: number;
  marking_reminder_date: string;
  content_format: string;
  maximum_file_size: number;
  is_consider_on_report: boolean;
  number_of_questions: string;
  subject_academic_year_period_id: string;
  group_evaluations: [];
  private_attendees: [];
  student_answers: [];
  evaluation_attachments: [];
  evaluation_approvals: [];
  student_evaluations: [];
  evaluation_comments: [];
}

export interface IEvaluationChoices {
  answer_content: string;
  correct: boolean;
}

export interface IEvaluationQuestion {
  evaluation_id: string;
  multipleChoiceAnswers?: IMultipleChoice[];
  mark: number;
  parent_question_id: string;
  question: string;
  submitted: boolean;
  question_type: IQuestionType;
}

export interface IMultipleChoice {
  answer_content: string;
  correct: boolean;
}

export interface ICreateEvaluationQuestions extends IEvaluationQuestion {
  sub_questions: IEvaluationQuestion[];
  submitted: boolean;
  choices: IMultipleChoice[];
}

export interface IEvaluationQuestionsInfo {
  id: string;
  question: string;
  mark: number;
  evaluationQuestions: [];
  questionType: IQuestionType;
  multipleChoiceAnswers: [];
}

export interface IEvaluationApproval {
  approver: string;
  evaluation: string;
  evaluation_approval_status: string;
  id: string;
  preparer: string;
  reviewer: string;
  to_be_approved: boolean;
  to_be_reviewed: boolean;
}

export interface IStudentAnswer {
  answerAttachment: string;
  evaluation: string;
  evaluationQuestion: string;
  markScored: number | null;
  multipleChoiceAnswer: string;
  openAnswer: string;
  studentEvaluation: string;
}

export interface IStudentEvaluationStart {
  attachment: string;
  evaluation_id: string;
  student_id: string;
}
export interface IStudentEvaluationStartInfo {
  id: string;
  evaluation: IEvaluationInfo;
}
