import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { divisionStore } from '../../../../store/divisions.store';
import { FormPropType, ParamType, ValueType } from '../../../../types';
import {
  DivisionCreateInfo,
  DivisionInfo,
} from '../../../../types/services/division.types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface INewFaculty extends FormPropType {
  handleAfterCreate: () => void;
}

export default function UpdateFaculty({ onSubmit, handleAfterCreate }: INewFaculty) {
  // const [form, setForm] = useState<DivisionInfo>({ name: '', description: '' });
  // const { mutateAsync } = roleStore.modifyRole();
  const history = useHistory();

  const { id } = useParams<ParamType>();

  const { data } = divisionStore.getDivision(id);

  const [division, setDivision] = useState<DivisionCreateInfo>({
    academy_id: '',
    code: '',
    description: '',
    division_type: 'FACULTY',
    id: '',
    name: '',
    parent_id: '',
  });

  useEffect(() => {
    data?.data.data && setDivision({ ...data?.data.data });
  }, [data]);

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
