import React, { useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Avatar from '../../components/Atoms/custom/Avatar';
import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import Cacumber from '../../components/Molecules/Cacumber';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import Tooltip from '../../components/Molecules/Tooltip';
import programStore from '../../store/program.store';
import { CommonCardDataType, GenericStatus, Link as LinkList } from '../../types';
import { DivisionInfo } from '../../types/services/division.types';
import NewAcademicProgram from './NewAcademicProgram';
import ProgramDetails from './ProgramDetails';

interface IProgramData extends CommonCardDataType {
  id: number | string;
  department: DivisionInfo;
}

export default function AcademicProgram() {
  const { url, path } = useRouteMatch();
  const history = useHistory();

  const [prOpen, setPrOpen] = useState(false); // state to controll the popup

  //eslint-disable-next-line
  function submited() {
    setPrOpen(true);
  }

  const list: LinkList[] = [
    { to: 'home', title: 'home' },
    { to: 'users', title: 'users' },
    { to: 'faculty', title: 'Faculty' },
    { to: 'program', title: 'Programs' },
  ];

  const typeChecker = (status: GenericStatus) =>
    status.toString().toLowerCase() === 'inactive' ? 'error' : 'success';

  const { data } = programStore.fetchPrograms();
  const programInfo = data?.data.data;

  let programs: IProgramData[] = [];
  programInfo?.map((obj) => {
    let { id, code, name, description, generic_status, department } = obj;

    let prog: IProgramData = {
      id: id,
      status: { type: typeChecker(generic_status), text: generic_status.toString() },
      code: code,
      title: name,
      subTitle: 'Short Course',
      description: description,
      department: department,
    };

    programs.push(prog);
  });

  return (
    <Switch>
      <Route
        exact
        path={`${path}`}
        render={() => {
          return (
            <main className="px-4">
              <section>
                <Cacumber list={list}></Cacumber>
              </section>
              <section>
                <TableHeader totalItems={3} title="Programs" showSearch={false}>
                  <Link to={`${url}/add`}>
                    <Button>Add Program</Button>
                  </Link>
                </TableHeader>
              </section>
              <section className="flex flex-wrap justify-between mt-2">
                {programs.map((Common) => (
                  <Tooltip
                    key={Common.code}
                    trigger={
                      <div className="p-1 mt-3">
                        <CommonCardMolecule
                          data={Common}
                          to={{ title: 'module', to: 'programs/3' }}
                        />
                      </div>
                    }
                    open>
                    {' '}
                    <div className="w-96">
                      <Heading fontSize="sm" fontWeight="semibold" className="mb-4">
                        {Common.code}
                      </Heading>

                      <div className="flex gap-24">
                        {/* first column */}

                        <div className="flex flex-col gap-6">
                          <div className="flex flex-col gap-2">
                            <Heading color="txt-secondary" fontSize="sm">
                              {Common.department.division_type}
                            </Heading>
                            <Heading fontSize="sm" fontWeight="semibold">
                              {Common.department.name}
                            </Heading>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Heading color="txt-secondary" fontSize="sm">
                              Modules
                            </Heading>
                            <Heading fontSize="sm" fontWeight="semibold">
                              30
                            </Heading>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Heading color="txt-secondary" fontSize="sm">
                              Intakes
                            </Heading>
                            <Heading fontSize="sm" fontWeight="semibold">
                              3
                            </Heading>
                          </div>
                        </div>

                        {/* second column */}
                        <div className="flex flex-col gap-6">
                          <div className="flex flex-col gap-2">
                            <Heading color="txt-secondary" fontSize="sm">
                              Levels
                            </Heading>
                            <Heading fontSize="sm" fontWeight="semibold">
                              10
                            </Heading>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Heading color="txt-secondary" fontSize="sm">
                              Attendees
                            </Heading>
                            <Heading fontSize="sm" fontWeight="semibold">
                              230
                            </Heading>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Heading color="txt-secondary" fontSize="sm">
                              Instructor in charge
                            </Heading>
                            <div className="flex items-center gap-2">
                              <Avatar
                                alt="program oic"
                                size="32"
                                src="https://cdn.britannica.com/w:400,h:300,c:crop/26/157026-050-08ED6418/Sylvester-Stallone-1998.jpg"
                              />
                              <Heading fontSize="sm">Captail Liberi</Heading>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* remarks section */}
                      <div className="flex flex-col mt-8 gap-4">
                        <Heading fontSize="sm" fontWeight="semibold">
                          Remarks
                        </Heading>
                        <Heading fontSize="sm" color="txt-secondary">
                          This is a training description. It states briefy what this
                          course is all about. This is a training description. It states
                          briefy what this course is all about.
                        </Heading>
                      </div>
                      <div className="mt-4">
                        <Button onClick={() => history.push('/dashboard/programs/3')}>
                          View More
                        </Button>
                      </div>
                    </div>
                  </Tooltip>
                ))}
              </section>
            </main>
          );
        }}
      />

      {/* create academic program */}
      <Route
        exact
        path={`${path}/add`}
        render={() => {
          return <NewAcademicProgram />;
        }}
      />

      {/* show academic program details */}
      <Route exact path={`${path}/:id`} render={() => <ProgramDetails />} />

      {/* modify academic program */}
      <Route
        exact
        path={`${path}/:id/edit`}
        render={() => {
          return (
            <PopupMolecule
              title="Update Academic program"
              open={true}
              onClose={history.goBack}>
              <NewAcademicProgram />
            </PopupMolecule>
          );
        }}
      />

      {/* add prerequisite popup */}
      <Route
        exact
        path={`${path}/add/prerequisite`}
        render={() => {
          return (
            <PopupMolecule
              title="Add prerequisite"
              open={prOpen}
              onClose={history.goBack}>
              another form here
            </PopupMolecule>
          );
        }}
      />
    </Switch>
  );
}
