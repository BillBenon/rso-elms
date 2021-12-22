import React from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';

import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import Classes from '../classes/Classes';
import LevelPeriod from '../classes/LevelPeriod';
import NewClass from '../classes/NewClass';
import AddSubjectToPeriod from '../subjects/AddSubjectToPeriod';
import EnrollStudent from './EnrollStudent';
import IntakeLevelModule from './IntakeLevelModule';
import { NewIntakePeriod } from './NewIntakePeriod';

function IntakeProgramLevel() {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { intakeProg, intakeId, id } = useParams<IntakeProgParam>();

  const { data: getLevels, isLoading } =
    intakeProgramStore.getLevelsByIntakeProgram(intakeProg);

  const tabs =
    (getLevels &&
      getLevels.data.data.map((level) => ({
        label: `${level.academic_program_level.level.name}`,
        href: `${url}/${level.id}`,
      }))) ||
    [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : getLevels?.data.data.length === 0 ? (
        <NoDataAvailable
          buttonLabel="Add new level"
          icon="level"
          title={'No levels available in this program'}
          handleClick={() =>
            history.push(
              `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/add-level`,
            )
          }
          description="There are no levels available yet! you can add the from the button below"
        />
      ) : (
        <TabNavigation tabs={tabs}>
          <Switch>
            <Route exact path={`${path}/:level`} render={() => <IntakeLevelModule />} />
            {/* enroll student to intake program level */}
            <Route
              exact
              path={`${path}/:level/enroll-students`}
              render={() => <EnrollStudent />}
            />
            {/* add module to intake program level */}
            <Route path={`${path}/:level/view-period`} render={() => <LevelPeriod />} />
            {/* add module to intake program level */}
            <Route path={`${path}/:level/view-class`} render={() => <Classes />} />
            {/* add classes to intake program level */}
            <Route
              exact
              path={`${path}/:level/add-class`}
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
                  <NewIntakePeriod checked={0} />
                </PopupMolecule>
              )}
            />
            {/* add subject to period */}
            <Route
              exact
              path={`${path}/:level/add-subject/:period`}
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
        </TabNavigation>
      )}
    </>
  );
}

export default IntakeProgramLevel;
