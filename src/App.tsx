import React, { useState } from 'react';

import Stepper from './components/Molecules/Stepper/Stepper';

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

  return (
    <div className="container">
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
    </div>
  );
};

export default App;
