import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import RightSidebar from '../../components/Organisms/RightSidebar';
import { queryClient } from '../../plugins/react-query';
import enrollmentStore from '../../store/administration/enrollment.store';
import { EnrollInstructorToSubject, ModuleInstructors } from '../../types/services/enrollment.types';
import { UserView } from '../../types/services/user.types';

interface AssignSubjectType<T>{
    module_id: string;
    subject_id: string;
    intakeProg: string;
    subInstructors: ModuleInstructors[];
}

export default function EnrollInstructorToSubjectComponent<T>({module_id,subject_id, intakeProg, subInstructors}:AssignSubjectType<T>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: instructorInfos, isLoading:instructorLoading } = enrollmentStore.getInstructorsByModule(module_id);
  const { data: instructorsInProgram } =
    enrollmentStore.getInstructorsInProgram(intakeProg + '');

  const [instructors, setInstructors] = useState<UserView[]>([]);

  useEffect(() => {
    let ids:string[] = [];
    for(let i = 0; i < subInstructors?.length; i++){
      ids.push(subInstructors[i].id+'');
    }
    let instructorsView: UserView[] = [];
    instructorInfos?.data.data.forEach((inst) => {
      if(!ids.includes(inst.id+'')){
      let instructorView: UserView = {
        id: inst.id,
        first_name: inst.user.first_name,
        last_name: inst.user.last_name,
        image_url: inst.user.image_url,
      };
      instructorsView.push(instructorView);
    }
    });
    setInstructors(instructorsView);
  }, [instructorInfos,instructorsInProgram,subInstructors]);


  const { mutate } = enrollmentStore.enrollInstructorToSubject();

  async function add(data?: string[]) {
    data?.map(async (inst_id) => {
      let found = instructorsInProgram?.data.data.find((instructor, index)=>{
        if(instructor.instructor.id == inst_id)
        return true;
      })
      console.log(found);
      // let instructorModule = await enrollmentStore.getModuleAssignmentByIntakeProgramAndModule({module_id, intakeProg: inst_id});
      let newInstructor: EnrollInstructorToSubject = {
        subject_id: subject_id,
        intake_program_instructor_id: found?.id+'',
      };

      mutate(newInstructor, {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['instructors/subject']);
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
        data={instructors || []}
        selectorActions={[
          {
            name: 'enroll instructors',
            handleAction: (data?: string[]) => add(data),
          },
        ]}
        dataLabel={'Instructors in this program'}
        isLoading={instructorLoading}
      />
    </div>
  );
}
