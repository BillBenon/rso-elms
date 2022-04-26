import React from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { Tabs } from '../../components/Molecules/tabs/tabs';
import useAuthenticator from '../../hooks/useAuthenticator';
import usePickedRole from '../../hooks/usePickedRole';
import { classStore } from '../../store/administration/class.store';
import { getStudentShipByUserId } from '../../store/administration/intake-program.store';
import { Privileges } from '../../types';
import { IntakePeriodParam } from '../../types/services/intake-program.types';
import { UserType } from '../../types/services/user.types';
import StudentInClass from './StudentInClass';

function Classes() {
  const history = useHistory();

  const { path } = useRouteMatch();
  const {
    level: levelId,
    intakeId,
    intakeProg,
    id,
    period,
  } = useParams<IntakePeriodParam>();

  const { user } = useAuthenticator();
  const studentInfo = getStudentShipByUserId(user?.id + '' || '', !!user?.id).data?.data
    .data[0];
  const { data: studClasses, isLoading: studLoad } = classStore.getClassByStudentAndLevel(
    studentInfo?.id + '',
    levelId,
  );

  const { data: classes, isLoading } = classStore.getClassByPeriod(period);
  const classGroups = classes?.data.data || [];

  const studentClassIds = studClasses?.data.data.map((std) => std.id);

  const studentClasses = classGroups.filter((cl) => studentClassIds?.includes(cl.id));

  const user_role = usePickedRole();
  const user_privileges = user_role?.role_privileges?.map((role) => role.name);
  const hasPrivilege = (privilege: Privileges) => user_privileges?.includes(privilege);

  return (
    <Switch>
      <Route
        path={`${path}`}
        render={() => {
          return (
            <>
              {user?.user_type === UserType.STUDENT ? (
                studLoad ? (
                  <Loader />
                ) : studentClasses.length === 0 ? (
                  <NoDataAvailable
                    buttonLabel="Add new class"
                    icon="academy"
                    fill={false}
                    title={'No classes available in this period'}
                    handleClick={() =>
                      path.includes('learn')
                        ? history.push(
                            `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/learn/${levelId}/view-period/${period}/add-class`,
                          )
                        : path.includes('teach')
                        ? history.push(
                            `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/teach/${levelId}/view-period/${period}/add-class`,
                          )
                        : path.includes('manage')
                        ? history.push(
                            `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/manage/${levelId}/view-period/${period}/add-class`,
                          )
                        : {}
                    }
                    description={`There are no classes added yet ${
                      hasPrivilege(Privileges.CAN_CREATE_CLASSES)
                        ? ', click on the below button to add some!'
                        : ''
                    }  `}
                    privilege={Privileges.CAN_CREATE_CLASSES}
                  />
                ) : (
                  <Tabs>
                    {studentClasses.map((cl) => (
                      <StudentInClass key={cl.id} classObject={cl} />
                    ))}
                  </Tabs>
                )
              ) : isLoading ? (
                <Loader />
              ) : classGroups.length === 0 ? (
                <NoDataAvailable
                  buttonLabel="Add new class"
                  icon="academy"
                  fill={false}
                  title={'No classes available in this period'}
                  handleClick={() =>
                    path.includes('learn')
                      ? history.push(
                          `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/learn/${levelId}/view-period/${period}/add-class`,
                        )
                      : path.includes('teach')
                      ? history.push(
                          `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/teach/${levelId}/view-period/${period}/add-class`,
                        )
                      : path.includes('manage')
                      ? history.push(
                          `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/manage/${levelId}/view-period/${period}/add-class`,
                        )
                      : {}
                  }
                  description={`There are no classes added yet ${
                    hasPrivilege(Privileges.CAN_CREATE_CLASSES)
                      ? ', click on the below button to add some!'
                      : ''
                  }  `}
                  privilege={Privileges.CAN_CREATE_CLASSES}
                />
              ) : (
                <Tabs>
                  {classGroups.map((cl) => (
                    <StudentInClass key={cl.id} classObject={cl} />
                  ))}
                </Tabs>
              )}
            </>
          );
        }}
      />
    </Switch>
  );
}

export default Classes;
