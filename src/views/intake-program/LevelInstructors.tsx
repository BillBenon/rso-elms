import React, { useEffect, useState } from 'react';

import Button from '../../components/Atoms/custom/Button';
import RightSidebar from '../../components/Organisms/RightSidebar';
import { EnrollInstructorLevelInfo } from '../../types/services/enrollment.types';
import { UserView } from '../../types/services/user.types';

// eslint-disable-next-line no-unused-vars
interface ProgramEnrollmentProps<T> {
  instructorsData: EnrollInstructorLevelInfo[];
  isLoading: boolean;
  showSidebar: boolean;
  handleShowSidebar: () => void;
}

function LevelInstructors<T>({
  instructorsData,
  isLoading,
  showSidebar,
  handleShowSidebar,
}: ProgramEnrollmentProps<T>) {
  const [instructors, setInstructors] = useState<UserView[]>([]);
  useEffect(() => {
    let instructorView: UserView[] = [];
    instructorsData.forEach((stud) => {
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
  }, [instructorsData]);
  return (
    <div className="flex flex-col cursor-pointer">
      <Button styleType="outline" onClick={handleShowSidebar}>
        View instructors
      </Button>
      <RightSidebar
        open={showSidebar}
        handleClose={handleShowSidebar}
        label="All Level Instructors"
        data={instructors}
        dataLabel={'Instructors enrolled'}
        isLoading={isLoading}
        unselectAll={!showSidebar}
      />
    </div>
  );
}

export default LevelInstructors;
