import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import RightSidebar from '../../components/Organisms/RightSidebar';
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

  const [students, setStudents] = useState<UserView[]>([]);
  useEffect(() => {
    let studentsView: UserView[] = [];
    studentsProgram?.data.data.forEach((stud) => {
      let studentView: UserView = {
        id: stud.id,
        first_name: stud.intake_program_student.student.user.first_name,
        last_name: stud.intake_program_student.student.user.last_name,
        image_url: stud.intake_program_student.student.user.image_url,
      };
      studentsView.push(studentView);
    });
    setStudents(studentsView);
  }, [studentsProgram]);

  let actions: SelectorActionType[] = [
    {
      name: 'remove instructors',
      handleAction: () => {},
      privilege: Privileges.CAN_DELETE_STUDENTS_ON_LEVEL_PRORAM,
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
