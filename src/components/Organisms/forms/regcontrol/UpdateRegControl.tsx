import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import registrationControlStore from '../../../../store/registrationControl.store';
import { FormPropType, ValueType } from '../../../../types';
import {
  IRegistrationControlCreateInfo,
  IRegistrationControlInfo,
} from '../../../../types/services/registrationControl.types';
import Button from '../../../Atoms/custom/Button';
import DateMolecule from '../../../Molecules/input/DateMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface ParamType {
  id: string;
}

export default function UpdateRegControl({ onSubmit }: FormPropType) {
  const { id } = useParams<ParamType>();

  const [regControl, setRegControl] = useState<IRegistrationControlCreateInfo>({
    academy_id: '',
    description: '',
    expected_start_date: '',
    expected_end_date: '',
  });

  const regControlUpdateInfo: any = {
    academy_id: regControl.academy?.id,
    description: regControl.description,
    expected_start_date: regControl.expected_start_date,
    expected_end_date: regControl.expected_end_date,
    id: id,
  };

  const { mutateAsync } = registrationControlStore.updateRegControl();
  const history = useHistory();

  const { data } = registrationControlStore.fetchRegControlById(id);

  useEffect(() => {
    data?.data.data && setRegControl({ ...data?.data.data });
  }, [data]);

  function handleChange({ name, value }: ValueType) {
    setRegControl((old) => ({ ...old, [name]: value }));
  }

  function submitForm<T>(e: FormEvent<T>) {
    const toastId = toast.loading('updating registration control');
    e.preventDefault();
    mutateAsync(regControlUpdateInfo, {
      onSuccess: () => {
        toast.success('registration control updated', { id: toastId });
        history.goBack();
      },
      onError: (error) => {
        toast.error(error + '', { id: toastId });
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
        defaultValue={regControl.expected_start_date}
        padding={3}
        handleChange={handleChange}
        name={'expected_start_date'}>
        Start Date
      </DateMolecule>

      <DateMolecule
        handleChange={handleChange}
        padding={3}
        endYear={new Date().getFullYear() + 15}
        defaultValue={regControl.expected_end_date}
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
        <Button type="submit" full>
          Save
        </Button>
      </div>
    </form>
  );
}
