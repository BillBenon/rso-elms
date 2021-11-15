import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';

import Avatar from '../../components/Atoms/custom/Avatar';
import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import UsersPreview from '../../components/Molecules/cards/UsersPreview';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation, { TabType } from '../../components/Molecules/tabs/TabNavigation';
import AddPrerequesitesForm from '../../components/Organisms/forms/modules/AddPrerequisiteForm';
import NewModuleForm from '../../components/Organisms/forms/modules/NewModuleForm';
import intakeProgramStore from '../../store/administration/intake-program.store';
import programStore from '../../store/administration/program.store';
import { Link as Links } from '../../types';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';
import { advancedTypeChecker } from '../../utils/getOption';
import ModuleLevels from '../modules/ModuleLevels';
import { IProgramData } from '../programs/AcademicPrograms';
import AddLevelToProgram from '../programs/AddLevelToProgram';
import { DummyUser } from '../programs/dummyUsers';
import IntakeProgramModules from './IntakeProgramModules';

function IntakeProgramDetails() {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { id, intakeId, intakeProg } = useParams<IntakeProgParam>();

  const studentsProgram = intakeProgramStore.getStudentsByIntakeProgram(intakeProg || '')
    .data?.data.data;
  const instructorsProgram = intakeProgramStore.getStudentsByIntakeProgram(
    intakeProg || '',
  ).data?.data.data;

  const [students, setStudents] = useState<UserView[]>([]);
  const [instructors, setInstructors] = useState<UserView[]>([]);

  useEffect(() => {
    studentsProgram?.map((stud) =>
      setStudents([
        ...students,
        {
          id: stud.id,
          first_name: stud.first_name,
          last_name: stud.last_name,
          image_url: stud.image_url,
        },
      ]),
    );
  }, [studentsProgram]);

  useEffect(() => {
    instructorsProgram?.map((inst) =>
      setInstructors([
        ...instructors,
        {
          id: inst.id,
          first_name: inst.first_name,
          last_name: inst.last_name,
          image_url: inst.image_url,
        },
      ]),
    );
  }, [instructorsProgram]);

  const program = programStore.getProgramById(id).data?.data.data;

  const getProgramData = () => {
    let programData: IProgramData | undefined;
    if (program) {
      programData = {
        status: {
          type: advancedTypeChecker(program.generic_status),
          text: program.generic_status.toString(),
        },
        code: program.code,
        title: program.name,
        subTitle: program.type,
        description: program.description,
        department: program.department,
        incharge: program.current_admin_names,
      };
    }

    return programData;
  };

  const programData = getProgramData();
  const tabs: TabType[] = [
    {
      label: 'Program info',
      href: `${url}`,
    },
    {
      label: 'Program modules',
      href: `${url}/modules`,
    },
  ];

  const handleClose = () => {
    history.goBack();
  };

  const list: Links[] = [
    { to: 'home', title: 'home' },
    { to: 'intakes', title: 'intakes' },
    { to: 'intakes/programs', title: 'Programs' },
    { to: `${url}`, title: 'details' },
  ];

  return (
    <>
      <BreadCrumb list={list} />

      <div className="pt-5">
        <Heading className="pb-5" fontWeight="semibold" fontSize="xl">
          {program?.name}
        </Heading>
        <TabNavigation tabs={tabs}>
          <Switch>
            <Route
              exact
              path={`${path}/level/add`}
              render={() => {
                return (
                  <PopupMolecule
                    closeOnClickOutSide={false}
                    title="Add level to program"
                    open={true}
                    onClose={() => history.goBack()}>
                    <AddLevelToProgram />
                  </PopupMolecule>
                );
              }}
            />
            <Route
              exact
              path={`${path}`}
              render={() => (
                <div className="flex py-9">
                  <div className="mr-24">
                    {programData && (
                      <CommonCardMolecule data={programData}>
                        <div className="flex flex-col mt-8 gap-7 pb-2">
                          <Heading color="txt-secondary" fontSize="sm">
                            Program Type
                          </Heading>
                          <Heading fontSize="sm">
                            {programData.subTitle?.replaceAll('_', ' ')}
                          </Heading>

                          <div className="flex items-center gap-2">
                            <Avatar
                              size="24"
                              alt="user1 profile"
                              className=" rounded-full  border-2 border-main transform hover:scale-125"
                              src="https://randomuser.me/api/portraits/men/1.jpg"
                            />
                            <Heading fontSize="sm">{programData.incharge}</Heading>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-4">
                          <Button
                            onClick={() =>
                              history.push(
                                `/dashboard/intakes/programs/${intakeId}/${id}/edit`,
                              )
                            }>
                            Edit program
                          </Button>
                          <Button styleType="outline">Change Status</Button>
                        </div>
                      </CommonCardMolecule>
                    )}
                  </div>

                  <div className="flex flex-col gap-8 z-0">
                    {/* <div className="flex gap-8"> */}
                    <UsersPreview
                      title="Students"
                      label="Students in Cadette programs"
                      data={DummyUser}
                      totalUsers={DummyUser.length || 0}
                    />
                    <UsersPreview
                      title="Instructors"
                      label="Instructors in Cadette programs"
                      data={DummyUser}
                      totalUsers={DummyUser.length || 0}
                    />
                    {/* </div> */}
                  </div>
                </div>
              )}
            />
            {/* program leves */}
            <Route exact path={`${path}/levels`} render={() => <ModuleLevels />} />

            {/* add module popup */}
            <Route
              exact
              path={`${path}/modules/add`}
              render={() => {
                return (
                  <PopupMolecule title="New Module" open onClose={handleClose}>
                    <NewModuleForm />
                  </PopupMolecule>
                );
              }}
            />
            {/* add prerequesite popup */}
            <Route
              exact
              path={`${path}/modules/:moduleId/add-prereq`}
              render={() => {
                return (
                  <PopupMolecule
                    closeOnClickOutSide={false}
                    title="Add Prerequesite"
                    open
                    onClose={handleClose}>
                    <AddPrerequesitesForm />
                  </PopupMolecule>
                );
              }}
            />
            <Route
              exact
              path={`${path}/modules`}
              render={() => <IntakeProgramModules />}
            />
          </Switch>
        </TabNavigation>
      </div>
    </>
  );
}

export default IntakeProgramDetails;
