import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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
  PeriodProgressStatus,
  ProgressStatus,
} from '../../types/services/intake-program.types';
import { getDropDownStatusOptions } from '../../utils/getOption';

interface PeriodStep {
  academic_year_id: string;
  checked: number;
  levelId: string;
}

export function NewIntakePeriod({ academic_year_id, levelId, checked }: PeriodStep) {
  const [values, setvalues] = useState<AddIntakeProgramLevelPeriod>({
    academic_year_program_intake_level_id: '',
    actual_end_on: '',
    actual_start_on: '',
    period_id: '',
    progress_status: PeriodProgressStatus.PENDING,
  });
  const [done, setDone] = useState(0);

  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const [lastStep, setLastStep] = useState(0);

  const academicperiods =
    academicperiodStore.getAcademicPeriodsByAcademicYear(academic_year_id).data?.data
      .data || [];

  const nextStep = (isComplete: boolean) => {
    if (currentStep === lastStep) setDone(checked);
    setCurrentStep((currentStep) => currentStep + 1);
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
  };

  useEffect(
    () =>
      setvalues({
        ...values,
        academic_year_program_intake_level_id:
          document.getElementById('academic_year_program_intake_level_id')?.title || '',
        period_id: document.getElementById('period_id')?.title || '',
      }),
    [document.getElementById('period_id')?.title],
  );

  useEffect(() => {
    setLastStep(academicperiods.length);
  }, [academicperiods]);

  function handleChange(e: ValueType) {
    setvalues({ ...values, [e.name]: e.value });
  }

  const { mutateAsync } = intakeProgramStore.addPeriodsToLevel();

  async function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault(); // prevent page to reload:
    let payload: AddIntakeProgramLevelPeriod[] = [];
    payload.push(values);

    await mutateAsync(payload, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        queryClient.invalidateQueries(['levels/periods']);
        nextStep(true);
      },
      onError: (error) => {
        console.log(error);
        toast.error('something wrong happened while creating level');
      },
    });
  }

  return done !== checked ? (
    <div className="pt-4">
      <Stepper
        currentStep={currentStep}
        completeStep={completeStep}
        navigateToStepHandler={() => {}}>
        {academicperiods
          .filter((prds) => prds.academic_year.id === academic_year_id)
          .map((prd) => (
            <form onSubmit={submitForm} key={prd.id}>
              <InputMolecule
                title={levelId}
                id="academic_year_program_intake_level_id"
                type="hidden"
                value={levelId}
                name="academic_year_program_intake_level_id"
              />
              <InputMolecule
                title={prd.id.toString()}
                id="period_id"
                type="hidden"
                value={prd.id}
                name="period_id"
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
                name="actual_start_on">
                Start Date
              </DateMolecule>
              <div className="pt-4">
                <DateMolecule
                  startYear={new Date(values.actual_start_on).getFullYear()}
                  endYear={new Date(prd.academic_year.planned_end_on).getFullYear()}
                  handleChange={handleChange}
                  name="actual_end_on">
                  End Date
                </DateMolecule>
              </div>
              <DropdownMolecule
                width="5/12"
                handleChange={handleChange}
                name="progress_status"
                placeholder="intake period status"
                defaultValue={getDropDownStatusOptions(ProgressStatus).find(
                  (ps) => ps.value === values.progress_status,
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
