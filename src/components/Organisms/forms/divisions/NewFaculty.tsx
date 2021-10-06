import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import academyStore from '../../../../store/academy.store';
import { divisionStore } from '../../../../store/divisions.store';
import { IDivisionsAcademyType, ValueType } from '../../../../types';
import { AcademyInfo } from '../../../../types/services/academy.types';
import { DivisionCreateInfo } from '../../../../types/services/division.types';
import { getDropDownOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function NewFaculty({ onSubmit, academy_id }: IDivisionsAcademyType) {
  const [division, setDivision] = useState<DivisionCreateInfo>({
    id: '',
    academy_id: academy_id || '',
    code: '',
    description: '',
    division_type: 'FACULTY',
    name: '',
  });
  const { mutateAsync } = divisionStore.createDivision(division.division_type);
  const history = useHistory();

  function handleChange({ name, value }: ValueType) {
    setDivision((old) => ({ ...old, [name]: value }));
  }

  const academies: AcademyInfo[] | undefined =
    academyStore.fetchAcademies().data?.data.data;

  function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();
    mutateAsync(division, {
      onSuccess: () => {
        toast.success('Faculty created');
        history.goBack();
      },
      onError: () => {
        toast.error('something wrong happened while creating faculty');
      },
    });
    if (onSubmit) onSubmit(e);
  }
  return (
    <form onSubmit={submitForm}>
      {/* model name */}
      <InputMolecule
        required
        value={division.name}
        error=""
        handleChange={handleChange}
        name="name">
        Faculty name
      </InputMolecule>
      {/* model code
    {/* module description */}
      <TextAreaMolecule
        value={division.description}
        name="description"
        required
        handleChange={handleChange}>
        Description
      </TextAreaMolecule>

      {/* save button */}
      <div className="mt-5">
        <Button type="submit" full>
          Add
        </Button>
      </div>
    </form>
  );
}
