import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import React, { useState } from 'react';

import { Link as LinkList, ValueType } from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import Icon from '../../../Atoms/custom/Icon';
import Heading from '../../../Atoms/Text/Heading';
import BreadCrumb from '../../../Molecules/BreadCrumb';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';
import Stepper from '../../../Molecules/Stepper/Stepper';

interface IProps {
  values: any;
  handleChange: (_e: ValueType) => any;
  handleNext: () => void;
  handleProgramsChange?: (_e: ValueType) => any;
  isLoading?: boolean;
  handleGoBack: () => void;
  handleAddQuestion?: () => void;
}

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

  const stepperContent = {
    currentStep: currentStep,
    completeStep: currentStep,
    content: [
      {
        label: 'info',
        content: (
          <EvaluationInfoComponent
            values={[]}
            handleChange={handleChange}
            handleNext={handleSubmit}
            handleGoBack={handleBack}
          />
        ),
        clicked: () => {},
      },
      {
        label: 'more',
        content: (
          <EvaluationQuestionComponent
            values={questions}
            handleChange={handleChange}
            handleNext={handleSubmit}
            isLoading={isLoading}
            handleGoBack={handleBack}
            handleAddQuestion={handleAddQuestion}
          />
        ),
        clicked: () => {},
      },
    ],
  };

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
          width="w-64"
          isVertical={false}
          isInline={false}
          stepperContent={stepperContent}
          navigateToStepHandler={() => console.log('submitted')}
        />
      </div>
    </div>
  );
}

function EvaluationInfoComponent({ values, handleChange, handleNext }: IProps) {
  return (
    <div>
      {/* <Heading fontWeight="semibold" fontSize="2xl" color="primary">
        New evaluation
      </Heading> */}

      <form
        className="pt-6"
        onSubmit={(e) => {
          e.preventDefault();
          // handleNext();
        }}>
        <InputMolecule
          width="80"
          required
          name="evaluation_name"
          placeholder="Evaluation Name"
          value=""
          handleChange={() => {}}>
          Evaluation Name
        </InputMolecule>
        <DropdownMolecule
          width="64"
          name="programs"
          placeholder="Program"
          handleChange={() => {}}
          isMulti
          options={[]}>
          Evaluation type
        </DropdownMolecule>

        <DropdownMolecule
          width="64"
          name="programs"
          placeholder="Program"
          handleChange={() => {}}
          isMulti
          options={[]}>
          Select module
        </DropdownMolecule>

        <RadioMolecule
          className="pb-4"
          value=""
          name="status"
          options={[
            { label: 'Module', value: '' },
            { label: 'Subject', value: '' },
          ]}
          handleChange={() => {}}>
          Evaluation classification
        </RadioMolecule>

        <DropdownMolecule
          width="64"
          name="programs"
          placeholder="Program"
          handleChange={() => {}}
          isMulti
          options={[]}>
          Select subject
        </DropdownMolecule>

        <RadioMolecule
          className="pb-4"
          value=""
          name="status"
          options={[
            { label: 'public', value: '' },
            { label: 'private', value: '' },
          ]}
          handleChange={() => {}}>
          Evaluation type
        </RadioMolecule>

        <RadioMolecule
          className="pb-4"
          value=""
          name="status"
          options={[
            { label: 'open', value: '' },
            { label: 'multiple choice', value: '' },
          ]}
          handleChange={() => {}}>
          Questionaire type
        </RadioMolecule>

        <TextAreaMolecule required name={'description'} value="" handleChange={() => {}}>
          Evaluation instructions
        </TextAreaMolecule>

        <InputMolecule
          width="28"
          required
          name="evaluation_name"
          value=""
          handleChange={() => {}}>
          Evaluation marks
        </InputMolecule>

        <div className="relative">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Custom input"
              value={''}
              className="shit"
              onChange={() => {}}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <div className="flex items-center">
                  <InputMolecule
                    ref={inputRef}
                    // {...inputProps}
                    width="32"
                    required
                    name="evaluation_name"
                    value=""
                    handleChange={() => {}}>
                    Due on
                  </InputMolecule>
                  {InputProps?.endAdornment}
                </div>
              )}
            />
          </LocalizationProvider>
        </div>

        <InputMolecule
          // className="p-2"
          width="16"
          required
          name="evaluation_name"
          value=""
          placeholder="00"
          handleChange={() => {}}>
          Time limit (In mins)
        </InputMolecule>

        <RadioMolecule
          className="pb-4"
          value=""
          name="status"
          options={[
            { label: 'Yes', value: '' },
            { label: 'No', value: '' },
          ]}
          handleChange={() => {}}>
          Consider on report
        </RadioMolecule>

        <div className="pt-3">
          <Button type="submit" onClick={handleNext}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

function EvaluationQuestionComponent({
  values,
  handleChange,
  handleNext,
  handleGoBack,
  isLoading,
  handleAddQuestion,
}: IProps) {
  return (
    <>
      {values.map((question, index) => (
        <>
          <div className="flex justify-between w-2/3 bg-main px-6 py-10 mt-8" key={index}>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}>
              <DropdownMolecule
                width="64"
                name="Select question type"
                placeholder="Program"
                handleChange={() => {}}
                isMulti
                options={[]}>
                Question type
              </DropdownMolecule>

              <TextAreaMolecule
                required
                name={'description'}
                value=""
                placeholder="Enter question"
                handleChange={() => {}}>
                Question {index + 1}
              </TextAreaMolecule>
            </form>

            <div className="pr-14">
              <div className="flex items-center">
                <Icon name="attach" size={17} fill="primary" />
                <Heading color="primary" fontSize="base">
                  Attach file
                </Heading>
              </div>
            </div>
          </div>
        </>
      ))}
      <Button styleType="text" color="gray" onClick={handleGoBack} disabled={isLoading}>
        Back
      </Button>
      <div className="pt-6 flex flex-col">
        <div className="pb-6">
          <Button styleType="outline" onClick={handleAddQuestion}>
            Add question
          </Button>
        </div>

        <div>
          <Button>Create evaluation</Button>
        </div>
      </div>
    </>
  );
}
