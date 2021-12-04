import { Table } from '..';

export interface DiseasesTypes {
  description: string;
  name: string;
}

export interface DiseaseRes extends DiseasesTypes, Table {
  // person_id: string;
}
