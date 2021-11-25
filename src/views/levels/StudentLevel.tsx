import React from 'react';
import { useRouteMatch } from 'react-router';

import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import TableHeader from '../../components/Molecules/table/TableHeader';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import { authenticatorStore } from '../../store/administration';
import intakeProgramStore from '../../store/administration/intake-program.store';
import Modules from '../modules';

function StudentLevel() {
  const { url } = useRouteMatch();

  const list = [
    { to: '', title: 'Dashboard' },
    { to: `${url}`, title: 'level' },
  ];

  const authUser = authenticatorStore.authUser().data?.data.data;

  const getStudent = intakeProgramStore.getStudentShipByUserId(authUser?.id + '' || '')
    .data?.data.data[0];

  const getPrograms = intakeProgramStore.getIntakeProgramsByStudent(
    getStudent?.id + '' || '',
  ).data?.data.data[0];

  const getLevels = intakeProgramStore.getStudentLevels(getPrograms?.id + '' || '');

  const levels = getLevels.data?.data.data || [];

  const tabs =
    levels.map((level) => ({
      label: `${level.academic_year_program_level.academic_program_level.level.name}`,
      href: `/dashboard/student/levels/${level.academic_year_program_level.id}`,
    })) || [];

  return (
    <>
      <main>
        <section>
          <BreadCrumb list={list}></BreadCrumb>
        </section>
        <section>
          <TableHeader title="Levels" totalItems={levels?.length || 0} />
        </section>

        {getLevels.isLoading ? (
          <Loader />
        ) : (
          <TabNavigation tabs={tabs}>
            <Modules />
          </TabNavigation>
        )}
      </main>
    </>
  );
}

export default StudentLevel;
