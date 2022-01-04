import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import RightSidebar from '../../components/Organisms/RightSidebar';
import { queryClient } from '../../plugins/react-query';
import enrollmentStore from '../../store/administration/enrollment.store';
import { ParamType } from '../../types';
import { EnrollInstructorToModule, ModuleInstructors } from '../../types/services/enrollment.types';
import { UserView } from '../../types/services/user.types';

interface AssignModuleType<T>{
  existing: ModuleInstructors[];
}

function EnrollInstructorToModuleComponent<T>({existing}:AssignModuleType<T>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { search } = useLocation();
  const { id } = useParams<ParamType>();
  const intakeProg = new URLSearchParams(search).get('intkPrg');

  const { data: instructorsInProgram, isLoading } =
    enrollmentStore.getInstructorsInProgram(intakeProg + '');

  const [instructors, setInstructors] = useState<UserView[]>([]);

  useEffect(() => {
    let instructorsView: UserView[] = [];
    let ids:string[] = [];
    for(let i = 0; i < existing?.length; i++){
      ids.push(existing[i].id+'');
    }

    instructorsInProgram?.data.data.forEach((inst) => {
      if(!ids.includes(inst.instructor.id+'')){
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
  }, [instructorsInProgram,existing]);

  const { mutate } = enrollmentStore.enrollInstructorToModule();

  function add(data?: string[]) {
    data?.map((inst_id) => {
      let newInstructor: EnrollInstructorToModule = {
        course_module_id: id,
        intake_program_instructor_id: parseInt(inst_id),
      };

      mutate(newInstructor, {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['instructors/module']);
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
        label="Enroll instructor to this module"
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

export default EnrollInstructorToModuleComponent;
