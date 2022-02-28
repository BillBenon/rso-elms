import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import Button from '../components/Atoms/custom/Button';
import DateMolecule from '../components/Molecules/input/DateMolecule';
import DropdownMolecule from '../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../components/Molecules/input/InputMolecule';
import SelectMolecule from '../components/Molecules/input/SelectMolecule';
import Stepper from '../components/Molecules/Stepper/Stepper';
import useAuthenticator from '../hooks/useAuthenticator';
import academyStore from '../store/administration/academy.store';
import enrollmentStore from '../store/administration/enrollment.store';
import { intakeStore } from '../store/administration/intake.store';
import programStore from '../store/administration/program.store';
import { rankStore } from '../store/administration/rank.store';
import { RoleResWithPrevilages, RoleType, ValueType } from '../types';
import {
  EnrollmentMode,
  EnrollUserToProgram,
  StudentApproval,
} from '../types/services/enrollment.types';
import { IntakeProgramInfo } from '../types/services/intake-program.types';
import { RankRes } from '../types/services/rank.types';
import cookie from '../utils/cookie';
import { getDropDownOptions, getDropDownStatusOptions } from '../utils/getOption';

interface EnrollUserToProgramIntakes extends EnrollUserToProgram {
  academy_id: string;
  program_id: string;
  intake_id: string;
}

interface IProps {
  values: EnrollUserToProgramIntakes;
  user_roles?: RoleResWithPrevilages;
  otherDetail?: any;
  display_label: string;
  handleChange: (_e: ValueType) => any;
  handleNext: <T>(_e: FormEvent<T>) => any;
}

export default function EnrollStudents() {
  const { user } = useAuthenticator();
  const history = useHistory();

  const { mutate } = enrollmentStore.enrollUsersToProgram();
  const [currentStep, setCurrentStep] = useState(0);
  const [enrollStud, setEnrollStud] = useState<EnrollUserToProgramIntakes>({
    completed_on: '',
    employee_number: '',
    enroled_on: '',
    enrolment_mode: EnrollmentMode.NEW,
    enrolment_status: StudentApproval.PENDING,
    intake_program_id: '',
    other_rank: '',
    rank_id: '',
    rank_institution: '',
    third_party_reg_number: '',
    user_id: '',
    academy_id: '',
    program_id: '',
    intake_id: '',
  });

  const picked_role_cookie = cookie.getCookie('user_role') || '';
  const user_roles = user?.user_roles.find((role) => role.id == picked_role_cookie);

  function handleChange(e: ValueType) {
    setEnrollStud((enrol) => ({
      ...enrol,
      [e.name]: e.value,
    }));
  }

  useEffect(() => {
    setEnrollStud((stud) => ({
      ...stud,
      user_id: user?.id + '',
    }));
  }, [user?.id]);

  useEffect(() => {
    setEnrollStud((stud) => ({
      ...stud,
      academy_id: user_roles?.academy_id + '',
    }));
  }, [user_roles?.academy_id]);

  useEffect(() => {
    setEnrollStud((stud) => ({
      ...stud,
      intake_program_id: stud.intake_id + '',
    }));
  }, [enrollStud.intake_id]);

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
    if (currentStep === 0) setCurrentStep(currentStep + 1);
    else {
      await mutate(enrollStud, {
        onSuccess(data) {
          toast.success(data.data.message);
          history.goBack();
        },
        onError(error: any) {
          toast.error(error.response.data.message);
        },
      });
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
        navigateToStepHandler={() => {}}>
        <EnrollmentInfo
          display_label="info"
          values={enrollStud}
          handleChange={handleChange}
          handleNext={handleSubmit}
        />
        <EnrollmentAcademy
          display_label="more"
          values={enrollStud}
          user_roles={user_roles}
          handleChange={handleChange}
          handleNext={handleSubmit}
        />
      </Stepper>
    </div>
  );
}

function EnrollmentInfo({ values, handleChange, handleNext }: IProps) {
  const ranks: RankRes[] | undefined = rankStore.getRanks().data?.data.data;
  return (
    <form onSubmit={handleNext}>
      <DateMolecule
        handleChange={handleChange}
        startYear={new Date().getFullYear() - 20}
        endYear={new Date().getFullYear()}
        reverse={false}
        name="enroled_on"
        width="60 md:w-80">
        Enrollment date
      </DateMolecule>
      <InputMolecule
        name="employee_number"
        value={values.employee_number}
        handleChange={handleChange}>
        Service number
      </InputMolecule>
      <DropdownMolecule
        name="enrolment_mode"
        handleChange={handleChange}
        defaultValue={getDropDownStatusOptions(EnrollmentMode).find(
          (enrol) => enrol.value === values.enrolment_mode,
        )}
        value={values.enrolment_mode}
        options={getDropDownStatusOptions(EnrollmentMode)}
        placeholder="Select enrolment mode">
        Enrollment mode
      </DropdownMolecule>
      <DropdownMolecule
        placeholder="Select current rank"
        name="rank_id"
        options={getDropDownOptions({ inputs: ranks || [] })}
        handleChange={handleChange}>
        User Rank
      </DropdownMolecule>
      <div className="pt-3">
        <Button type="submit" onClick={() => handleNext}>
          Next
        </Button>
      </div>
    </form>
  );
}

function EnrollmentAcademy({ values, user_roles, handleChange, handleNext }: IProps) {
  const academies = academyStore.fetchAcademies();
  const programs = programStore.getProgramsByAcademy(values.academy_id) || [];
  const intakes = intakeStore.getIntakesByProgram(values.program_id) || [];

  return (
    <form onSubmit={handleNext}>
      {user_roles?.type === RoleType.INSTITUTION && (
        <SelectMolecule
          options={getDropDownOptions({ inputs: academies.data?.data.data || [] })}
          name="academy_id"
          placeholder={
            academies.isLoading ? 'Loading academies...' : 'Academy to be enrolled in'
          }
          value={values.academy_id}
          handleChange={handleChange}>
          Academy
        </SelectMolecule>
      )}
      <SelectMolecule
        options={getDropDownOptions({ inputs: programs.data?.data.data || [] })}
        name="program_id"
        placeholder={
          programs.isLoading ? 'Loading programs...' : 'Program to be enrolled in'
        }
        value={values.program_id}
        handleChange={handleChange}>
        Programs
      </SelectMolecule>
      <SelectMolecule
        options={getDropDownOptions({
          inputs: intakes.data?.data.data || [],
          labelName: ['intake_id'],
          //@ts-ignore
          getOptionLabel: (intake: IntakeProgramInfo) => intake.intake.title,
        })}
        name="intake_id"
        value={values.intake_id}
        placeholder={
          intakes.isLoading ? 'Loading intakes...' : 'intake to be enrolled in'
        }
        handleChange={handleChange}>
        Intake
      </SelectMolecule>
      <div className="pt-3">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
