import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import { queryClient } from '../../plugins/react-query';
import { authenticatorStore } from '../../store/administration';
import academicperiodStore from '../../store/administration/academicperiod.store';
import { classStore } from '../../store/administration/class.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import usersStore from '../../store/administration/users.store';
import { ValueType } from '../../types';
import { ClassGroupType, ICreateClass } from '../../types/services/class.types';
import { IntakeLevelParam } from '../../types/services/intake-program.types';
import { UserType, UserTypes } from '../../types/services/user.types';
import {
  getDropDownOptions,
  getDropDownStatusOptions,
  getSpecificInchargeDropdown,
} from '../../utils/getOption';

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

  useEffect(() => {
    setForm({
      ...form,
      class_representative_two_id: form.class_representative_one_id,
      class_representative_tree_id: form.class_representative_one_id,
    });
  }, [form.class_representative_one_id]);

  let users: UserTypes[] = [];
  const { data, isSuccess } = usersStore.getUsersByAcademy(
    authUser?.academy.id.toString() || '',
  );

  if (isSuccess && data?.data.data) {
    data?.data.data.map((obj) => {
      let {
        id,
        username,
        first_name,
        last_name,
        email,
        person,
        academy,
        generic_status,
        user_type,
      } = obj;

      let user: UserTypes = {
        id: id.toString(),
        username: username,
        'full name': first_name + ' ' + last_name,
        email: email,
        NID: person && person.nid,
        academy: academy && academy.name,
        status: generic_status,
        user_type: user_type,
      };
      users.push(user);
    });
  }

  const [students, setStudents] = useState<UserTypes[]>();
  const [instructors, setInstructors] = useState<UserTypes[]>();

  const level = intakeProgramStore
    .getLevelsByIntakeProgram(intakeProg)
    .data?.data.data?.find((lev) => lev.id === parseInt(levelId));

  const periods =
    academicperiodStore.getAcademicPeriodsByAcademicYear(
      level?.academic_year.id.toString() || '',
    ).data?.data.data || [];

  useEffect(() => {
    setForm({ ...form, intake_level_id: parseInt(levelId) });

    setStudents(users.filter((user) => user.user_type == UserType.STUDENT));
    setInstructors(users.filter((user) => user.user_type == UserType.INSTRUCTOR));
  }, []);

  function handleChange(e: ValueType) {
    setForm({ ...form, [e.name]: e.value });
  }

  const { mutate } = classStore.addClass();

  function submitForm(e: FormEvent) {
    e.preventDefault();

    mutate(form, {
      onSuccess: () => {
        toast.success('Academic year created');
        queryClient.invalidateQueries(['academicyears']);
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
        options={getDropDownOptions({ inputs: periods })}
        placeholder="Choose period">
        Academic period
      </DropdownMolecule>

      <DropdownMolecule
        name="instructor_class_in_charge_id"
        handleChange={handleChange}
        options={getSpecificInchargeDropdown(instructors)}
        placeholder="Choose instructor representative">
        Instructor representative
      </DropdownMolecule>

      <DropdownMolecule
        name="class_representative_one_id"
        handleChange={handleChange}
        options={getSpecificInchargeDropdown(students)}
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
