import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import AddCard from '../../components/Molecules/cards/AddCard';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { moduleStore } from '../../store/administration/modules.store';
import { CommonCardDataType } from '../../types';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import { advancedTypeChecker } from '../../utils/getOption';
import IntakeProgramLevel from './IntakeProgramLevel';

function IntakeProgramModules() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [programModules, setProgramModules] = useState<CommonCardDataType[]>([]);
  const { id, intakeId, intakeProg } = useParams<IntakeProgParam>();

  const getAllModuleStore = moduleStore.getModulesByProgram(id);

  const getLevels =
    intakeProgramStore.getLevelsByIntakeProgram(intakeProg).data?.data.data || [];

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
      {[...getLevels, getLevels[0]].map((level, index) =>
        index === 0 ? (
          <Tab label="Overview">
            <div className="text-right">
              <Link
                to={`/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/add-level`}>
                <Button>Add Level</Button>
              </Link>
            </div>
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
          </Tab>
        ) : (
          <IntakeProgramLevel
            key={level.id}
            level={level}
            label={level.academic_program_level.level.name}
          />
        ),
      )}
    </Tabs>
  );
}

export default IntakeProgramModules;
