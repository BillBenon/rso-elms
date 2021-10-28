import React from 'react';

import { CommonProps, ValueType } from '../../../types';
import Icon from '../../Atoms/custom/Icon';
import Input from '../../Atoms/Input/Input';

interface ISearchMolecule<T> extends CommonProps<T> {
  handleChange: (_e: ValueType) => void;
  placeholder?: string;
  width?: string;
}

export default function SearchMolecule<T>({
  handleChange,
  placeholder = 'Search here',
  width = 'w-72',
}: ISearchMolecule<T>) {
  return (
    <div className={`rounded-lg border-2 border-bcolor flex items-center ${width}`}>
      <Icon name="search" />
      <Input
        name="search"
        placeholder={placeholder}
        fcolor="error"
        bcolor="none"
        width="auto md:w-52"
        padding="0"
        value={''}
        handleChange={handleChange}
        className="-ml-1"
      />
    </div>
  );
}
