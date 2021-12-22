import { Table } from '..';
import { Instructor } from './instructor.types';
import {
  IntakeLevelModule,
  IntakeModuleStatus,
  IntakeProgramLevelPeriodInfo,
} from './intake-program.types';
import { ModuleInfo } from './modules.types';

export interface SubjectInfo extends Table {
  content: string;
  module_id: string;
  title: string;
  module: ModuleInfo;
}

export interface ExtendedSubjectInfo extends Table, SubjectInfo {
  module: ModuleInfo;
}

export interface SubjectPeriodInfo extends Table {
  actual_end_on: string;
  actual_start_on: string;
  incharge: Instructor;
  intake_academic_year_period: IntakeProgramLevelPeriodInfo;
  intake_program_module_level: IntakeLevelModule;
  marks: string;
  planned_end_on: string;
  planned_start_on: string;
  satus: IntakeModuleStatus;
  subject: SubjectInfo;
}
