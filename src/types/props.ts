import { AllHTMLAttributes, DOMAttributes, FormEvent } from 'react';

import { Color, Page, SelectData, ValueType } from '.';

export interface CommonProps<T> extends AllHTMLAttributes<DOMAttributes<T>> {}

/**
 * input props that will be shared to all input components
 */
export interface CommonInputProps<T> extends CommonProps<T> {
  handleChange: (_e: ValueType) => void;
  name: string;
  value?: string | number;
  options?: SelectData[];
}

//common input props that will be used on all reusable input components
export interface commonInputProps {
  handleChange: Function;
  name: string;
  options: SelectData[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface CommonStepProps {
  details: any;
  handleChange: (_e: ValueType, _page: Page) => void;
  prevStep?: () => void;
  nextStep: (_isComplete: boolean) => void;
  isVertical?: boolean;
}

export interface InputProps<T> extends CommonInputProps<T> {
  placeholder?: string;
  type?: string;
  readonly?: boolean;
  handleChange: (_e: ValueType) => void;
  value: string | number | undefined;
  name: string;
  full?: boolean;
  padding?: string;
  fcolor?: Color;
  bcolor?: Color;
  pcolor?: Color;
  width?: string | number;
  className?: string;
}

export interface DropdownProps extends commonInputProps {
  isMulti?: boolean;
  getOptionLabel?: (_option: Object) => string;
  getOptionValue?: (_option: Object) => string;
  noOptionsMessage?: string;
  width?: string;
  searchable?: boolean;
  defaultValue?: SelectData;
  styles?: Object;
  hasError?: boolean;
  height?: number;
  padding?: number;
}

//common form props that will be used on all reusable form components
export interface CommonFormProps<T> extends Omit<CommonProps<T>, 'onSubmit'> {
  onSubmit?: <K = Element>(_e: FormEvent<K>, _data?: any) => void;
}
