import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { intakeStore } from '../../../store/intake.store';
import programStore from '../../../store/program.store';
import { GenericStatus, ValueType } from '../../../types';
import {
  IntakeInfo,
  IntakeProgram,
  IntakePrograms,
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
  handleNext: () => void;
  handleProgramsChange?: (_e: ValueType) => any;
  isLoading?: boolean;
  handleGoBack: () => void;
}
interface ParamType {
  id: string;
}

export default function NewIntake() {
  const [currentStep, setCurrentStep] = useState(0);
  const { id } = useParams<ParamType>();
  const history = useHistory();

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

  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);

  function handleChange(e: ValueType) {
    setValues((regControl) => ({ ...regControl, [e.name]: e.value }));
  }

  function handleProgramsChange(e: ValueType) {
    // @ts-ignore
    setSelectedPrograms(e.value);
  }

  const { mutateAsync, isLoading } = intakeStore.create();
  const addProgram = intakeStore.addPrograms();

  async function handleSubmit() {
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
        async onSuccess(data) {
          toast.success(data.data.message);
          await addProgramsToIntake(data.data.data.id.toString());
          history.push(`/dashboard/registration-control/${id}`);
        },
        onError() {
          toast.error('error occurred please try again');
        },
      });
    }
  }

  async function addProgramsToIntake(id: string) {
    console.log(id);
    let intakePrograms: IntakePrograms = {
      description: '',
      intak_id: id,
      programs: [],
    };

    for (let i = 0; i < selectedPrograms.length; i++) {
      const element: IntakeProgram = {
        description: '',
        intake_id: id,
        intake_program_id: '',
        program_id: selectedPrograms[i],
        status: GenericStatus.ACTIVE,
      };
      intakePrograms.programs.push(element);
    }

    await addProgram.mutateAsync(intakePrograms, {
      onSuccess(data) {
        toast.success(data.data.message);
        props.handleSuccess();
      },
      onError() {
        toast.error('error occurred when adding programs');
        props.handleSuccess();
      },
    });
  }

  const handleBack = () => {
    if (currentStep >= 1) setCurrentStep(currentStep - 1);
  };

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
            handleProgramsChange={handleProgramsChange}
            handleGoBack={handleBack}
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
            isLoading={isLoading}
            handleGoBack={handleBack}
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

function IntakeInfoComponent({
  values,
  handleChange,
  handleNext,
  handleProgramsChange,
}: IProps) {
  const programsInfo = programStore.fetchPrograms();

  let programs: ProgramInfo[] = programsInfo.data?.data.data || [];

  const handlePrograms = (e: ValueType) => {
    if (handleProgramsChange) handleProgramsChange(e);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleNext();
      }}>
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
        handleChange={handlePrograms}
        isMulti
        options={getDropDownOptions(programs)}>
        Programs in this intake
      </DropdownMolecule>
      <div className="pt-3">
        <Button type="submit" onClick={handleNext}>
          Next
        </Button>
      </div>
    </form>
  );
}

function IntakeStatusComponent({
  handleChange,
  handleNext,
  isLoading,
  handleGoBack,
}: IProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleNext();
      }}>
      <DateMolecule
        showTime={false}
        handleChange={handleChange}
        name={'expected_start_date'}>
        Expected Start Date
      </DateMolecule>
      <div className="pt-4">
        <DateMolecule
          showTime={false}
          endYear={new Date().getFullYear() + 15}
          defaultValue={(new Date().getFullYear() + 3).toString()}
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
        <Button styleType="text" color="gray" onClick={handleGoBack} disabled={isLoading}>
          Back
        </Button>
        <Button type="submit" disabled={isLoading} onClick={handleNext}>
          Create intake
        </Button>
      </div>
    </form>
  );
}
