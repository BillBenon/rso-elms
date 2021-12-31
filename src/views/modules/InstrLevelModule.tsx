import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';

import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { authenticatorStore } from '../../store/administration';
import intakeProgramStore from '../../store/administration/intake-program.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { CommonCardDataType, Link, ValueType } from '../../types';
import { Instructor } from '../../types/services/instructor.types';
import { IntakeModuleStatus } from '../../types/services/intake-program.types';
import { advancedTypeChecker, getDropDownStatusOptions } from '../../utils/getOption';

function InstrLevelModule() {
  const { url } = useRouteMatch();
  const [modStatus, setModStatus] = useState<IntakeModuleStatus>(
    IntakeModuleStatus.ONGOING,
  );

  // const { level, id } = useParams<IntakeLevelParam>();
  const [levelModules, setlevelModules] = useState<CommonCardDataType[]>([]);
  const authUser = authenticatorStore.authUser().data?.data.data;

  const instructorInfo = instructordeploymentStore.getInstructorByUserId(
    authUser?.id + '',
  ).data?.data.data;

  const [instructor, setinstructor] = useState<Instructor>();

  useEffect(() => setinstructor(instructorInfo), [instructorInfo]);

  const {
    data: levelModuleStore,
    isLoading,
    refetch,
  } = intakeProgramStore.getModulesByInstructorAndStatus(instructor?.id + '', modStatus);

  useEffect(() => {
    refetch();
  }, [modStatus]);

  useEffect(() => {
    let newModule: CommonCardDataType[] = [];
    levelModuleStore?.data.data.forEach((mod) => {
      newModule.push({
        status: {
          type: advancedTypeChecker(mod.intake_status),
          text: mod.intake_status.toString(),
        },
        id: mod.module.id,
        code: mod.module.code,
        title: mod.module.name,
        description: mod.module.description,
        subTitle: `total subject: ${mod.module.total_num_subjects || 'None'}`,
      });
    });

    setlevelModules(newModule);
  }, [levelModuleStore?.data.data]);

  function handleChange(e: ValueType) {
    //@ts-ignore
    setModStatus(e.value);
  }

  const list: Link[] = [
    { to: '/dashboard/inst-program', title: 'Dashboard' },
    { to: `${url}`, title: 'Modules' },
  ];

  return (
    <>
      <BreadCrumb list={list} />
      <TableHeader
        title="modules"
        totalItems={`${levelModules.length}`}
        showBadge={false}
        showSearch={false}
      />
      <div className="flex justify-center">
        <DropdownMolecule
          width="52"
          handleChange={handleChange}
          name={'modStatus'}
          placeholder="module status"
          defaultValue={getDropDownStatusOptions(IntakeModuleStatus).find(
            (doc) => doc.value === modStatus,
          )}
          options={getDropDownStatusOptions(IntakeModuleStatus)}>
          <p className="text-center">Choose module status</p>
        </DropdownMolecule>
      </div>
      <section className="mt-4 flex flex-wrap justify-start gap-4">
        {isLoading ? (
          <Loader />
        ) : levelModules.length === 0 ? (
          <NoDataAvailable
            showButton={false}
            title={`There are no ${modStatus.toLowerCase()} modules for you to teach in this level`}
            description="You don't have any modules with that status yet! Please contact the admin for support"
          />
        ) : (
          levelModules &&
          levelModules.map((module, index) => (
            <ModuleCard course={module} key={index} intakeProgram={''} showMenus={true} />
          ))
        )}
      </section>
    </>
  );
}

export default InstrLevelModule;
