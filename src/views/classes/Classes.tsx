import React from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';

import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { Tabs } from '../../components/Molecules/tabs/tabs';
import { classStore } from '../../store/administration/class.store';
import { IntakeLevelParam } from '../../types/services/intake-program.types';
import ViewStudentReports from '../reports/ViewStudentReports';
import StudentInClass from './StudentInClass';

function Classes() {
  const history = useHistory();

  const { path } = useRouteMatch();
  const { level: levelId, intakeId, intakeProg, id } = useParams<IntakeLevelParam>();

  const { data: classes } = classStore.getClassByLevel(levelId);
  const classGroups = classes?.data.data || [];

  return (
    <Switch>
      <Route path={`${path}/reports`} component={ViewStudentReports} />
      <Route
        exact
        path={`${path}`}
        render={() => {
          return classGroups.length <= 0 ? (
            <NoDataAvailable
              buttonLabel="Add new class"
              icon="academy"
              fill={false}
              title={'No classes available in this level'}
              handleClick={() =>
                history.push(
                  `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${levelId}/add-class`,
                )
              }
              description="There are no classes added yet, click on the below button to add some!"
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
          );
        }}
      />
    </Switch>
  );
}

export default Classes;
