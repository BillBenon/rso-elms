import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { privilegeStore } from '../../../../store';
import {
  ParamType,
  PrivilegeFeatureType,
  PrivilegeStatus,
  PrivilegeUpdate,
  SelectData,
  ValueType,
} from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface PropType {
  onSubmit: <E>(_e: FormEvent<E>) => void;
}

export default function NewPrivilege({ onSubmit }: PropType) {
  const history = useHistory();
  const [form, setForm] = useState<PrivilegeUpdate>({
    description: '',
    name: 's',
    feature_type: PrivilegeFeatureType.ADMIN,
    id: '',
    status: PrivilegeStatus.ACTIVE,
  });

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
    mutate(form, {
      onSuccess: () => {
        toast.success('Privilege updated', { duration: 3 });
        history.goBack();
        // TODO: @liberi to fix this function which is not reachable
      },
      onError: () => {
        toast.error('something wrong happened while updating privilage', { duration: 3 });
      },
    });
    onSubmit(e);
  }
  return (
    <form onSubmit={submitForm}>
      {/* model name */}
      <InputMolecule
        required
        disabled
        value={form.name}
        error=""
        handleChange={handleChange}
        name="name">
        Privilege name
      </InputMolecule>
      <DropdownMolecule
        handleChange={handleChange}
        defaultValue={form.feature_type}
        name="feature_type"
        options={featureType}>
        Role type
      </DropdownMolecule>
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
