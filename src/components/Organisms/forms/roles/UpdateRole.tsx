import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { roleStore } from '../../../../store';
import { CreateRoleReq, FormPropType, ParamType, ValueType } from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function UpdateRole({ onSubmit }: FormPropType) {
  const [form, setForm] = useState<CreateRoleReq>({ name: '', description: '' });
  const { mutateAsync } = roleStore.modifyRole();
  const history = useHistory();

  const { id } = useParams<ParamType>();

  const { data } = roleStore.getRole(id);

  useEffect(() => {
    data?.data.data && setForm({ ...data?.data.data });
  }, [data]);

  function handleChange({ name, value }: ValueType) {
    setForm((old) => ({ ...old, [name]: value }));
  }

  function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();
    mutateAsync(form, {
      onSuccess: () => {
        toast.success('Role updated', { duration: 3 });
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
        value={form.name}
        error=""
        handleChange={handleChange}
        name="name">
        Role name
      </InputMolecule>
      {/* model code
    {/* module description */}
      <TextAreaMolecule
        value={form.description}
        name="description"
        required
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
