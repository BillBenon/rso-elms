/* eslint-disable no-unused-vars */
import { Table } from './common.types';

export interface ICreateClass {
  class_group_type: ClassGroupType;
  class_name: string;
  class_representative_one_id: string;
  class_representative_tree_id: string;
  class_representative_two_id: string;
  instructor_class_in_charge_id: string;
  intake_academic_year_period_id: number;
  intake_level_id: number;
}

export interface IClassStudent {
  intake_level_class_id: number;
  students_id: string;
}

export interface IClass extends Table, ICreateClass {}

export enum ClassGroupType {
  CLASS = 'CLASS',
  SYNDICATE = 'SYNDICATE',
  PARTON = 'PARTON',
  COMPANY = 'COMPANY',
  LANE = 'LANE',
  SECTION = 'SECTION',
  OTHERS = 'OTHERS',
}
