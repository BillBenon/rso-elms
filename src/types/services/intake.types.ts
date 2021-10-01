import { GenericStatus, Table } from '..';

export interface IntakeInfo {
  id: string | number;
  title: string;
  actual_end_date: Date | string;
  actual_start_date: Date | string;
  code: string;
  description: string;
  expected_end_date: Date | string;
  expected_start_date: Date | string;
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
  STARTED = 'STARTED',
  SUSPENDED = 'SUSPENDED',
  VOIDED = 'VOIDED',
  CLOSED = 'CLOSED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  OPENED = 'OPENED',
}

export enum PeriodType {
  TERM = 'TERM',
  SEMESTER = 'SEMESTER',
  SHORT_COURSE = 'SHORT_COURSE',
  PHASE = 'PHASE',
}
