/* eslint-disable no-unused-vars */
import { FormEvent, ReactNode } from 'react';

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

export type fontSize = 'xs' | 'sm' | 'base' | 'tiny' | 'lg' | '2xl' | '3xl';
export type textTransform = 'uppercase' | 'lowerCase' | 'capitalize' | 'normal-case';
export type width = 'default' | 'full';
export type fontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextDecoration = 'no-underline' | 'underline';

export type Status =
  | 'pending'
  | 'ongoing'
  | 'complete'
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'cancelled';

export type Page =
  | 'personalDetails'
  | 'familyDetails'
  | 'nationalDocuments'
  | 'employmentDetails'
  | 'otherDetails'
  | 'educationBackground'
  | ExperienceType
  | 'nextOfKinDetails'
  | 'kinAddressDetails'
  | 'accountDetails';

export type ExperienceType =
  | 'appointmentHeld'
  | 'internationalMission'
  | 'courseCarrier'
  | 'decorations';

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
  subLabel?: string;
}

/**
 * handleChange function params type
 */
export interface ValueType<T = Event> {
  name: string;
  value: string | number | boolean | string[];
  event?: FormEvent<T>;
}

export interface CommonCardDataType {
  id?: string | number;
  status?: { type: 'success' | 'warning' | 'error'; text: string };
  title: string;
  code: string;
  subTitle?: string;
  description: string;
  footerTitle?: string | ReactNode;
}

export interface SigninPropTypes extends CommonCardDataType {
  programs: SelectData[];
}

export type IconType =
  | 'academy'
  | 'add'
  | 'alert'
  | 'attach'
  | 'chevron-right'
  | 'close'
  | 'download'
  | 'edit'
  | 'faculty'
  | 'filter'
  | 'left-arrow'
  | 'level'
  | 'login'
  | 'module'
  | 'more'
  | 'notification'
  | 'police-logo'
  | 'reg-control'
  | 'right-arrow'
  | 'role'
  | 'search'
  | 'settings'
  | 'switch'
  | 'user';

export interface FormPropType {
  onSubmit?: <E>(_e: FormEvent<E>) => void;
}

export interface ParamType {
  id: string;
}

export * from './props';
export * from './services/autheticator.types';
export * from './services/common.types';
export * from './services/privilege.types';
export * from './services/role.types';
