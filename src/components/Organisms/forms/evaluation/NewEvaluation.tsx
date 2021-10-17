/* eslint-disable no-unused-vars */
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import React, { useState } from 'react';

import { Link as LinkList, ValueType } from '../../../../types';
import {
  EvaluationTypeEnum,
  IEvaluationProps,
} from '../../../../types/services/evaluation.types';
import { getDropDownStatusOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import Icon from '../../../Atoms/custom/Icon';
import Heading from '../../../Atoms/Text/Heading';
import BreadCrumb from '../../../Molecules/BreadCrumb';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import SwitchMolecule from '../../../Molecules/input/SwitchMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';
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

  function handleChange(e: ValueType) {}

  const [isLoading, setIsLoading] = useState();
  function handleSubmit() {
    setCurrentStep(currentStep + 1);
  }

  function handleBack() {
    if (currentStep >= 1) setCurrentStep(currentStep - 1);
  }

  function handleAddQuestion() {
    let previousState = [...questions];
    console.log(previousState);
    previousState.push(previousState[0]);
    setQuestions(previousState);
    // setQuestions((prevState: any) => {
    //   // Object.assign would also work
    //   return [{ ...prevState, ...previousState }];
    // });
    // questions.push([...questions, previousState]);
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
            handleChange={handleChange}
            handleNext={handleSubmit}
            handleGoBack={handleBack}
          />
          <EvaluationQuestionComponent
            values={questions}
            handleChange={handleChange}
            handleNext={handleSubmit}
            isLoading={isLoading}
            handleGoBack={handleBack}
            handleAddQuestion={handleAddQuestion}
          />
        </Stepper>
      </div>
    </div>
  );
}
