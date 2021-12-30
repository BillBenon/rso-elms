import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
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
  const { id, intakeProg } = useParams<IntakeProgParam>();

  const getAllModuleStore = moduleStore.getModulesByProgram(id);

  useEffect(() => {
    let newModules: CommonCardDataType[] = [];
    getAllModuleStore.data?.data.data.forEach((mod) => {
      newModules.push({
        status: {
          type: advancedTypeChecker(mod.generic_status),
          text: mod.generic_status.toString(),
        },
        id: mod.id,
        code: mod.code,
        title: mod.name,
        description: mod.description,
        subTitle: `total subject: ${mod.total_num_subjects || 'None'}`,
      });
    });

    setProgramModules(newModules);
  }, [getAllModuleStore.data?.data.data, id]);

  return (
    <>
      {getAllModuleStore.isLoading ? (
        <Loader />
      ) : (
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
              {programModules.map((module, index) => (
                <ModuleCard intakeProgram={intakeProg} course={module} key={index} />
              ))}
            </>
          )}
        </section>
      )}
    </>
  );
}

export default IntakeProgramModules;
