import { AllHTMLAttributes, DOMAttributes, FormEvent } from 'react';

import { SelectData, ValueType } from '.';

export interface CommonProps<T> extends AllHTMLAttributes<DOMAttributes<T>> {}

/**
 * input props that will be shared to all input components
 */
export interface CommonInputProps<T> extends CommonProps<T> {
  handleChange: (_e: ValueType) => void;
  name: string;
  value?: string;
  options: SelectData[];
}

//common input props that will be used on all reusable input components
export interface commonInputProps {
  onChange: Function;
  name: string;
  options: SelectData[];
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

//common form props that will be used on all reusable form components
export interface CommonFormProps<T> extends Omit<CommonProps<T>, 'onSubmit'> {
  onSubmit?: <K = Element>(_e: FormEvent<K>, _data?: any) => void;
}
