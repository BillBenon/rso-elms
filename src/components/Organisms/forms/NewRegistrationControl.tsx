import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';

import { queryClient } from '../../../plugins/react-query';
import { authenticatorStore } from '../../../store/administration';
import registrationControlStore from '../../../store/administration/registrationControl.store';
import { CommonFormProps, ValueType } from '../../../types';
import { IRegistrationControlCreateInfo } from '../../../types/services/registrationControl.types';
import Button from '../../Atoms/custom/Button';
import DateMolecule from '../../Molecules/input/DateMolecule';
import RadioMolecule from '../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';

interface PropType<K> extends CommonFormProps<K> {}

export default function NewRegistrationControl<E>({ onSubmit }: PropType<E>) {
  const { mutateAsync, isLoading } = registrationControlStore.createRegControl();
  const { data } = authenticatorStore.authUser();
  const history = useHistory();

  const [regControl, setRegControl] = useState<IRegistrationControlCreateInfo>({
    academy_id: data?.data.data.academy.id.toString() || '',
    description: '',
    expected_start_date: '',
    expected_end_date: '',
  });

  function handleChange(e: ValueType) {
    setRegControl((regControl) => ({ ...regControl, [e.name]: e.value }));
  }

  function submitForm(e: FormEvent) {
    e.preventDefault();
    let toastId = toast.loading('Creating registration control');
    mutateAsync(regControl, {
      onSuccess: () => {
        toast.success('Registration control created', { id: toastId });
        queryClient.invalidateQueries(['regControl/academyId']);
        history.goBack();
      },
      onError: (error: any) => {
        toast.error(error.response.data.message, { id: toastId });
      },
    });

    if (onSubmit) onSubmit(e);
  }

  return (
    <form onSubmit={submitForm}>
      <TextAreaMolecule
        required
        value={regControl.description}
        name="description"
        handleChange={handleChange}>
        Registration control description
      </TextAreaMolecule>
      <DateMolecule
        startYear={new Date().getFullYear()}
        endYear={new Date().getFullYear() + 15}
        reverse={false}
        handleChange={handleChange}
        name={'expected_start_date'}>
        Start Date
      </DateMolecule>

      <DateMolecule
        handleChange={handleChange}
        startYear={new Date(regControl.expected_start_date).getFullYear()}
        endYear={new Date().getFullYear() + 15}
        reverse={false}
        name={'expected_end_date'}>
        End Date
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
        <Button type="submit" disabled={isLoading} full>
          Save
        </Button>
      </div>
    </form>
  );
}
