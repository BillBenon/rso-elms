import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import TableHeader from '../../components/Molecules/table/TableHeader';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { CommonCardDataType } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';
import LessonPlan from '../subjects/LessonPlan';
import SubjectDetails from '../subjects/SubjectDetails';
import ModuleDetails from './ModuleDetails';

export default function Modules({ level }: { level: string }) {
  // const level = new URLSearchParams(search).get('levelId');
  const { data, isLoading, isSuccess, isError } = intakeProgramStore.getModulesByLevel(
    parseInt(level || ''),
  );

  const [modules, setModules] = useState<CommonCardDataType[]>([]);
  const { path, url } = useRouteMatch();

  useEffect(() => {
    if (isSuccess && data?.data) {
      let newModules: CommonCardDataType[] = [];
      data?.data.data.forEach((mod) => {
        newModules.push({
          status: {
            type: advancedTypeChecker(mod.generic_status),
            text: mod.generic_status.toString(),
          },
          code: mod.module.code,
          title: mod.module.name,
          description: mod.module.description,
          id: mod.module.id,
        });
      });

      setModules(newModules);
    } else if (isError) toast.error('error occurred when loading modules');
  }, [data]);

  const list = [
    { to: '/dashboard/student', title: 'Dashboard' },
    { to: `${url}`, title: 'module' },
  ];

  return (
    <>
      <main className="px-4">
        <Switch>
          <Route
            exact
            path={`${path}`}
            render={() => {
              return (
                <>
                  <section>
                    <BreadCrumb list={list}></BreadCrumb>
                  </section>
                  <TableHeader
                    showSearch={false}
                    showBadge={false}
                    title="Enrolled Modules"
                    totalItems={modules.length || 0}
                  />
                  <section className="flex flex-wrap justify-start gap-2">
                    {isLoading ? (
                      <Loader />
                    ) : modules.length == 0 ? (
                      <NoDataAvailable
                        showButton={false}
                        title={'No Modules available in this level'}
                        description="This level has not received any planned modules to take. Please wait for the admin to add some"
                      />
                    ) : (
                      modules.map((course, index) => (
                        <ModuleCard
                          course={course}
                          key={index}
                          intakeProg={''}
                          showMenus={true}
                        />
                      ))
                    )}
                  </section>
                </>
              );
            }}
          />
          {/* view lesson plan form  */}
          <Route
            path={`${path}/lesson-plan/:id`}
            render={() => {
              return <LessonPlan />;
            }}
          />

          {/* show subject details */}
          <Route path={`${path}/subjects/:subjectId`} component={SubjectDetails} />
          <Route
            path={`${path}/:id`}
            render={() => {
              return <ModuleDetails />;
            }}
          />
        </Switch>
      </main>
    </>
  );
}
