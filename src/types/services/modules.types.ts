import { Table } from './common.types';
import { ProgramInfo } from './program.types';

export interface ModuleInfo extends CreateModuleInfo, Table {
  code: string;
  status: boolean;
  program: ProgramInfo;
  total_num_subjects: number;
}

export interface CreateModuleInfo {
  name: string;
  description: string;
  has_prerequisite: boolean;
  program_id: string;
}
