import React from 'react';

import { SelectData } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import Heading from '../../Atoms/Text/Heading';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';

export default function ImportStudents() {
  const academies: SelectData[] = [
    {
      value: 'Gako MA',
      label: 'M.A GAKO',
    },
    {
      value: 'Nasho',
      label: 'Nasho',
    },
    {
      value: 'Nyakinama',
      label: 'Nyakinama high staff',
    },
  ];
  return (
    <>
      <DropdownMolecule
        options={academies}
        name="academy"
        placeholder={'Academy to be enrolled'}
        handleChange={(_e: any) => {}}>
        Academy
      </DropdownMolecule>
      <DropdownMolecule
        options={academies}
        name="program"
        placeholder={'Program'}
        handleChange={(_e: any) => {}}>
        Program
      </DropdownMolecule>
      <div className="py-4">
        <Button type="button">Import students</Button>
      </div>
      <div className="pt-2 w-80">
        <div className="flex gap-2 items-center">
          <Icon name="alert" />
          <Heading fontSize="sm">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Velit officia
          </Heading>
        </div>
        <div className="pt-2 px-6">
          <Button styleType="text" color="primary">
            <span className=" flex items-center">
              <Icon name="download" />
              Download template
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
