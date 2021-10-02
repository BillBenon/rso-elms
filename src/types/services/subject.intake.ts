import { Table } from '..';
import { ModuleInfo } from './modules.types';

interface SubjectInfo {
  content: string;
  id: string;
  module_id: string;
  title: string;
}

interface ExtendedSubjectInfo extends Table, SubjectInfo {
  module: ModuleInfo;
}
