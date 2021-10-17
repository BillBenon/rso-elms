import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { intakeStore } from '../../../store/intake.store';
import { ValueType } from '../../../types';
import {
  IntakeInfo,
  IntakeStatus,
  PeriodType,
} from '../../../types/services/intake.types';
import { getDropDownStatusOptions } from '../../../utils/getOption';
import Button from '../../Atoms/custom/Button';
import DateMolecule from '../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';
import Stepper from '../../Molecules/Stepper/Stepper';

interface IProps {
  disabled?: boolean;
  values: IntakeInfo;
  display_label: string;
  handleChange: (_e: ValueType) => any;
  handleNext: <T>(_e: FormEvent<T>) => any;
  handleProgramsChange?: (_e: ValueType) => any;
}
interface ParamType {
  id: string;
}
interface CProps {
  handleSuccess: () => any;
}

export default function UpdateIntake(props: CProps) {
  const [formLoading, setFormLoading] = useState(false);
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

  // const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);

  function handleChange(e: ValueType) {
    setValues((regControl) => ({ ...regControl, [e.name]: e.value }));
  }

  // function handleProgramsChange(e: ValueType) {
  //   // @ts-ignore
  //   setSelectedPrograms(e.value);
  // }

  const { mutateAsync } = intakeStore.update();
  const intake = intakeStore.getIntakeById(id);

  useEffect(() => {
    console.log('hee');
    if (intake.data) {
      const _intake = intake?.data.data.data;
      setValues({
        id: _intake.id,
        title: _intake.title,
        actual_end_date: _intake.actual_end_date,
        actual_start_date: _intake.actual_start_date,
        code: _intake.code,
        description: _intake.description,
        expected_end_date: _intake.expected_end_date,
        expected_start_date: _intake.expected_start_date,
        intake_status: _intake.intake_status,
        period_type: _intake.period_type,
        registration_control_id: _intake.registration_control?.id.toString() || '',
        total_num_students: _intake.total_num_students,
      });
    }
  }, [intake.isLoading]);

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
    if (currentStep === 0) setCurrentStep(currentStep + 1);
    else {
      const toastId = toast.loading('modifying intake');
      setFormLoading(true);

      await mutateAsync(
        { ...values, total_num_students: +values.total_num_students },
        {
          async onSuccess(data) {
            toast.success(data.data.message, { id: toastId });
            // await addProgramsToIntake(data.data.data.id.toString());
            setFormLoading(false);
            props.handleSuccess();
          },
          onError() {
            toast.error('error occurred please try again', { id: toastId });
            setFormLoading(false);
          },
        },
      );
    }
  }

  // async function addProgramsToIntake(id: string) {
  //   let intakePrograms: IntakePrograms = {
  //     description: '',
  //     intak_id: id,
  //     programs: [],
  //   };

  //   for (let i = 0; i < selectedPrograms.length; i++) {
  //     const element: IntakeProgram = {
  //       description: '',
  //       intake_id: id,
  //       intake_program_id: '',
  //       program_id: selectedPrograms[i],
  //       status: GenericStatus.ACTIVE,
  //     };
  //     intakePrograms.programs.push(element);
  //   }

  //   await addProgram.mutateAsync(intakePrograms, {
  //     onSuccess(data) {
  //       toast.success(data.data.message);
  //       props.handleSuccess();
  //     },
  //     onError() {
  //       toast.error('error occurred when adding programs');
  //       props.handleSuccess();
  //     },
  //   });
  // }

  return (
    <div className="w-full">
      <Stepper
        currentStep={currentStep}
        completeStep={currentStep}
        width="w-64"
        isVertical={false}
        isInline={false}
        navigateToStepHandler={() => console.log('submitted')}>
        <IntakeInfoComponent
          display_label="info"
          values={values}
          handleChange={handleChange}
          handleNext={handleSubmit}
        />
        <IntakeStatusComponent
          display_label="more"
          disabled={formLoading}
          values={values}
          handleChange={handleChange}
          handleNext={handleSubmit}
        />
      </Stepper>
    </div>
  );
}

function IntakeInfoComponent({
  values,
  handleChange,
  handleNext,
}: // handleProgramsChange,
IProps) {
  // const programsInfo = programStore.fetchPrograms();

  // let programs: ProgramInfo[] = programsInfo.data?.data.data || [];

  // const handlePrograms = (e: ValueType) => {
  //   if (handleProgramsChange) handleProgramsChange(e);
  // };

  return (
    <form onSubmit={handleNext}>
      <InputMolecule
        required
        name="title"
        placeholder="Intake title"
        value={values.title}
        handleChange={handleChange}>
        Intake title
      </InputMolecule>
      <TextAreaMolecule
        required
        name={'description'}
        value={values.description}
        handleChange={handleChange}>
        Description
      </TextAreaMolecule>
      <InputMolecule
        required
        min={1}
        name="total_num_students"
        placeholder="Number"
        value={values.total_num_students.toString()}
        type="number"
        handleChange={handleChange}>
        Total number of students
      </InputMolecule>
      {/* <DropdownMolecule
        name="programs"
        placeholder="Program"
        handleChange={handlePrograms}
        isMulti
        options={getDropDownOptions(programs)}>
        Programs in this intake
      </DropdownMolecule> */}
      <div className="pt-3">
        <Button type="submit" onClick={() => handleNext}>
          Next
        </Button>
      </div>
    </form>
  );
}

function IntakeStatusComponent({ values, handleChange, handleNext, disabled }: IProps) {
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();

  return (
    <form onSubmit={handleNext}>
      <DateMolecule
        showTime={false}
        defaultValue={
          values.expected_start_date ? values.expected_start_date.toString() : ''
        }
        handleChange={handleChange}
        name={'expected_start_date'}>
        Expected Start Date
      </DateMolecule>
      <div className="pt-4">
        <DateMolecule
          showTime={false}
          endYear={new Date().getFullYear() + 15}
          defaultValue={
            values.expected_end_date ? values.expected_end_date.toString() : ''
          }
          handleChange={handleChange}
          name={'expected_end_date'}>
          Expected End Date
        </DateMolecule>
      </div>
      <DropdownMolecule
        name="period_type"
        handleChange={handleChange}
        defaultValue={getDropDownStatusOptions(PeriodType).find(
          (period) => period.label === values.period_type,
        )}
        options={getDropDownStatusOptions(PeriodType)}
        placeholder="Select Period type">
        Period type
      </DropdownMolecule>
      <DropdownMolecule
        name="intake_status"
        handleChange={handleChange}
        defaultValue={getDropDownStatusOptions(IntakeStatus).find(
          (intake) => intake.label === values.intake_status,
        )}
        options={getDropDownStatusOptions(IntakeStatus)}>
        Intake status
      </DropdownMolecule>

      <div className="pt-3 flex justify-between">
        <Button styleType="text" color="gray">
          Back
        </Button>
        <Button disabled={disabled} type="submit" onClick={() => handleNext}>
          Update intake
        </Button>
      </div>
    </form>
  );
}
