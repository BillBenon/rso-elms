import { AxiosResponse } from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import { divisionStore } from '../../../../store/divisions.store';
import { FormPropType, ParamType, Response, ValueType } from '../../../../types';
import {
  DivisionCreateInfo,
  DivisionInfo,
} from '../../../../types/services/division.types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function UpdateFaculty({ onSubmit }: FormPropType) {
  // const [form, setForm] = useState<DivisionInfo>({ name: '', description: '' });
  const { mutateAsync } = divisionStore.updateDivision();
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
      onSuccess: (newData) => {
        toast.success('Faculty updated', { duration: 3 });
        // queryClient.invalidateQueries(['divisions/type', division.division_type]);
        queryClient.setQueryData(['divisions/type', division?.division_type], (old) => {
          const previousData = old as AxiosResponse<Response<DivisionInfo[]>>;
          const newArr = previousData.data.data.map(
            (fac: DivisionInfo, index: number) => {
              if (fac.id === newData.data.data.id) {
                fac[index] = newData;
              }
              return fac;
            },
          );
          return previousData;
        });

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
