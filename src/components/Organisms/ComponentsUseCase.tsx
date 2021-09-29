import React, { useState } from 'react';

import Checkbox from '../Atoms/Input/CheckBox';
import DropDown from '../Atoms/Input/Dropdown';
import Input from '../Atoms/Input/Input';
import CheckboxMolecule from '../Molecules/input/CheckboxMolecule';
import DropdownMolecule from '../Molecules/input/DropdownMolecule';

export default function CreatedBySandberg() {
  const [checked, setChecked] = useState(false);

  const options = [
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'French',
      value: 'fr',
    },
    {
      label: 'Kinyarwanda',
      value: 'kiny',
    },
  ];
  return (
    <>
      <div className="p-8">
        <h2 className="font-bold text-primary-500 text-2xl py-10">
          Created by Sandberg.
        </h2>
        <Checkbox
          name="language"
          value="en"
          checked={checked}
          label="English"
          onChange={() => setChecked(!checked)}
          error={null}
        />
        <div className="py-3">
          <Checkbox
            name="language"
            value="en"
            checked={checked}
            label="French"
            onChange={() => setChecked(!checked)}
            error={null}
          />
        </div>
        <Tabs className="my-4" activeIndex={1}>
          <Tab label="Students">
            <h1 className="text-3xl text-primary-500">Students</h1>
          </Tab>
          <Tab label="Instructors">
            <h2 className="text-3xl text-green-400">Instructors</h2>
          </Tab>
          <Tab label="Admins" disabled={false}>
            <h2 className="text-3xl text-yellow-300 font-bold">Admins here</h2>
          </Tab>
        </Tabs>
        <CheckboxMolecule
          options={options}
          name="language"
          placeholder="Checkbox Molecule"
          handleChange={() => console.log('changed')}
        />
        <DropDown
          options={options}
          name="intakes"
          handleChange={(e: object) => console.log(e)}
          defaultValue={options[1]}
        />
        <Input name="email" value="" handleChange={(e) => console.log(e)} />
        <DropdownMolecule
          options={options}
          name="academy"
          handleChange={(e: object) => console.log(e)}
          error="Please select academy"
          isMulti>
          Select academy
        </DropdownMolecule>
      </div>
    </>
  );
}
