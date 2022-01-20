import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';

import useAuthenticator from '../../../../hooks/useAuthenticator';
import { queryClient } from '../../../../plugins/react-query';
import { eventStore } from '../../../../store/timetable/event.store';
import { GenericStatus, ValueType } from '../../../../types';
import { CreateEvent, eventCategory } from '../../../../types/services/event.types';
import { getDropDownStatusOptions } from '../../../../utils/getOption';
import { randomString } from '../../../../utils/random';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import SelectMolecule from '../../../Molecules/input/SelectMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function NewEvent() {
  const history = useHistory();

  const { user } = useAuthenticator();

  const [values, setvalues] = useState<CreateEvent>({
    code: randomString(8).toUpperCase(),
    description: '',
    eventCategory: eventCategory.VISIT,
    name: '',
    status: GenericStatus.ACTIVE,
    academyId: user?.academy.id + '',
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
        queryClient.invalidateQueries(['events']);
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
          Event title
        </InputMolecule>
        <InputMolecule
          name="code"
          placeholder="Event code"
          value={values.code}
          handleChange={handleChange}>
          Event code
        </InputMolecule>
        <div className="pb-4">
          <SelectMolecule
            value={values.eventCategory}
            name="eventCategory"
            handleChange={handleChange}
            options={getDropDownStatusOptions(eventCategory)}
            placeholder="Select event category">
            Event Category
          </SelectMolecule>
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
