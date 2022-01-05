import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { authenticatorStore } from '../../store/administration';
import enrollmentStore from '../../store/administration/enrollment.store';
import { getStudentShipByUserId } from '../../store/administration/intake-program.store';
import Modules from '.';

function StudentModule() {
  const { url } = useRouteMatch();
  const list = [
    { to: '/dashboard/student', title: 'Dashboard' },
    { to: `${url}`, title: 'module' },
  ];
  const authUser = authenticatorStore.authUser().data?.data.data;

  const { data: student, isLoading: studLoad } = getStudentShipByUserId(
    authUser?.id + '' || '',
    !!authUser?.id,
  );

  const { data: levels, isLoading: levelLoading } =
    enrollmentStore.getAllStudentEnrollments();

  const studentLevels =
    levels?.data.data.content.filter(
      (lv) => lv.intake_program_student.student.id === student?.data.data[0]?.id,
    ) || [];

  return (
    <>
      <section>
        <BreadCrumb list={list}></BreadCrumb>
      </section>
      <TableHeader showSearch={false} showBadge={false} title="Enrolled Modules" />

      {studLoad || levelLoading ? (
        <Loader />
      ) : studentLevels.length == 0 ? (
        <NoDataAvailable
          icon="level"
          showButton={false}
          title={'You have not been enrolled in any level yet'}
          description="Dear student, please contact the admin so as to get enrolled as soon as possible"
        />
      ) : (
        studentLevels.map((lv) => (
          <>
            <Heading>
              {lv.academic_year_program_level.academic_program_level.level.name}
            </Heading>
            <Modules
              level={lv.academic_year_program_level.academic_program_level.id.toString()}
              key={lv.id}
            />
          </>
        ))
      )}
    </>
  );
}

export default StudentModule;
