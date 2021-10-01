/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FormEvent } from 'react';

import { CommonFormProps, ValueType } from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import Icon from '../../../Atoms/custom/Icon';
import ILabel from '../../../Atoms/Text/ILabel';
import InputMolecule from '../../../Molecules/input/InputMolecule';
interface PropType<K> extends CommonFormProps<K> {}

function NewLevel<E>({ onSubmit }: PropType<E>) {
  function handleChange(_e: ValueType) {}

  function submitForm(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:
    if (onSubmit) onSubmit(e);
  }

  function addNewLevel(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:
    submitForm(e);
  }

  return (
    <form onSubmit={submitForm}>
      <InputMolecule
        value=""
        error=""
        handleChange={handleChange}
        placeholder="Enter level name"
        name="level-name">
        Level name
      </InputMolecule>
      <InputMolecule
        value=""
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
