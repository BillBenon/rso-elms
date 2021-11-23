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
import EnrollStudent from './EnrollStudent';

function IntakeLevelModule() {
  const history = useHistory();
  const { id, intakeId, intakeProg, level } = useParams<IntakeLevelParam>();

  const [levelModules, setlevelModules] = useState<CommonCardDataType[]>([]);
  const { data: levelModuleStore, isLoading } = intakeProgramStore.getModulesByLevel(
    parseInt(level),
  );
  useEffect(() => {
    let newModule: CommonCardDataType[] = [];
    levelModuleStore?.data.data.forEach((module) => {
      newModule.push({
        status: {
          type: advancedTypeChecker(module.generic_status),
          text: module.generic_status.toString(),
        },
        id: module.id,
        code: module.module.code,
        title: module.module.name,
        description: module.module.description,
        subTitle: `total subject: ${module.module.total_num_subjects || 'None'}`,
      });
    });

    setlevelModules(newModule);
  }, [levelModuleStore?.data.data]);

  const { data, isLoading: loadPeriod } = intakeProgramStore.getPeriodsByLevel(
    parseInt(level),
  );
  return (
    <>
      <TableHeader usePadding={false} showBadge={false} showSearch={false}>
        {data?.data.data.length === 0 && !loadPeriod && (
          <Button
            styleType="text"
            onClick={() =>
              history.push(
                `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/add-period`,
              )
            }>
            Add academic periods to level
          </Button>
        )}
        <EnrollStudent />
        <Button
          styleType="outline"
          onClick={() =>
            history.push(
              `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/view-class`,
            )
          }>
          View classes
        </Button>
        <Button
          styleType="outline"
          onClick={() =>
            history.push(
              `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/add-class`,
            )
          }>
          Add class
        </Button>
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
    // </Tab>
  );
}

export default IntakeLevelModule;
