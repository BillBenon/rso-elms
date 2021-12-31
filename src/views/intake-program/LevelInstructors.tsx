import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import RightSidebar from '../../components/Organisms/RightSidebar';
import enrollmentStore from '../../store/administration/enrollment.store';
import {
  IntakeLevelParam,
} from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';

function LevelInstructors() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {level: levelId } = useParams<IntakeLevelParam>();

  const { data: instructorProgramLevel, isLoading } =
    enrollmentStore.getInstructorsInProgramLevel(
        levelId
  );

  const [instructors, setInstructors] = useState<UserView[]>([]);
  useEffect(() => {
    let instructorView: UserView[] = [];
    console.log(instructorProgramLevel?.data.data.length)
    instructorProgramLevel?.data.data.forEach((stud) => {
      let studentView: UserView = {
        id: stud.id,
        first_name: stud.intake_program_instructor.instructor.user.first_name,
        last_name: stud.intake_program_instructor.instructor.user.last_name,
        image_url: stud.intake_program_instructor.instructor.user.image_url,
      };
      instructorView.push(studentView);
    });
    setInstructors(instructorView);
    // console.log(students.length)
  }, [instructorProgramLevel]);
  return (
    <div className="flex flex-col cursor-pointer">
      <Button styleType="outline" onClick={() => setSidebarOpen(true)}>
        Enrolled instructors
      </Button>
      <RightSidebar
        open={sidebarOpen}
        handleClose={() => setSidebarOpen(false)}
        label="All Level Instructors"
        data={instructors}
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

export default LevelInstructors;
