import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';

import { moduleStore } from '../../../../store/modules.store';
import { subjectStore } from '../../../../store/subject.store';
import { ValueType } from '../../../../types';
import { ModuleInfo } from '../../../../types/services/modules.types';
import { SubjectInfo } from '../../../../types/services/subject.types';
import { getDropDownOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function NewSubjectForm() {
  const { mutateAsync } = subjectStore.addSubject();
  const history = useHistory();
  const [subject, setsubject] = useState<SubjectInfo>({
    content: '',
    id: '',
    module_id: '',
    title: '',
  });

  function handleChange(e: ValueType) {
    setsubject({ ...subject, [e.name]: e.value });
  }

  const handleSubmit = async () => {
    await mutateAsync(subject, {
      async onSuccess(data) {
        console.log(data.data);
        toast.success(data.data.message);
        history.push(`/dashboard/subjects/${data.data.data.id}/add-lesson`);
      },
      onError() {
        toast.error('error occurred please try again');
      },
    });
  };

  let modules: ModuleInfo[] = moduleStore.getAllModules().data?.data.data || [];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
      <DropdownMolecule
        handleChange={handleChange}
        name={'module_id'}
        placeholder="Select module"
        options={getDropDownOptions({ inputs: modules || [] })}>
        Module
      </DropdownMolecule>
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
        Subject content
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
        <Button type="submit" onClick={handleSubmit} full>
          Add
        </Button>
      </div>
    </form>
  );
}
