import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import academyStore from '../../../store/academy.store';
import registrationControlStore from '../../../store/registrationControl.store';
import { CommonFormProps, ValueType } from '../../../types';
import { AcademyInfo } from '../../../types/services/academy.types';
import { IRegistrationControlCreateInfo } from '../../../types/services/registrationControl.types';
import { getDropDownOptions } from '../../../utils/getOption';
import Button from '../../Atoms/custom/Button';
import DateMolecule from '../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import RadioMolecule from '../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';

interface PropType<K> extends CommonFormProps<K> {}

export default function NewRegistrationControl<E>({ onSubmit }: PropType<E>) {
  const { mutateAsync } = registrationControlStore.createRegControl();

  const [regControl, setRegControl] = useState<IRegistrationControlCreateInfo>({
    academy_id: '',
    description: '',
    actual_start_date: '',
    actual_end_date: '',
    expected_start_date: '',
    expected_end_date: '',
    id: '',
  });

  function handleChange(e: ValueType) {
    console.log(e);
    setRegControl((regControl) => ({ ...regControl, [e.name]: e.value }));
  }

  const academies: AcademyInfo[] | undefined =
    academyStore.fetchAcademies().data?.data.data;

  function submitForm(e: FormEvent) {
    e.preventDefault();
    mutateAsync(regControl, {
      onSuccess: () => {
        toast.success('Registration control created', { duration: 8 });
      },
      onError: () => {
        toast.error('something wrong happened while creating role', { duration: 3 });
      },
    });

    if (onSubmit) onSubmit(e);
  }

  return (
    <form onSubmit={submitForm}>
      <TextAreaMolecule
        value={regControl.description}
        name="description"
        handleChange={handleChange}>
        Registration control description
      </TextAreaMolecule>
      <DateMolecule
        startYear={new Date().getFullYear()}
        endYear={2040}
        reverse={false}
        handleChange={handleChange}
        name={'expected_start_date'}>
        Expected Start Date
      </DateMolecule>

      <DateMolecule
        handleChange={handleChange}
        startYear={new Date().getFullYear()}
        endYear={2040}
        reverse={false}
        name={'expected_end_date'}>
        Expected End Date
      </DateMolecule>

      <DropdownMolecule
        defaultValue={regControl.academy_id}
        options={getDropDownOptions(academies)}
        name="academy_id"
        placeholder={'Academy to be enrolled'}
        handleChange={handleChange}>
        Academy
      </DropdownMolecule>

      <RadioMolecule
        className="mt-4"
        value="ACTIVE"
        name="status"
        options={[
          { label: 'Active', value: 'ACTIVE' },
          { label: 'Inactive', value: 'INACTIVE' },
        ]}
        handleChange={handleChange}>
        Status
      </RadioMolecule>

      <div className="mt-5">
        <Button type="submit" full>
          Save
        </Button>
      </div>
    </form>
  );
}
