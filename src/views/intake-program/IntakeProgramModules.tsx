import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import AddCard from '../../components/Molecules/cards/AddCard';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import { moduleStore } from '../../store/modules.store';
import { CommonCardDataType, ParamType } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';

function IntakeProgramModules() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [programModules, setProgramModules] = useState<CommonCardDataType[]>([]);
  const { id } = useParams<ParamType>();

  const getAllModuleStore = moduleStore.getModulesByProgram(id);

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
  }, [getAllModuleStore.data?.data.data, id]);
  return (
    <Tabs>
      <Tab label="Overview">
        <div className="text-right">
          <Link to={`/dashboard/levels/add`}>
            <Button>Add Level</Button>
          </Link>
        </div>
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
                onClick={() => history.push(`/dashboard/programs/${id}/modules/add`)}
              />
              {programModules?.map((module) => (
                <ModuleCard course={module} key={module.code} />
              ))}
            </>
          )}
        </section>
      </Tab>
      <Tab label="Level 1">
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
                onClick={() => history.push(`/dashboard/programs/${id}/modules/add`)}
              />
              {programModules?.map((module) => (
                <ModuleCard course={module} key={module.code} />
              ))}
            </>
          )}
        </section>
      </Tab>
    </Tabs>
  );
}

export default IntakeProgramModules;
