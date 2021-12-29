import React from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { IntakePeriodParam } from '../../types/services/intake-program.types';
import AddSubjectToPeriod from '../subjects/AddSubjectToPeriod';
import SubjectPeriod from '../subjects/SubjectPeriod';
import Classes from './Classes';
import NewClass from './NewClass';

function LevelPeriod() {
  const { level, intakeId, intakeProg, id, period } = useParams<IntakePeriodParam>();
  const { data: periods, isLoading } = intakeProgramStore.getPeriodsByLevel(
    parseInt(level),
  );
  const history = useHistory();
  const { path } = useRouteMatch();

  const prds = periods?.data.data || [];

  const tabs = prds.map((prd) => ({
    label: `${prd.academic_period.name}`,
    href: `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/view-period/${prd.id}`,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : prds.length === 0 ? (
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
        <TabNavigation tabs={tabs}>
          <Switch>
            <Route
              exact
              path={`${path}`}
              render={() => {
                return (
                  <>
                    <div className="flex justify-between space-x-4">
                      <Heading fontWeight="semibold" fontSize="xl" className="py-2">
                        Subjects
                      </Heading>
                      <Button
                        styleType="outline"
                        onClick={() =>
                          history.push(
                            `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/view-period/${period}/view-class`,
                          )
                        }>
                        Add Evaluation
                      </Button>
                    </div>
                    <SubjectPeriod />
                  </>
                );
              }}
            />

            {/* add classes to intake program period */}
            <Route path={`${path}/view-class`} render={() => <Classes />} />
            {/* add classes to intake program level */}
            <Route
              exact
              path={`${path}/add-class`}
              render={() => (
                <PopupMolecule
                  title="New Class"
                  closeOnClickOutSide={false}
                  open
                  onClose={history.goBack}>
                  <NewClass />
                </PopupMolecule>
              )}
            />
            {/* add subject to period */}
            <Route
              exact
              path={`${path}/add-subject`}
              render={() => (
                <PopupMolecule
                  title="Add subject to period"
                  closeOnClickOutSide={false}
                  open
                  onClose={history.goBack}>
                  <AddSubjectToPeriod />
                </PopupMolecule>
              )}
            />
          </Switch>
          {/* </Tab>
            ))}
          </Tabs> */}
        </TabNavigation>
      )}
    </>
  );
}

export default LevelPeriod;
