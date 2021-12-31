import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import RightSidebar from '../../components/Organisms/RightSidebar';
import { queryClient } from '../../plugins/react-query';
import enrollmentStore from '../../store/administration/enrollment.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { EnrollInstructorLevel } from '../../types/services/enrollment.types';
import { IntakeLevelParam } from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';

function EnrollInstructorToLevel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { intakeProg, level: levelId } = useParams<IntakeLevelParam>();

  const { data: instructorsInProgram, isLoading } =
  enrollmentStore.getInstructorsInProgram(intakeProg);

  const { data: instructorProgramLevel} =
    enrollmentStore.getInstructorsInProgramLevel(
        levelId
  );

  const level = intakeProgramStore.getIntakeLevelById(levelId).data?.data.data;

  const [instructors, setInstructors] = useState<UserView[]>([]);
  useEffect(() => {
    let instructor_ids:string[] = [];
    instructorProgramLevel?.data.data.forEach(insLevel=>{
      instructor_ids.push(insLevel.intake_program_instructor.id);
    })
    let instructorsView: UserView[] = [];
    instructorsInProgram?.data.data.forEach((inst) => {
      if(!instructor_ids.includes(inst.id)){
        let instructorView: UserView = {
          id: inst.id,
          first_name: inst.instructor.user.first_name,
          last_name: inst.instructor.user.last_name,
          image_url: inst.instructor.user.image_url,
        };
        instructorsView.push(instructorView);
      }
    });
    setInstructors(instructorsView);
  }, [instructorsInProgram]);

  const { mutate } = enrollmentStore.enrollInstructorToLevel();

  function add(data?: string[]) {
    data?.map((inst_id) => {
      let newInstructor: EnrollInstructorLevel = {
        academic_year_program_intake_level_id: Number(levelId),
        intake_program_instructor_id: parseInt(inst_id),
      };

      mutate(newInstructor, {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['instructors/intakeprogram']);
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
      <Button styleType="outline" onClick={() => setSidebarOpen(true)}>
        Enroll instructor
      </Button>
      <RightSidebar
        open={sidebarOpen}
        handleClose={() => setSidebarOpen(false)}
        label="Enroll instructor to program"
        data={instructors}
        selectorActions={[
          {
            name: 'enroll instructors',
            handleAction: (data?: string[]) => add(data),
          },
        ]}
        dataLabel={'Instructors in this program'}
        isLoading={isLoading}
      />
    </div>
  );
}

export default EnrollInstructorToLevel;
