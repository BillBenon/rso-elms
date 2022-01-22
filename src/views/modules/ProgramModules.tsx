import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { useParams } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import AddCard from '../../components/Molecules/cards/AddCard';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import useAuthenticator from '../../hooks/useAuthenticator';
import { moduleStore } from '../../store/administration/modules.store';
import { CommonCardDataType, ParamType, Privileges } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';

function ProgramModules() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [programModules, setProgramModules] = useState<CommonCardDataType[]>([]);
  const { id } = useParams<ParamType>();

  const { user } = useAuthenticator();
  const [privileges, setPrivileges] = useState<string[]>();

  useEffect(() => {
    const _privileges = user?.user_roles
      ?.filter((role) => role.id === 1)[0]
      .role_privileges?.map((privilege) => privilege.name);
    if (_privileges) setPrivileges(_privileges);
  }, [user]);

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
      {getAllModuleStore.isLoading ? (
        <Loader />
      ) : (
        <section className="mt-4 flex flex-wrap justify-start gap-4">
          {programModules.length <= 0 ? (
            <NoDataAvailable
              showButton={
                privileges?.includes(Privileges.CAN_CREATE_MODULES) ? true : false
              }
              buttonLabel="Add new modules"
              title={'No Modules available in this program'}
              handleClick={() => history.push(`${url}/add`)}
              description="And the web just isnt the same without you. Lets get you back online!"
            />
          ) : (
            <>
              {privileges?.includes(Privileges.CAN_CREATE_MODULES) && (
                <AddCard
                  title={'Add new module'}
                  onClick={() => history.push(`/dashboard/programs/${id}/modules/add`)}
                />
              )}
              {programModules?.map((module) => (
                <ModuleCard
                  course={module}
                  key={module.code}
                  showMenus={false}
                  intakeProg={id}
                />
              ))}
            </>
          )}
        </section>
      )}
    </>
  );
}

export default ProgramModules;
