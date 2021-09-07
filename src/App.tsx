import React, { useState } from 'react';

import Stepper from './components/Molecules/Stepper/Stepper';
// import Avatar from './components/Atoms/custom/Avatar';
// import Icon from './components/atoms/custom/Icon';
// import Input from './components/atoms/Input/Input';
// import Textarea from './components/atoms/Input/Textarea';
// import ILabel from './components/atoms/Text/ILabel';
// import AcademyProfileCard from './components/Molecules/AcademyProfileCard';
// import Stepper from './components/Molecules/Stepper/Stepper';
import Table from './components/Molecules/Table';

const App = () => {
  const [acceptFirstTerms, setAcceptFirstTerms] = useState({
      checked: false,
      touched: false,
    }),
    [acceptSecondTerms, setAcceptSecondTerms] = useState({
      checked: false,
      touched: false,
    }),
    [acceptThirdTerms, setAcceptThirdTerms] = useState({
      checked: false,
      touched: false,
    });
  // [isSecondStepLoading, setIsSecondStepLoading] = useState(false);

  const firstTermsHandler = () => {
    setAcceptFirstTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const secondTermsHandler = () => {
    setAcceptSecondTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const thirdTermsHandler = () => {
    setAcceptThirdTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  //for demo purposes only
  const timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const secondStepAsyncFunc = async () => {
    //it can be an API call
    // setIsSecondStepLoading(true);
    await timeout(3000);
    // setIsSecondStepLoading(false);
    console.log('second step clicked');
  };

  const stepperContent = [
    {
      label: 'Step 1',
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptFirstTerms.checked}
              onChange={firstTermsHandler}
            />{' '}
            Accept first terms and conditions
          </label>
        </div>
      ),
      clicked: () => {},
      isError: !acceptFirstTerms.checked && acceptFirstTerms.touched,
      isComplete: acceptFirstTerms.checked,
    },
    {
      label: 'Step 2',
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptSecondTerms.checked}
              onChange={secondTermsHandler}
            />{' '}
            Accept second terms and conditions
          </label>
        </div>
      ),
      clicked: () => secondStepAsyncFunc(),
      isError: !acceptSecondTerms.checked && acceptSecondTerms.touched,
      isComplete: acceptSecondTerms.checked,
    },
    {
      label: 'Step 3',
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptThirdTerms.checked}
              onChange={thirdTermsHandler}
            />{' '}
            Accept third terms and conditions
          </label>
        </div>
      ),
      clicked: () => {},
      isError: !acceptThirdTerms.checked && acceptThirdTerms.touched,
      isComplete: acceptThirdTerms.checked,
    },
  ];

  const submitStepper = () => {
    console.log('submitted');
  };

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

  return (
    <div className="p-8 flex flex-col gap-3">
      {/* <ILabel>First name</ILabel>
      <Textarea
        placeholder="This is a text area"
        fcolor="warning"
        type="text"
        value={names}
        handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setNames(e.target.value)
        }
      />

      <Input
        placeholder="First"
        fcolor="error"
        type="text"
        value={name}
        handleChange={(e: any) => setName(e.target.value)}
      />

      <Icon name="notification" color="error" bgColor="error" size={16} />
      <Avatar
        image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        size="16"
        alt="profile image"
      /> */}
      {/* <AcademyProfileCard>Academy name</AcademyProfileCard> */}
      <h2>Default stepper</h2>
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
      />
      <Table data={data} hasAction={true} />
    </div>
  );
};

export default App;
