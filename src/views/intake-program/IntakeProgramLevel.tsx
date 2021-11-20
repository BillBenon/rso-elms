import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import AddCard from '../../components/Molecules/cards/AddCard';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { Tab } from '../../components/Molecules/tabs/tabs';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { CommonCardDataType } from '../../types';
import {
  IntakeProgParam,
  LevelIntakeProgram,
} from '../../types/services/intake-program.types';
import { advancedTypeChecker } from '../../utils/getOption';
import Classes from '../classes/Classes';
import { NewIntakePeriod } from './NewIntakePeriod';

type ILevelIntakeProgram = {
  level: LevelIntakeProgram;
  label: string;
};

function IntakeProgramLevel({ level, label }: ILevelIntakeProgram) {
  const history = useHistory();
  const { path } = useRouteMatch();
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
        code: module.module.code,
        title: module.module.name,
        description: module.module.description,
        subTitle: `total subject: ${module.module.total_num_subjects || 'None'}`,
      });
    });

    setlevelModules(newModule);
  }, [levelModuleStore?.data.data]);

  const { data, isLoading: loadPeriod } = intakeProgramStore.getPeriodsByLevel(
    parseInt(level.id.toString()),
  );

  return (
    <Switch>
      <Route
        exact
        path={`${path}`}
        render={() => {
          return (
            <Tab label={label}>
              <TableHeader usePadding={false} showBadge={false} showSearch={false}>
                {data?.data.data.length === 0 && !loadPeriod && (
                  <Button
                    styleType="text"
                    onClick={() =>
                      history.push(
                        `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/modules/${level.id}/add-period`,
                      )
                    }>
                    Add academic periods to level
                  </Button>
                )}
                <Button
                  styleType="outline"
                  onClick={() =>
                    history.push(
                      `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/modules/${level.id}/view-class`,
                    )
                  }>
                  View classes
                </Button>
                <Button
                  styleType="outline"
                  onClick={() =>
                    history.push(
                      `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/${level.id}/add-module`,
                    )
                  }>
                  Add module
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
                        `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/${level.id}/add-module`,
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
                          `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/${level.id}/add-module`,
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
            </Tab>
          );
        }}
      />
      {/* add module to intake program level */}
      <Route path={`${path}/:level/view-class`} render={() => <Classes />} />
      {/* add periods to intake level */}
      <Route
        exact
        path={`${path}/:level/add-period`}
        render={() => (
          <PopupMolecule
            title="Add period to level"
            closeOnClickOutSide={false}
            open
            onClose={history.goBack}>
            <NewIntakePeriod
              academic_year_id={level.academic_year.id.toString()}
              checked={0}
              levelId={level.id.toString()}
            />
          </PopupMolecule>
        )}
      />
    </Switch>
  );
}

export default IntakeProgramLevel;
