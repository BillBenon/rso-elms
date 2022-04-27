import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import RightSidebar from '../../components/Organisms/RightSidebar';
import { queryClient } from '../../plugins/react-query';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { Privileges } from '../../types';
import { IntakeLevelParam } from '../../types/services/intake-program.types';
import { SelectorActionType } from '../../types/services/table.types';
import { UserView } from '../../types/services/user.types';
interface ILevelStudent {
  showSidebar: boolean;
  handleShowSidebar: () => void;
}

function LevelStudents({ showSidebar, handleShowSidebar }: ILevelStudent) {
  const { level: levelId } = useParams<IntakeLevelParam>();

  const { data: studentsProgram, isLoading } =
    intakeProgramStore.getStudentsByIntakeProgramLevel(levelId);

  const { mutate } = intakeProgramStore.removeStudentInLevel();

  const [students, setStudents] = useState<UserView[]>([]);
  useEffect(() => {
    let studentsView: UserView[] = [];

    studentsProgram?.data.data.sort(function (a, b) {
      return (
        a.intake_program_student.student.user.person.current_rank?.priority -
        b.intake_program_student.student.user.person.current_rank?.priority
      );
    });

    studentsProgram?.data.data.forEach((stud) => {
      let studentView: UserView = {
        id: stud.id,
        rank: stud.intake_program_student.student.user.person.current_rank?.name,
        first_name: stud.intake_program_student.student.user.first_name,
        last_name: stud.intake_program_student.student.user.last_name,
        image_url: stud.intake_program_student.student.user.image_url,
      };
      studentsView.push(studentView);
    });
    setStudents(studentsView);
  }, [studentsProgram]);

  function remove(data?: string[]) {
    data?.map((student) =>
      mutate(student, {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['students/intakeProgramlevelId']);
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      }),
    );
  }

  let actions: SelectorActionType[] = [
    {
      name: 'remove students',
      handleAction: (data?: string[]) => remove(data),
      privilege: Privileges.CAN_DELETE_STUDENTS_ON_LEVEL_PROGRAM,
    },
  ];

  return (
    <div className="flex flex-col cursor-pointer">
      <Button styleType="outline" onClick={handleShowSidebar}>
        View students
      </Button>
      <RightSidebar
        open={showSidebar}
        handleClose={handleShowSidebar}
        label="All Level Students"
        data={students}
        dataLabel={'Students enrolled'}
        isLoading={isLoading}
        unselectAll={!showSidebar}
        selectorActions={actions}
      />
    </div>
  );
}

export default LevelStudents;
