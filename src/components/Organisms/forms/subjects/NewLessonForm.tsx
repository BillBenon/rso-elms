import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import { lessonStore } from '../../../../store/lesson.store';
import { subjectStore } from '../../../../store/subject.store';
import { ValueType } from '../../../../types';
import { Lesson } from '../../../../types/services/lesson.types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function NewLessonForm() {
  const { url } = useRouteMatch();

  const urlArray = url.split('/');
  const subjectId = urlArray[urlArray.length - 2];

  const subject = subjectStore.getSubject(subjectId).data?.data.data;
  const { mutateAsync } = lessonStore.addLesson();
  const history = useHistory();

  const [lesson, setlesson] = useState<Lesson>({
    content: '',
    id: '',
    subject_id: subjectId,
    title: '',
  });

  function handleChange(e: ValueType) {
    setlesson({ ...lesson, [e.name]: e.value });
  }

  async function submitForm(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:

    await mutateAsync(lesson, {
      async onSuccess(data) {
        toast.success(data.data.message);
        queryClient.invalidateQueries(['lessons/subject/id']);
        history.go(-1);
      },
      onError() {
        toast.error('error occurred please try again');
      },
    });
  }

  return (
    <form onSubmit={submitForm}>
      <InputMolecule
        name="subject_id"
        readOnly
        handleChange={handleChange}
        value={subject?.title || ''}
        disabled>
        Subject
      </InputMolecule>
      <InputMolecule
        value={lesson.title}
        required
        handleChange={handleChange}
        name="title">
        Lesson title
      </InputMolecule>
      <TextAreaMolecule
        required
        value={lesson.content}
        name="content"
        handleChange={handleChange}>
        Lesson description
      </TextAreaMolecule>
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
          Add
        </Button>
      </div>
    </form>
  );
}
