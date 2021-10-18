import React, { useEffect } from 'react';
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
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CardHeadMolecule from '../../components/Molecules/CardHeadMolecule';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import Tooltip from '../../components/Molecules/Tooltip';
import { intakeStore } from '../../store/intake.store';
import programStore from '../../store/program.store';
import { CommonCardDataType, Link as LinkList } from '../../types';
import { DivisionInfo } from '../../types/services/division.types';
import { IntakeProgramInfo, ProgramInfo } from '../../types/services/program.types';
import { advancedTypeChecker } from '../../utils/getOption';
import AddAcademicProgramToIntake from './AddAcademicProgramToIntake';
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
  const { search } = useLocation();
  const intakeId = new URLSearchParams(search).get('intakeId');
  const location = useLocation();

  const list: LinkList[] = [
    { to: 'home', title: 'home' },
    { to: 'users', title: 'users' },
    { to: 'faculty', title: 'Faculty' },
    { to: `${url}`, title: 'Programs' },
  ];

  const dp = new URLSearchParams(search).get('dp');

  const { data, refetch, isLoading } = intakeId
    ? intakeStore.getProgramsByIntake(intakeId)
    : dp
    ? programStore.getProgramsByDepartment(dp?.toString() || '')
    : programStore.fetchPrograms();

  const programInfo = data?.data.data;

  const intake = intakeId ? intakeStore.getIntakeById(intakeId!, true) : null;

  // fetch intake if id is available
  if (intakeId && !intake?.isSuccess && !intake?.isLoading) intake?.refetch();

  // const programInfo = programData || data;

  useEffect(() => {
    if (location.pathname === path || location.pathname === `${path}/`) {
      refetch();
    }
  }, [location]);

  let programs: IProgramData[] = [];

  programInfo?.map((obj) => {
    if (intakeId) obj = (obj as IntakeProgramInfo).program;
    else obj = obj as ProgramInfo;

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

  function submited() {
    refetch();
    history.goBack();
  }

  return (
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
                <section>
                  <TableHeader
                    totalItems={`${programs.length} programs`}
                    title={`${intakeId ? intake?.data?.data.data.title : 'Programs'}`}
                    showSearch={false}>
                    {intakeId ? (
                      <Link to={`${url}/add-program-to-intake?intakeId=${intakeId}`}>
                        <Button>Add Program To Intake</Button>
                      </Link>
                    ) : (
                      <Link to={`${url}/add`}>
                        <Button>Add New Program</Button>
                      </Link>
                    )}
                  </TableHeader>
                </section>
                <section className="flex flex-wrap justify-start gap-4 mt-2">
                  {programs.length === 0 && isLoading ? (
                    <Loader />
                  ) : programs.length > 0 ? (
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
              </>
            );
          }}
        />
        {/* add academic program to intake*/}
        <Route
          exact
          path={`${url}/add-program-to-intake`}
          render={() => {
            return (
              <PopupMolecule title="Programs" open={true} onClose={history.goBack}>
                <AddAcademicProgramToIntake submited={submited} />
              </PopupMolecule>
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
                open={true}
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

        <Route exact path={`${path}/:id/details`} render={() => <ProgramDetails />} />
      </Switch>
    </main>
  );
}
