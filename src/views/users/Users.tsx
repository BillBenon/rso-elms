import React, { useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Icon from '../../components/Atoms/custom/Icon';
import Loader from '../../components/Atoms/custom/Loader';
import ILabel from '../../components/Atoms/Text/ILabel';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import NewUser from '../../components/Organisms/forms/user/NewUser';
import UpdateUser from '../../components/Organisms/forms/user/UpdateUser';
import Admins from '../../components/Organisms/user/Admins';
import ImportUsers from '../../components/Organisms/user/ImportUsers';
import Instructors from '../../components/Organisms/user/Instructors';
import Students from '../../components/Organisms/user/Students';
import { authenticatorStore } from '../../store/administration';
import usersStore from '../../store/administration/users.store';
import { GenericStatus } from '../../types';
import { UserType } from '../../types/services/user.types';
import UserDetails from './UserDetails';

export type UserTypes = {
  id: string;
  username: string;
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

  const { data, isSuccess, isLoading } = usersStore.fetchUsers();
  const authUser = authenticatorStore.authUser().data?.data.data;

  const userInfo = data?.data.data;

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
      {isLoading && users.length === 0 && <Loader />}
      <Switch>
        <Route exact path={`${path}/add`} render={() => <NewUser />} />
        <Route exact path={`${path}/:id/edit`} render={() => <UpdateUser />} />
        <Route exact path={`${path}/:id/profile`} component={UserDetails} />

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
        {isSuccess && (
          <Route
            path={`${path}`}
            render={() => {
              return (
                <>
                  <TableHeader
                    totalItems={users.length}
                    title={'users'}
                    showSearch={false}
                  />

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
                    {authUser?.user_type === 'ADMIN' ? (
                      <Route
                        exact
                        path={`${path}/admins`}
                        render={() => <Admins admins={admins} />}
                      />
                    ) : null}
                  </TabNavigation>
                </>
              );
            }}
          />
        )}
      </Switch>
    </div>
  );
}
