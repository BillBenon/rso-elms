import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import { divisionStore } from '../../../../store/administration/divisions.store';
import { IDivisionsAcademyType, ParamType, ValueType } from '../../../../types';
import { DivisionCreateInfo } from '../../../../types/services/division.types';
import { getDropDownOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function UpdateDepartment({ onSubmit }: IDivisionsAcademyType) {
  const history = useHistory();

  const { id } = useParams<ParamType>();

  const { data } = divisionStore.getDivision(id);

  const [division, setDivision] = useState<DivisionCreateInfo>({
    academy_id: '',
    code: '',
    description: '',
    division_type: 'DEPARTMENT',
    id: '',
    name: '',
    parent_id: '',
  });

  const { mutateAsync } = divisionStore.updateDivision();

  const updateDivisionInfo: any = {
    academy_id: division.academy?.id,
    code: '',
    description: division.description,
    division_type: 'DEPARTMENT',
    id: id,
    name: division.name,
    parent_id: division.parent_id,
  };

  useEffect(() => {
    data?.data && setDivision(data?.data.data);
  }, [data]);

  const departments = divisionStore.getDivisionByType('FACULTY').data?.data.data;

  function handleChange({ name, value }: ValueType) {
    setDivision((old) => ({ ...old, [name]: value }));
  }
  function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();
    mutateAsync(updateDivisionInfo, {
      onSuccess: () => {
        toast.success('Department updated');
        queryClient.invalidateQueries(['divisions/type', division.division_type]);

        history.goBack();
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
    if (onSubmit) onSubmit(e);
  }
  return (
    <form onSubmit={submitForm}>
      <InputMolecule
        required
        value={division.name}
        error=""
        handleChange={handleChange}
        name="name">
        Department name
      </InputMolecule>
      <TextAreaMolecule
        value={division.description}
        name="description"
        required
        handleChange={handleChange}>
        Descripiton
      </TextAreaMolecule>

      <DropdownMolecule
        width="82"
        placeholder="Select faculty"
        options={getDropDownOptions({ inputs: departments || [] })}
        name="parent_id"
        handleChange={handleChange}>
        Faculty
      </DropdownMolecule>
      <div className="mt-5">
        <Button type="submit" full>
          Add
        </Button>
      </div>
    </form>
  );
}
