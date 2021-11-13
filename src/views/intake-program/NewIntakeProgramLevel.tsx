import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import SwitchMolecule from '../../components/Molecules/input/SwitchMolecule';
import { queryClient } from '../../plugins/react-query';
import { authenticatorStore } from '../../store/administration';
import academicyearsStore from '../../store/administration/academicyears.store';
import { intakeStore } from '../../store/administration/intake.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import programStore from '../../store/administration/program.store';
import usersStore from '../../store/administration/users.store';
import { ValueType } from '../../types';
import {
  CreateLevelsIntakeProgram,
  IntakeProgParam,
  IntakeProgramInfo,
  ProgressStatus,
} from '../../types/services/intake-program.types';
import { ILevel } from '../../types/services/levels.types';
import { ProgramInfo } from '../../types/services/program.types';
import { UserInfo, UserType } from '../../types/services/user.types';
import { getDropDownOptions } from '../../utils/getOption';

interface CombinedData extends CreateLevelsIntakeProgram {
  program: ProgramInfo;
  level: ILevel;
  checked: boolean;
}

interface StepProps {
  values: CombinedData[];
  display_label: string;
  handleChange: (_index: number, _e: ValueType) => any;
  handleNext: <T>(_e: FormEvent<T>) => any;
  handleCheck: (_index: number) => void;
}

interface StepLevelYear extends StepProps {
  intakeProgram?: IntakeProgramInfo;
  academicyears: IAcademicYearInfo[];
  instructors: UserInfo[];
}

interface StepLevelPeriod extends StepProps {
  academicyears: IAcademicYearInfo[];
  academicperiods: IAcademicPeriodInfo[];
}

import Stepper from '../../components/Molecules/Stepper/Stepper';
import { IAcademicPeriodInfo } from '../../types/services/academicperiod.types';
import { IAcademicYearInfo } from '../../types/services/academicyears.types';

export default function NewIntakeProgramLevel() {
  const [currentStep, setCurrentStep] = useState(0);

  const [values, setvalues] = useState<CombinedData[]>([]);
  const history = useHistory();
  const { id: programId, intakeProg } = useParams<IntakeProgParam>();

  const programLevels = programStore.getLevelsByAcademicProgram(programId);

  const authUser = authenticatorStore.authUser().data?.data.data;
  const intakes = intakeStore.getIntakesByProgram(programId).data?.data.data;

  const intakeProgram = intakes?.find((intpr) => intpr.id === intakeProg);

  const academicYears =
    academicyearsStore.fetchAcademicYears(authUser?.academy.id.toString() || '').data
      ?.data.data || [];

  const instructors =
    usersStore
      .fetchUsers()
      .data?.data.data.filter((user) => user.user_type === UserType.INSTRUCTOR) || [];

  useEffect(() => {
    let newData: CombinedData[] = [];
    let i = 0;
    programLevels.data?.data.data.forEach((pl) => {
      newData.push({
        checked: i === 0,
        program: pl.program,
        level: pl.level,
        academic_period_id: '',
        academic_program_level_id: '',
        academic_year_id: '',
        academic_year_program_intake_level_id: 0,
        actual_end_on: '',
        actual_start_on: '',
        id: 0,
        incharge_id: '',
        intake_program_id: intakeProgram?.id.toString() || '',
        planed_end_on: '',
        planed_start_on: '',
        progress_status: ProgressStatus.STARTED,
      });
      i++;
    });

    setvalues(newData);
  }, [programLevels.data?.data.data]);

  // let academicperiods: IAcademicPeriodInfo[][] = [];
  // function keepAcademicPeriods() {

  // values.map((val) => {
  //   let fetchedData =
  //     academicperiodStore.getAcademicPeriodsByAcademicYear(
  //       val.academic_year_id.toString(),
  //     ).data?.data.data || [];
  //   academicperiods.push(fetchedData);
  // });
  // console.log(academicperiods);
  // }
  // keepAcademicPeriods();

  function handleChange(index: number, e: ValueType) {
    let previousState = [...values];
    previousState[index] = {
      ...previousState[index],
      [e.name]: e.value,
    };
    setvalues(previousState);
  }

  const { mutateAsync } = intakeProgramStore.addLevelsToIntakeProgram();

  const handleCheck = (index: number) => {
    let previousState = [...values];
    previousState[index] = {
      ...previousState[index],
      checked: !previousState[index].checked,
    };
    setvalues(previousState);
  };

  function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault(); // prevent page to reload:

    if (currentStep === 0) setCurrentStep(currentStep + 1);
    else {
      mutateAsync(
        values.filter((val) => val.checked),
        {
          onSuccess: () => {
            toast.success('Levels added to program');
            queryClient.invalidateQueries(['levels/academy']);
            history.goBack();
          },
          onError: (error) => {
            console.log(error);
            toast.error('something wrong happened while creating level');
          },
        },
      );
    }
  }

  return (
    <div className="w-full">
      <Stepper
        currentStep={currentStep}
        completeStep={currentStep}
        width="w-64"
        isVertical={false}
        isInline={false}
        navigateToStepHandler={() => console.log('submitted')}>
        <AddProgramLevelYear
          display_label="Add Levels to Program Intake"
          values={values}
          handleChange={handleChange}
          handleNext={submitForm}
          intakeProgram={intakeProgram}
          academicyears={academicYears}
          instructors={instructors}
          handleCheck={handleCheck}
        />
        <AddIntakePeriod
          display_label="New Intake Period"
          values={values}
          handleChange={handleChange}
          handleNext={submitForm}
          academicyears={academicYears}
          handleCheck={handleCheck}
          academicperiods={[]}
        />
      </Stepper>
    </div>
  );
}

function AddProgramLevelYear({
  values,
  intakeProgram,
  academicyears,
  instructors,
  handleChange,
  handleNext,
  handleCheck,
}: StepLevelYear) {
  return (
    <form onSubmit={handleNext}>
      <div className="overflow-y-auto max-h-96">
        <InputMolecule
          readOnly
          name="intake_program_id"
          value={` ${intakeProgram?.program.name} - ${intakeProgram?.intake.code}`}
          handleChange={(_e: ValueType) => {}}>
          Intake Program
        </InputMolecule>
        <Heading fontSize="sm">Levels</Heading>
        {values.map((programLevel, index) => (
          <div key={programLevel.level.id}>
            <SwitchMolecule
              value={programLevel.checked}
              name="level"
              handleChange={() => handleCheck(index)}>
              {programLevel.level.name}
            </SwitchMolecule>
            {programLevel.checked && (
              <div className="pl-8 py-3 flex flex-col gap-2">
                <DropdownMolecule
                  width="72"
                  placeholder="Select academic year"
                  options={getDropDownOptions({ inputs: academicyears })}
                  name="academic_year_id"
                  handleChange={(e: ValueType) => handleChange(index, e)}>
                  Academic Year
                </DropdownMolecule>
                <DropdownMolecule
                  width="72"
                  placeholder="Select incharge"
                  options={getDropDownOptions({
                    inputs: instructors,
                    labelName: ['first_name', 'last_name'],
                  })}
                  name="incharge_id"
                  handleChange={(e: ValueType) => handleChange(index, e)}>
                  Instructor Incharge
                </DropdownMolecule>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button className="mt-4" type="submit">
        Save
      </Button>
    </form>
  );
}

function AddIntakePeriod({
  values,
  academicyears,
  // eslint-disable-next-line no-unused-vars
  handleChange,
  handleNext,
  handleCheck,
  academicperiods,
}: StepLevelPeriod) {
  let chosedLevels = values.filter((val) => val.checked);
  return (
    <form onSubmit={handleNext}>
      <div className="overflow-y-auto max-h-96">
        <Heading fontSize="sm">Program Levels</Heading>
        {chosedLevels.map((programLevel, index) => (
          <div key={programLevel.level.id}>
            <SwitchMolecule
              value={programLevel.checked}
              name="level"
              handleChange={() => handleCheck(index)}>
              {programLevel.level.name}
            </SwitchMolecule>
            {programLevel.checked && (
              <div className="pl-8 py-3 flex flex-col gap-2">
                <InputMolecule
                  readOnly
                  width="72"
                  name="academic_year_id"
                  value={`${
                    academicyears.find(
                      (year) => year.id === programLevel.academic_year_id,
                    )?.name
                  }`}
                  handleChange={(_e: ValueType) => {}}>
                  Academic Year
                </InputMolecule>
                {academicperiods.map((prd) => {
                  <Heading fontSize="sm" color="primary">
                    {prd.name}
                  </Heading>;
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <Button className="mt-4" type="submit">
        Save
      </Button>
    </form>
  );
}
