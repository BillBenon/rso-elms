import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { lessonStore } from '../../../../store/lesson.store';
import { subjectStore } from '../../../../store/subject.store';
import { ValueType } from '../../../../types';
import { Lesson } from '../../../../types/services/lesson.types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface ParamType {
  subjectId: string;
  id: string;
}

export default function NewLessonForm() {
  const { id, subjectId } = useParams<ParamType>();
  console.log('====================================');
  console.log(subjectId);
  console.log('====================================');

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
        history.go(-2);
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
        name="lesson-name">
        Lesson title
      </InputMolecule>
      <TextAreaMolecule
        required
        value={lesson.content}
        name="description"
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
