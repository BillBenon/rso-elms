import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import RightSidebar from '../../components/Organisms/RightSidebar';
import { queryClient } from '../../plugins/react-query';
import { classStore } from '../../store/administration/class.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { IClassStudent } from '../../types/services/class.types';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';

type IAddStudent = {
  classId: number;
};

function AddStudents({ classId }: IAddStudent) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { intakeProg } = useParams<IntakeProgParam>();

  const studentsProgram = intakeProgramStore.getStudentsByIntakeProgram(intakeProg || '')
    .data?.data.data;

  // const studentsProgram = intakeProgramStore.getStudentsByIntakeProgramLevel(level || '')
  // .data?.data.data;

  const [students, setStudents] = useState<UserView[]>([]);
  useEffect(() => {
    let studentsView: UserView[] = [];
    studentsProgram?.forEach((stud) => {
      let studentView: UserView = {
        id: stud.student.user.id,
        first_name: stud.student.user.first_name,
        last_name: stud.student.user.last_name,
        image_url: stud.student.user.image_url,
      };
      studentsView.push(studentView);
    });
    setStudents(studentsView);
  }, [studentsProgram]);

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
      onError: () => {
        toast.error('something wrong happened while creating faculty');
      },
    });
  }

  return (
    <div className="flex flex-col cursor-pointer">
      <Button styleType="outline" onClick={() => setSidebarOpen(true)}>
        Add student
      </Button>
      <RightSidebar
        open={sidebarOpen}
        handleClose={() => setSidebarOpen(false)}
        label="Add Students to class"
        data={students}
        selectorActions={[
          {
            name: 'add students',
            handleAction: (data?: string[]) => add(data),
          },
        ]}
      />
    </div>
  );
}

export default AddStudents;
