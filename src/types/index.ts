/* eslint-disable no-unused-vars */
export type Color =
  | 'primary'
  | 'secondary'
  | 'main'
  | 'error'
  | 'warning'
  | 'success'
  | 'txt-primary'
  | 'txt-secondary'
  | 'gray'
  | 'lightgray';

export type fontSize = 'xs' | 'sm' | 'tiny' | 'lg' | '2xl';
export type width = 'default' | 'full';
export type fontWeight = 'normal' | 'medium' | 'bold';

export type Status =
  | 'pending'
  | 'ongoing'
  | 'complete'
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'cancelled';

export type statusStyleType = {
  [index in Status]?: string;
};

export type colorStyleType = {
  [index in Color]?: string;
};

export type bgStyleType = {
  [index in Color]?: string;
};

export type fontWeightStyleType = {
  [index in fontWeight]: string;
};

export type fontSizeStyleType = {
  [index in fontSize]: string;
};

export interface Link {
  icon?: string;
  title: string;
  to: string;
}

export interface SelectData {
  value: string;
  label: string;
}
