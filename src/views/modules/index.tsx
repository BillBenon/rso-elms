import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link as BrowserLink, Route, Switch, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import TableHeader from '../../components/Molecules/table/TableHeader';
import Tooltip from '../../components/Molecules/Tooltip';
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
                  <section className="flex flex-wrap justify-start gap-4 mt-2">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      modules.map((course, index) => (
                        <div key={index} className="p-1 mt-3">
                          <Tooltip
                            open
                            trigger={
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
                            }>
                            <div className="w-96 p-4">
                              <Heading fontWeight="semibold">{course.title}</Heading>
                              <p className="pt-4 pb-2 text-txt-secondary text-sm mt-4">
                                {course.description}
                              </p>
                              <p>
                                <BrowserLink
                                  className="outline-none"
                                  to={`/dashboard/modules/${course.id}`}>
                                  <Button styleType="text">View details</Button>
                                </BrowserLink>
                              </p>
                              <div className="py-2 flex justify-around gap-2">
                                <BrowserLink
                                  className="outline-none"
                                  to={`/dashboard/modules/${course.id}/add-subject`}>
                                  <Button>Add subject</Button>
                                </BrowserLink>
                                <Button styleType="outline">Edit</Button>
                              </div>
                            </div>
                          </Tooltip>
                        </div>
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
