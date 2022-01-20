import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import useAuthenticator from '../../hooks/useAuthenticator';
import { queryClient } from '../../plugins/react-query';
import { classStore } from '../../store/administration/class.store';
import enrollmentStore from '../../store/administration/enrollment.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import usersStore from '../../store/administration/users.store';
import { ValueType } from '../../types';
import { ClassGroupType, ICreateClass } from '../../types/services/class.types';
import { Instructor } from '../../types/services/instructor.types';
import { IntakePeriodParam } from '../../types/services/intake-program.types';
import { UserType } from '../../types/services/user.types';
import { getDropDownOptions, getDropDownStatusOptions } from '../../utils/getOption';

function NewClass() {
  const history = useHistory();

  const [form, setForm] = useState<ICreateClass>({
    class_group_type: ClassGroupType.CLASS,
    class_name: '',
    class_representative_one_id: '',
    class_representative_tree_id: '',
    class_representative_two_id: '',
    instructor_class_in_charge_id: '',
    intake_academic_year_period_id: 0,
    intake_level_id: 0,
  });

  const { user } = useAuthenticator();
  const levelIdTitle = document.getElementById('intake_level_id')?.title;
  const {
    level: levelId,
    intakeProg,
    intakeId,
    id,
    period,
  } = useParams<IntakePeriodParam>();
  useEffect(
    () =>
      setForm((frm) => {
        return {
          ...frm,
          intake_level_id: parseInt(levelIdTitle || ''),
        };
      }),
    [levelIdTitle],
  );

  useEffect(() => {
    setForm((frm) => {
      return {
        ...frm,
        class_representative_two_id: form.class_representative_one_id,
        class_representative_tree_id: form.class_representative_one_id,
      };
    });
  }, [form.class_representative_one_id]);

  const { data: levelInstructors, isLoading: instLoading } =
    enrollmentStore.getInstructorsInProgramLevel(levelId);

  const instructors =
    levelInstructors?.data.data.map(
      (inst) => inst.intake_program_instructor.instructor,
    ) || [];

  const students =
    intakeProgramStore.getStudentsByIntakeProgramLevel(levelId).data?.data.data || [];
  const users =
    usersStore
      .getUsersByAcademyAndUserType(user?.academy.id.toString() || '', UserType.STUDENT, {
        page: 0,
        pageSize: 1000,
        sortyBy: 'username',
      })
      .data?.data.data.content.filter((stud) => stud.user_type === UserType.STUDENT) ||
    [];

  const studentsInProgram = users.filter((us) =>
    students.some((st) => st.intake_program_student.student.user.id === us.id),
  );

  function handleChange(e: ValueType) {
    setForm({ ...form, [e.name]: e.value });
  }

  const { mutate } = classStore.addClass();

  function submitForm(e: FormEvent) {
    e.preventDefault();

    mutate(
      { ...form, intake_academic_year_period_id: parseInt(period) },
      {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['class/periodId']);
          history.push(
            `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${levelId}/view-class`,
          );
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      },
    );
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <InputMolecule
          title={levelId}
          id="intake_level_id"
          type="hidden"
          value={levelId}
          name="intake_level_id"
        />
        <DropdownMolecule
          name="class_group_type"
          handleChange={handleChange}
          defaultValue={getDropDownStatusOptions(ClassGroupType).find(
            (cl) => cl.value === form.class_group_type,
          )}
          options={getDropDownStatusOptions(ClassGroupType)}
          placeholder="Choose class type">
          Class Type
        </DropdownMolecule>

        <InputMolecule
          value={form.class_name}
          handleChange={handleChange}
          name="class_name">
          Class name
        </InputMolecule>
        <DropdownMolecule
          name="instructor_class_in_charge_id"
          handleChange={handleChange}
          options={getDropDownOptions({
            inputs: instructors,
            labelName: ['first_name', 'last_name'],
            //@ts-ignore
            getOptionLabel: (inst: Instructor) =>
              inst.user.first_name + ' ' + inst.user.last_name,
          })}
          placeholder={
            instLoading
              ? 'Loading instructor representatives...'
              : 'Choose instructor representative'
          }>
          Instructor representative
        </DropdownMolecule>

        <DropdownMolecule
          name="class_representative_one_id"
          handleChange={handleChange}
          options={getDropDownOptions({
            inputs: studentsInProgram,
            labelName: ['first_name', 'last_name'],
          })}
          placeholder="Choose class representative">
          Class representative
        </DropdownMolecule>

        <div className="mt-5">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
}

export default NewClass;
