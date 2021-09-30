export enum PrivilegeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum PrivilegeFeatureType {
  ADMIN = 'ADMIN',
  EVALUATION = 'EVALUATION',
  REPORTING = 'REPORTING',
  INTERACTIVE_LEARNING = 'INTERACTIVE_LEARNING',
}

export interface PrivilegeUpdate {
  id: string;
  name: string;
  status: PrivilegeStatus;
  description: string;
  feature_type: PrivilegeFeatureType;
}

export interface PrivilegeRes extends PrivilegeUpdate {}
