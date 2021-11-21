/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import RightSidebar from '../../components/Organisms/RightSidebar';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';

function AddStudents() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { intakeProg } = useParams<IntakeProgParam>();

  const studentsProgram = intakeProgramStore.getStudentsByIntakeProgram(intakeProg || '')
    .data?.data.data;

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

  return (
    <div className="flex flex-col cursor-pointer" onClick={() => setSidebarOpen(true)}>
      Add student
      <RightSidebar
        isOpen={sidebarOpen}
        label="Add Students to class"
        data={students}
        selectorActions={[
          {
            name: 'add students',
            handleAction: (data?: string[]) => {
              alert(`changing status ${data}`);
            },
          },
        ]}
      />
    </div>
  );
}

export default AddStudents;
