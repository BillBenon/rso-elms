/* eslint-disable no-unused-vars */
import { BasicPersonInfo, PersonInfo } from './user.types';

export interface NextKinInfo {
  user_id: string;
  next_of_kins: BasicPersonInfo[];
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
