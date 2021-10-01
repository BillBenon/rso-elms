import React, { FormEvent, useState } from 'react';

import { ValueType } from '../../../types';
import {
  IntakeInfo,
  IntakeStatus,
  PeriodType,
} from '../../../types/services/intake.types';
import Button from '../../Atoms/custom/Button';
import DateMolecule from '../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../Molecules/input/InputMolecule';
import Stepper from '../../Molecules/Stepper/Stepper';

export default function NewIntake() {
  const [currentStep, setCurrentStep] = useState(0);

  const [values, setValues] = useState<IntakeInfo>({
    title: '',
    actual_end_date: new Date(),
    actual_start_date: new Date(),
    code: '',
    description: '',
    expected_end_date: new Date(),
    expected_start_date: new Date(),
    intake_status: IntakeStatus.OPENED,
    period_type: PeriodType.SEMESTER,
    registration_control_id: '',
    total_num_students: 1,
  });

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const IntakeInfo = () => {
    return (
      <form onSubmit={handleNext}>
        <InputMolecule
          name="title"
          placeholder="Intake title"
          value={values.title}
          handleChange={handleChange}>
          Intake title
        </InputMolecule>
        <DropdownMolecule
          name="registration_control_id"
          placeholder="Registration Control"
          isMulti
          handleChange={handleChange}
          options={[]}>
          Registration Control
        </DropdownMolecule>
        <InputMolecule
          min={1}
          name="total_num_students"
          placeholder="Number"
          value={values.total_num_students.toString()}
          type="number"
          handleChange={handleChange}>
          Total number of students
        </InputMolecule>
        <DropdownMolecule
          name="programs"
          placeholder="Program"
          handleChange={handleChange}
          options={[]}>
          Programs in this intake
        </DropdownMolecule>
        <div className="pt-3">
          <Button type="submit" onClick={handleNext}>
            Next
          </Button>
        </div>
      </form>
    );
  };

  const IntakeStatusInfo = () => {
    let options = [
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
      <form onSubmit={handleSubmit}>
        <DateMolecule
          showTime={false}
          handleChange={handleChange}
          name={'expected_start_date'}>
          Expected Start Date
        </DateMolecule>
        <div className="pt-4">
          <DateMolecule
            showTime={false}
            handleChange={handleChange}
            name={'expected_end_date'}>
            Expected End Date
          </DateMolecule>
        </div>
        <DropdownMolecule
          name="periodType"
          handleChange={handleChange}
          options={options}
          placeholder="Select Period type">
          Period type
        </DropdownMolecule>
        <DropdownMolecule name="status" handleChange={handleChange} options={options}>
          Intake status
        </DropdownMolecule>

        <div className="pt-3">
          <Button type="submit" onClick={handleNext}>
            Create
          </Button>
        </div>
      </form>
    );
  };

  const stepperContent = {
    currentStep: currentStep,
    completeStep: currentStep,
    content: [
      {
        label: '',
        content: <IntakeInfo />,
        clicked: () => {},
      },
      {
        label: '',
        content: <IntakeStatusInfo />,
        clicked: () => {},
      },
    ],
  };

  const handleChange = (e: ValueType) => {
    setValues({ ...values, [e.name]: e.value });
  };
  const handleProgramsChange = (e: any) => {
    console.log(e);
  };
  ``;

  function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
    let code = values.title.trim().split(' ').join(',');

    console.log({ ...values, code });
  }

  return (
    <div className="w-full">
      <Stepper
        width="w-64"
        isVertical={false}
        isInline={false}
        stepperContent={stepperContent}
        navigateToStepHandler={() => console.log('submitted')}
      />
    </div>
  );
}
