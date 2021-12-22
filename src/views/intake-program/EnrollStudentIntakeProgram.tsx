import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import RightSidebar from '../../components/Organisms/RightSidebar';
import { queryClient } from '../../plugins/react-query';
import { authenticatorStore } from '../../store/administration';
import enrollmentStore from '../../store/administration/enrollment.store';
import { getProgramsByIntake } from '../../store/administration/intake.store';
import {
  EnrollmentMode,
  EnrollStudentToProgram,
  StudentApproval,
} from '../../types/services/enrollment.types';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';

function EnrollStudentIntakeProgram() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { intakeProg, intakeId } = useParams<IntakeProgParam>();

  const { data: authUser } = authenticatorStore.authUser();

  const studentsInAcademy =
    enrollmentStore.getStudentsAcademy(authUser?.data.data.academy.id + '').data?.data
      .data || [];

  const programs = getProgramsByIntake(intakeId).data?.data.data;

  const intakeProgram = programs?.find((pr) => pr.id === intakeProg);

  const [students, setStudents] = useState<UserView[]>([]);

  useEffect(() => {
    let studentsView: UserView[] = [];
    studentsInAcademy?.forEach((stud) => {
      let studentView: UserView = {
        id: stud.id,
        first_name: stud.user.first_name,
        last_name: stud.user.last_name,
        image_url: stud.user.image_url,
      };
      studentsView.push(studentView);
    });
    setStudents(studentsView);
  }, [studentsInAcademy]);

  const { mutate } = enrollmentStore.enrollStudentToProgram();

  function add(data?: string[]) {
    data?.map((stud_id) => {
      let emp_no = studentsInAcademy.find((st) => st.id === stud_id)?.user.person.empNo;
      let other_rank = studentsInAcademy.find((st) => st.id === stud_id)?.user.person
        .other_rank;
      let rank_id = studentsInAcademy.find((st) => st.id === stud_id)?.user.person
        .current_rank.id;
      let rank_depart = studentsInAcademy.find((st) => st.id === stud_id)?.user.person
        .rank_depart;
      let reg_no = studentsInAcademy.find((st) => st.id === stud_id)?.reg_number;

      let newStudent: EnrollStudentToProgram = {
        completed_on: '',
        employee_number: emp_no + '',
        enroled_on: '',
        enrolment_mode: EnrollmentMode.NEW,
        enrolment_status: StudentApproval.APPROVED,
        intake_program_id: intakeProgram?.id + '',
        other_rank: other_rank + '',
        rank_id: rank_id + '',
        rank_institution: rank_depart + '',
        student_id: stud_id,
        third_party_reg_number: reg_no + '',
      };

      mutate(newStudent, {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['instructors/programId/intake']);
          setSidebarOpen(false);
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      });
    });
  }
  return (
    <div className="cursor-pointer">
      <Button
        styleType="text"
        onClick={() => setSidebarOpen(true)}
        className="flex -mt-6 items-center justify-end text-primary-500">
        <Icon name="add" size={12} fill="primary" />
        Enroll Students
      </Button>
      <RightSidebar
        open={sidebarOpen}
        handleClose={() => setSidebarOpen(false)}
        label="Enroll students to program"
        data={students}
        selectorActions={[
          {
            name: 'enroll students',
            handleAction: (data?: string[]) => add(data),
          },
        ]}
        dataLabel={'Students in this academy'}
      />
    </div>
  );
}

export default EnrollStudentIntakeProgram;
