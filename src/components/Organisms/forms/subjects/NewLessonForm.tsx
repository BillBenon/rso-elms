import React, { FormEvent } from 'react';
import { useParams } from 'react-router-dom';

import { subjectStore } from '../../../../store/subject.store';
import { ParamType, ValueType } from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function NewLessonForm() {
  const { id } = useParams<ParamType>();
  const subject = subjectStore.getSubject(id).data?.data.data;

  // const [lesson, setlesson] = useState({

  // })

  function handleChange(_e: ValueType) {}

  function submitForm(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:
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
      <InputMolecule value="" error="" handleChange={handleChange} name="lesson-name">
        Lesson name
      </InputMolecule>
      <TextAreaMolecule value="" name="description" handleChange={handleChange}>
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
