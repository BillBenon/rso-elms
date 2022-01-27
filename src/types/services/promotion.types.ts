import { EnrollmentStatus } from './enrollment.types';

/* eslint-disable no-unused-vars */
export enum PromotionStatus {
  PROMOTED = 'PROMOTED',
  RETAKE = 'RETAKE',
}

export enum StudentEnrollmentStatus {
  RETAKE = 'RETAKE',
  EXPELLED = 'EXPELLED',
  NEXT_LEVEL = 'NEXT_LEVEL',
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
