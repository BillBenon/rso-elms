import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import SwitchMolecule from '../../components/Molecules/input/SwitchMolecule';
import { queryClient } from '../../plugins/react-query';
import { authenticatorStore } from '../../store';
import academicyearsStore from '../../store/academicyears.store';
import { intakeStore } from '../../store/intake.store';
import intakeProgramStore from '../../store/intake-program.store';
import programStore from '../../store/program.store';
import { ValueType } from '../../types';
import {
  CreateLevelIntakeProgram,
  IntakeProgParam,
  ProgressStatus,
} from '../../types/services/intake-program.types';
import { getDropDownOptions, getDropDownStatusOptions } from '../../utils/getOption';
interface PeriodStep {
  prd: IAcademicPeriodInfo;
  values: CreateLevelIntakeProgram;
  handleChange: (_e: ValueType) => any;
}

import DateMolecule from '../../components/Molecules/input/DateMolecule';
import Stepper from '../../components/Molecules/Stepper/Stepper';
import academicperiodStore from '../../store/academicperiod.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { IAcademicPeriodInfo } from '../../types/services/academicperiod.types';

export default function NewIntakeProgramLevel() {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const [lastStep, setLastStep] = useState(0);

  const nextStep = (isComplete: boolean) => {
    if (currentStep === lastStep) setDone(checked);
    setCurrentStep((currentStep) => currentStep + 1);
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
  };
  const { id: programId, intakeProg } = useParams<IntakeProgParam>();

  const programLevels =
    programStore.getLevelsByAcademicProgram(programId).data?.data.data;

  const authUser = authenticatorStore.authUser().data?.data.data;
  const intakes = intakeStore.getIntakesByProgram(programId).data?.data.data;

  const intakeProgram = intakes?.find((intpr) => intpr.id === intakeProg);

  const academicYears =
    academicyearsStore.fetchAcademicYears(authUser?.academy.id.toString() || '').data
      ?.data.data || [];

  const instructors =
    instructordeploymentStore.getInstructorsDeployedInAcademy(
      authUser?.academy.id.toString() || '',
    ).data?.data.data || [];

  const academicperiods = academicperiodStore.getAllPeriods().data?.data.data || [];

  const [values, setvalues] = useState<CreateLevelIntakeProgram>({
    academic_period_id: '',
    academic_program_level_id: '',
    academic_year_id: '',
    academic_year_program_intake_level_id: 0,
    actual_end_on: '',
    actual_start_on: '',
    incharge_id: '70ee81f0-39ca-4282-9a0d-ff9bc4106f9d',
    intake_program_id: intakeProgram?.id.toString() || '',
    planed_end_on: '',
    planed_start_on: '',
    progress_status: ProgressStatus.STARTED,
  });

  const [checked, setchecked] = useState(0);
  const [done, setDone] = useState(0);

  const { mutateAsync } = intakeProgramStore.addLevelToIntakeProgram();

  function handleChange(e: ValueType) {
    setvalues({ ...values, [e.name]: e.value });
  }

  const handleCheck = (index: number, id: string) => {
    setvalues({ ...values, academic_program_level_id: id });
    setchecked(index);
  };

  useEffect(
    () =>
      setvalues({
        ...values,
        academic_period_id: document.getElementById('academic_period_id')?.title || '',
      }),
    [document.getElementById('academic_period_id')?.title],
  );

  async function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault(); // prevent page to reload:
    await mutateAsync(values, {
      onSuccess: () => {
        toast.success('Levels added to program');
        queryClient.invalidateQueries(['levels/academy']);
        nextStep(true);
      },
      onError: (error) => {
        console.log(error);
        toast.error('something wrong happened while creating level');
      },
    });
  }

  useEffect(() => {
    programLevels && handleCheck(0, programLevels[0].id.toString());
  }, [programLevels]);

  useEffect(() => {
    setvalues({ ...values, intake_program_id: intakeProgram?.id.toString() || '' });
  }, [intakeProgram]);

  useEffect(() => {
    setLastStep(
      academicperiods.filter((prds) => prds.academic_year.id === values.academic_year_id)
        .length,
    );
  }, [academicperiods]);

  return (
    <div className="p-10 w-5/6">
      <Heading fontWeight="semibold" fontSize="2xl" className="pb-8">
        Add Levels to Program Intake
      </Heading>
      <form onSubmit={submitForm}>
        <InputMolecule
          readOnly
          name="intake_program_id"
          value={` ${intakeProgram?.program.name} - ${intakeProgram?.intake.code}`}
          handleChange={(_e: ValueType) => {}}>
          Intake Program
        </InputMolecule>
        <Heading fontSize="sm" className="py-4">
          Levels
        </Heading>
        {programLevels?.map((programLevel, index) => (
          <div key={index}>
            <div className={`${checked === index ? 'bg-main' : ''} px-8 py-4`}>
              <SwitchMolecule
                value={checked === index}
                name="level"
                handleChange={() => handleCheck(index, programLevel.id.toString())}>
                {programLevel.level.name}
              </SwitchMolecule>
              {checked === index && done === 0 && (
                <div className="pl-8 py-3 flex flex-col gap-2 ">
                  <DropdownMolecule
                    width="72"
                    placeholder="Select incharge"
                    options={getDropDownOptions({
                      inputs: instructors,
                      labelName: ['first_name', 'last_name'],
                    })}
                    name="incharge_id"
                    handleChange={handleChange}>
                    Instructor Incharge
                  </DropdownMolecule>
                  <DropdownMolecule
                    width="72"
                    placeholder="Select academic year"
                    options={getDropDownOptions({ inputs: academicYears })}
                    name="academic_year_id"
                    handleChange={handleChange}>
                    Academic Year
                  </DropdownMolecule>
                  <Stepper
                    currentStep={currentStep}
                    completeStep={completeStep}
                    navigateToStepHandler={() => {}}>
                    {academicperiods
                      .filter((prds) => prds.academic_year.id === values.academic_year_id)
                      .map((prd) => (
                        <IntakePeriod
                          key={prd.id}
                          prd={prd}
                          values={values}
                          handleChange={handleChange}
                        />
                      ))}
                  </Stepper>
                </div>
              )}
            </div>
          </div>
        ))}
      </form>
      <Button
        className="mt-4"
        onClick={() =>
          // history.push(`/dashboard/intakes/programs/${intakeProg}/${programId}/modules`)
          history.goBack()
        }>
        Finish
      </Button>
    </div>
  );
}

function IntakePeriod({ prd, handleChange, values }: PeriodStep) {
  return (
    <div>
      <InputMolecule
        title={prd.id.toString()}
        id="academic_period_id"
        type="hidden"
        value={prd.id}
        name="academic_period_id"
      />
      <Heading fontSize="sm" fontWeight="semibold" color="primary" className="pb-3">
        {prd.name}
      </Heading>
      <DateMolecule
        startYear={new Date(prd.academic_year.planned_start_on).getFullYear()}
        endYear={new Date(prd.academic_year.planned_end_on).getFullYear()}
        handleChange={handleChange}
        reverse={false}
        name="planed_start_on">
        Planned Start Date
      </DateMolecule>
      <div className="pt-4">
        <DateMolecule
          startYear={new Date(values.planed_start_on).getFullYear()}
          endYear={new Date(prd.academic_year.planned_end_on).getFullYear()}
          handleChange={handleChange}
          name="planed_end_on">
          Planned End Date
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
    </div>
  );
}
