import { Table } from '..';
import { EventInfo, VenueInfo } from './event.types';

/* eslint-disable no-unused-vars */
export enum scheduleAppliesTo {
  APPLIES_TO_CLASS = 'APPLIES_TO_CLASS',
  APPLIES_TO_LEVEL = 'APPLIES_TO_LEVEL',
  APPLIES_TO_PROGRAM = 'APPLIES_TO_PROGRAM',
}

export enum methodOfInstruction {
  PRAC = 'PRAC',
  LEC = 'LEC',
}

export enum frequencyType {
  ONETIME = 'ONETIME',
  RECURRING = 'RECURRING',
  DATE_RANGE = 'DATE_RANGE',
}

export enum daysOfWeek {
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

export interface DateRange {
  end_date: string;
  start_date: string;
}

interface CommonScheduleProperties {
  frequencyType: frequencyType;
  appliesTo?: scheduleAppliesTo;
  methodOfInstruction: methodOfInstruction;
  period: number;
}

export interface CreateEventSchedule extends CommonScheduleProperties {
  beneficiaries?: string[];
  event: string;
  plannedEndHour: string;
  plannedScheduleStartDate: string | Date;
  plannedScheduleEndDate: string | Date;
  repeatingDays: string[];
  recurringSchedule?: createRecurringSchedule[];
  plannedStartHour: string;
  venue: string;
}

export interface createRecurringSchedule {
  dayOfWeek: daysOfWeek;
  endHour: string;
  startHour: string;
}
export interface RecurringSchedule extends Table {
  day_of_week: daysOfWeek;
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
  end_hour: number[];
  event: EventInfo;
  method_of_instruction: methodOfInstruction;
  planned_end_hour: number[];
  planned_schedule_end_date: string;
  planned_schedule_start_date: string;
  planned_start_hour: number[];
  recurring_schedurals: [];
  schedural_academic_program_intake_levels: RecurringSchedule[];
  schedural_academic_programs: ProgramSchedule[];
  schedural_end_date: string;
  schedural_intake_level_classes: IntakeLevelSchedule[];
  schedural_start_date: string;
  start_hour: number[];
  schedule_date: string;
  timetable_status: ScheduleStatus;
  venue: VenueInfo;
  frequency_type: frequencyType;
  applies_to: scheduleAppliesTo;
  period: 1;
}

export interface ICreateClassTimeTable {
  instructor: string;
  timetable: createRecurringSchedule[];
  repeatingDays: string[];
  startHour: string;
  endHour: string;
  courseModule: string;
  venue: string;
}

interface courseModule extends Table {
  name: string;
}
export interface ClassTimeTableInfo extends Table {
  course_module: courseModule;
  day_of_week: daysOfWeek;
  end_hour: Hour;
  instructor: Table;
  intake_level_class: Table;
  start_hour: Hour;
  timetable_status: ScheduleStatus;
  venue: VenueInfo;
}