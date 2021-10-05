import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { moduleStore } from '../../../../store/modules.store';
import programStore from '../../../../store/program.store';
import { ValueType } from '../../../../types';
import { CreateModuleInfo } from '../../../../types/services/modules.types';
import { ProgramInfo } from '../../../../types/services/program.types';
import { getDropDownOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function NewModuleForm() {
  const history = useHistory();

  const programsInfo = programStore.fetchPrograms();
  let programs: ProgramInfo[] = programsInfo.data?.data.data || [];

  const { mutateAsync } = moduleStore.addModule();

  const [values, setvalues] = useState<CreateModuleInfo>({
    id: '',
    name: '',
    description: '',
    has_prerequisite: false,
    program_id: '',
  });

  function handleChange(e: ValueType) {
    setvalues({ ...values, [e.name]: e.value });
  }

  async function submitForm(e: FormEvent) {
    e.preventDefault();

    await mutateAsync(values, {
      async onSuccess(data) {
        toast.success(data.data.message);
        if (data.data.data.has_prerequisite)
          history.push(`/dashboard/modules/${data.data.data.id}/add-prereq`);
        else history.goBack();
      },
      onError() {
        toast.error('error occurred please try again');
      },
    });
  }

  return (
    <form onSubmit={submitForm}>
      <InputMolecule value={values.name} error="" handleChange={handleChange} name="name">
        Module name
      </InputMolecule>
      <TextAreaMolecule
        value={values.description}
        name="description"
        handleChange={handleChange}>
        Descripiton
      </TextAreaMolecule>

      <DropdownMolecule
        name="program_id"
        handleChange={handleChange}
        options={getDropDownOptions(programs)}>
        Program
      </DropdownMolecule>
      <RadioMolecule
        className="mt-4"
        name="has_prerequisite"
        options={[
          { label: 'Yes', value: 'true' },
          { label: 'No', value: 'false' },
        ]}
        handleChange={handleChange}>
        Has Prerequesites
      </RadioMolecule>
      <div className="mt-5">
        <Button type="submit" onClick={() => submitForm} full>
          Save
        </Button>
      </div>
    </form>
  );
}
