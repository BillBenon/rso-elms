import React, { useEffect, useState } from 'react';

import Button from '../components/Atoms/custom/Button';
import SelectMolecule from '../components/Molecules/input/SelectMolecule';
import useAuthenticator from '../hooks/useAuthenticator';
import academyStore from '../store/administration/academy.store';
import { ValueType } from '../types';
import { AcademyInfo } from '../types/services/academy.types';
import {
  EnrollmentMode,
  EnrollmentStatus,
  EnrollStudentToLevel,
} from '../types/services/enrollment.types';
import { PromotionStatus } from '../types/services/intake-program.types';
import { getDropDownOptions } from '../utils/getOption';

export default function EnrollStudents() {
  const { user } = useAuthenticator();
  const [enrollStud, setEnrollStud] = useState<EnrollStudentToLevel>({
    academic_year_program_level_id: 0,
    completed_on: '',
    enroled_on: '',
    enrolment_mode: EnrollmentMode.NEW,
    enrolment_status: EnrollmentStatus.NEW,
    intake_program_student_id: 0,
    position: 0,
    promotion_status: PromotionStatus.PENDING,
  });

  useEffect(() => {
    setEnrollStud((inst) => ({ ...inst, user_id: user?.id + '' }));
  }, [user?.id]);

  const academies: AcademyInfo[] | undefined =
    academyStore.fetchAcademies().data?.data.data || [];

  function handleChange(e: ValueType) {
    setEnrollStud((enrol) => ({
      ...enrol,
      [e.name]: e.value,
    }));
  }

  return (
    <>
      <SelectMolecule
        options={getDropDownOptions({ inputs: academies || [] })}
        name="academy_id"
        placeholder="select academy"
        value={enrollStud.academic_year_program_level_id + ''}
        handleChange={handleChange}>
        Academy
      </SelectMolecule>
      <div className="pt-3">
        <Button type="submit">Save</Button>
      </div>
    </>
  );
}
