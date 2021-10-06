import { Table } from '..';

export interface IcreateLevel {
  id: number | string;
  academy_id: string;
  code: string;
  description: string;
  name: string;
  flow: number;
}

export interface ILevel extends Table, IcreateLevel {
  lastStatusChangeReason: string;
  flow: number;
}
