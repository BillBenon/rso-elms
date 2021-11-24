import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import RightSidebar from '../../components/Organisms/RightSidebar';
import { queryClient } from '../../plugins/react-query';
import { intakeStore } from '../../store/administration/intake.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { EnrollInstructorProgram } from '../../types/services/instructor.types';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';

function EnrollInstructorIntakeProgram() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { intakeProg, intakeId } = useParams<IntakeProgParam>();

  //   const authUser = authenticatorStore.authUser().data?.data.data;

  //   const instructorsInAcademy =
  //     instructordeploymentStore.getInstructorsRegisteredInAcademy(
  //       authUser?.academy.id + '' || '',
  //     ).data?.data.data;

  const instructorsInAcademy =
    instructordeploymentStore.getInstructors().data?.data.data || [];

  const programs = intakeStore.getProgramsByIntake(intakeId || '').data?.data.data;

  const intakeProgram = programs?.find((pr) => pr.id === intakeProg);

  const [instructors, setInstructors] = useState<UserView[]>([]);
  useEffect(() => {
    let instructorsView: UserView[] = [];
    instructorsInAcademy?.forEach((inst) => {
      let instructorView: UserView = {
        id: inst.id,
        first_name: inst.user.first_name,
        last_name: inst.user.last_name,
        image_url: inst.user.image_url,
      };
      instructorsView.push(instructorView);
    });
    setInstructors(instructorsView);
  }, [instructorsInAcademy]);

  const { mutate } = instructordeploymentStore.enrollInstructorToProgram();

  function add(data?: string[]) {
    data?.map((st_id) => {
      let newInstructor: EnrollInstructorProgram = {
        instructor_id: st_id,
        intake_program_id: intakeProgram?.id + '' || '',
      };

      mutate(newInstructor, {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['instructors/programId/intake']);
          setSidebarOpen(false);
        },
        onError: () => {
          toast.error('something wrong happened while enrolling student to level');
        },
      });
    });
  }
  return (
    <div className="cursor-pointer">
      <Button
        styleType="text"
        onClick={() => setSidebarOpen(true)}
        className="flex -mt-6 items-center justify-end text-primary-500">
        <Icon name="add" size={12} fill="primary" />
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
      />
    </div>
  );
}

export default EnrollInstructorIntakeProgram;
