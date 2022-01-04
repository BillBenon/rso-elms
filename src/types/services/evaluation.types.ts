import { Table } from '..';
import { IClass, IClassStudent } from './class.types';

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
  evaluationId: string | null;
  evaluationInfo?: IEvaluationInfo;
}

export enum ISubmissionTypeEnum {
  FILE = 'FILE',
  ONLINE_TEXT = 'ONLINE_TEXT',
}

export enum IEvaluationOwnership {
  CREATED_BY_ME = 'CREATED_BY_ME',
  FOR_APPROVING = 'FOR_APPROVING',
  FOR_MARKING = 'FOR_MARKING',
  FOR_REVIEWING = 'FOR_REVIEWING',
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
  ONGOING = 'ONGOING',
  SUBMITTED = 'SUBMITTED',
  UNMARKED = 'UNMARKED',
  MARKING = 'MARKING',
  MARKED = 'MARKED',
  CANCELED = 'CANCELED',
  REVIEWING = 'REVIEWING',
  REVIEW_REJECTED = 'REVIEW_REJECTED',
  REVIEWED = 'REVIEWED',
  APPROVING = 'APPROVING',
  APPROVAL_REJECTED = 'APPROVAL_REJECTED',
  APPROVED = 'APPROVED',
  HIDDEN = 'HIDDEN',
  PUBLISHED = 'PUBLISHED',
}

export enum IEligibleGroup {
  MULTIPLE_CLASSES = 'MULTIPLE_CLASSES',
  SINGLE_CLASS = 'SINGLE_CLASS',
}

export enum IEvaluationAppprovalStatus {
  DRAFT = 'DRAFT',
  REVIEWING = 'REVIEWING',
  APPROVING = 'APPROVING',
  REVIEWED_TO_APPROVE = 'REVIEWED_TO_APPROVE',
  RETURNED = 'REVIEWED_TO_APPROVE',
  APPROVED = 'APPROVED',
}

export enum UpdateEvaluationApprovalStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REVIEWED = 'REVIEWED',
}

export interface IUpdateEvaluationApprovalStatus {
  evaluation_approval_status?: UpdateEvaluationApprovalStatusEnum;
  evaluation_id: string;
  evaluation_reviewer_status?: UpdateEvaluationApprovalStatusEnum;
  instructor_id: string;
  remarks: string;
}

export interface IEvaluationCreate {
  access_type: string;
  intake_academic_year_period: string;
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
  id: string;
  questionaire_type: IQuestionaireTypeEnum;
  submision_type: ISubmissionTypeEnum;
  time_limit: number;
  total_mark: number;
}

export interface IStudentEvaluations {
  undoneEvaluations: IEvaluationInfo[];
  unfinishedEvaluations: any[];
  ongoingEvaluations: any[];
}

export interface IEvaluationInfo {
  id: string;
  name: string;
  academy_id: string;
  class_ids: string;
  intake_academic_year_period: string;
  subject_academic_year_period: string;
  subject_id: string;
  access_type: IAccessTypeEnum;
  evaluation_type: IEvaluationTypeEnum;
  questionaire_type: IQuestionaireTypeEnum;
  exam_instruction: string;
  submision_type: ISubmissionTypeEnum;
  total_mark: number;
  evaluation_status: IEvaluationStatus;
  submission_status?: IEvaluationStatus;
  eligible_group: IEligibleGroup;
  classification: IEvaluationClassification;
  allow_submission_time: string;
  due_on: string;
  time_limit: number;
  marking_reminder_date: string;
  content_format: string;
  maximum_file_size: number;
  is_consider_on_report: boolean;
  available: string;
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

export interface IEvaluationInfoCollected {
  undone_evaluations: IEvaluationInfoSingleEvaluation[];
  ongoing_evaluations: IEvaluationInfoSingleEvaluation[];
  finished_evaluations: IEvaluationInfoSingleEvaluation[];
}
export interface IEvaluationInfoSingleEvaluation {
  code: string;
  evaluation: IEvaluationInfo;
  id: string;
}

export interface IEvaluationChoices {
  answer_content: string;
  correct: boolean;
}

export interface IEvaluationQuestion {
  evaluation_id: string;
  multiple_choice_answers?: IMultipleChoice[];
  mark: number;
  parent_question_id: string;
  question: string;
  submitted: boolean;
  question_type: IQuestionType;
}

export interface IMultipleChoice {
  answer_content: string;
  correct: boolean;
  id: string;
}

export interface ICreateEvaluationQuestions extends IEvaluationQuestion {
  sub_questions: IEvaluationQuestion[];
  submitted: boolean;
  question_type: IQuestionType;
  id: string;
  choices: IMultipleChoice[];
}

export interface IMultipleChoiceAnswers {
  answer_content: string;
  correct: boolean;
  highlight?: boolean;
  id: string;
  mark: number;
}

export interface IEvaluationQuestionsInfo {
  id: string;
  question: string;
  evaluation_id: string;
  choices: IMultipleChoice[];
  mark: number;
  evaluationQuestions: [];
  question_type: IQuestionType;
  multiple_choice_answers: IMultipleChoiceAnswers[];
}

export interface IEvaluationApproval {
  approver_id: string;
  evaluation_id: string;
  evaluation_approval_status: string;
  id: string;
  preparer_ids: string;
  reviewer_ids: string;
  marker_ids: string;
  to_be_approved: boolean;
  to_be_reviewed: boolean;
}

export interface IStudentAnswer {
  answer_attachment: string;
  evaluation_question: string;
  mark_scored: number | null;
  multiple_choice_answer: string;
  open_answer: string;
  student_evaluation: string;
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

export interface IEvaluationsReport extends Table {
  evaluation: IEvaluationInfo;
}

export interface IclassWorkGroupInfo extends Table {
  evaluations: IEvaluationsReport;
  group_members: IClassStudent[];
  intake_level_class: IClass;
  intake_level_class_id: string;
  subject_id: string;
  team_leader: IClassStudent;
  team_leader_id: string;
}
