import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import AddCard from '../../components/Molecules/cards/AddCard';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { authenticatorStore } from '../../store/administration';
import enrollmentStore from '../../store/administration/enrollment.store';
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
  const { id, intakeProg } = useParams<IntakeProgParam>();
  const authUser = authenticatorStore.authUser().data?.data.data;
  const instructorInfo = instructordeploymentStore.getInstructorByUserId(
    authUser?.id + '',
  ).data?.data.data;

  const instructorModules = enrollmentStore.getModulesByInstructorId(
    instructorInfo?.id + '',
  );

  const getAllModuleStore = moduleStore.getModulesByProgram(id);

  const moduleIds = instructorModules.data?.data.data.map((md) => md.course_module_id);

  const instProgModules =
    getAllModuleStore.data?.data.data.filter((inst) =>
      moduleIds?.includes(inst.id + ''),
    ) || [];

  useEffect(() => {
    let newModules: CommonCardDataType[] = [];
    authUser?.user_type === UserType.INSTRUCTOR
      ? instProgModules.forEach((mod) =>
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
        )
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
  }, [getAllModuleStore.data?.data.data, id]);

  return (
    <>
      {getAllModuleStore.isLoading ? (
        <Loader />
      ) : (
        <section className="mt-4 flex flex-wrap justify-start gap-4">
          {programModules.length <= 0 ? (
            <NoDataAvailable
              showButton={authUser?.user_type === UserType.ADMIN}
              buttonLabel="Add new modules"
              title={'No Modules available in this program'}
              handleClick={() => history.push(`${url}/add`)}
              description="Looks like there are no modules assigned to this intake program yet!"
            />
          ) : (
            <>
              {authUser?.user_type === UserType.ADMIN ? (
                <AddCard
                  title={'Add new module'}
                  onClick={() => history.push(`${url}/add`)}
                />
              ) : null}
              {programModules.map((module, index) => (
                <ModuleCard
                  intakeProgram={intakeProg}
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
