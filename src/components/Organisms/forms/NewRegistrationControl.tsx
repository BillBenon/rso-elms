import moment from 'moment';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';

import useAuthenticator from '../../../hooks/useAuthenticator';
import { queryClient } from '../../../plugins/react-query';
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
  const { user } = useAuthenticator();
  const history = useHistory();

  const [regControl, setRegControl] = useState<IRegistrationControlCreateInfo>({
    academy_id: '',
    description: '',
    expected_start_date: '',
    expected_end_date: '',
  });

  useEffect(() => {
    setRegControl((reg) => ({ ...reg, academy_id: user?.academy.id + '' }));
  }, [user?.academy.id]);

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
        startYear={moment().year() - 15}
        endYear={moment().year() + 15}
        reverse={false}
        handleChange={handleChange}
        name="expected_start_date">
        Start Date
      </DateMolecule>

      <DateMolecule
        handleChange={handleChange}
        startYear={moment(
          regControl.expected_start_date === ''
            ? undefined
            : regControl.expected_start_date,
        ).year()}
        defaultValue={
          regControl.expected_start_date === ''
            ? undefined
            : regControl.expected_start_date
        }
        endYear={moment().year() + 15}
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
