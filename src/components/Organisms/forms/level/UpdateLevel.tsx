/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import { levelStore } from '../../../../store/level.store';
import { IDivisionsAcademyType, ParamType, ValueType } from '../../../../types';
import { IcreateLevel } from '../../../../types/services/levels.types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function UpdateLevel({ onSubmit, academy_id }: IDivisionsAcademyType) {
  const { mutateAsync } = levelStore.modifyLevel();
  const history = useHistory();
  const [level, setLevels] = useState<IcreateLevel>({
    name: 'messi',
    description: '',
    id: '',
    academy_id: academy_id || '',
    code: '',
    flow: 0,
  });

  const { id } = useParams<ParamType>();

  const { data } = levelStore.getLevelById(id);

  useEffect(() => {
    data?.data.data && setLevels({ ...data?.data.data });
  }, [data]);

  function handleChange(e: ValueType) {
    setLevels((old) => ({ ...old, [e.name]: e.value }));
  }

  function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();
    mutateAsync(level, {
      onSuccess: () => {
        queryClient.invalidateQueries(['levels']);
        toast.success('Level updated');
        history.goBack();
      },
      onError: () => {
        toast.error('something wrong happened while creating role');
      },
    });
    if (onSubmit) onSubmit(e);
  }

  return (
    <form onSubmit={submitForm}>
      <InputMolecule
        value={level.name}
        required
        handleChange={handleChange}
        placeholder="Enter level name"
        name="name">
        Level name
      </InputMolecule>

      <TextAreaMolecule
        value={level.description}
        name="description"
        required
        handleChange={handleChange}>
        Descripiton
      </TextAreaMolecule>

      <InputMolecule
        value={level.flow}
        required
        type="number"
        min={1}
        handleChange={handleChange}
        placeholder="Enter level flow"
        name="flow">
        Flow
      </InputMolecule>
      <Button>Save</Button>
    </form>
  );
}
