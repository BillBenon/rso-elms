/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { levelStore } from '../../../../store/level.store';
import { CommonFormProps, ValueType } from '../../../../types';
import { IcreateLevel } from '../../../../types/services/levels.types';
import Button from '../../../Atoms/custom/Button';
import Icon from '../../../Atoms/custom/Icon';
import ILabel from '../../../Atoms/Text/ILabel';
import InputMolecule from '../../../Molecules/input/InputMolecule';
interface PropType<K> extends CommonFormProps<K> {}

function NewLevel<E>({ onSubmit }: PropType<E>) {
  const [level, setLevel] = useState<IcreateLevel>({
    academy_id: '',
    code: '',
    description: '',
    name: '',
  });

  const history = useHistory();
  const { mutateAsync } = levelStore.addLevel();

  function handleChange(e: ValueType) {
    setLevel({ ...level, [e.name]: e.value });
  }

  function submitForm(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:
    e.preventDefault();
    mutateAsync(level, {
      onSuccess: () => {
        toast.success('level created', { duration: 3 });
        history.goBack();
      },
      onError: () => {
        toast.error('something wrong happened while creating level', { duration: 3 });
      },
    });
    if (onSubmit) onSubmit(e);
  }

  function addNewLevel(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:
    submitForm(e);
  }

  return (
    <form onSubmit={submitForm}>
      <InputMolecule
        value={level.name}
        handleChange={handleChange}
        placeholder="Enter level name"
        name="level-name">
        Level name
      </InputMolecule>
      <InputMolecule
        value={level.code}
        error=""
        handleChange={handleChange}
        placeholder="Enter level code"
        name="level-name">
        Level code
      </InputMolecule>
      <div className="flex items-center justify-end" onClick={addNewLevel}>
        <Icon name="add" size={15} />
        <ILabel size="sm" weight="medium" className="cursor-pointer" color="primary">
          Add new level
        </ILabel>
      </div>
      <Button>Save</Button>
    </form>
  );
}

export default NewLevel;
