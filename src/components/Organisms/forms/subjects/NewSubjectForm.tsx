import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';

import { queryClient } from '../../../../plugins/react-query';
import { moduleStore } from '../../../../store/administration/modules.store';
import { subjectStore } from '../../../../store/administration/subject.store';
import { ParamType, ValueType } from '../../../../types';
import { SubjectInfo } from '../../../../types/services/subject.types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function NewSubjectForm() {
  const { id } = useParams<ParamType>();

  const { mutateAsync, isLoading } = subjectStore.addSubject();
  const history = useHistory();
  const module = moduleStore.getModuleById(id).data?.data.data;

  const [subject, setsubject] = useState<SubjectInfo>({
    content: '',
    module_id: id,
    title: '',
  });

  function handleChange(e: ValueType) {
    setsubject({ ...subject, [e.name]: e.value });
  }

  const handleSubmit = async () => {
    await mutateAsync(subject, {
      async onSuccess(data) {
        toast.success(data.data.message);
        queryClient.invalidateQueries(['subjects/moduleId']);
        history.goBack();
        // history.push(
        //   `/dashboard/modules/${module?.id}/subjects/${data.data.data.id}/add-lesson`,
        // );
      },
      onError(error: any) {
        toast.error(error.response.data.message);
      },
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
      <InputMolecule
        value={module?.name}
        handleChange={(_e: ValueType<Event>) => {}}
        name={'module id'}
        disabled
        readOnly>
        Module
      </InputMolecule>
      <InputMolecule
        value={subject.title}
        error=""
        handleChange={handleChange}
        name="title">
        Subject name
      </InputMolecule>
      <TextAreaMolecule
        value={subject.content}
        name="description"
        handleChange={handleChange}>
        Subject remarks
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
        <Button type="submit" disabled={isLoading} onClick={handleSubmit} full>
          Add
        </Button>
      </div>
    </form>
  );
}
