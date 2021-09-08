import React, { useState } from 'react';

import Checkbox from './components/Atoms/custom/CheckBox';
import { Tab, Tabs } from './components/Molecules/tabs/tabs';
import DropDown from './styles/components/atoms/custom/Dropdown';

const App = () => {
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
      <div className="p-8 w-full md:w-3/4 lg:w-1/2 mx-auto">
        <Checkbox
          value="en"
          checked={checked}
          label="English"
          onChange={() => setChecked(!checked)}
        />
        <DropDown
          options={options}
          name="intakes"
          onChange={() => console.log('changed')}
          isMulti={false}
        />

        <Tabs className="my-10" activeIndex={1}>
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
      </div>
    </>
  );
};

export default App;
