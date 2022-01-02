import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import useInstructorLevels from '../../hooks/getInstructorLevels';
import { authenticatorStore } from '../../store/administration';
import intakeProgramStore, {
  getIntakeProgramsByStudent,
  getStudentLevels,
  getStudentShipByUserId,
} from '../../store/administration/intake-program.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import {
  IntakeProgParam,
  LevelIntakeProgram,
} from '../../types/services/intake-program.types';
import { UserType } from '../../types/services/user.types';
import LevelPeriod from '../classes/LevelPeriod';
import EnrollStudent from './EnrollStudent';
import IntakeLevelModule from './IntakeLevelModule';
import { NewIntakePeriod } from './NewIntakePeriod';

function IntakeProgramLevel() {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { intakeProg, intakeId, id } = useParams<IntakeProgParam>();
  const [instLevels, setInstLevels] = useState<LevelIntakeProgram[]>([]);

  const authUser = authenticatorStore.authUser().data?.data.data;

  const authUserId = authUser?.id;
  const instructorInfo = instructordeploymentStore.getInstructorByUserId(authUserId + '')
    .data?.data.data;

  const { data: getLevels, isLoading } =
    intakeProgramStore.getLevelsByIntakeProgram(intakeProg);

  const instructorProgLevels = useInstructorLevels(instructorInfo?.id + '', intakeProg);

  useEffect(() => {
    setInstLevels(instructorProgLevels);
  }, [instructorProgLevels]);

  const studentInfo = getStudentShipByUserId(authUser?.id + '' || '', !!authUser?.id).data
    ?.data.data[0];
  const studPrograms = getIntakeProgramsByStudent(studentInfo?.id + '', !!studentInfo?.id)
    .data?.data.data;

  let studIntkProgstud = studPrograms?.find(
    (prg) => prg.intake_program.id === intakeProg,
  );

  let { data: studentLevels } = getStudentLevels(
    studIntkProgstud?.id + '',
    !!studIntkProgstud?.id,
  );

  const tabs =
    authUser?.user_type === UserType.STUDENT
      ? studentLevels?.data.data.map((level) => ({
          label: `${level.academic_year_program_level.academic_program_level.level.name}`,
          href: `${url}/${level.academic_year_program_level.id}`,
        })) || []
      : authUser?.user_type === UserType.INSTRUCTOR
      ? instLevels.map((level) => ({
          label: `${level.academic_program_level.level.name}`,
          href: `${url}/${level.id}`,
        })) || []
      : (getLevels &&
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
        <>
          {authUser?.user_type === UserType.ADMIN ? (
            <div className="text-right">
              <Link
                to={`/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/add-level`}>
                <Button>Add level to program</Button>
              </Link>
            </div>
          ) : null}
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
              <Route
                path={`${path}/:level/view-period/:period`}
                render={() => <LevelPeriod />}
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
            </Switch>
          </TabNavigation>
        </>
      )}
    </>
  );
}

export default IntakeProgramLevel;
