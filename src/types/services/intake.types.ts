import { GenericStatus, Table } from '..';

export interface IntakeInfo {
  title: string;
  actual_end_date: Date;
  actual_start_date: Date;
  code: string;
  description: string;
  expected_end_date: Date;
  expected_start_date: Date;
  id: string | number;
  intake_status: IntakeStatus;
  period_type: PeriodType;
  registration_control_id: string;
  total_num_students: number;
}

export interface ExtendedIntakeInfo extends Table, IntakeInfo {
  registration_control: Object;
  generic_status: GenericStatus;
  last_status_change_reason: string;
  registration_control_id: string;
}

export enum IntakeStatus {
  INACTIVE,
  ONHOLD,
  ONGOING,
  COMPLETED,
  OPENED,
}
export enum PeriodType {
  TERM,
  SEMESTER,
  SHORT_COURSE,
  PHASE,
}
