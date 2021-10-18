import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { moduleStore } from '../../store/modules.store';
import { CommonCardDataType, Link } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';
import ModuleDetails from './ModuleDetails';

export default function Modules() {
  const { data, isLoading, isSuccess, isError } = moduleStore.getAllModules();

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
