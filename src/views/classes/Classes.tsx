import React from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';

import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { Tabs } from '../../components/Molecules/tabs/tabs';
import useAuthenticator from '../../hooks/useAuthenticator';
import { classStore } from '../../store/administration/class.store';
import { getStudentShipByUserId } from '../../store/administration/intake-program.store';
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
                    showButton={false}
                    buttonLabel="Add new class"
                    icon="academy"
                    fill={false}
                    title={'No classes available in this period'}
                    handleClick={() =>
                      history.push(
                        `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${levelId}/view-period/${period}/add-class`,
                      )
                    }
                    description={`There are no classes added yet`}
                  />
                ) : (
                  <Tabs>
                    {studentClasses.map((cl) => (
                      <StudentInClass
                        key={cl.id}
                        classId={cl.id.toString()}
                        label={cl.class_name}
                      />
                    ))}
                  </Tabs>
                )
              ) : isLoading ? (
                <Loader />
              ) : classGroups.length === 0 ? (
                <NoDataAvailable
                  showButton={user?.user_type === UserType.ADMIN}
                  buttonLabel="Add new class"
                  icon="academy"
                  fill={false}
                  title={'No classes available in this period'}
                  handleClick={() =>
                    history.push(
                      `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${levelId}/view-period/${period}/add-class`,
                    )
                  }
                  description={`There are no classes added yet,${
                    user?.user_type === UserType.ADMIN
                      ? 'click on the below button to add some!'
                      : ''
                  }  `}
                />
              ) : (
                <Tabs>
                  {classGroups.map((cl) => (
                    <StudentInClass
                      key={cl.id}
                      classId={cl.id.toString()}
                      label={cl.class_name}
                    />
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
