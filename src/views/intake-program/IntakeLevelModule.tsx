import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import AddCard from '../../components/Molecules/cards/AddCard';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import TableHeader from '../../components/Molecules/table/TableHeader';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { CommonCardDataType } from '../../types';
import { IntakeLevelParam } from '../../types/services/intake-program.types';
import { advancedTypeChecker } from '../../utils/getOption';
import EnrollInstructorToLevel from './EnrollInstructorToLevel';
import EnrollStudent from './EnrollStudent';
import LevelInstrctors from './LevelInstructors';
import LevelStudents from './LevelStudents';

function IntakeLevelModule() {
  const history = useHistory();
  const { id, intakeId, intakeProg, level } = useParams<IntakeLevelParam>();

  const [levelModules, setlevelModules] = useState<CommonCardDataType[]>([]);
  const { data: levelModuleStore, isLoading } = intakeProgramStore.getModulesByLevel(
    parseInt(level),
  );
  useEffect(() => {
    let newModule: CommonCardDataType[] = [];
    levelModuleStore?.data.data.forEach((mod) => {
      newModule.push({
        status: {
          type: advancedTypeChecker(mod.generic_status),
          text: mod.generic_status.toString(),
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

  const { data: periods, isLoading: prdLoading } = intakeProgramStore.getPeriodsByLevel(
    parseInt(level),
  );

  return (
    <>
      <TableHeader usePadding={false} showBadge={false} showSearch={false}>
        {/* <Button styleType="outline">Enrolled Students</Button>
        <Button styleType="outline">Enrolled Instructors</Button> */}
        {/* <div className='py-2.5 border px-4 rounded-lg border-primary-500 text-primary-500 font-semibold text-sm'>Enrolled Students</div>
        <div className='py-2.5 border px-4 rounded-lg border-primary-500 text-primary-500 font-semibold text-sm'>Enrolled Instructors</div> */}
        <LevelInstrctors/>
        <EnrollInstructorToLevel />
        <LevelStudents/>
        <EnrollStudent />
        {prdLoading ? (
          <></>
        ) : (
          <Button
            styleType="outline"
            onClick={() =>
              history.push(
                `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/view-period/${periods?.data.data[0].id}`,
              )
            }>
            View periods
          </Button>
        )}
      </TableHeader>
      <section className="mt-4 flex flex-wrap justify-start gap-4">
        {isLoading ? (
          <Loader />
        ) : levelModules.length <= 0 ? (
          <NoDataAvailable
            buttonLabel="Add new modules"
            title={'No Modules available in this level'}
            handleClick={() =>
              history.push(
                `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/${level}/add-module`,
              )
            }
            description="This level has not received any planned modules to take. you can add one from the button below."
          />
        ) : (
          <>
            <AddCard
              title={'Add new module'}
              onClick={() =>
                history.push(
                  `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/${level}/add-module`,
                )
              }
            />
            {levelModules &&
              levelModules.map((module, index) => (
                <ModuleCard course={module} key={index} />
              ))}
          </>
        )}
      </section>
    </>
  );
}

export default IntakeLevelModule;
