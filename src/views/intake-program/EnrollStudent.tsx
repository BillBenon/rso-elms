import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import RightSidebar from '../../components/Organisms/RightSidebar';
import { queryClient } from '../../plugins/react-query';
import intakeProgramStore from '../../store/administration/intake-program.store';
import {
  EnrollStudents,
  IntakeLevelParam,
} from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';

function EnrollStudent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { intakeProg, level: levelId } = useParams<IntakeLevelParam>();

  const studentsProgram = intakeProgramStore.getStudentsByIntakeProgram(intakeProg || '')
    .data?.data.data;

  const level = intakeProgramStore.getIntakeLevelById(levelId || '').data?.data.data;

  const [students, setStudents] = useState<UserView[]>([]);
  useEffect(() => {
    let studentsView: UserView[] = [];
    studentsProgram?.forEach((stud) => {
      let studentView: UserView = {
        id: stud.id,
        first_name: stud.student.user.first_name,
        last_name: stud.student.user.last_name,
        image_url: stud.student.user.image_url,
      };
      studentsView.push(studentView);
    });
    setStudents(studentsView);
  }, [studentsProgram]);

  const { mutate } = intakeProgramStore.enrollStudentsToLevel();

  function add(data?: string[]) {
    data?.map((st_id) => {
      let newStudent: EnrollStudents = {
        academic_year_id: level?.academic_year.id.toString() || '',
        intake_program_student_id: parseInt(st_id),
        program_level_id: level?.academic_program_level.id.toString() || '',
      };

      mutate(newStudent, {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['students/intakeProgramlevelId']);
          setSidebarOpen(false);
        },
        onError: () => {
          toast.error('something wrong happened while enrolling student to level');
        },
      });
    });
  }
  return (
    <div className="flex flex-col cursor-pointer">
      <Button styleType="outline" onClick={() => setSidebarOpen(true)}>
        Enroll student
      </Button>
      <RightSidebar
        open={sidebarOpen}
        handleClose={() => setSidebarOpen(false)}
        label="Enroll students to level"
        data={students}
        selectorActions={[
          {
            name: 'enroll students',
            handleAction: (data?: string[]) => add(data),
          },
        ]}
        dataLabel={'Students in this program'}
      />
    </div>
  );
}

export default EnrollStudent;
