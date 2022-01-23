import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import AddCard from '../../components/Molecules/cards/AddCard';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import useInstructorModules from '../../hooks/getInstructorModules';
import useAuthenticator from '../../hooks/useAuthenticator';
import { moduleStore } from '../../store/administration/modules.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { CommonCardDataType } from '../../types';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import { UserType } from '../../types/services/user.types';
import { advancedTypeChecker } from '../../utils/getOption';

function IntakeProgramModules() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [programModules, setProgramModules] = useState<CommonCardDataType[]>([]);
  const [instModules, setInstModules] = useState<CommonCardDataType[]>([]);
  const { id, intakeProg } = useParams<IntakeProgParam>();
  const { user } = useAuthenticator();
  const instructorInfo = instructordeploymentStore.getInstructorByUserId(user?.id + '')
    .data?.data.data[0];

  const getAllModuleStore = moduleStore.getModulesByProgram(id);

  let newInstModules = useInstructorModules(id, instructorInfo?.id + '');

  useEffect(() => {
    let newModules: CommonCardDataType[] = [];

    setInstModules(newInstModules),
      user?.user_type === UserType.INSTRUCTOR
        ? (newModules = instModules)
        : getAllModuleStore.data?.data.data.forEach((mod) =>
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
            }),
          );
    setProgramModules(newModules);
  }, [
    getAllModuleStore.data?.data.data,
    id,
    instModules,
    newInstModules,
    user?.user_type,
  ]);

  return (
    <>
      {getAllModuleStore.isLoading ? (
        <Loader />
      ) : (
        <section className="mt-4 flex flex-wrap justify-start gap-4">
          {programModules.length <= 0 ? (
            <NoDataAvailable
              showButton={user?.user_type === UserType.ADMIN}
              buttonLabel="Add new modules"
              title={'No modules available in this program'}
              handleClick={() => history.push(`${url}/add`)}
              description="Looks like there are no modules assigned to this intake program yet!"
            />
          ) : (
            <>
              {user?.user_type === UserType.ADMIN ? (
                <AddCard
                  title={'Add new module'}
                  onClick={() => history.push(`${url}/add`)}
                />
              ) : null}
              {programModules.map((module, index) => (
                <ModuleCard
                  intakeProg={intakeProg}
                  course={module}
                  showMenus={true}
                  key={index}
                />
              ))}
            </>
          )}
        </section>
      )}
    </>
  );
}

export default IntakeProgramModules;
