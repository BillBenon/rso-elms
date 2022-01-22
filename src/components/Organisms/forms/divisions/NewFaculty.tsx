import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import { divisionStore } from '../../../../store/administration/divisions.store';
import { IDivisionsAcademyType, ValueType } from '../../../../types';
import { DivisionCreateInfo } from '../../../../types/services/division.types';
import Button from '../../../Atoms/custom/Button';
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
  const { mutateAsync } = divisionStore.createDivision();
  const history = useHistory();

  function handleChange({ name, value }: ValueType) {
    setDivision((old) => ({ ...old, [name]: value }));
  }

  function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();
    mutateAsync(division, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        queryClient.invalidateQueries(['divisions', 'FACULTY', academy_id]);
        history.push('/dashboard/divisions');
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
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
