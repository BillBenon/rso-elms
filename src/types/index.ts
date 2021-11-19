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
  | 'none'
  | 'gray'
  | 'lightgray';

export type fontSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'tiny'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl';
export type textTransform = 'uppercase' | 'lowerCase' | 'capitalize' | 'normal-case';
export type width = 'default' | 'full';
export type fontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextDecoration = 'no-underline' | 'underline';

export type Status =
  | 'pending'
  | 'ongoing'
  | 'initial'
  | 'closed'
  | 'complete'
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'promoted'
  | 'retake'
  | 'expelled'
  | 'started'
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

export interface IDivisionsAcademyType extends FormPropType {
  academy_id: string | undefined;
}

export interface SigninPropTypes extends CommonCardDataType {
  programs: SelectData[];
}

export type IconType =
  | 'academy'
  | 'add'
  | 'alert'
  | 'attach'
  | 'back-arrow'
  | 'blockquote-left'
  | 'bold'
  | 'calendar'
  | 'check'
  | 'chevron-left'
  | 'chevron-right'
  | 'ci_heading-h1'
  | 'ci_heading-h2'
  | 'ci_heading-h3'
  | 'close'
  | 'code'
  | 'cross'
  | 'download'
  | 'edit'
  | 'evaluation'
  | 'faculty'
  | 'filter'
  | 'heading-h1'
  | 'heading-h2'
  | 'heading-h3'
  | 'heading'
  | 'left-arrow'
  | 'level'
  | 'link-outline'
  | 'list-ol'
  | 'list-ul'
  | 'login'
  | 'module'
  | 'more'
  | 'notification'
  | 'paragraph'
  | 'police-logo'
  | 'program'
  | 'redo'
  | 'reg-control'
  | 'right-arrow'
  | 'role'
  | 'search'
  | 'settings'
  | 'switch'
  | 'text-italic'
  | 'text-strikethrough'
  | 'text-underline'
  | 'tick'
  | 'undo'
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
