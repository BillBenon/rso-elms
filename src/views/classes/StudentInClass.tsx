import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { Tab } from '../../components/Molecules/tabs/tabs';
import Students from '../../components/Organisms/user/Students';
import { classStore } from '../../store/administration/class.store';
import { UserTypes } from '../../types/services/user.types';

type IStudentClass = {
  classId: string;
  label: string;
};

function StudentInClass({ classId, label }: IStudentClass) {
  const [students, setStudents] = useState<UserTypes[]>([]);
  const { data, isLoading } = classStore.getStudentsByClass(classId);
  const history = useHistory();

  const studentsData = data?.data.data || [];

  useEffect(() => {
    let tempStuds: UserTypes[] = [];
    studentsData.forEach((stud) => {
      tempStuds.push({
        id: stud.user.id.toString(),
        username: stud.user.username,
        'full name': stud.user.first_name + ' ' + stud.user.last_name,
        email: stud.user.email,
        NID: stud.user.nid,
        academy: stud.user.academy.name,
        status: stud.user.status,
        user_type: stud.user.user_type,
      });
    });
    setStudents(tempStuds);
  }, [studentsData]);

  return (
    <Tab label={label}>
      <section className="mt-4 flex flex-wrap justify-start gap-4">
        {isLoading ? (
          <Loader />
        ) : studentsData.length <= 0 ? (
          <NoDataAvailable
            buttonLabel="Add new students"
            title={'No students available in this class'}
            handleClick={() => history.push(``)}
            description="This class has not received any students. you can add one from the button below."
          />
        ) : (
          <Students students={students} showTableHeader={false} />
        )}
      </section>
    </Tab>
  );
}

export default StudentInClass;
