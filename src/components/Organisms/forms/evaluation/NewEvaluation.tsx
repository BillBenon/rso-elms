import 'react-modern-calendar-datepicker/lib/DatePicker.css';

import React, { useState } from 'react';

import { Link as LinkList, ValueType } from '../../../../types';
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

  const [questions, setQuestions] = useState<any>([
    {
      code: '',
      current_admin_id: '',

      description: '',
      name: '',
    },
    {
      code: '',
      current_admin_id: '',

      description: '',
      name: '',
    },
  ]);

  const [isLoading, setIsLoading] = useState();
  function handleSubmit() {
    setCurrentStep(currentStep + 1);
  }

  function handleBack() {
    if (currentStep >= 1) setCurrentStep(currentStep - 1);
  }

  function handleAddQuestion() {
    let previousState = [...questions];
    previousState.push(previousState[0]);
    setQuestions(previousState);
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
          <EvaluationInfoComponent
            values={[]}
            handleNext={handleSubmit}
            handleGoBack={handleBack}
          />
          <EvaluationQuestionComponent
            values={questions}
            handleNext={handleSubmit}
            handleGoBack={handleBack}
            isLoading={isLoading}
            handleAddQuestion={handleAddQuestion}
          />
        </Stepper>
      </div>
    </div>
  );
}
