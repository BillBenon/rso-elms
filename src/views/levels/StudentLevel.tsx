import React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import TableHeader from '../../components/Molecules/table/TableHeader';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import { authenticatorStore } from '../../store/administration';
import intakeProgramStore from '../../store/administration/intake-program.store';
import IntakeLevelModule from '../intake-program/IntakeLevelModule';

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
      href: `/dashboard/student/levels/${level.id}`,
    })) || [];

  return (
    <>
      <main>
        <section>
          <BreadCrumb list={list}></BreadCrumb>
        </section>
        <section className="">
          <TableHeader title="Levels" totalItems={levels?.length || 0}>
            <Link to={`${url}/add`}>
              <Button>Add Level</Button>
            </Link>
          </TableHeader>
        </section>

        {getLevels.isLoading ? (
          <Loader />
        ) : (
          <TabNavigation tabs={tabs}>
            <IntakeLevelModule />
          </TabNavigation>
        )}
      </main>
    </>
  );
}

export default StudentLevel;
