import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';

import { eventStore } from '../../../store/timetable/event.store';
import { GenericStatus, ValueType } from '../../../types';
import { CreateEvent, eventCategory } from '../../../types/services/event.types';
import { getDropDownStatusOptions } from '../../../utils/getOption';
import { randomString } from '../../../utils/random-text';
import Button from '../../Atoms/custom/Button';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';

export default function NewEvent() {
  const history = useHistory();

  const [values, setvalues] = useState<CreateEvent>({
    code: randomString(8).toUpperCase(),
    description: '',
    eventCategory: eventCategory.VISIT,
    name: '',
    status: GenericStatus.ACTIVE,
  });

  const { mutateAsync, isLoading } = eventStore.createEvent();

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
    await mutateAsync(values, {
      async onSuccess(_data) {
        toast.success('Event was created successfully');
        history.goBack();
      },
      onError() {
        toast.error('error occurred please try again');
      },
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputMolecule
          name="name"
          placeholder="Event title"
          value={values.name}
          handleChange={handleChange}>
          Intake title
        </InputMolecule>
        <div className="pb-4">
          <DropdownMolecule
            name="eventCategory"
            handleChange={handleChange}
            options={getDropDownStatusOptions(eventCategory)}
            placeholder="Select event category">
            Event Category
          </DropdownMolecule>
        </div>
        <TextAreaMolecule
          name="description"
          placeholder="Event Description"
          value={values.description}
          handleChange={handleChange}>
          Event Description
        </TextAreaMolecule>
        <div className="pt-4">
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
