import React, { useState } from 'react';

import { Link as LinkList } from '../../../../types';
import Heading from '../../../Atoms/Text/Heading';
import BreadCrumb from '../../../Molecules/BreadCrumb';
import Stepper from '../../../Molecules/Stepper/Stepper';
import EvaluationInfoComponent from './EvaluationInfoComponent';
import EvaluationQuestionComponent from './EvaluationQuestionComponent';

export default function NewEvaluation() {
  const list: LinkList[] = [
    { to: 'home', title: 'home' },
    { to: '/dashboard/evaluations', title: 'evaluations' },
    { to: 'new', title: 'new evaluation' },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  function handleSubmit() {
    setCurrentStep(currentStep + 1);
  }

  function handleBack() {
    if (currentStep >= 1) setCurrentStep(currentStep - 1);
  }

  return (
    <div>
      <section>
        <BreadCrumb list={list}></BreadCrumb>
      </section>

      {/* stepper section */}

      <div className="w-full pt-9">
        <Heading fontWeight="semibold" fontSize="2xl" color="primary" className="pb-4">
          New evaluation
        </Heading>
        <Stepper
          currentStep={currentStep}
          completeStep={currentStep}
          width="w-64"
          isVertical={false}
          isInline={false}
          navigateToStepHandler={() => console.log('submitted')}>
          <EvaluationInfoComponent handleNext={handleSubmit} handleGoBack={handleBack} />
          <EvaluationQuestionComponent
            handleNext={handleSubmit}
            handleGoBack={handleBack}
          />
        </Stepper>
      </div>
    </div>
  );
}
