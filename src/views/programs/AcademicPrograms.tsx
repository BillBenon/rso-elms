import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import Avatar from '../../components/Atoms/custom/Avatar';
import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import Cacumber from '../../components/Molecules/Cacumber';
import CardHeadMolecule from '../../components/Molecules/CardHeadMolecule';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import Tooltip from '../../components/Molecules/Tooltip';
import programStore from '../../store/program.store';
import { CommonCardDataType, Link as LinkList } from '../../types';
import { DivisionInfo } from '../../types/services/division.types';
import { advancedTypeChecker } from '../../utils/getOption';
import NewAcademicProgram from './NewAcademicProgram';
import ProgramDetails from './ProgramDetails';
import UpdateAcademicProgram from './UpdateAcademicProgram';

export interface IProgramData extends CommonCardDataType {
  department: DivisionInfo;
  incharge: string;
}

export default function AcademicProgram() {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [prOpen, setPrOpen] = useState(false); // state to controll the popup

  //eslint-disable-next-line
  function submited() {
    setPrOpen(true);
  }

  const list: LinkList[] = [
    { to: 'home', title: 'home' },
    { to: 'users', title: 'users' },
    { to: 'faculty', title: 'Faculty' },
    { to: `${url}`, title: 'Programs' },
  ];

  const { data, refetch } = programStore.fetchPrograms();
  const queryStr = queryString.parse(location.search);
  const { data: programData } = programStore.getProgramsByDepartment(
    queryStr.query?.toString() || '',
  );
  const programInfo = programData || data;

  useEffect(() => {
    if (location.pathname === path || location.pathname === `${path}/`) {
      refetch();
    }
    console.log(queryString.parse(location.search).query);
  }, [location]);

  let programs: IProgramData[] = [];
  programInfo?.data.data.map((obj) => {
    let { id, code, name, description, generic_status, department, incharge, type } = obj;

    let prog: IProgramData = {
      id: id,
      status: {
        type: advancedTypeChecker(generic_status),
        text: generic_status.toString(),
      },
      code: code,
      title: name,
      subTitle: type.replaceAll('_', ' '),
      description: description,
      department: department,
      incharge: incharge && incharge.username,
    };

    programs.push(prog);
  });

  return (
    <main className="px-4">
      <section>
        <Cacumber list={list}></Cacumber>
      </section>
      <section>
        <TableHeader totalItems={programs.length} title="Programs" showSearch={false}>
          <Link to={`${url}/add`}>
            <Button>Add Program</Button>
          </Link>
        </TableHeader>
      </section>

      <Switch>
        {/* create academic program */}
        <Route
          exact
          path={`${path}/add`}
          render={() => {
            return <NewAcademicProgram />;
          }}
        />
        {/* modify academic program */}
        <Route path={`${path}/:id/edit`} render={() => <UpdateAcademicProgram />} />

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
        {/* show academic program details */}
        <Route path={`${path}/:id`} render={() => <ProgramDetails />} />

        {/* <Route
          exact
          path={`${path}/:id/view-program`}
          render={() => <ViewProgramsInDepartment />}
        /> */}
        <Route
          exact
          path={`${path}`}
          render={() => {
            return (
              <section className="flex flex-wrap justify-between mt-2">
                {programs.length ? (
                  programs.map((Common) => (
                    <Tooltip
                      key={Common.code}
                      trigger={
                        <div className="p-1 mt-3">
                          <CommonCardMolecule
                            data={Common}
                            to={{ title: 'module', to: `programs/${Common.id}` }}
                          />
                        </div>
                      }
                      open>
                      <div className="w-96">
                        <CardHeadMolecule
                          title={Common.title}
                          code={Common.code}
                          status={Common.status}
                          description={''}
                        />

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
                              Program Type
                            </Heading>
                            <Heading fontSize="sm" fontWeight="semibold">
                              {Common.subTitle}
                            </Heading>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Heading color="txt-secondary" fontSize="sm">
                              Instructor in charge
                            </Heading>
                            <div className="flex items-center">
                              <div className="">
                                <Avatar
                                  size="24"
                                  alt="user1 profile"
                                  className=" rounded-full  border-2 border-main transform hover:scale-125"
                                  src="https://randomuser.me/api/portraits/men/1.jpg"
                                />
                              </div>
                              <Heading fontSize="sm" fontWeight="semibold">
                                {Common.incharge}
                              </Heading>
                            </div>
                          </div>
                        </div>

                        {/* remarks section */}
                        <div className="flex flex-col mt-8 gap-4">
                          <Heading fontSize="sm" fontWeight="semibold">
                            Remarks
                          </Heading>
                          <Heading fontSize="sm" color="txt-secondary">
                            {Common.description}
                          </Heading>
                        </div>
                        <div className="mt-4 space-x-4">
                          <Link to={`${url}/${Common.id}/edit`}>
                            <Button>Edit program</Button>
                          </Link>
                          <Button styleType="outline">Change Status</Button>
                        </div>
                      </div>
                    </Tooltip>
                  ))
                ) : (
                  <NoDataAvailable
                    buttonLabel="Add new program"
                    title={'No program available'}
                    handleClick={() => history.push(`/dashboard/programs/add`)}
                    description="And the web just isnt the same without you. Lets get you back online!"
                  />
                )}
              </section>
            );
          }}
        />
      </Switch>
    </main>
  );
}
