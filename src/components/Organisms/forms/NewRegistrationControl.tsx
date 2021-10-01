import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import registrationControlStore from '../../../store/registrationControl.store';
import { CommonFormProps, ValueType } from '../../../types';
import { IRegistrationControlCreateInfo } from '../../../types/services/registrationControl.types';
import Button from '../../Atoms/custom/Button';
import DateMolecule from '../../Molecules/input/DateMolecule';
import RadioMolecule from '../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';

interface PropType<K> extends CommonFormProps<K> {}

export default function NewRegistrationControl<E>({ onSubmit }: PropType<E>) {
  const { mutateAsync } = registrationControlStore.createRegControl();

  const [regControl, setRegControl] = useState<IRegistrationControlCreateInfo>({
    academy_id: '48d3fec8-bfed-40f7-aa70-58ccfe4238d8',
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
