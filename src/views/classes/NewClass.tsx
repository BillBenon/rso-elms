import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import { queryClient } from '../../plugins/react-query';
import { authenticatorStore } from '../../store/administration';
import { classStore } from '../../store/administration/class.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import usersStore from '../../store/administration/users.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { ValueType } from '../../types';
import { ClassGroupType, ICreateClass } from '../../types/services/class.types';
import { Instructor } from '../../types/services/instructor.types';
import {
  IntakeLevelParam,
  IntakeProgramLevelPeriodInfo,
} from '../../types/services/intake-program.types';
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

  const authUser = authenticatorStore.authUser().data?.data.data;
  const { level: levelId, intakeProg, intakeId, id } = useParams<IntakeLevelParam>();
  useEffect(
    () =>
      setForm({
        ...form,
        intake_level_id: parseInt(
          document.getElementById('intake_level_id')?.title || '0',
        ),
      }),
    [document.getElementById('intake_level_id')?.title],
  );

  useEffect(() => {
    setForm({
      ...form,
      class_representative_two_id: form.class_representative_one_id,
      class_representative_tree_id: form.class_representative_one_id,
    });
  }, [form.class_representative_one_id]);

  const instructors_deployed =
    instructordeploymentStore.getInstructorsDeployedInAcademy(
      authUser?.academy.id.toString() || '',
    ).data?.data.data || [];

  const all_instructors = instructordeploymentStore.getInstructors().data?.data.data;

  const instructors_in_academy =
    all_instructors?.filter(
      (instr) =>
        instr.id ===
        instructors_deployed.find((dep) => dep.instructor_id == instr.id)?.instructor_id,
    ) || [];

  const students =
    intakeProgramStore.getStudentsByIntakeProgram(intakeProg).data?.data.data || [];
  const users =
    usersStore
      .getUsersByAcademy(authUser?.academy.id.toString() || '')
      .data?.data.data.filter((stud) => stud.user_type === UserType.STUDENT) || [];

  const studentsInProgram = users.filter((us) =>
    students.some((st) => st.student.user.id === us.id),
  );

  const periods =
    intakeProgramStore.getPeriodsByLevel(parseInt(levelId)).data?.data.data || [];

  function handleChange(e: ValueType) {
    setForm({ ...form, [e.name]: e.value });
  }

  const { mutate } = classStore.addClass();

  function submitForm(e: FormEvent) {
    e.preventDefault();

    mutate(form, {
      onSuccess: () => {
        toast.success('Academic year created');
        queryClient.invalidateQueries(['class/levelId']);
        history.push(
          `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/modules/${levelId}/view-class`,
        );
      },
      onError: (error) => {
        console.log(error);
        toast.error('something wrong happened while creating level');
      },
    });
  }

  return (
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
        name="intake_academic_year_period_id"
        handleChange={handleChange}
        options={getDropDownOptions({
          inputs: periods || [],
          labelName: ['name'],
          //@ts-ignore
          getOptionLabel: (prd: IntakeProgramLevelPeriodInfo) => prd.academic_period.name,
        })}
        placeholder="Choose period">
        Academic period
      </DropdownMolecule>

      <DropdownMolecule
        name="instructor_class_in_charge_id"
        handleChange={handleChange}
        options={getDropDownOptions({
          inputs: instructors_in_academy,
          labelName: ['first_name', 'last_name'],
          //@ts-ignore
          getOptionLabel: (inst: Instructor) =>
            inst.user.first_name + ' ' + inst.user.last_name,
        })}
        placeholder="Choose instructor representative">
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
  );
}

export default NewClass;
