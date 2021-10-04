import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { moduleStore } from '../../../../store/modules.store';
import { ValueType } from '../../../../types';
import { getDropDownOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';

interface ParamType {
  id: string;
}

export default function AddPrerequesitForm() {
  const { id } = useParams<ParamType>();
  const [values, setValues] = useState<string[]>([]);

  function handleChange(e: ValueType) {
    setValues({ ...values, [e.name]: e.value });
  }

  const modules =
    moduleStore.getAllModules().data?.data.data.filter((module) => module.id != id) || [];
  const handleSubmit = () => {
    window.alert('comming soon');
  };

  return (
    <form>
      <DropdownMolecule
        options={getDropDownOptions(modules)}
        name="prerequisites"
        isMulti
        handleChange={handleChange}>
        Prerequsite Modules
      </DropdownMolecule>
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
        <Button type="button" onClick={() => handleSubmit} full>
          Save
        </Button>
      </div>
    </form>
  );
}
