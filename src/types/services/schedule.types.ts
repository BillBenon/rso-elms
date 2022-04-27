import { Table } from '..';
import { EventInfo, VenueInfo } from './event.types';
import { EvaluationStudent } from './marking.types';

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

export enum TimetableStatus {
  PROVISIONAL = 'PROVISIONAL',
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
  recurringSchedule?: createRecurringSchedule[];
  plannedStartHour: string;
  venue: string;

  // to help on frontend
  repeatingDays: string[];
  intake: string;
  program: string;
  level: string;
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

export interface ICreateTimeTableActivity {
  inChargeId: string;
  // timetable: createRecurringSchedule[];
  // repeatingDays: string[];
  startHour: string;
  endHour: string;
  courseModuleId: string;
  venueId: string;
  // intakeLevelClass: string;
  activityDate: string;
  courseCode: string;
  dayOfWeek: daysOfWeek;
  dressCode: string;
  eventId: string;
  methodOfInstruction: methodOfInstruction;
  periods: number;
  weeklyTimetableId: string;
}

export interface IUpdateTimetableActivity extends ICreateTimeTableActivity {
  id: string;
}

interface courseModule extends Table {
  name: string;
}

export interface ITimeTableActivityInfo extends Table {
  activity_date: string;
  activity_foot_notes: IActivityFootNote[];
  activity_status: TimetableStatus;
  course_code: string;
  course_module?: courseModule;
  day_of_week: daysOfWeek;
  dress_code: string;
  end_hour: string;
  event: EventInfo;
  in_charge: EvaluationStudent;
  method_of_instruction: methodOfInstruction;
  periods: number;
  start_hour: string;
  venue: VenueInfo;
}

export interface BigCalendarEvent {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
}

export interface IActivityFootNote extends Table {
  foot_note: string;
}

export interface ICreateTimeTableWeek {
  endDate: string;
  intakeLevelId: number;
  startDate: string;
  weekName: string;
}

export interface ITimeTableWeekInfo extends Table {
  status: TimetableStatus;
  activities: ITimeTableActivityInfo[];
  academic_program_intake_level: Table;
  end_date: string;
  start_date: string;
  week_name: string;
}
