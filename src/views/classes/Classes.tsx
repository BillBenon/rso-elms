import React from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { Tabs } from '../../components/Molecules/tabs/tabs';
import { classStore } from '../../store/administration/class.store';
import { IntakeLevelParam } from '../../types/services/intake-program.types';
import ViewStudentReports from '../reports/ViewStudentReports';
import NewClass from './NewClass';
import StudentInClass from './StudentInClass';

function Classes() {
  const history = useHistory();

  const { url, path } = useRouteMatch();
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
          return (
            <>
              <TableHeader usePadding={false} showBadge={false} showSearch={false}>
                <Button
                  styleType="text"
                  onClick={() =>
                    history.push(
                      `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/modules`,
                    )
                  }>
                  Go back to modules
                </Button>
                <Button
                  styleType="outline"
                  onClick={() => history.push(`${url}/add-class`)}>
                  Add class
                </Button>
              </TableHeader>
              {classGroups.length <= 0 ? (
                <NoDataAvailable
                  buttonLabel="Add new class"
                  icon="academy"
                  fill={false}
                  title={'No classes available in this level'}
                  handleClick={() => history.push(`${url}/add-class`)}
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
              )}
            </>
          );
        }}
      />
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
  );
}

export default Classes;
