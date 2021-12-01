import { Table } from './common.types';
/* eslint-disable no-unused-vars */
export interface ModuleMaterial {
  content: string;
  module_id: string;
  title: string;
  type: MaterialType;
}

export interface ModuleMaterialInfo extends Table, ModuleMaterial {}

export interface MaterialInfo extends Table {
  original_file_name: string;
  description: string;
  purpose: string;
  file_type: string;
  content_format: string;
  path_to_file: string;
}

export interface ModuleMaterialAttachment {
  attachment_id: string;
  learning_material_id: number;
}

export interface ModuleMaterialAttachmentInfo extends Table, ModuleMaterialAttachment {
  learning_material: ModuleMaterial;
}

export enum MaterialType {
  NOTES = 'NOTES',
  EXAMS = 'EXAMS',
  WORKSHOP = 'WORKSHOP',
  SEMINARIES = 'SEMINARIES',
}
