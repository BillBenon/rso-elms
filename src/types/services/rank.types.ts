import { Table } from '..';

export interface CreateRankReq {
  name?: string;
  description?: string;
  category?: RankCategory;
  institution_id?: string;
}

export interface RankRes extends CreateRankReq, Table {}

export enum RankCategory {
  G_OFFICERS = 'G_OFFICERS',
  SENIOR_COMMANDS = 'SENIOR_COMMANDS',
  GENERALS = 'GENERALS',
  MEN = 'MEN',
}
