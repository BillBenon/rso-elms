import React from 'react';

import Icon from '../../Atoms/custom/Icon';
import Input from '../../Atoms/Input/Input';

export default function SearchMolecule() {
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
        handleChange={(e: any) => console.log(e.target.value)}
        className="-ml-1"
      />
    </div>
  );
}
