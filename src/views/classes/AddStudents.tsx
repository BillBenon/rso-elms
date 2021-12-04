import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import RightSidebar from '../../components/Organisms/RightSidebar';
import { queryClient } from '../../plugins/react-query';
import { classStore } from '../../store/administration/class.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { IClassStudent } from '../../types/services/class.types';
import { IntakeLevelParam } from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';

type IAddStudent = {
  classId: number;
};

function AddStudents({ classId }: IAddStudent) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { level } = useParams<IntakeLevelParam>();

  const studentsProgram = intakeProgramStore.getStudentsByIntakeProgramLevel(level || '');

  const [students, setStudents] = useState<UserView[]>([]);
  useEffect(() => {
    let studentsView: UserView[] = [];
    studentsProgram.data?.data.data &&
      studentsProgram.data.data.data.forEach((stud) => {
        let studentView: UserView = {
          id: stud.intake_program_student.student.id,
          first_name: stud.intake_program_student.student.user.first_name,
          last_name: stud.intake_program_student.student.user.last_name,
          image_url: stud.intake_program_student.student.user.image_url,
        };
        studentsView.push(studentView);
      });
    setStudents(studentsView);
  }, [studentsProgram.data?.data.data]);

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
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  }

  return (
    <div className="flex flex-col cursor-pointer">
      <Button styleType="outline" onClick={() => setSidebarOpen(true)}>
        Add student
      </Button>

      {studentsProgram.isLoading ? (
        <Loader />
      ) : students.length > 0 ? (
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
          dataLabel={'Students in this level'}
        />
      ) : (
        <PopupMolecule open={true}>
          <NoDataAvailable
            title={'No students available'}
            icon="user"
            description={
              'No students have enrolled in this level, try enrolling some first'
            }
          />
        </PopupMolecule>
      )}
    </div>
  );
}

export default AddStudents;
