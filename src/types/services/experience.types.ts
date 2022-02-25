import { Table } from '..';
import { AttachementInfo } from './attachement.types';
// import { MaterialInfo } from './module-material.types';

/* eslint-disable no-unused-vars */
export interface ExperienceInfo {
  attachment_id: string;
  description: string;
  end_date: string;
  level: string;
  location: string;
  occupation: string;
  person_id: string;
  proof: string;
  start_date: string;
  type: ExperienceType;
}

export interface Experiences extends Table, ExperienceInfo {
  attachment: AttachementInfo;
}

export enum ExperienceType {
  GENERAL_EDUCATION = 'GENERAL_EDUCATION',
  CURRIER_COURSE_EDUCATION = 'CURRIER_COURSE_EDUCATION',
  EMPLOYMENT = 'EMPLOYMENT',
  INTERNATIONAL_CERTIFICATION = 'INTERNATIONAL_CERTIFICATION',
  INTERNATIONAL_MISSION = 'INTERNATIONAL_MISSION',
  TRAINING = 'TRAINING',
}
