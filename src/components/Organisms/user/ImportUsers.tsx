import React, { FormEvent, useState } from 'react';

import academyStore from '../../../store/academy.store';
import { CommonFormProps, ValueType } from '../../../types';
import { AcademyInfo } from '../../../types/services/academy.types';
import { getDropDownOptions } from '../../../utils/getOption';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import Heading from '../../Atoms/Text/Heading';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';

interface IUser<K> extends CommonFormProps<K> {
  userType: string;
}

export default function ImportUsers<K>({ onSubmit, userType = 'students' }: IUser<K>) {
  const academies: AcademyInfo[] | undefined =
    academyStore.fetchAcademies().data?.data.data;
  const programs: AcademyInfo[] | undefined =
    academyStore.fetchAcademies().data?.data.data;

  const [details, setDetails] = useState({
    academy: '',
    program: '',
  });

  async function importStudents<T>(e: FormEvent<T>) {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  }

  function handleChange(e: ValueType) {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  }
  return (
    <>
      <form onSubmit={importStudents}>
        <DropdownMolecule
          defaultValue={details.academy}
          options={getDropDownOptions(academies)}
          name="academy"
          placeholder={'Academy to be enrolled'}
          handleChange={handleChange}>
          Academy
        </DropdownMolecule>
        <DropdownMolecule
          defaultValue={details.program}
          options={getDropDownOptions(programs)}
          name="program"
          placeholder={'Program'}
          handleChange={handleChange}>
          Program
        </DropdownMolecule>
        <div className="py-4">
          <Button type="submit">Import {userType}</Button>
        </div>
      </form>
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