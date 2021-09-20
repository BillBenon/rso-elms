import React from 'react';

import Button from '../../Atoms/custom/Button';
import DateMolecule from '../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../Molecules/input/InputMolecule';
import Stepper from '../../Molecules/Stepper/Stepper';

export default function NewIntake() {
  const IntakeInfo = () => {
    return (
      <form onSubmit={(e) => e.preventDefault()} className="px-5 pb-5">
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
          <Button>Next</Button>
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
      <form onSubmit={(e) => e.preventDefault()} className="px-5 pb-5">
        <DateMolecule showTime={false}>Expected Start Date</DateMolecule>
        <div className="pt-4">
          <DateMolecule showTime={false}>Expected End Date</DateMolecule>
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
          <Button>Create</Button>
        </div>
      </form>
    );
  };

  const stepperContent = [
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
  ];
  const handleChange = (e: any) => {
    console.log(e);
  };

  const handleSubmit = () => {
    window.alert('submitted');
  };

  return (
    <div>
      <Stepper
        isVertical={false}
        isInline={false}
        stepperContent={stepperContent}
        submitStepper={() => console.log('submitted')}
      />
    </div>
  );
}
