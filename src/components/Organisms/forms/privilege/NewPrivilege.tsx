import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { privilegeStore } from '../../../../store/administration';
import {
  ParamType,
  PrivilegeFeatureType,
  PrivilegeStatus,
  PrivilegeUpdate,
  SelectData,
  ValueType,
} from '../../../../types';
import { privilegeSchema } from '../../../../validations/privilege.validation';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface PropType {
  onSubmit: <E>(_e: FormEvent<E>) => void;
}

interface PrivErrors extends Pick<PrivilegeUpdate, 'name' | 'description'> {
  feature_type: string;
}

export default function NewPrivilege({ onSubmit }: PropType) {
  const history = useHistory();
  const [form, setForm] = useState<PrivilegeUpdate>({
    description: '',
    name: '',
    feature_type: PrivilegeFeatureType.ADMIN,
    id: '',
    status: PrivilegeStatus.ACTIVE,
  });

  const initialErrorState: PrivErrors = {
    name: '',
    description: '',
    feature_type: '',
  };

  const [errors, setErrors] = useState<PrivErrors>(initialErrorState);

  const { id } = useParams<ParamType>();

  const { data } = privilegeStore.getPrivilege(id);

  useEffect(() => {
    data?.data.data && setForm(data?.data.data);
  }, [data]);

  const { mutate } = privilegeStore.modifyPrivilege();
  const featureType: SelectData[] = [
    { value: 'ADMIN', label: 'ADMIN' },
    { value: 'EVALUATION', label: 'EVALUATION' },
    { value: 'REPORTING', label: 'REPORTING' },
    { value: 'INTERACTIVE_LEARNIN', label: 'INTERACTIVE_LEARNIN' },
  ];

  function handleChange({ name, value }: ValueType) {
    setForm((old) => ({ ...old, [name]: value }));
  }
  function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();

    const validatedForm = privilegeSchema.validate(form, {
      abortEarly: false,
    });

    validatedForm
      .then(() => {
        mutate(form, {
          onSuccess: () => {
            toast.success('Privilege updated');
            history.goBack();
            // TODO: @liberi to fix this function which is not reachable
          },
          onError: (error: any) => {
            toast.error(error.response.data.message);
          },
        });
        onSubmit(e);
      })
      .catch((err) => {
        const validatedErr: PrivErrors = initialErrorState;
        err.inner.map((el: { path: string | number; message: string }) => {
          validatedErr[el.path as keyof PrivErrors] = el.message;
        });
        setErrors(validatedErr);
      });
  }
  return (
    <form onSubmit={submitForm}>
      {/* model name */}
      <InputMolecule
        required={false}
        disabled
        value={form.name}
        error={errors.name}
        handleChange={handleChange}
        name="name">
        Privilege name
      </InputMolecule>
      <DropdownMolecule
        error={errors.feature_type}
        handleChange={handleChange}
        name="feature_type"
        options={featureType}>
        Role type
      </DropdownMolecule>
      {/* model code
    {/* module description */}
      <TextAreaMolecule
        error={errors.description}
        value={form.description}
        name="description"
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
