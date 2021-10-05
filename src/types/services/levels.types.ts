import { Table } from '..';

export interface IcreateLevel {
  academy_id: string;
  code: string;
  description: string;
  name: string;
}

export interface ILevel extends Table, IcreateLevel {
  lastStatusChangeReason: string;
}
