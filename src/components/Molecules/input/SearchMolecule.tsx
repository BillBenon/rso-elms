import React from 'react';

import { CommonProps, ValueType } from '../../../types';
import Icon from '../../Atoms/custom/Icon';
import Input from '../../Atoms/Input/Input';

interface ISearchMolecule<T> extends CommonProps<T> {
  handleChange: (_e: ValueType) => void;
}

export default function SearchMolecule<T>({ handleChange }: ISearchMolecule<T>) {
  return (
    <div className="rounded-lg border-2 border-bcolor w-72 flex items-center">
      <Icon name="search" />
      <Input
        name="search"
        placeholder="Search here"
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
