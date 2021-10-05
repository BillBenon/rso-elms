import { Table } from '..';
import { ModuleInfo } from './modules.types';

export interface SubjectInfo {
  content: string;
  module_id: string;
  title: string;
}

export interface ExtendedSubjectInfo extends Table, SubjectInfo {
  module: ModuleInfo;
}
