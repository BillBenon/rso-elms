import React, { FormEvent } from 'react';

import { CommonFormProps, ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import DateMolecule from '../../Molecules/input/DateMolecule';
// import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../Molecules/input/InputMolecule';
import RadioMolecule from '../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';

interface PropType<K> extends CommonFormProps<K> {}

export default function NewRegistrationControl<E>({ onSubmit }: PropType<E>) {
  const [regControl, setRegControl] = useState({});
  6;
  function handleChange(e: ValueType) {
    console.log(e);
  }

  function submitForm(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:
    if (onSubmit) onSubmit(e);
  }

  return (
    <form onSubmit={submitForm}>
      <TextAreaMolecule value="" name="description" handleChange={handleChange}>
        Registration control description
      </TextAreaMolecule>
      <DateMolecule handleChange={handleChange} name={'startDate'}>
        Start Date
      </DateMolecule>

      <DateMolecule handleChange={handleChange} name={'endDate'}>
        End Date
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
