import { GenericStatus, Table } from '..';
/* eslint-disable no-unused-vars */
export interface CreateEvent {
  code: string;
  description: string;
  eventCategory: eventCategory;
  name: string;
  status: GenericStatus;
}

export interface EventInfo extends CreateEvent, Table {
  event_category: eventCategory;
}

export enum eventCategory {
  VISIT = 'VISIT',
  CONFERENCE = 'CONFERENCE',
  ADMINISTRATIVE = 'ADMINISTRATIVE',
  ENTERTAINMENT = 'ENTERTAINMENT',
  HOLIDAY = 'HOLIDAY',
  LECTURES = 'LECTURES',
  ACTIVITY = 'ACTIVITY',
}

export enum venueType {
  CLASS = 'CLASS',
  FIELD = 'FIELD',
}

export enum scheduleAppliesTo {
  APPLIES_TO_CLASS = 'APPLIES_TO_CLASS',
  APPLIES_TO_LEVEL = 'APPLIES_TO_LEVEL',
  APPLIES_TO_PROGRAM = 'APPLIES_TO_PROGRAM',
}

export enum methodOfInstruction {
  PRACTICAL = 'PRAC',
  LECTURE = 'LEC',
}

export enum scheduleType {
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

export interface CreateVenue {
  name: string;
  status: GenericStatus;
  venueType: venueType;
}

export interface VenueInfo extends CreateVenue, Table {}

export interface CreateEventSchedule {
  startDate: string;
  appliesTo?: scheduleAppliesTo;
  beneficiaries?: string[];
  event: string;
  methodOfInstruction: methodOfInstruction;
  period: number;
  plannedEndHour: string;
  plannedScheduleStartDate: string;
  plannedStartHour: string;
  venue: string;
  scheduleType: scheduleType;
}
