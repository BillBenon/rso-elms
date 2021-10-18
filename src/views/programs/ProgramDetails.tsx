import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Avatar from '../../components/Atoms/custom/Avatar';
import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import AddCard from '../../components/Molecules/cards/AddCard';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import UsersPreview from '../../components/Molecules/cards/UsersPreview';
import SearchMolecule from '../../components/Molecules/input/SearchMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation, { TabType } from '../../components/Molecules/tabs/TabNavigation';
import AddPrerequesitesForm from '../../components/Organisms/forms/modules/AddPrerequisiteForm';
import NewModuleForm from '../../components/Organisms/forms/modules/NewModuleForm';
import { moduleStore } from '../../store/modules.store';
import programStore from '../../store/program.store';
import { CommonCardDataType, Link, ParamType } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';
import { IProgramData } from './AcademicPrograms';

export default function ProgramDetailsMolecule() {
  const { id } = useParams<ParamType>();
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const getAllModuleStore = moduleStore.getModulesByProgram(id);
  const [programModules, setProgramModules] = useState<CommonCardDataType[]>([]);

  useEffect(() => {
    let newModules: CommonCardDataType[] = [];
    getAllModuleStore.data?.data.data.forEach((module) => {
      newModules.push({
        status: {
          type: advancedTypeChecker(module.generic_status),
          text: module.generic_status.toString(),
        },
        id: module.id,
        code: module.code,
        title: module.name,
        description: module.description,
        subTitle: `total subject: ${module.total_num_subjects || 'None'}`,
      });
    });

    setProgramModules(newModules);
  }, [getAllModuleStore.data?.data.data]);

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

  const list: Link[] = [
    { to: 'home', title: 'home' },
    { to: 'subjects', title: 'Faculty' },
    { to: 'subjects', title: 'Programs' },
    { to: 'modules', title: 'Modules' },
  ];

  function handleSearch() {}
  const handleClose = () => {
    history.goBack();
  };

  return (
    <>
      <BreadCrumb list={list} />

      <div className="mt-11 pb-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex gap-2 items-center">
            <Heading className="capitalize" fontSize="2xl" fontWeight="bold">
              {program?.name} program
            </Heading>
          </div>
          <div className="flex flex-wrap justify-start items-center">
            <SearchMolecule handleChange={handleSearch} />
            <button className="border p-0 rounded-md mx-2">
              <Icon name="filter" />
            </button>
          </div>

          {/* <div className="flex gap-3">
            <Button onClick={() => history.push(`${url}/add-subject`)}>
              Add new Subject
            </Button>
          </div> */}
        </div>
      </div>
      <TabNavigation tabs={tabs}>
        <Switch>
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

                <div className="flex flex-col gap-8">
                  <div className="flex gap-8">
                    <UsersPreview title="Students" totalUsers={100} />
                    <UsersPreview title="Instructors" totalUsers={8} />
                  </div>
                  <div className="flex gap-8">
                    {/* models */}
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col gap-6 w-60 py-4 px-6 h-32 bg-main">
                        <div className="flex flex-col gap-2">
                          <Heading color="txt-secondary" fontSize="base">
                            Modules
                          </Heading>
                          <Heading color="primary" fontSize="base" fontWeight="bold">
                            Total Modules: 10
                          </Heading>
                        </div>
                      </div>
                      {/* levels */}
                      <div className="flex flex-col gap-7 bg-main w-60 p-6">
                        <Heading color="txt-secondary" fontSize="base">
                          Levels
                        </Heading>
                        <div className="flex flex-col gap-8">
                          <Heading color="primary" fontSize="base" fontWeight="semibold">
                            Level 1
                          </Heading>
                          <Heading color="primary" fontSize="base" fontWeight="semibold">
                            Level 2
                          </Heading>
                        </div>
                      </div>
                    </div>
                    {/* intakes */}
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col gap-7 bg-main w-60 p-6">
                        <Heading color="txt-secondary" fontSize="base">
                          Intakes
                        </Heading>
                        <div className="flex flex-col gap-8">
                          <Heading color="primary" fontSize="base" fontWeight="semibold">
                            Active Intakes
                          </Heading>
                          <Heading color="primary" fontSize="base" fontWeight="semibold">
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
                <PopupMolecule title="Add Prerequesite" open onClose={handleClose}>
                  <AddPrerequesitesForm />
                </PopupMolecule>
              );
            }}
          />

          <Route
            path={`${path}/modules`}
            render={() => (
              <section className="mt-4 flex flex-wrap justify-start gap-4">
                {programModules.length <= 0 ? (
                  <NoDataAvailable
                    buttonLabel="Add new modules"
                    title={'No Modules available in this program'}
                    handleClick={() => history.push(`${url}/modules/add`)}
                    description="And the web just isnt the same without you. Lets get you back online!"
                  />
                ) : (
                  <>
                    <AddCard
                      title={'Add new module'}
                      onClick={() => history.push(`${url}/modules/add`)}
                    />
                    {programModules?.map((module) => (
                      <ModuleCard course={module} key={module.code} />
                    ))}
                  </>
                )}
              </section>
            )}
          />
        </Switch>
      </TabNavigation>
    </>
  );
}
