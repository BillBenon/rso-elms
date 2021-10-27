import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import { levelStore } from '../../../../store/level.store';
import { IDivisionsAcademyType, ValueType } from '../../../../types';
import { IcreateLevel } from '../../../../types/services/levels.types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

function NewLevel({ onSubmit, academy_id }: IDivisionsAcademyType) {
  const [level, setLevel] = useState<IcreateLevel>({
    academy_id: academy_id || '',
    code: '',
    description: '',
    name: '',
    id: '',
    flow: 0,
  });

  const history = useHistory();
  const { mutateAsync } = levelStore.addLevel();

  function handleChange(e: ValueType) {
    setLevel({ ...level, [e.name]: e.value });
  }

  function submitForm(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:

    mutateAsync(level, {
      onSuccess: () => {
        toast.success('Level created');
        queryClient.invalidateQueries(['levels/academy']);
        history.goBack();
      },
      onError: (error) => {
        console.log(error);
        toast.error('something wrong happened while creating level');
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

export default NewLevel;
