import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { moduleStore } from '../../../../store/modules.store';
import { GenericStatus, ValueType } from '../../../../types';
import { CreatePrerequisites } from '../../../../types/services/modules.types';
import { getDropDownOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface ParamType {
  id: string;
}

export default function AddPrerequesitForm() {
  const { id } = useParams<ParamType>();
  const { mutateAsync } = moduleStore.addPrerequisites();
  const history = useHistory();

  const [values, setValues] = useState({
    model_id: id,
    prerequistis: [],
    description: '',
    status: 'ACTIVE',
  });

  function handleChange(e: ValueType) {
    setValues({ ...values, [e.name]: e.value });
  }

  const modules =
    moduleStore.getAllModules().data?.data.data.filter((module) => module.id != id) || [];

  const handleSubmit = async () => {
    let data: CreatePrerequisites = {
      model_id: '',
      prerequistis: [],
    };

    for (let i = 0; i < values.prerequistis.length; i++) {
      data.prerequistis.push({
        description: values.description,
        id: 0,
        module_id: id,
        prerequisite_id: values.prerequistis[i],
        status: GenericStatus.ACTIVE,
      });
    }

    await mutateAsync(data, {
      async onSuccess(res) {
        toast.success(res.data.message);
        history.push(`/dashboard/modules/${id}`);
      },
      onError() {
        toast.error('Error occurred please try again');
      },
    });
  };

  return (
    <form>
      <DropdownMolecule
        options={getDropDownOptions(modules)}
        name="prerequistis"
        isMulti
        placeholder="Prerequisite"
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
        <Button type="button" onClick={() => handleSubmit()} full>
          Save
        </Button>
      </div>
    </form>
  );
}
