import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { divisionStore } from '../../../../store/divisions.store';
import { FormPropType, ValueType } from '../../../../types';
import { DivisionCreateInfo } from '../../../../types/services/division.types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface INewFaculty extends FormPropType {
  handleAfterCreate: () => void;
}

export default function NewFaculty({ onSubmit, handleAfterCreate }: INewFaculty) {
  const [division, setDivision] = useState<DivisionCreateInfo>({
    academy_id: '48d3fec8-bfed-40f7-aa70-58ccfe4238d8',
    code: '',
    description: '',
    division_type: 'FACULTY',
    id: '',
    name: '',
    parent_id: 'e18abdba-0004-46bb-ae82-c4a96981ee8d',
  });
  const { mutateAsync } = divisionStore.createDivision();
  const history = useHistory();

  function handleChange({ name, value }: ValueType) {
    setDivision((old) => ({ ...old, [name]: value }));
  }
  function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();
    mutateAsync(division, {
      onSuccess: () => {
        toast.success('Role created', { duration: 3 });
        handleAfterCreate();
        history.goBack();
      },
      onError: () => {
        toast.error('something wrong happened while creating role', { duration: 3 });
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
        Descripiton
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
