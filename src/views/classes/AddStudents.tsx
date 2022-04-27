import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import RightSidebar from '../../components/Organisms/RightSidebar';
import { queryClient } from '../../plugins/react-query';
import { classStore, getStudentsByClass } from '../../store/administration/class.store';
import enrollmentStore from '../../store/administration/enrollment.store';
import { IClassStudent } from '../../types/services/class.types';
import { IntakePeriodParam } from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';

type IAddStudent = {
  classId: number;
};

function AddStudents({ classId }: IAddStudent) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { level, period } = useParams<IntakePeriodParam>();
  const { t } = useTranslation();

  const unaddedStudents = enrollmentStore.getStudentsWhoAreNotInAnyClassInLevel(
    level,
    period,
  );
  const studentsInClass = getStudentsByClass(classId.toString());

  const [students, setStudents] = useState<UserView[]>([]);
  useEffect(() => {
    let studentsView: UserView[] = [];
    let studentsInClassIds = studentsInClass.data?.data.data.map((std) => std.student.id);
    let studentsToDisplay = unaddedStudents.data?.data.data.filter(
      (std) => !studentsInClassIds?.includes(std.intake_program_student.student.id),
    );

    studentsToDisplay?.sort(function (a, b) {
      return (
        a.intake_program_student.student.user.person.current_rank?.priority -
        b.intake_program_student.student.user.person.current_rank?.priority
      );
    });

    studentsToDisplay &&
      studentsToDisplay.forEach((stud) => {
        let studentView: UserView = {
          id: stud.intake_program_student.student.id,
          rank: stud.intake_program_student.student.user.person.current_rank?.name,
          first_name: stud.intake_program_student.student.user.first_name,
          last_name: stud.intake_program_student.student.user.last_name,
          image_url: stud.intake_program_student.student.user.image_url,
        };
        studentsView.push(studentView);
      });
    setStudents(studentsView);
  }, [studentsInClass.data?.data.data, unaddedStudents.data?.data.data]);

  const { mutate } = classStore.addClassStudent();

  function add(data?: string[]) {
    let students_id = data?.toString();

    let newStudent: IClassStudent = {
      intake_level_class_id: classId,
      students_id: students_id || '',
    };

    mutate(newStudent, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        queryClient.invalidateQueries(['class/students']);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  }

  return (
    <div className="flex flex-col cursor-pointer">
      <Button styleType="outline" onClick={() => setSidebarOpen(true)}>
        Add student
      </Button>

      {unaddedStudents.isLoading ? (
        <Loader />
      ) : (
        <RightSidebar
          open={sidebarOpen}
          handleClose={() => setSidebarOpen(false)}
          label={'Add Students to ' + t('Class')}
          data={students}
          selectorActions={[
            {
              name: 'add students',
              handleAction: (data?: string[]) => add(data),
            },
          ]}
          dataLabel={'Students in this level'}
          isLoading={unaddedStudents.isLoading}
          unselectAll={!sidebarOpen}
        />
      )}
    </div>
  );
}

export default AddStudents;
