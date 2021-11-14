import React from 'react';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import Avatar from '../../components/Atoms/custom/Avatar';
import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation, { TabType } from '../../components/Molecules/tabs/TabNavigation';
import AddPrerequesitesForm from '../../components/Organisms/forms/modules/AddPrerequisiteForm';
import NewModuleForm from '../../components/Organisms/forms/modules/NewModuleForm';
import programStore from '../../store/administration/program.store';
import { Link as Links, ParamType } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';
import ModuleLevels from '../modules/ModuleLevels';
import ProgramModules from '../modules/ProgramModules';
import { IProgramData } from './AcademicPrograms';
import AddLevelToProgram from './AddLevelToProgram';

export default function ProgramDetailsMolecule() {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { id } = useParams<ParamType>();

  const program = programStore.getProgramById(id).data?.data.data;
  const programLevels = programStore.getLevelsByAcademicProgram(id).data?.data.data;

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
        incharge: program.incharge && program.incharge.username,
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
    { to: 'divisions', title: 'Faculty' },
    { to: 'programs', title: 'Programs' },
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
                          <Button onClick={() => history.push(`${url}/edit`)}>
                            Edit program
                          </Button>
                          <Button styleType="outline">Change Status</Button>
                        </div>
                      </CommonCardMolecule>
                    )}
                  </div>

                  <div className="flex flex-col gap-8 z-0">
                    {/* <div className="flex gap-8">
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
                    </div> */}
                    <div className="flex gap-8">
                      {/* levels */}
                      <div className="flex flex-col gap-7 w-60 p-6 bg-main">
                        <Heading color="txt-secondary" fontSize="base">
                          Levels
                        </Heading>
                        <div className="flex flex-col gap-8">
                          {programLevels && programLevels?.length > 0 ? (
                            programLevels.map((programLevel) => (
                              <Heading
                                key={programLevel.id}
                                color="primary"
                                fontSize="base"
                                fontWeight="semibold">
                                {programLevel.level.name}
                              </Heading>
                            ))
                          ) : (
                            <Heading
                              color="primary"
                              fontSize="base"
                              fontWeight="semibold">
                              No levels available
                            </Heading>
                          )}
                        </div>
                        {programLevels && programLevels?.length === 0 && (
                          <div className="text-primary-500 py-2 text-sm mr-3">
                            <Link
                              to={`${url}/level/add`}
                              className="flex items-center justify-end">
                              <Icon name="add" size={12} fill="primary" />
                              Add levels
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* intakes */}
                      <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-7 bg-main w-60 p-6">
                          <Heading color="txt-secondary" fontSize="base">
                            Intakes
                          </Heading>
                          <div className="flex flex-col gap-8">
                            <Heading
                              color="primary"
                              fontSize="base"
                              fontWeight="semibold">
                              Active Intakes
                            </Heading>
                            <Heading
                              color="primary"
                              fontSize="base"
                              fontWeight="semibold">
                              Passive Intakes
                            </Heading>
                          </div>
                        </div>
                      </div>
                    </div>
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
            \{/* add prerequesite popup */}
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
            <Route path={`${path}/modules`} render={() => <ProgramModules />} />
          </Switch>
        </TabNavigation>
      </div>
    </>
  );
}
