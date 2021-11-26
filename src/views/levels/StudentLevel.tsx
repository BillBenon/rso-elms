import React from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import TableHeader from '../../components/Molecules/table/TableHeader';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { IntakeLevelParam } from '../../types/services/intake-program.types';

function StudentLevel() {
  const { url } = useRouteMatch();

  const { id } = useParams<IntakeLevelParam>();

  const list = [
    { to: '/dashboard/student', title: 'Dashboard' },
    { to: `/dashboard/student/${id}`, title: 'Program' },
    { to: `${url}`, title: 'level' },
  ];

  const { data, isLoading } = intakeProgramStore.getStudentLevels(id + '');

  const levels = data?.data.data || [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main>
          <section>
            <BreadCrumb list={list}></BreadCrumb>
          </section>
          <section>
            <TableHeader
              showSearch={false}
              showBadge={false}
              title="Enrolled Levels"
              totalItems={data?.data.data.length || 0}
            />
          </section>

          <div className="flex flex-col gap-7 w-60 p-6 bg-main">
            <div className="flex flex-col gap-8">
              {levels && levels.length > 0 ? (
                levels.map((level) => (
                  <Link
                    key={level.id}
                    to={`/dashboard/modules/${level.academic_year_program_level.academic_program_level.id}`}>
                    <Heading color="primary" fontSize="base" fontWeight="semibold">
                      {
                        level.academic_year_program_level.academic_program_level.level
                          .name
                      }
                    </Heading>
                  </Link>
                ))
              ) : (
                <Heading color="primary" fontSize="base" fontWeight="semibold">
                  You have not been enrolled in any level yet! <br />
                  Contact the admin to add you as soon as possible so as not to miss out
                </Heading>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default StudentLevel;
