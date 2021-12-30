/* eslint-disable no-unused-vars */
import { Table } from '..';
import { PersonInfo } from './user.types';

export interface NextKinInfo extends Table {
  person_id: string;
  place_of_residence: string;
  relationship_with_next_of_ken: any;
  residence_location_id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: number;
  sex: GenderStatus;
  person: PersonInfo;
}

export interface UpdateNextKinInfo {
  person_id: string;
  place_of_residence: string;
  relationship_with_next_of_ken: any;
  residence_location_id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: number;
}
export enum GenderStatus {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
