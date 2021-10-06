import React, { useEffect, useState } from 'react';
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
import Heading from '../../components/Atoms/Text/Heading';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import UsersPreview from '../../components/Molecules/cards/UsersPreview';
import TabNavigation, { TabType } from '../../components/Molecules/tabs/TabNavigation';
import { moduleStore } from '../../store/modules.store';
import programStore from '../../store/program.store';
import { CommonCardDataType, ParamType } from '../../types';
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

  return (
    <>
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
                        <Link to={`${url}/edit`}>
                          <Button>Edit program</Button>
                        </Link>
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
          <Route
            exact
            path={`${path}/modules`}
            render={() => (
              <section className="flex flex-wrap justify-between">
                {programModules.length <= 0 ? (
                  <NoDataAvailable
                    buttonLabel="Add new modules"
                    title={'No Modules available in this program'}
                    handleClick={() => history.push(`/dashboard/modules/add`)}
                    description="And the web just isnt the same without you. Lets get you back online!"
                  />
                ) : (
                  programModules?.map((module) => (
                    <div key={module.code}>
                      <CommonCardMolecule
                        data={module}
                        to={{ title: 'View more', to: `/modules/:id` }}
                      />
                    </div>
                  ))
                )}
              </section>
            )}
          />
        </Switch>
      </TabNavigation>
    </>
  );
}
