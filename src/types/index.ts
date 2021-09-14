/* eslint-disable no-unused-vars */
import React from 'react';

export type Color =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'main'
  | 'error'
  | 'warning'
  | 'success'
  | 'txt-primary'
  | 'txt-secondary'
  | 'bcolor'
  | 'none'
  | 'gray'
  | 'lightgray';

export type fontSize = 'xs' | 'sm' | 'base' | 'tiny' | 'lg' | '2xl';
export type width = 'default' | 'full';
export type fontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export type Status =
  | 'pending'
  | 'ongoing'
  | 'complete'
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'cancelled';

export type statusStyleType = {
  [_index in Status]?: string;
};

export type colorStyleType = {
  [_index in Color]?: string;
};

export type bgStyleType = {
  [_index in Color]?: string;
};

export type fontWeightStyleType = {
  [_index in fontWeight]: string;
};

export type fontSizeStyleType = {
  [_index in fontSize]: string;
};

export interface Link {
  icon?: string;
  title: string;
  to: string;
  active?: boolean;
}

export interface SelectData {
  value: string;
  label: string;
}

/**
 * handleChange function params type
 */
export interface ValueType {
  name: string;
  value: string | number | boolean | undefined;
  event: Event;
}

export interface CourseModelDataType {
  id?: string | number;
  status?: { type: 'success' | 'warning' | 'error'; text: string };
  title: string;
  code: string;
  subTitle?: string;
  description: string;
}

export interface commonInputProps {
  onChange: Function;
  name: string;
  options: object[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface DropdownProps extends commonInputProps {
  isMulti?: boolean;
  getOptionLabel?: (_option: Object) => string;
  getOptionValue?: (_option: Object) => string;
  noOptionsMessage?: string;
  width?: string;
  searchable?: boolean;
  defaultValue?: Object;
}
