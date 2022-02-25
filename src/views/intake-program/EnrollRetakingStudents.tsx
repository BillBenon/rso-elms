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
import {
  IntakeProgParam,
  PromotionStatus,
  StudentIntakeProgram,
} from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';

// eslint-disable-next-line no-unused-vars
interface ProgramEnrollmentProps<T> {
  existing: StudentIntakeProgram[];
  showSidebar: boolean;
  handleShowSidebar: () => void;
}

export default function EnrollRetakingStudents<T>({
  existing,
  showSidebar,
  handleShowSidebar,
}: ProgramEnrollmentProps<T>) {
  const { intakeProg, intakeId } = useParams<IntakeProgParam>();

  const { data } = authenticatorStore.authUser(true);

  const { data: retakingStudents, isLoading } =
    enrollmentStore.getAllStudentEnrollmentsByPromotionStatus(
      data?.data.data.academy.id + '',
      PromotionStatus.RETAKE,
    );

  console.log(retakingStudents);

  const programs = getProgramsByIntake(intakeId).data?.data.data;

  const intakeProgram = programs?.find((pr) => pr.id === intakeProg);

  const [students, setStudents] = useState<UserView[]>([]);

  useEffect(() => {
    let existing_ids: string[] = [];

    for (let index = 0; index < existing.length; index++) {
      existing_ids.push(existing[index].student.id + '');
    }
    let studentsView: UserView[] = [];
    retakingStudents?.data.data.forEach((stud) => {
      if (!existing_ids.includes(stud.student.id + '')) {
        let studentView: UserView = {
          id: stud.student.id,
          first_name: stud.student.user.first_name,
          last_name: stud.student.user.last_name,
          image_url: stud.student.user.image_url,
        };
        studentsView.push(studentView);
      }
    });
    console.log(retakingStudents);
    setStudents(studentsView);
  }, [existing, retakingStudents, retakingStudents?.data.data]);

  const { mutate } = enrollmentStore.enrollStudentToProgram();

  function add(data?: string[]) {
    data?.map((stud_id) => {
      let studentInfo = retakingStudents?.data.data.find((st) => st.id + '' === stud_id)
        ?.student.user;

      let reg_no = retakingStudents?.data.data.find((st) => st.id === stud_id)?.student
        .reg_number;

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
          handleShowSidebar();
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
        onClick={handleShowSidebar}
        className="flex -m-10 items-center justify-end text-primary-500">
        <Icon name="add" size={12} fill="primary" />
        Enroll retaking students
      </Button>
      <RightSidebar
        open={showSidebar}
        handleClose={handleShowSidebar}
        label="Enroll students to program"
        data={students}
        selectorActions={[
          {
            name: 'enroll students',
            handleAction: (data?: string[]) => add(data),
          },
        ]}
        dataLabel={'Students retaking this program'}
        isLoading={isLoading}
        unselectAll={!showSidebar}
      />
    </div>
  );
}
