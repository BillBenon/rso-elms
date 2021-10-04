import React, { FormEvent } from 'react';
import { useParams } from 'react-router-dom';

import { subjectStore } from '../../../../store/subject.store';
import { ValueType } from '../../../../types';
import { getDropDownOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import DropDown from '../../../Atoms/Input/Dropdown';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface ParamType {
  id: string;
}

export default function NewLessonForm() {
  const { id } = useParams<ParamType>();
  const subject = subjectStore.getSubject(id).data?.data.data;

  function handleChange(_e: ValueType) {}

  function submitForm(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:
  }

  return (
    <form onSubmit={submitForm}>
      {/* TODO: use readonly dropdown to indicate module name */}
      <DropDown
        name="subject_id"
        defaultValue={getDropDownOptions([subject])[0]}
        options={getDropDownOptions([subject])}
        handleChange={(_e: ValueType) => {}}
        disabled
      />

      {/* model name */}
      <InputMolecule value="" error="" handleChange={handleChange} name="lesson-name">
        Lesson name
      </InputMolecule>
      {/* model code

      {/* module description */}
      <TextAreaMolecule value="" name="description" handleChange={handleChange}>
        Lesson description
      </TextAreaMolecule>
      {/* program
      <DropdownMolecule name="radio" handleChange={handleChange}>
        Program
      </DropdownMolecule> */}
      {/* model initial status */}
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

      {/* TODO: checkbox, where user could choose subject  */}

      {/* save button */}
      <div className="mt-5">
        <Button type="submit" full>
          Add
        </Button>
      </div>
    </form>
  );
}
