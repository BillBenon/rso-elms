import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import registrationControlStore from '../../../../store/registrationControl.store';
import { FormPropType, ValueType } from '../../../../types';
import { IRegistrationControlCreateInfo } from '../../../../types/services/registrationControl.types';
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
    actual_start_date: '',
    actual_end_date: '',
    expected_start_date: '',
    expected_end_date: '',
    id: id,
  });

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
    e.preventDefault();
    mutateAsync(regControl, {
      onSuccess: () => {
        toast.success('Role updated', { duration: 3 });
        history.goBack();
      },
      onError: () => {
        toast.error('something wrong happened while updating a control', { duration: 3 });
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
        handleChange={handleChange}
        name={'expected_start_date'}>
        Expected Start Date
      </DateMolecule>

      <DateMolecule handleChange={handleChange} name={'expected_end_date'}>
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
