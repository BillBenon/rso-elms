import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import RightSidebar from '../../components/Organisms/RightSidebar';
import { queryClient } from '../../plugins/react-query';
import enrollmentStore from '../../store/administration/enrollment.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import {
  EnrollmentMode,
  EnrollmentStatus,
  EnrollStudentToLevel,
  StudentApproval,
} from '../../types/services/enrollment.types';
import {
  IntakeLevelParam,
  PromotionStatus,
} from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';

interface IEnrollStudent {
  showSidebar: boolean;
  handleShowSidebar: () => void;
}

function EnrollStudent({ showSidebar, handleShowSidebar }: IEnrollStudent) {
  const { intakeProg, level: levelId } = useParams<IntakeLevelParam>();

  const { data: studentsProgram, isLoading } =
    intakeProgramStore.getStudentsByIntakeProgramByStatus(
      intakeProg,
      StudentApproval.APPROVED,
    );
  const { t } = useTranslation();

  const { data: enrolledStudentsLevel } =
    intakeProgramStore.getStudentsByIntakeProgramLevel(levelId);
  const level = intakeProgramStore.getIntakeLevelById(levelId || '').data?.data.data;

  const [students, setStudents] = useState<UserView[]>([]);
  useEffect(() => {
    let student_ids: string[] = [];
    enrolledStudentsLevel?.data.data.forEach((studLevel) => {
      student_ids.push(studLevel.intake_program_student.id + '');
    });
    let studentsView: UserView[] = [];

    const rankedStudents =
      studentsProgram?.data.data.filter(
        (inst) => inst.student.user.person?.current_rank,
      ) || [];
    const unrankedStudents =
      studentsProgram?.data.data.filter(
        (inst) => inst !== rankedStudents.find((ranked) => ranked.id === inst.id),
      ) || [];

    unrankedStudents.sort(function (a, b) {
      if (a.student.user.person && b.student.user.person) {
        return (
          a.student.user.person.current_rank?.priority -
          b.student.user.person.current_rank?.priority
        );
      } else {
        return 0;
      }
    });

    const finalStudents = rankedStudents.concat(unrankedStudents);

    finalStudents.forEach((stud) => {
      if (!student_ids.includes(stud.id + '')) {
        let studentView: UserView = {
          id: stud.id,
          rank: stud.student.user.person?.current_rank?.name,
          first_name: stud.student.user.first_name,
          last_name: stud.student.user.last_name,
          image_url: stud.student.user.image_url,
        };
        studentsView.push(studentView);
      }
    });
    setStudents(studentsView);
  }, [studentsProgram, enrolledStudentsLevel]);

  const { mutate } = enrollmentStore.enrollStudentsToLevel();

  function add(data?: string[]) {
    data?.map((st_id) => {
      let newStudent: EnrollStudentToLevel = {
        academic_year_program_level_id: parseInt(level?.id + ''),
        completed_on: '',
        enroled_on: '',
        enrolment_mode: EnrollmentMode.NEW,
        enrolment_status: EnrollmentStatus.NEW,
        intake_program_student_id: parseInt(st_id),
        position: 0,
        promotion_status: PromotionStatus.PENDING,
      };

      mutate(newStudent, {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['students/intakeProgramlevelId', levelId]);
          handleShowSidebar();
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      });
    });
  }
  return (
    <div className="flex flex-col cursor-pointer">
      <Button styleType="outline" onClick={handleShowSidebar}>
        Enroll student
      </Button>
      <RightSidebar
        open={showSidebar}
        handleClose={handleShowSidebar}
        label="Enroll students to level"
        data={students}
        selectorActions={[
          {
            name: 'enroll students',
            handleAction: (data?: string[]) => add(data),
          },
        ]}
        dataLabel={'Students in this ' + t('Program')}
        isLoading={isLoading}
        unselectAll={!showSidebar}
      />
    </div>
  );
}

export default EnrollStudent;
