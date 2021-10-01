import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { intakeStore } from '../../../store/intake.store';
import programStore from '../../../store/program.store';
import { ValueType } from '../../../types';
import {
  IntakeInfo,
  IntakeStatus,
  PeriodType,
} from '../../../types/services/intake.types';
import { ProgramInfo } from '../../../types/services/program.types';
import { formatDateToIso } from '../../../utils/date-helper';
import { getDropDownOptions, getDropDownStatusOptions } from '../../../utils/getOption';
import Button from '../../Atoms/custom/Button';
import DateMolecule from '../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';
import Stepper from '../../Molecules/Stepper/Stepper';

interface IProps {
  values: IntakeInfo;
  handleChange: (_e: ValueType) => any;
  handleNext: <T>(_e: FormEvent<T>) => any;
}
interface ParamType {
  id: string;
}
interface CProps {
  handleSuccess: () => any;
}

export default function NewIntake(props: CProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { id } = useParams<ParamType>();

  const [values, setValues] = useState<IntakeInfo>({
    id: '',
    title: '',
    actual_end_date: '',
    actual_start_date: '',
    code: '',
    description: '',
    expected_end_date: '',
    expected_start_date: '',
    intake_status: IntakeStatus.OPENED,
    period_type: PeriodType.SEMESTER,
    registration_control_id: id,
    total_num_students: 1,
  });

  function handleChange(e: ValueType) {
    setValues((regControl) => ({ ...regControl, [e.name]: e.value }));
  }

  const { mutateAsync } = intakeStore.create();

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
    if (currentStep === 0) setCurrentStep(currentStep + 1);
    else {
      let title = values.title.trim().split(' ');
      let code = `INTK-${title[1]}-${new Date(values.expected_start_date).getFullYear()}`;

      let data = {
        ...values,
        code,
        expected_end_date: formatDateToIso(values.expected_end_date),
        expected_start_date: formatDateToIso(values.expected_start_date),
      };

      console.log('request', data);

      await mutateAsync(data, {
        onSuccess(data) {
          toast.success(data.data.message);
          props.handleSuccess();
        },
        onError() {
          toast.error('error occurred please try again');
        },
      });
    }
  }

  const stepperContent = {
    currentStep: currentStep,
    completeStep: currentStep,
    content: [
      {
        label: 'info',
        content: (
          <IntakeInfoComponent
            values={values}
            handleChange={handleChange}
            handleNext={handleSubmit}
          />
        ),
        clicked: () => {},
      },
      {
        label: 'more',
        content: (
          <IntakeStatusComponent
            values={values}
            handleChange={handleChange}
            handleNext={handleSubmit}
          />
        ),
        clicked: () => {},
      },
    ],
  };

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

function IntakeInfoComponent({ values, handleChange, handleNext }: IProps) {
  const programsInfo = programStore.fetchPrograms();

  let programs: ProgramInfo[] = programsInfo.data?.data.data || [];

  return (
    <form onSubmit={handleNext}>
      <InputMolecule
        name="title"
        placeholder="Intake title"
        value={values.title}
        handleChange={handleChange}>
        Intake title
      </InputMolecule>
      <TextAreaMolecule
        name={'description'}
        value={values.description}
        handleChange={handleChange}>
        Description
      </TextAreaMolecule>
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
        isMulti
        options={getDropDownOptions(programs)}>
        Programs in this intake
      </DropdownMolecule>
      <div className="pt-3">
        <Button type="submit" onClick={() => handleNext}>
          Next
        </Button>
      </div>
    </form>
  );
}

function IntakeStatusComponent({ handleChange, handleNext }: IProps) {
  return (
    <form onSubmit={handleNext}>
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
        name="period_type"
        handleChange={handleChange}
        options={getDropDownStatusOptions(PeriodType)}
        placeholder="Select Period type">
        Period type
      </DropdownMolecule>
      <DropdownMolecule
        name="intake_status"
        handleChange={handleChange}
        options={getDropDownStatusOptions(IntakeStatus)}>
        Intake status
      </DropdownMolecule>

      <div className="pt-3 flex justify-between">
        <Button styleType="text" color="gray">
          Back
        </Button>
        <Button type="submit" onClick={() => handleNext}>
          Create intake
        </Button>
      </div>
    </form>
  );
}
