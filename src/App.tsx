import React, { useState } from 'react';

import Checkbox from './components/atoms/custom/CheckBox';
import Sidebar from './components/Molecules/sidebar/Sidebar';
// import Avatar from './components/Atoms/custom/Avatar';
// import Icon from './components/atoms/custom/Icon';
// import Input from './components/atoms/Input/Input';
// import Textarea from './components/atoms/Input/Textarea';
// import ILabel from './components/atoms/Text/ILabel';
// import AcademyProfileCard from './components/Molecules/AcademyProfileCard';
// import Stepper from './components/Molecules/Stepper/Stepper';
import Table from './components/Molecules/Table';
import { Tab, Tabs } from './components/Molecules/tabs/tabs';
import NationalDocuments from './components/Organisms/signup/NationalDocument';
import PersonalDetails from './components/Organisms/signup/PersonalDetails';
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
  // const [acceptFirstTerms, setAcceptFirstTerms] = useState({
  //     checked: false,
  //     touched: false,
  //   }),
  //   [acceptSecondTerms, setAcceptSecondTerms] = useState({
  //     checked: false,
  //     touched: false,
  //   }),
  //   [acceptThirdTerms, setAcceptThirdTerms] = useState({
  //     checked: false,
  //     touched: false,
  //   });
  // // [isSecondStepLoading, setIsSecondStepLoading] = useState(false);

  // const firstTermsHandler = () => {
  //   setAcceptFirstTerms((prev) => ({ checked: !prev.checked, touched: true }));
  // };

  // const secondTermsHandler = () => {
  //   setAcceptSecondTerms((prev) => ({ checked: !prev.checked, touched: true }));
  // };

  // const thirdTermsHandler = () => {
  //   setAcceptThirdTerms((prev) => ({ checked: !prev.checked, touched: true }));
  // };

  // //for demo purposes only
  // const timeout = (ms: number) => {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // };

  // const secondStepAsyncFunc = async () => {
  //   //it can be an API call
  //   // setIsSecondStepLoading(true);
  //   await timeout(3000);
  //   // setIsSecondStepLoading(false);
  //   console.log('second step clicked');
  // };

  // const stepperContent = [
  //   {
  //     label: 'Step 1',
  //     content: (
  //       <div>
  //         <label>
  //           <input
  //             type="checkbox"
  //             checked={acceptFirstTerms.checked}
  //             onChange={firstTermsHandler}
  //           />{' '}
  //           Accept first terms and conditions
  //         </label>
  //       </div>
  //     ),
  //     clicked: () => {},
  //     isError: !acceptFirstTerms.checked && acceptFirstTerms.touched,
  //     isComplete: acceptFirstTerms.checked,
  //   },
  //   {
  //     label: 'Step 2',
  //     content: (
  //       <div>
  //         <label>
  //           <input
  //             type="checkbox"
  //             checked={acceptSecondTerms.checked}
  //             onChange={secondTermsHandler}
  //           />{' '}
  //           Accept second terms and conditions
  //         </label>
  //       </div>
  //     ),
  //     clicked: () => secondStepAsyncFunc(),
  //     isError: !acceptSecondTerms.checked && acceptSecondTerms.touched,
  //     isComplete: acceptSecondTerms.checked,
  //   },
  //   {
  //     label: 'Step 3',
  //     content: (
  //       <div>
  //         <label>
  //           <input
  //             type="checkbox"
  //             checked={acceptThirdTerms.checked}
  //             onChange={thirdTermsHandler}
  //           />{' '}
  //           Accept third terms and conditions
  //         </label>
  //       </div>
  //     ),
  //     clicked: () => {},
  //     isError: !acceptThirdTerms.checked && acceptThirdTerms.touched,
  //     isComplete: acceptThirdTerms.checked,
  //   },
  // ];

  // const submitStepper = () => {
  //   console.log('submitted');
  // };

  const data = [
    { Name: 'Abc', age: 15, love: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', age: 43, love: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', age: 30, love: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', age: 87, love: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', age: 28, love: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', age: 15, love: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', age: 43, love: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', age: 30, love: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', age: 87, love: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', age: 28, love: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', age: 15, love: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', age: 43, love: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', age: 30, love: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', age: 87, love: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', age: 28, love: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', age: 15, love: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', age: 43, love: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', age: 30, love: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', age: 87, love: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', age: 28, love: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', age: 15, love: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', age: 43, love: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', age: 30, love: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', age: 87, love: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', age: 28, love: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', age: 15, love: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', age: 43, love: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', age: 30, love: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', age: 87, love: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', age: 28, love: 'Cancelled', Location: 'Hyderabad' },
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
          {/* <AcademyProfileCard>Academy name</AcademyProfileCard> */}
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
        {/* <Table data={data} hasAction={true} statusColumn={'love'} /> */}
        {/* <PersonalDetails /> */}
        <NationalDocuments />
      </div>
    </>
  );
};

export default App;
