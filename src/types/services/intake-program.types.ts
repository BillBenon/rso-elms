import { Table } from '..';
import { IntakeInfo } from './intake.types';
import { ProgramInfo } from './program.types';

export interface IntakeProgramInfo extends Table {
  intake: IntakeInfo;
  program: ProgramInfo;
  description: string;
}
