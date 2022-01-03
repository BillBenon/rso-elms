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
import intakeProgramStore from '../../store/administration/intake-program.store';
import {
  EnrollmentMode,
  EnrollStudentToProgram,
  StudentApproval,
} from '../../types/services/enrollment.types';
import {
  IntakeProgParam,
  StudentIntakeProgram,
} from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';

// eslint-disable-next-line no-unused-vars
interface ProgramEnrollmentProps<T> {
  existing: StudentIntakeProgram[];
}

function EnrollStudentIntakeProgram<T>({ existing }: ProgramEnrollmentProps<T>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { intakeProg, intakeId } = useParams<IntakeProgParam>();

  const { data: authUser } = authenticatorStore.authUser();

  const { data: studentsInAcademy, isLoading } = intakeProgramStore.getStudentsByAcademy(
    authUser?.data.data.academy.id + '',
  );

  const programs = getProgramsByIntake(intakeId).data?.data.data;

  const intakeProgram = programs?.find((pr) => pr.id === intakeProg);

  // let intakeStudents = programs?.map(
  //   (prg) => intakeProgramStore.getStudentsByIntakeProgram(prg.id + '').data?.data.data,
  // );

  // let approvedStudents = intakeStudents?.find((intk) =>
  //   intk?.filter((stud) => stud.enrolment_status === StudentApproval.APPROVED),
  // );

  const [students, setStudents] = useState<UserView[]>([]);

  useEffect(() => {
    let existing_ids: string[] = [];

    for (let index = 0; index < existing.length; index++) {
      existing_ids.push(existing[index].student.id + '');
    }
    let studentsView: UserView[] = [];
    studentsInAcademy?.data.data.forEach((stud) => {
      if (!existing_ids.includes(stud.id + '')) {
        let studentView: UserView = {
          id: stud.id,
          first_name: stud.user.first_name,
          last_name: stud.user.last_name,
          image_url: stud.user.image_url,
        };
        studentsView.push(studentView);
      }
    });
    setStudents(studentsView);
  }, [studentsInAcademy?.data.data]);

  const { mutate } = enrollmentStore.enrollStudentToProgram();

  function add(data?: string[]) {
    data?.map((stud_id) => {
      let studentInfo = studentsInAcademy?.data.data.find(
        (st) => st.id === stud_id,
      )?.user;

      let reg_no = studentsInAcademy?.data.data.find(
        (st) => st.id === stud_id,
      )?.reg_number;

      let newStudent: EnrollStudentToProgram = {
        completed_on: '',
        employee_number: studentInfo?.person.empNo || '',
        enroled_on: studentInfo?.created_on || '',
        enrolment_mode: EnrollmentMode.NEW,
        enrolment_status: StudentApproval.APPROVED,
        intake_program_id: intakeProgram?.id.toString() || '',
        other_rank:
          studentInfo?.person.other_rank ||
          studentInfo?.person.current_rank.id + '' ||
          '',
        rank_id: studentInfo?.person.current_rank.id.toString() || '',
        rank_institution: studentInfo?.person.rank_depart || '',
        student_id: stud_id,
        third_party_reg_number: reg_no || '',
      };

      mutate(newStudent, {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['students/intakeProgramId/status']);
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
        Enroll existing students
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
        dataLabel={'Students in approved in this academy'}
        isLoading={isLoading}
      />
    </div>
  );
}

export default EnrollStudentIntakeProgram;
