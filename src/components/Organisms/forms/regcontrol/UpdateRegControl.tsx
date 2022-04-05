import moment from 'moment';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import registrationControlStore from '../../../../store/administration/registrationControl.store';
import { FormPropType, ParamType, ValueType } from '../../../../types';
import {
  IRegistrationControlCreateInfo,
  RegErrors,
} from '../../../../types/services/registrationControl.types';
import { newRegControlSchema } from '../../../../validations/regcontrol.validation';
import Button from '../../../Atoms/custom/Button';
import DateMolecule from '../../../Molecules/input/DateMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

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

  const initialErrorState: RegErrors = {
    expected_start_date: '',
    expected_end_date: '',
  };

  const [errors, setErrors] = useState(initialErrorState);

  const { mutateAsync, isLoading } = registrationControlStore.updateRegControl();
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
    const validatedForm = newRegControlSchema.validate(regControl, {
      abortEarly: false,
    });

    validatedForm
      .then(() => {
        let toastId = toast.loading('Creating registration control');
        mutateAsync(regControlUpdateInfo, {
          onSuccess: () => {
            toast.success('Control updated', { id: toastId });
            history.goBack();
          },
          onError: (error: any) => {
            toast.error(error.response.data.message, { id: toastId });
          },
        });
        if (onSubmit) onSubmit(e);
      })
      .catch((err) => {
        const validatedErr: RegErrors = initialErrorState;
        err.inner.map((el: { path: string | number; message: string }) => {
          validatedErr[el.path as keyof RegErrors] = el.message;
        });
        setErrors(validatedErr);
      });
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
        error={errors.expected_start_date}
        defaultValue={regControl.expected_start_date}
        startYear={moment().year() - 15}
        endYear={moment().year() + 15}
        handleChange={handleChange}
        name={'expected_start_date'}>
        Start Date
      </DateMolecule>

      <DateMolecule
        error={errors.expected_end_date}
        handleChange={handleChange}
        startYear={moment(
          regControl.expected_start_date === ''
            ? undefined
            : regControl.expected_start_date,
        ).year()}
        endYear={
          moment(
            regControl.expected_start_date === ''
              ? undefined
              : regControl.expected_start_date,
          ).year() + 15
        }
        defaultValue={regControl.expected_end_date}
        name={'expected_end_date'}>
        End Date
      </DateMolecule>

      {/* <RadioMolecule
        className="mt-4"
        value="ACTIVE"
        name="status"
        options={[
          { label: 'Active', value: 'ACTIVE' },
          { label: 'Inactive', value: 'INACTIVE' },
        ]}
        handleChange={handleChange}>
        Status
      </RadioMolecule> */}

      <div className="mt-5">
        <Button type="submit" disabled={isLoading} full>
          Save
        </Button>
      </div>
    </form>
  );
}
