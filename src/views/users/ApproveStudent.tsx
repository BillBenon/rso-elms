import React from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';

import Students from '../../components/Organisms/user/Students';
import { queryClient } from '../../plugins/react-query';
import enrollmentStore from '../../store/administration/enrollment.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { ApproveStudents, StudentApproval } from '../../types/services/enrollment.types';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import { AcademyUserType } from '../../types/services/user.types';

function ApproveStudent() {
  const history = useHistory();
  const { intakeProg } = useParams<IntakeProgParam>();
  const studentProg =
    intakeProgramStore.getStudentsByIntakeProgram(intakeProg).data?.data.data;

  let students: AcademyUserType[] = [];

  studentProg?.map((stud) => {
    let { id, username, first_name, last_name, email, person, user_type } =
      stud.student.user;

    let student: AcademyUserType = {
      id: id.toString(),
      username: username,
      'full name': first_name + ' ' + last_name,
      email: email,
      'ID Card': person && person.nid,
      user_type: user_type,
      status: stud.enrolment_status,
    };

    students.push(student);
  });

  const { mutateAsync } = enrollmentStore.approveStudent();

  function approveStud(data?: string[]) {
    data?.map((st_id) => {
      let newStudent: ApproveStudents = {
        intake_program_student_id: parseInt(st_id),
        status: StudentApproval.APPROVED,
      };

      mutateAsync(newStudent, {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['students/intakeProgramId']);
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      });
    });
  }

  const studentActions = [
    {
      name: 'View Student',
      handleAction: (id: string | number | undefined) => {
        history.push(`/dashboard/users/${id}/profile`); // go to view user profile
      },
    },
  ];

  return (
    <Students
      students={students}
      handleStatusAction={approveStud}
      studentActions={studentActions}
      enumtype={'AcademyUserType'}
      selectorActions={[{ name: 'Approve Students', handleAction: approveStud }]}
    />
  );
}

export default ApproveStudent;
