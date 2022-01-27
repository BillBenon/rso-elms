import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import { moduleStore } from '../../../../store/administration/modules.store';
import { ValueType } from '../../../../types';
import { CreateModuleInfo } from '../../../../types/services/modules.types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface ParamType {
  moduleId: string;
}
function UpdateModuleForm() {
  const history = useHistory();

  const { moduleId } = useParams<ParamType>();
  const module = moduleStore.getModuleById(moduleId).data?.data.data;

  const { mutateAsync, isLoading } = moduleStore.modifyModule();

  const [values, setvalues] = useState<CreateModuleInfo>({
    id: '',
    name: '',
    description: '',
    has_prerequisite: false,
    program_id: '',
  });

  useEffect(() => {
    module && setvalues({ ...module, program_id: module.program.id.toString() });
  }, [module]);

  function handleChange(e: ValueType) {
    setvalues({ ...values, [e.name]: e.value });
  }

  async function submitForm(e: FormEvent) {
    e.preventDefault();

    await mutateAsync(values, {
      async onSuccess(data) {
        toast.success(data.data.message);
        queryClient.invalidateQueries(['modules/program/id']);
        history.goBack();
      },
      onError(error: any) {
        toast.error(error.response.data.message || 'error occurred please try again');
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
        className="h-24"
        handleChange={handleChange}>
        Descripiton
      </TextAreaMolecule>

      <InputMolecule
        value={module?.program.name || ''}
        handleChange={(_e: ValueType) => {}}
        name={'program_id'}
        readOnly
        disabled>
        Program
      </InputMolecule>
      <RadioMolecule
        className="mt-4"
        name="has_prerequisite"
        value={values.has_prerequisite.toString()}
        options={[
          { label: 'Yes', value: 'true' },
          { label: 'No', value: 'false' },
        ]}
        handleChange={handleChange}>
        Has Prerequesites
      </RadioMolecule>
      <div className="mt-5">
        <Button type="submit" disabled={isLoading} onClick={() => submitForm} full>
          {isLoading ? '....' : 'Update'}
        </Button>
      </div>
    </form>
  );
}

export default UpdateModuleForm;
