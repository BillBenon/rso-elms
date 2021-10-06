import React, { useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Badge from '../../components/Atoms/custom/Badge';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import ILabel from '../../components/Atoms/Text/ILabel';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import Admins from '../../components/Organisms/user/Admins';
import ImportUsers from '../../components/Organisms/user/ImportUsers';
import Instructors from '../../components/Organisms/user/Instructors';
import NewUser from '../../components/Organisms/user/NewUser';
import Students from '../../components/Organisms/user/Students';
import usersStore from '../../store/users.store';
import { GenericStatus } from '../../types';
import { UserType } from '../../types/services/user.types';

export type UserTypes = {
  id: string;
  'full name': string;
  email: string;
  NID: string;
  academy: string;
  status: GenericStatus;
  user_type: UserType;
};

export default function Users() {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const [userType, setUserType] = useState('Students');

  const { data, isSuccess } = usersStore.fetchUsers();

  const userInfo = data?.data.data;

  let users: UserTypes[] = [];

  if (isSuccess && userInfo) {
    userInfo?.map((obj) => {
      let {
        id,
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

  let students: UserTypes[], instructors: UserTypes[], admins: UserTypes[];

  if (isSuccess && users) {
    students = users.filter((user) => user.user_type == UserType.STUDENT);
    instructors = users.filter((user) => user.user_type == UserType.INSTRUCTOR);
    admins = users.filter((user) => user.user_type == UserType.ADMIN);
  }

  const tabs = [
    {
      label: 'Students',
      href: `${url}`,
    },
    {
      label: 'Instructors',
      href: `${url}/instructors`,
    },
    {
      label: 'Admins',
      href: `${url}/admins`,
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-start items-center pt-1">
        <ILabel size="sm" color="gray" weight="medium">
          Institution Admin
        </ILabel>
        <Icon name="chevron-right" />

        <ILabel size="sm" color="gray" weight="medium">
          Users
        </ILabel>
        <Icon name="chevron-right" fill="gray" />
        <ILabel size="sm" color="primary" weight="medium">
          {userType}
        </ILabel>
      </div>
      <Switch>
        <Route exact path={`${path}/add`} render={() => <NewUser />} />
        <Route
          exact
          path={`${path}/import`}
          render={() => (
            <PopupMolecule
              title="Import instructors"
              open={true}
              onClose={history.goBack}>
              <ImportUsers userType="instructors" />
            </PopupMolecule>
          )}
        />
        <Route
          path={`${path}`}
          render={() => {
            return (
              <>
                <div className="flex gap-2 items-center py-3">
                  <Heading className="capitalize" fontSize="2xl" fontWeight="bold">
                    users
                  </Heading>
                  <Badge
                    badgetxtcolor="main"
                    badgecolor="primary"
                    fontWeight="normal"
                    className="h-6 w-9 flex justify-center items-center">
                    {users.length}
                  </Badge>
                </div>

                <TabNavigation
                  tabs={tabs}
                  onTabChange={(event) => setUserType(event.activeTabLabel)}>
                  <Route
                    exact
                    path={`${path}`}
                    render={() => <Students students={students} />}
                  />
                  <Route
                    exact
                    path={`${path}/instructors`}
                    render={() => <Instructors instructors={instructors} />}
                  />
                  <Route
                    exact
                    path={`${path}/admins`}
                    render={() => <Admins admins={admins} />}
                  />
                </TabNavigation>
              </>
            );
          }}
        />
      </Switch>
    </div>
  );
}
