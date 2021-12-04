import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import DateMolecule from '../../components/Molecules/input/DateMolecule';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import Stepper from '../../components/Molecules/Stepper/Stepper';
import { queryClient } from '../../plugins/react-query';
import academicperiodStore from '../../store/administration/academicperiod.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { ValueType } from '../../types';
import {
  AddIntakeProgramLevelPeriod,
  IntakeLevelParam,
  PeriodProgressStatus,
  ProgressStatus,
} from '../../types/services/intake-program.types';
import { getDropDownStatusOptions } from '../../utils/getOption';

interface PeriodStep {
  checked: number;
  level_id?: string;
}

export function NewIntakePeriod({ level_id, checked }: PeriodStep) {
  const [values, setvalues] = useState<AddIntakeProgramLevelPeriod>({
    academic_period_id: '',
    academic_program_intake_level_id: 0,
    actual_end_on: '',
    actual_start_on: '',
    planed_end_on: '',
    planed_start_on: '',
    status: PeriodProgressStatus.STARTED,
  });
  const [done, setDone] = useState(-1);

  const { level: levelId } = useParams<IntakeLevelParam>();

  const intakeLevel = intakeProgramStore.getIntakeLevelById(level_id ? level_id : levelId)
    .data?.data.data;

  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const [lastStep, setLastStep] = useState(0);

  const academicperiods =
    academicperiodStore.getAcademicPeriodsByAcademicYear(
      intakeLevel?.academic_year.id.toString() || '',
    ).data?.data.data || [];

  const nextStep = (isComplete: boolean) => {
    if (currentStep === lastStep) setDone(checked);
    setCurrentStep((currentStep) => currentStep + 1);
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
  };

  useEffect(() => {
    setLastStep(academicperiods.length);
  }, [academicperiods]);

  useEffect(() => {
    setvalues({ ...values, actual_start_on: values.planed_start_on });
  }, [values.planed_start_on]);

  useEffect(() => {
    setvalues({ ...values, actual_end_on: values.planed_end_on });
  }, [values.planed_end_on]);

  function handleChange(e: ValueType) {
    setvalues({ ...values, [e.name]: e.value });
  }

  const { mutateAsync } = intakeProgramStore.addPeriodsToLevel();

  async function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault(); // prevent page to reload:
    await mutateAsync(
      {
        ...values,
        academic_period_id: document.getElementById('academic_period_id')?.title || '',
        academic_program_intake_level_id: parseInt(level_id ? level_id : levelId),
      },
      {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['levels/periods']);
          nextStep(true);
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      },
    );
  }

  return done !== checked ? (
    <div className="pt-4">
      <Stepper
        currentStep={currentStep}
        width={'w-40'}
        completeStep={completeStep}
        navigateToStepHandler={() => {}}>
        {academicperiods
          .filter((prds) => prds.academic_year.id === intakeLevel?.academic_year.id)
          .map((prd) => (
            <form onSubmit={submitForm} key={prd.id}>
              <InputMolecule
                title={levelId}
                id="academic_program_intake_level_id"
                type="hidden"
                value={levelId}
                name="academic_program_intake_level_id"
              />
              <InputMolecule
                title={prd.id.toString()}
                id="academic_period_id"
                type="hidden"
                value={prd.id}
                name="academic_period_id"
              />
              <Heading
                fontSize="sm"
                fontWeight="semibold"
                color="primary"
                className="pb-3">
                {prd.name}
              </Heading>
              <DateMolecule
                startYear={new Date(prd.academic_year.planned_start_on).getFullYear()}
                endYear={new Date(prd.academic_year.planned_end_on).getFullYear()}
                handleChange={handleChange}
                reverse={false}
                name="planed_start_on">
                Start Date
              </DateMolecule>
              <div className="pt-4">
                <DateMolecule
                  startYear={new Date(values.planed_start_on).getFullYear()}
                  endYear={new Date(prd.academic_year.planned_end_on).getFullYear()}
                  handleChange={handleChange}
                  name="planed_end_on">
                  End Date
                </DateMolecule>
              </div>
              <DropdownMolecule
                handleChange={handleChange}
                name="status"
                placeholder="intake period status"
                defaultValue={getDropDownStatusOptions(ProgressStatus).find(
                  (ps) => ps.value === values.status,
                )}
                options={getDropDownStatusOptions(ProgressStatus)}>
                Intake Period Status
              </DropdownMolecule>
              <Button className="mt-4 w-1/4" type="submit">
                Save
              </Button>
            </form>
          ))}
      </Stepper>
    </div>
  ) : (
    <></>
  );
}
