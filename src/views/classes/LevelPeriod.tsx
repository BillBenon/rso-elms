import React from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation, { TabType } from '../../components/Molecules/tabs/TabNavigation';
import { classStore } from '../../store/administration/class.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { IClass } from '../../types/services/class.types';
import {
  IntakeLevelParam,
  IntakeProgramLevelPeriodInfo,
} from '../../types/services/intake-program.types';
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

  let prdClass: { prd: IntakeProgramLevelPeriodInfo; class?: IClass[] }[] = [];

  prds.forEach((prd) => {
    const { data } = classStore.getClassByPeriod(prd.id.toString());
    prdClass.push({ prd: prd, class: data?.data.data });
  });

  const tabs: TabType[] = [];

  prdClass.map((prd) => {
    if (prd.class) {
      tabs.push({
        label: `${prd.prd.academic_period.name}`,
        href: `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/view-period/${
          prd.prd.id
        }/view-class/${prd.class[0].id || ''}`,
      });
    }
  });

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
            {/* add classes to intake program period */}
            <Route path={`${path}/view-class/:classId`} render={() => <Classes />} />
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
          {/* </Tab>
            ))}
          </Tabs> */}
        </TabNavigation>
      )}
    </>
  );
}

export default LevelPeriod;
