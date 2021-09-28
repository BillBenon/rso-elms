export interface IntakeInfo {
  actual_end_date: Date;
  actual_start_date: Date;
  code: string;
  description: string;
  expected_end_date: Date;
  expected_start_date: Date;
  id: string;
  intake_status: IntakeStatus;
  period_type: PeriodType;
  registration_control_id: string;
  total_num_students: number;
}

export interface TableId {
  id: string;
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
