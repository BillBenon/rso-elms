import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import RightSidebar from '../../components/Organisms/RightSidebar';
import intakeProgramStore from '../../store/administration/intake-program.store';
import {
  IntakeLevelParam,
} from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';

function LevelInstrctors() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {level: levelId } = useParams<IntakeLevelParam>();

  const { data: studentsProgram, isLoading } =
    intakeProgramStore.getStudentsByIntakeProgramLevel(
        levelId
    );

  const [students, setStudents] = useState<UserView[]>([]);
  useEffect(() => {
    let studentsView: UserView[] = [];
    // studentsProgram?.data.data.forEach((stud) => {
    //   let studentView: UserView = {
    //     id: stud.id,
    //     first_name: stud.intake_program_student.student.user.first_name,
    //     last_name: stud.intake_program_student.student.user.last_name,
    //     image_url: stud.intake_program_student.student.user.image_url,
    //   };
    //   studentsView.push(studentView);
    // });
    // setStudents(studentsView);
  }, [studentsProgram]);
  return (
    <div className="flex flex-col cursor-pointer">
      <Button styleType="outline" onClick={() => setSidebarOpen(true)}>
        Enrolled instructors
      </Button>
      <RightSidebar
        open={sidebarOpen}
        handleClose={() => setSidebarOpen(false)}
        label="All Level Instructors"
        data={students}
        selectorActions={[
          {
            name: 'No action',
            handleAction: () =>{},
          },
        ]}
        dataLabel={'Instructors enrolled'}
        isLoading={isLoading}
      />
    </div>
  );
}

export default LevelInstrctors;
