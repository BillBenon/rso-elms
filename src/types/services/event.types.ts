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
export interface CreateVenue {
  name: string;
  status: GenericStatus;
  venueType: venueType;
}

export interface VenueInfo extends CreateVenue, Table {
  venue_type: string;
}
