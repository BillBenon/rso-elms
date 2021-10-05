import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { divisionStore } from '../../../../store/divisions.store';
import { FormPropType, ParamType, ValueType } from '../../../../types';
import { DivisionCreateInfo } from '../../../../types/services/division.types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function UpdateFaculty({ onSubmit }: FormPropType) {
  // const [form, setForm] = useState<DivisionInfo>({ name: '', description: '' });
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
  });

  const { mutateAsync } = divisionStore.updateDivision(division.division_type);

  const updateDivisionInfo: any = {
    academy_id: division.academy?.id,
    code: '',
    description: division.description,
    division_type: 'FACULTY',
    id: id,
    name: division.name,
  };

  useEffect(() => {
    data?.data && setDivision(data?.data.data);
  }, [data]);

  function handleChange({ name, value }: ValueType) {
    setDivision((old) => ({ ...old, [name]: value }));
  }
  function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();
    mutateAsync(updateDivisionInfo, {
      onSuccess: () => {
        toast.success('Faculty updated', { duration: 3 });
        history.goBack();
      },
      onError: () => {
        toast.error('something wrong happened while updaing faculty', { duration: 3 });
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
