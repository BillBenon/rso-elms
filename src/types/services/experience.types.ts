/* eslint-disable no-unused-vars */
export interface ExperienceInfo {
  attachment_id: string;
  description: string;
  end_date: string;
  id: string;
  level: string;
  location: string;
  occupation: string;
  person_id: string;
  proof: string;
  start_date: string;
  type: ExperienceTypeStatus;
}

export enum ExperienceTypeStatus {
  GENERAL_EDUCATION = 'GENERAL_EDUCATION',
  CURRIER_COURSE_EDUCATION = 'CURRIER_COURSE_EDUCATION',
  EMPLOYMENT = 'EMPLOYMENT',
  INTERNATIONAL_CERTIFICATION = 'INTERNATIONAL_CERTIFICATION',
  INTERNATIONAL_MISSION = 'INTERNATIONAL_MISSION',
  TRAINING = 'TRAINING',
}
