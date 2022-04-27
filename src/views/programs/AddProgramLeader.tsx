import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useLocation } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import SelectMolecule from '../../components/Molecules/input/SelectMolecule';
import { queryClient } from '../../plugins/react-query';
import { intakeStore } from '../../store/administration/intake.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { ValueType } from '../../types';
import { Instructor } from '../../types/services/instructor.types';
import { IntakeProgram } from '../../types/services/intake.types';
import { Student } from '../../types/services/user.types';
import { getDropDownOptions, titleCase } from '../../utils/getOption';

export default function AddProgramLeader({
  intakeProg,
  intakeProgram,
}: {
  intakeProg: string;
  intakeProgram?: IntakeProgram;
}) {
  const [leader, setLeader] = useState('');
  const { mutateAsync } = intakeStore.modifyIntakeProgram();
  const { search } = useLocation();
  const history = useHistory();

  const type = new URLSearchParams(search).get('type');

  const { data: instructors, isLoading: instLoading } =
    intakeProgramStore.getInstructorsByIntakeProgram(intakeProg);

  const { data: students, isLoading: studLoading } =
    intakeProgramStore.getStudentsByIntakeProgram(intakeProg);

  const instructorsToShow = instructors?.data.data.map((inst) => inst.instructor);
  const studentsToShow = students?.data.data.map((inst) => inst.student);

  function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();

    if (intakeProgram) {
      mutateAsync(
        {
          intake_id: intakeProgram.intake.id + '',
          program_id: intakeProgram.program.id + '',
          intake_program_id: intakeProgram.id + '',
          description: intakeProgram.description,
          incharge_instructor:
            type === 'instructor' ? leader : intakeProgram.incharge_instructor,
          student_in_lead: type === 'student' ? leader : intakeProgram.student_in_lead,
          status: intakeProgram.generic_status,
        },
        {
          onSuccess() {
            toast.success('Document uploaded successfully');
            queryClient.invalidateQueries(['intake-program/id', intakeProg]);
            history.goBack();
          },
          onError(error: any) {
            toast.error(error.response.data.message);
          },
        },
      );
    }
  }

  return (
    <form onSubmit={submitForm}>
      <div className="mb-6">
        <SelectMolecule
          handleChange={(e: ValueType) => setLeader(e.value + '')}
          name={'leader'}
          placeholder={
            type === 'instructor'
              ? instLoading
                ? 'Loading instructors...'
                : 'Choose instructor'
              : studLoading
              ? 'Loading students...'
              : 'Choose student'
          }
          options={
            type === 'instructor'
              ? getDropDownOptions({
                  inputs: instructorsToShow || [],
                  labelName: ['first_name', 'last_name'],
                  //@ts-ignore
                  getOptionLabel: (inst: Instructor) =>
                    inst.user.first_name + ' ' + inst.user.last_name,
                })
              : type === 'student'
              ? getDropDownOptions({
                  inputs: studentsToShow || [],
                  labelName: ['first_name', 'last_name'],
                  //@ts-ignore
                  getOptionLabel: (stud: Student) =>
                    stud.user.first_name + ' ' + stud.user.last_name,
                })
              : []
          }>
          {titleCase(type || '')}
        </SelectMolecule>
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
}
