import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { authenticatorStore } from '../../store/administration';
import { moduleStore } from '../../store/administration/modules.store';
import { CommonCardDataType, Link } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';
import ModuleDetails from './ModuleDetails';

export default function Modules() {
  const { data: userInfo } = authenticatorStore.authUser();
  const { data, isLoading, isSuccess, isError } = moduleStore.getModulesByAcademy(
    userInfo?.data.data.academy.id.toString() || '',
  );
  const history = useHistory();
  const [modules, setModules] = useState<CommonCardDataType[]>([]);
  const { path } = useRouteMatch();

  useEffect(() => {
    if (isSuccess && data?.data) {
      let newModules: CommonCardDataType[] = [];
      data?.data.data.forEach((module) => {
        newModules.push({
          status: {
            type: advancedTypeChecker(module.generic_status),
            text: module.generic_status.toString(),
          },
          code: module.code,
          title: module.name,
          description: module.description,
          id: module.id,
        });
      });

      setModules(newModules);
    } else if (isError) toast.error('error occurred when loading modules');
  }, [data]);

  function handleSearch() {}

  const list: Link[] = [
    { to: 'home', title: 'home' },
    { to: 'modules', title: 'modules' },
    { to: 'subjects', title: 'subjects' },
  ];

  return (
    <>
      <main className="px-4">
        <Switch>
          <Route
            path={`${path}/:id`}
            render={() => {
              return <ModuleDetails />;
            }}
          />
          <Route
            exact
            path={`${path}`}
            render={() => {
              return (
                <>
                  <section>
                    <BreadCrumb list={list}></BreadCrumb>
                  </section>
                  <section className="">
                    <TableHeader
                      totalItems={modules.length + ' modules'}
                      title="Modules"
                      handleSearch={handleSearch}>
                      {/* <Button onClick={() => history.push(`${path}/add`)}>
                        Add Module
                      </Button> */}
                    </TableHeader>
                  </section>
                  <section className="flex flex-wrap justify-start gap-2 mt-2">
                    {isLoading ? (
                      <Loader />
                    ) : modules.length == 0 ? (
                      <NoDataAvailable
                        icon="module"
                        buttonLabel="Go to divisions"
                        title={'No modules available'}
                        handleClick={() => history.push(`/dashboard/divisions`)}
                        description="You should look the modules from the department they belong to"
                      />
                    ) : (
                      modules.map((course, index) => (
                        <ModuleCard course={course} key={index} />
                      ))
                    )}
                  </section>
                </>
              );
            }}
          />
        </Switch>
      </main>
    </>
  );
}
