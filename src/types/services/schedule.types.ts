import { Table } from '..';
import { EventInfo, VenueInfo } from './event.types';

/* eslint-disable no-unused-vars */
export enum scheduleAppliesTo {
  APPLIES_TO_CLASS = 'APPLIES_TO_CLASS',
  APPLIES_TO_LEVEL = 'APPLIES_TO_LEVEL',
  APPLIES_TO_PROGRAM = 'APPLIES_TO_PROGRAM',
}

export enum methodOfInstruction {
  PRACTICAL = 'PRAC',
  LECTURE = 'LEC',
}

export enum frequencyType {
  ONETIME = 'ONETIME',
  REPEATING = 'REPEATING',
  DATERANGE = 'DATE_RANGE',
}

export enum recurringDays {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
  WEEKENDS = 'WEEKENDS',
  WEEKDAYS = 'WEEKDAYS',
}

export enum ScheduleStatus {
  PENDING = 'PENDING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  ON_HOLD = 'ON_HOLD',
}

export interface Hour {
  hour: number;
  minute: number;
  nano: number;
  second: number;
}

interface CommonScheduleProperties {
  frequencyType: frequencyType;
  appliesTo?: scheduleAppliesTo;
  methodOfInstruction: methodOfInstruction;
  period: number;
}

export interface CreateEventSchedule extends CommonScheduleProperties {
  startDate: string;
  beneficiaries?: string[];
  event: string;
  plannedEndHour: string;
  plannedScheduleStartDate: string;
  plannedStartHour: string;
  venue: string;
}

export interface RecurringSchedule extends Table {
  day_of_week: recurringDays;
  end_hour: Hour;
  start_hour: Hour;
  timetable_status: ScheduleStatus;
}

interface ProgramSchedule extends Table {
  academic_program: Table;
}
interface IntakeLevelSchedule extends Table {
  intake_level_class: Table;
}

export interface ScheduleInfo extends Table, CommonScheduleProperties {
  end_hour: Hour;
  event: EventInfo;
  method_of_instruction: methodOfInstruction;
  planned_end_hour: Hour;
  planned_schedule_end_date: string;
  planned_schedule_start_date: string;
  planned_start_hour: Hour;
  recurring_schedurals: [];
  schedural_academic_program_intake_levels: RecurringSchedule[];
  schedural_academic_programs: ProgramSchedule[];
  schedural_end_date: string;
  schedural_intake_level_classes: IntakeLevelSchedule[];
  schedural_start_date: string;
  start_hour: Hour;
  timetable_status: ScheduleStatus;
  venue: VenueInfo;
}
