import React from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import Students from '../../components/Organisms/user/Students';
import { authenticatorStore } from '../../store/administration';
import { classStore } from '../../store/administration/class.store';
import usersStore from '../../store/administration/users.store';
import { IntakeLevelParam } from '../../types/services/intake-program.types';
import { UserType, UserTypes } from '../../types/services/user.types';
import NewClass from './NewClass';

function Classes() {
  const history = useHistory();

  const { url, path } = useRouteMatch();
  const { level: levelId } = useParams<IntakeLevelParam>();

  const authUser = authenticatorStore.authUser().data?.data.data;

  let users: UserTypes[] = [];
  const { data, isSuccess } = usersStore.getUsersByAcademy(
    authUser?.academy.id.toString() || '',
  );

  if (isSuccess && data?.data.data) {
    data?.data.data.map((obj) => {
      let {
        id,
        username,
        first_name,
        last_name,
        email,
        person,
        academy,
        generic_status,
        user_type,
      } = obj;

      let user: UserTypes = {
        id: id.toString(),
        username: username,
        'full name': first_name + ' ' + last_name,
        email: email,
        NID: person && person.nid,
        academy: academy && academy.name,
        status: generic_status,
        user_type: user_type,
      };

      users.push(user);
    });
  }

  const students = users.filter((user) => user.user_type == UserType.STUDENT);

  const { data: classes } = classStore.getClassByLevel(levelId);
  const classGroups = classes?.data.data || [];

  return (
    <Switch>
      <Route
        exact
        path={`${path}`}
        render={() => {
          return (
            <>
              <TableHeader usePadding={false} showBadge={false} showSearch={false}>
                <Button styleType="text" onClick={() => history.goBack()}>
                  Go back to modules
                </Button>
                <Button styleType="outline">Add class</Button>
                <Button styleType="outline">Add students</Button>
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
                    <Tab key={cl.id} label={cl.class_name}>
                      <Students students={students} showTableHeader={false} />
                    </Tab>
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
