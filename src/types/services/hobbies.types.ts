import { Table } from './common.types';

export interface HobbiesTypes {
  description: string;
  name: string;
  person_id: string;
}

export interface HobbyRes extends HobbiesTypes, Table {}
