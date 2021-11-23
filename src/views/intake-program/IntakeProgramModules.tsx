import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import AddCard from '../../components/Molecules/cards/AddCard';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { moduleStore } from '../../store/administration/modules.store';
import { CommonCardDataType } from '../../types';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import { advancedTypeChecker } from '../../utils/getOption';

function IntakeProgramModules() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [programModules, setProgramModules] = useState<CommonCardDataType[]>([]);
  const { id } = useParams<IntakeProgParam>();

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
    <>
      <section className="mt-4 flex flex-wrap justify-start gap-4">
        {programModules.length <= 0 ? (
          <NoDataAvailable
            buttonLabel="Add new modules"
            title={'No Modules available in this program'}
            handleClick={() => history.push(`${url}/add`)}
            description="And the web just isnt the same without you. Lets get you back online!"
          />
        ) : (
          <>
            <AddCard
              title={'Add new module'}
              onClick={() => history.push(`${url}/add`)}
            />
            {programModules?.map((module, index) => (
              <ModuleCard course={module} key={index} />
            ))}
          </>
        )}
      </section>
    </>
  );
}

export default IntakeProgramModules;
