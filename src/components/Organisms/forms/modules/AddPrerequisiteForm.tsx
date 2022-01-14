import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { authenticatorStore } from '../../../../store/administration';
import { moduleStore } from '../../../../store/administration/modules.store';
import { GenericStatus, ValueType } from '../../../../types';
import { CreatePrerequisites } from '../../../../types/services/modules.types';
import { getDropDownOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface ParamType {
  moduleId: string;
}

export default function AddPrerequesitesForm() {
  const { moduleId } = useParams<ParamType>();
  const { mutateAsync, isLoading } = moduleStore.addPrerequisites();
  const history = useHistory();

  const [values, setValues] = useState({
    module_id: moduleId,
    prerequistis: [],
    description: '',
    status: 'ACTIVE',
  });

  function handleChange(e: ValueType) {
    setValues({ ...values, [e.name]: e.value });
  }

  const authUser = authenticatorStore.authUser().data?.data.data;

  const moduleSt = moduleStore.getModulesByAcademy(authUser?.academy.id + '');
  let modules = moduleSt.data?.data.data.filter((module) => module.id != moduleId) || [];

  const handleSubmit = async () => {
    let data: CreatePrerequisites = {
      modele_id: values.module_id,
      prerequistis: [],
    };

    for (let i = 0; i < values.prerequistis.length; i++) {
      data.prerequistis.push({
        description: values.description,
        id: 0,
        module_id: values.module_id,
        prerequisite_id: values.prerequistis[i],
        status: GenericStatus.ACTIVE,
      });
    }

    await mutateAsync(data, {
      async onSuccess(res) {
        toast.success(res.data.message);
        history.push(`/dashboard/modules/${moduleId}`);
      },
      onError() {
        toast.error('Error occurred please try again');
      },
    });
  };

  return (
    <form>
      <DropdownMolecule
        options={getDropDownOptions({ inputs: modules || [] })}
        name="prerequistis"
        isMulti
        placeholder={moduleSt.isLoading ? 'Loading prerequisites...' : 'Prerequisites'}
        handleChange={handleChange}>
        Select Prerequesites
      </DropdownMolecule>
      <TextAreaMolecule
        value={values.description}
        handleChange={handleChange}
        name={'description'}>
        Comments
      </TextAreaMolecule>
      <RadioMolecule
        className="mt-4"
        value={values.status}
        name="status"
        options={[
          { label: 'Active', value: 'ACTIVE' },
          { label: 'Inactive', value: 'INACTIVE' },
        ]}
        handleChange={handleChange}>
        Status
      </RadioMolecule>
      <div className="mt-5">
        <Button type="button" disabled={isLoading} onClick={() => handleSubmit()} full>
          {isLoading ? '....' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
