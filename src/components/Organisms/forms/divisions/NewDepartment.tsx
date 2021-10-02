import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import academyStore from '../../../../store/academy.store';
import { divisionStore } from '../../../../store/divisions.store';
import { FormPropType, ValueType } from '../../../../types';
import { AcademyInfo } from '../../../../types/services/academy.types';
import { DivisionCreateInfo } from '../../../../types/services/division.types';
import { getDropDownOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface INewDepartment extends FormPropType {
  handleAfterCreate: () => void;
}

export default function NewDepartment({ onSubmit, handleAfterCreate }: INewDepartment) {
  const [division, setDivision] = useState<DivisionCreateInfo>({
    academy_id: '',
    code: '',
    description: '',
    division_type: 'DEPARTMENT',
    id: '',
    name: '',
    parent_id: '',
  });
  const { mutateAsync } = divisionStore.createDivision();
  const history = useHistory();

  function handleChange({ name, value }: ValueType) {
    setDivision((old) => ({ ...old, [name]: value }));
  }

  const academies: AcademyInfo[] | undefined =
    academyStore.fetchAcademies().data?.data.data;

  const departments = divisionStore.getDivisionByType('FACULTY').data?.data.data;

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
        Department name
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

      <DropdownMolecule
        defaultValue={division.academy_id}
        options={getDropDownOptions(academies)}
        name="academy_id"
        placeholder={'Academy to be enrolled'}
        handleChange={handleChange}>
        Academy
      </DropdownMolecule>

      <DropdownMolecule
        width="82"
        placeholder="Select department"
        options={getDropDownOptions(departments)}
        name="parent_id"
        handleChange={handleChange}>
        Department
      </DropdownMolecule>

      {/* save button */}
      <div className="mt-5">
        <Button type="submit" full>
          Add
        </Button>
      </div>
    </form>
  );
}
