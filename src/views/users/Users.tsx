import React, { useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Icon from '../../components/Atoms/custom/Icon';
import Loader from '../../components/Atoms/custom/Loader';
import ILabel from '../../components/Atoms/Text/ILabel';
import TableHeader from '../../components/Molecules/table/TableHeader';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import NewUser from '../../components/Organisms/forms/user/NewUser';
import UpdateUser from '../../components/Organisms/forms/user/UpdateUser';
import Admins from '../../components/Organisms/user/Admins';
import Instructors from '../../components/Organisms/user/Instructors';
import Students from '../../components/Organisms/user/Students';
import { authenticatorStore } from '../../store/administration';
import usersStore from '../../store/administration/users.store';
import { SortedContent } from '../../types';
import { UserInfo, UserType, UserTypes } from '../../types/services/user.types';
import UserDetails from './UserDetails';

function getData(resp?: UserInfo[] | SortedContent<UserInfo[]>) {
  if (resp) {
    let d = resp as SortedContent<UserInfo[]>;
    if (d.content) return d.content;
    else return resp as UserInfo[];
  } else return [];
}

export default function Users() {
  const { url, path } = useRouteMatch();
  const [userType, setUserType] = useState('Students');

  const authUser = authenticatorStore.authUser().data?.data.data;
  const history = useHistory();

  const { data, isSuccess, isLoading } =
    authUser?.user_type === UserType.SUPER_ADMIN
      ? usersStore.fetchUsers()
      : usersStore.getUsersByAcademy(authUser?.academy.id.toString() || '');

  const userInfo = getData(data?.data.data);

  let users: UserTypes[] = [];

  if (isSuccess && userInfo) {
    userInfo?.map((obj) => {
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
        'ID Card': person && person.nid,
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
    admins = users.filter(
      (user) =>
        user.user_type == UserType.ADMIN || user.user_type == UserType.SUPER_ADMIN,
    );
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
  ];

  if (authUser?.user_type === UserType.SUPER_ADMIN) {
    tabs.push({
      label: 'Admins',
      href: `${url}/admins`,
    });
  }
  const studentActions = [
    { name: 'Add Role', handleAction: () => {} },
    {
      name: 'Edit student',
      handleAction: (id: string | number | undefined) => {
        history.push(`/dashboard/users/${id}/edit`); // go to edit user
      },
    },
    {
      name: 'View Student',
      handleAction: (id: string | number | undefined) => {
        history.push(`${url}/${id}/profile`); // go to view user profile
      },
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
      {isLoading && <Loader />}
      <Switch>
        <Route exact path={`${path}/add/:userType`} component={NewUser} />
        <Route exact path={`${path}/:id/edit`} component={UpdateUser} />
        <Route exact path={`${path}/:id/profile`} component={UserDetails} />

        <Route
          path={`${path}`}
          render={() => {
            return (
              <>
                <TableHeader
                  totalItems={users.length}
                  showBadge={false}
                  title={'Users'}
                  showSearch={false}
                />

                <TabNavigation
                  tabs={tabs}
                  onTabChange={(event) => setUserType(event.activeTabLabel)}>
                  <Switch>
                    <Route
                      path={`${path}/instructors`}
                      render={() => <Instructors instructors={instructors} />}
                    />
                    <Route
                      path={`${path}/admins`}
                      render={() => <Admins admins={admins} />}
                    />
                    <Route
                      path={`${path}`}
                      render={() => (
                        <Students
                          students={students}
                          handleStatusAction={() => {}}
                          studentActions={studentActions}
                          enumtype={'UserTypes'}
                        />
                      )}
                    />
                  </Switch>
                </TabNavigation>
              </>
            );
          }}
        />
      </Switch>
    </div>
  );
}
