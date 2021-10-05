import { GenericStatus } from '..';
import { Table } from './common.types';
import { ProgramInfo } from './program.types';

export interface ModuleInfo extends CreateModuleInfo, Table {
  code: string;
  status: boolean;
  program: ProgramInfo;
  total_num_subjects: number;
}

export interface CreateModuleInfo {
  id: string | number;
  name: string;
  description: string;
  has_prerequisite: boolean;
  program_id: string;
}

export interface Prerequisite {
  description: string;
  id: 0;
  module_id: string;
  prerequisite_id: string;
  status: GenericStatus;
}

export interface CreatePrerequisites {
  model_id: string;
  prerequistis: Prerequisite[];
}
