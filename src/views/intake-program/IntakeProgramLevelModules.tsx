import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import AddCard from '../../components/Molecules/cards/AddCard';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { Tab } from '../../components/Molecules/tabs/tabs';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { CommonCardDataType } from '../../types';
import {
  IntakeProgParam,
  LevelIntakeProgram,
} from '../../types/services/intake-program.types';
import { advancedTypeChecker } from '../../utils/getOption';

type ILevelIntakeProgram = {
  level: LevelIntakeProgram;
  label: string;
};

function IntakeProgramLevelModules({ level, label }: ILevelIntakeProgram) {
  const history = useHistory();
  const { id, intakeId, intakeProg } = useParams<IntakeProgParam>();
  const [levelModules, setlevelModules] = useState<CommonCardDataType[]>([]);

  const { data: levelModuleStore, isLoading } = intakeProgramStore.getModulesByLevel(
    parseInt(level.id.toString()),
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
        code: module.code,
        title: module.name,
        description: module.description,
        subTitle: `total subject: ${module.total_num_subjects || 'None'}`,
      });
    });

    setlevelModules(newModule);
  }, [levelModuleStore?.data.data]);

  return (
    <Tab label={label}>
      <section className="mt-4 flex flex-wrap justify-start gap-4">
        {isLoading ? (
          <Loader />
        ) : levelModules.length <= 0 ? (
          <NoDataAvailable
            buttonLabel="Add new modules"
            title={'No Modules available in this level'}
            handleClick={() =>
              history.push(
                `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/${level.id}/add-module`,
              )
            }
            description="This level has not received any planned modules to take. you can add one from the button below."
          />
        ) : (
          <>
            <AddCard
              title={'Add new module'}
              onClick={() => history.push(`/dashboard/intakes/programs/modules/add`)}
            />
            {levelModules &&
              levelModules.map((module, index) => (
                <ModuleCard course={module} key={index} />
              ))}
          </>
        )}
      </section>
    </Tab>
  );
}

export default IntakeProgramLevelModules;
