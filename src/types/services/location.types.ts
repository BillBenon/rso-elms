export interface LocationLevel {
  id: number;
  code: string;
  name: string;
  createdOn: string;
  createdById: number;
  createdByUsername: string;
  updatedById: number;
  updatedByUsername: string;
  updatedOn: string;
}

export interface LocationInfo {
  id: number;
  code: string;
  name: string;
  description: string;
  createdOn: string;
  createdById: number;
  createdByUsername: string;
  updatedById: string;
  updatedByUsername: string;
  updatedOn: string;
  levelId: string;
  parentId: string;
  parent?: LocationInfo;
  level: LocationLevel;
}
