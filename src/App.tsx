import React, { useState } from 'react';

import Checkbox from './components/Atoms/custom/CheckBox';
import Sidebar from './components/Molecules/sidebar/Sidebar';
import Stepper from './components/Molecules/Stepper/Stepper';
// import Avatar from './components/Atoms/custom/Avatar';
// import Icon from './components/atoms/custom/Icon';
// import Input from './components/atoms/Input/Input';
// import Textarea from './components/atoms/Input/Textarea';
// import ILabel from './components/atoms/Text/ILabel';
// import AcademyProfileCard from './components/Molecules/AcademyProfileCard';
// import Stepper from './components/Molecules/Stepper/Stepper';
import Table from './components/Molecules/Table';
import { Tab, Tabs } from './components/Molecules/tabs/tabs';
import SignUpForm from './components/Organisms/signup/SignUpForm';
import DropDown from './styles/components/atoms/custom/Dropdown';

const App = () => {
  const data = [
    { Name: 'Abc', Age: 15, Status: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', Age: 43, Status: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', Age: 30, Status: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', Age: 87, Status: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', Age: 28, Status: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', Age: 15, Status: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', Age: 43, Status: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', Age: 30, Status: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', Age: 87, Status: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', Age: 28, Status: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', Age: 15, Status: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', Age: 43, Status: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', Age: 30, Status: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', Age: 87, Status: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', Age: 28, Status: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', Age: 15, Status: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', Age: 43, Status: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', Age: 30, Status: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', Age: 87, Status: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', Age: 28, Status: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', Age: 15, Status: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', Age: 43, Status: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', Age: 30, Status: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', Age: 87, Status: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', Age: 28, Status: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', Age: 15, Status: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', Age: 43, Status: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', Age: 30, Status: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', Age: 87, Status: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', Age: 28, Status: 'Cancelled', Location: 'Hyderabad' },
    {
      column1: 'Cell 1',
      column2: 'Cell 2',
      column3: 'Cell 3',
    },
    {
      column1: 'Cell 4',
      column2: 'Cell 5',
      column3: 'Cell 6',
    },
    {
      column1: 'Cell 7',
      column2: 'Cell 8',
      column3: 'Cell 9',
    },
    {
      column1: 'Cell 10',
      column2: 'Cell 11',
      column3: 'Cell 12',
    },
  ];

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
    { label: 'Users', to: '/users', icon: 'user', active: false },
    { label: 'Roles', to: '/roles', icon: 'role', active: false },
    { label: 'Academies', to: '/academies', icon: 'academy', active: false },
    { label: 'Notifications', to: '/users', icon: 'notification', active: true },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-4 border-b-2 border-blue-500 pb-24 mb-24">
        <Sidebar links={links} activeIndex={1} />
        <div className="p-8 w-full col-span-3 mx-auto px-10 ">
          <h2 className="font-bold text-primary-500 text-2xl py-10">
            Created by Sandberg.
          </h2>
          <Checkbox
            name="language"
            value="en"
            checked={checked}
            label="English"
            onChange={() => setChecked(!checked)}
          />
          <div className="py-3">
            <Checkbox
              name="language"
              value="en"
              checked={checked}
              label="French"
              onChange={() => setChecked(!checked)}
            />
          </div>
          <DropDown
            options={options}
            name="intakes"
            onChange={(e: object) => console.log(e)}
            isMulti={false}
            className="w-1/2"
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
      </div>
      {/* <h2>Default stepper</h2>
      <Stepper
        stepperContent={stepperContent}
        submitStepper={submitStepper}
        isInline={false}
        isVertical={false}
      />
      <hr />
      <h2>Inline stepper</h2>
      <Stepper
        stepperContent={stepperContent}
        submitStepper={submitStepper}
        isInline
        isVertical={false}
      />
      <hr />
      <h2>Vertical stepper</h2>
      <Stepper
        stepperContent={stepperContent}
        submitStepper={submitStepper}
        isVertical
        isInline={false}
      /> */}
      <Table data={data} hasAction={true} />
      <SignUpForm />
    </div>
  );
};

export default App;
