import React, { useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { moduleStore } from '../../store/modules.store';
import { CommonCardDataType, Link } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';
import ModuleDetails from './ModuleDetails';

export default function Modules() {
  const { data } = moduleStore.getAllModules();

  const [modules, setModules] = useState<CommonCardDataType[]>([]);
  const { path } = useRouteMatch();

  useEffect(() => {
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
                  <section className="flex flex-wrap justify-between mt-2">
                    {modules.map((course, index) => (
                      <div key={index} className="p-1 mt-3">
                        <CommonCardMolecule
                          data={course}
                          to={{ title: 'module', to: `modules/${course.id}` }}>
                          <p className="pt-3">
                            Total subjects:
                            <span className="px-1 text-primary-500">
                              {data?.data.data[index].total_num_subjects || 'None'}
                            </span>
                          </p>
                        </CommonCardMolecule>
                      </div>
                    ))}
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
