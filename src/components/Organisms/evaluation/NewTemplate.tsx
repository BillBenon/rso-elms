import moment from 'moment';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import useAuthenticator from '../../../hooks/useAuthenticator';
import { queryClient } from '../../../plugins/react-query';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Heading from '../../Atoms/Text/Heading';
import InputMolecule from '../../Molecules/input/InputMolecule';

export default function NewTemplate() {
  const { user } = useAuthenticator();

  const [details, setDetails] = useState({
    name: '',
    allow_submission_time: '',
    due_on: '',
    marking_reminder_date: '',
    academy_id: user?.academy.id + '',
  });

  const history = useHistory();

  //   moment(value.toString()).format('YYYY-MM-DD HH:mm:ss')

  const { mutate: addTemplate } = evaluationStore.createTemplate();

  function handleChange({ name, value }: ValueType) {
    setDetails({
      ...details,
      [name]: value.toString(),
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    addTemplate(
      {
        name: details.name,
        academy_id: details.academy_id,
        allow_submission_time: moment(details.allow_submission_time).format(
          'YYYY-MM-DD HH:mm:ss',
        ),
        due_on: moment(details.due_on).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        onSuccess: () => {
          toast.success('Template created successfully');
          queryClient.invalidateQueries(['templates', user?.academy.id]);
          history.push('/dashboard/evaluations/templates');
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      },
    );
  }

  return (
    <form className="bg-main w-2/3 px-8 py-6" onSubmit={handleSubmit}>
      <Heading className="py-12" color="primary" fontWeight="bold">
        New Template
      </Heading>

      <InputMolecule
        value={details.name}
        name="name"
        handleChange={handleChange}
        placeholder="Quiz 1">
        Name
      </InputMolecule>

      <InputMolecule
        value={details.allow_submission_time}
        name="allow_submission_time"
        handleChange={handleChange}
        type="datetime-local">
        Allow submission time
      </InputMolecule>

      <InputMolecule
        value={details.due_on}
        handleChange={handleChange}
        type="datetime-local"
        name="due_on">
        Due on
      </InputMolecule>

      <InputMolecule
        value={details.marking_reminder_date}
        name={'marking_reminder_date'}
        type="datetime-local">
        Marking reminder date
      </InputMolecule>

      <Button type="submit">save</Button>
    </form>
  );
}
