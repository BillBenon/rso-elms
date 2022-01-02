import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import DateMolecule from '../../components/Molecules/input/DateMolecule';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import SwitchMolecule from '../../components/Molecules/input/SwitchMolecule';
import { queryClient } from '../../plugins/react-query';
import { authenticatorStore } from '../../store/administration';
import academicyearsStore from '../../store/administration/academicyears.store';
import { intakeStore } from '../../store/administration/intake.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { getLevelsByAcademicProgram } from '../../store/administration/program.store';
import { ValueType } from '../../types';
import { Instructor } from '../../types/services/instructor.types';
import {
  CreateLevelIntakeProgram,
  IntakeProgParam,
  ProgressStatus,
} from '../../types/services/intake-program.types';
import { getDropDownOptions } from '../../utils/getOption';
import { NewIntakePeriod } from './NewIntakePeriod';

export default function NewIntakeProgramLevel() {
  const history = useHistory();

  const [success, setSuccess] = useState(false);

  const { id: programId, intakeProg } = useParams<IntakeProgParam>();

  const programLevels = getLevelsByAcademicProgram(programId).data?.data.data;

  const authUser = authenticatorStore.authUser().data?.data.data;
  const intakes = intakeStore.getIntakesByProgram(programId).data?.data.data;

  const intakeProgram = intakes?.find((intpr) => intpr.id === intakeProg);

  const academicYears =
    academicyearsStore.fetchAcademicYears(authUser?.academy.id.toString() || '').data
      ?.data.data || [];

  const { data: instructorsProgram, isLoading: instLoading } =
    intakeProgramStore.getInstructorsByIntakeProgram(intakeProg);

  const instructors = instructorsProgram?.data.data.map((inst) => inst.instructor) || [];

  const [values, setvalues] = useState<CreateLevelIntakeProgram>({
    academic_program_level_id: '',
    academic_year_id: '',
    academic_year_program_intake_level_id: 0,
    actual_end_on: '',
    actual_start_on: '',
    incharge_id: '',
    intake_program_id: intakeProgram?.id.toString() || '',
    planed_end_on: '',
    planed_start_on: '',
    progress_status: ProgressStatus.STARTED,
  });

  const [intakeprogramlevelId, setIntakeprogramlevelId] = useState('');

  const [checked, setchecked] = useState(-1);

  const { mutateAsync } = intakeProgramStore.addLevelToIntakeProgram();

  function handleChange(e: ValueType) {
    setvalues({ ...values, [e.name]: e.value });
  }
  const handleCheck = (index: number, id: string) => {
    setvalues({ ...values, academic_program_level_id: id });

    if (index === checked) {
      setchecked(-1);
    } else {
      setchecked(index);
    }
  };

  async function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault(); // prevent page to reload:

    await mutateAsync(values, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        queryClient.invalidateQueries(['levels/academy']);
        setSuccess(true);
        setIntakeprogramlevelId(data.data.data.id.toString());
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  }

  // useEffect(() => {
  //   programLevels && handleCheck(0, programLevels[0].id.toString());
  // }, [programLevels]);

  useEffect(() => {
    setvalues({ ...values, intake_program_id: intakeProgram?.id.toString() || '' });
  }, [intakeProgram]);

  return (
    <div className="p-10 w-3/5">
      <Heading fontWeight="semibold" fontSize="2xl" className="pb-8">
        Add Levels to Program Intake
      </Heading>
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
        <div key={index} className={`${checked === index ? 'bg-main' : ''} p-4`}>
          <SwitchMolecule
            value={checked === index}
            name="level"
            handleChange={() => handleCheck(index, programLevel.id.toString())}>
            {programLevel.level.name}
          </SwitchMolecule>
          {checked === index && (
            <div className="py-3 flex flex-col gap-2 ">
              {!success && (
                <form onSubmit={submitForm}>
                  <DropdownMolecule
                    width="72"
                    placeholder={instLoading ? 'Loading incharge' : 'Select incharge'}
                    options={getDropDownOptions({
                      inputs: instructors,
                      labelName: ['first_name', 'last_name'],
                      //@ts-ignore
                      getOptionLabel: (instr: Instructor) =>
                        instr.user.first_name + ' ' + instr.user.last_name,
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
                  <DateMolecule
                    startYear={new Date(
                      academicYears.find((yr) => yr.id == values.academic_year_id)
                        ?.planned_start_on || '',
                    ).getFullYear()}
                    endYear={new Date(
                      academicYears.find((yr) => yr.id == values.academic_year_id)
                        ?.planned_end_on || '',
                    ).getFullYear()}
                    handleChange={handleChange}
                    reverse={false}
                    name="planed_start_on">
                    Start Date
                  </DateMolecule>
                  <div className="pt-4">
                    <DateMolecule
                      startYear={new Date(values.planed_start_on).getFullYear()}
                      endYear={new Date(
                        academicYears.find((yr) => yr.id == values.academic_year_id)
                          ?.planned_end_on || '',
                      ).getFullYear()}
                      handleChange={handleChange}
                      name="planed_end_on">
                      End Date
                    </DateMolecule>
                  </div>
                  <div className="mt-4">
                    <Button type="submit">Save</Button>
                  </div>
                </form>
              )}
              {success && (
                <NewIntakePeriod checked={checked} level_id={intakeprogramlevelId} />
              )}
            </div>
          )}
        </div>
      ))}
      <Button
        className="mt-4"
        onClick={
          () => history.go(-1)
          // history.push(`/dashboard/intakes/programs/${intakeProg}/${programId}`)
        }>
        Finish
      </Button>
    </div>
  );
}
