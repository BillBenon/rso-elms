import React from 'react';

import Icon from '../../Atoms/custom/Icon';
import Input from '../../Atoms/Input/Input';

export default function SearchMolecule() {
  return (
    <div className="rounded-lg border-2 border-bcolor pl-3 w-72 flex items-center">
      {/* <input
        type={'search'}
        name={'search'}
        id={'search'}
        placeholder={'Search here...'}
        className="bg-transparent text-sm font-medium py-3 px-1 outline-none"
        required={true}
      /> */}
      <Icon name="search" />

      <Input
        placeholder="Search here"
        fcolor="error"
        bcolor="none"
        width="auto md:w-60"
        value={'Name'}
        handleChange={(e: any) => console.log(e.target.value)}
      />
    </div>
  );
}
