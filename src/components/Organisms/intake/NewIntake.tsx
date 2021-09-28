import React, { useState } from 'react';

import Button from '../../Atoms/custom/Button';
import DateMolecule from '../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../Molecules/input/InputMolecule';
import Stepper from '../../Molecules/Stepper/Stepper';
import AddProgramToIntake from './AddProgramToIntake';

export default function NewIntake() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const IntakeInfo = () => {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <InputMolecule
          name="code"
          placeholder="Intake code"
          value={''}
          handleChange={(e) => handleChange(e)}>
          Intake code
        </InputMolecule>
        <InputMolecule
          name="program"
          placeholder="Program"
          value={''}
          handleChange={(e) => handleChange(e)}>
          Program
        </InputMolecule>
        <InputMolecule
          name="regControl"
          placeholder="Registration Control"
          value={''}
          handleChange={(e) => handleChange(e)}>
          Registration Control
        </InputMolecule>
        <InputMolecule
          name="numStudents"
          placeholder="Number"
          value={''}
          handleChange={(e) => handleChange(e)}>
          Total number of students
        </InputMolecule>
        <div className="pt-3">
          <Button type="submit" onClick={handleNext}>
            Next
          </Button>
        </div>
      </form>
    );
  };

  const IntakeStatus = () => {
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
      <form onSubmit={(e) => e.preventDefault()}>
        <DateMolecule showTime={false} handleChange={handleChange} name={'startDate'}>
          Expected Start Date
        </DateMolecule>
        <div className="pt-4">
          <DateMolecule showTime={false} handleChange={handleChange} name={'endDate'}>
            Expected End Date
          </DateMolecule>
        </div>
        <DropdownMolecule
          name="periodType"
          onChange={(e: any) => console.log(e)}
          options={options}
          placeholder="Select Period type">
          Period type
        </DropdownMolecule>
        <DropdownMolecule
          name="status"
          onChange={(e: any) => console.log(e)}
          options={options}>
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
        content: <IntakeStatus />,
        clicked: () => {},
      },
      {
        label: '',
        content: <AddProgramToIntake />,
        clicked: () => {},
      },
    ],
  };
  const handleChange = (e: any) => {
    console.log(e);
  };

  return (
    <div className="w-full">
      <Stepper
        width="w-36"
        isVertical={false}
        isInline={false}
        stepperContent={stepperContent}
        navigateToStepHandler={() => console.log('submitted')}
      />
    </div>
  );
}
