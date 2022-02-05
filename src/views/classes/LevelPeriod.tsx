import React from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation, { TabType } from '../../components/Molecules/tabs/TabNavigation';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { IntakeLevelParam } from '../../types/services/intake-program.types';
import Classes from './Classes';
import NewClass from './NewClass';

function LevelPeriod() {
  const { level, intakeId, intakeProg, id } = useParams<IntakeLevelParam>();
  const { data: periods, isLoading } = intakeProgramStore.getPeriodsByLevel(
    parseInt(level),
  );
  const history = useHistory();
  const { path } = useRouteMatch();

  const prds = periods?.data.data || [];

  const tabs: TabType[] = [];

  prds.map((prd) => {
    tabs.push({
      label: `${prd.academic_period.name}`,
      href: `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/view-period/${prd.id}/view-class`,
    });
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <TabNavigation tabs={tabs}>
          <Switch>
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
          </Switch>
        </TabNavigation>
      )}
    </>
  );
}

export default LevelPeriod;
