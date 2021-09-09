import React, { useState } from 'react';

import Checkbox from './components/Atoms/custom/CheckBox';
import Sidebar from './components/Molecules/sidebar/Sidebar';
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

  const links = [
    { label: 'Users', to: '/users', icon: 'notification', active: false },
    { label: 'Notifications', to: '/users', icon: 'notification', active: true },
  ];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <Sidebar links={links} activeIndex={1} />
        <div className="p-8 w-full col-span-3 mx-auto">
          <Checkbox
            value="en"
            checked={checked}
            label="English"
            onChange={() => setChecked(!checked)}
          />
          <div className="py-3">
            <Checkbox
              value="en"
              checked={checked}
              label="French"
              onChange={() => setChecked(!checked)}
            />
          </div>
          <DropDown
            options={options}
            name="intakes"
            onChange={() => console.log('changed')}
            isMulti={false}
            className="w-1/2"
          />

          <Tabs className="my-10" activeIndex={1}>
            <div></div>
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
      </div>
    </>
  );
};

export default App;
