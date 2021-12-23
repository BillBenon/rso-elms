import React from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { IntakeLevelParam } from '../../types/services/intake-program.types';
import SubjectPeriod from '../subjects/SubjectPeriod';

function LevelPeriod() {
  const { level, intakeId, intakeProg, id } = useParams<IntakeLevelParam>();
  const prds = intakeProgramStore.getPeriodsByLevel(parseInt(level)).data?.data.data;
  const history = useHistory();
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route
        exact
        path={`${path}`}
        render={() => {
          return (
            <>
              {prds ? (
                prds.length === 0 ? (
                  <NoDataAvailable
                    buttonLabel="Add new period"
                    icon="academy"
                    fill={false}
                    title={'No periods available in this level'}
                    handleClick={() =>
                      history.push(
                        `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/add-period`,
                      )
                    }
                    description="There are no periods assigned to this level, click on the below button to add them!"
                  />
                ) : (
                  <Tabs
                    headerComponent={
                      <div className="space-x-4">
                        <Button
                          styleType="outline"
                          onClick={() =>
                            history.push(
                              `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/view-class`,
                            )
                          }>
                          View classes
                        </Button>
                        {prds.length !== 0 ? (
                          <Button
                            styleType="outline"
                            onClick={() =>
                              history.push(
                                `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/add-class`,
                              )
                            }>
                            Add class
                          </Button>
                        ) : (
                          <></>
                        )}
                      </div>
                    }>
                    {prds.map((term) => (
                      <Tab key={term.id} label={term.academic_period.name}>
                        <Heading fontWeight="semibold" className="py-2">
                          Subjects
                        </Heading>
                        <SubjectPeriod periodId={term.id + ''} />
                      </Tab>
                    ))}
                  </Tabs>
                )
              ) : (
                <></>
              )}
            </>
          );
        }}
      />
    </Switch>
  );
}

export default LevelPeriod;
