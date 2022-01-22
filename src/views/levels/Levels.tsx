import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewLevel from '../../components/Organisms/forms/level/NewLevel';
import UpdateLevel from '../../components/Organisms/forms/level/UpdateLevel';
import useAuthenticator from '../../hooks/useAuthenticator';
import { levelStore } from '../../store/administration/level.store';
import { ILevel } from '../../types/services/levels.types';
import { Privileges } from '../../types/services/privilege.types';
import { ActionsType } from '../../types/services/table.types';

interface FilteredLevels
  extends Pick<ILevel, 'id' | 'name' | 'description' | 'generic_status'> {}

function Levels() {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const { user } = useAuthenticator();
  const [levels, setLevels] = useState<FilteredLevels[]>();
  const [privileges, setPrivileges] = useState<string[]>();
  let actions: ActionsType<any>[] | undefined = [];

  const { data, isLoading } = levelStore.getLevelsByAcademy(
    user?.academy.id.toString() || '',
  ); // fetch levels

  useEffect(() => {
    // filter data to display
    const filterdData = data?.data.data.map((level) =>
      _.pick(level, ['id', 'name', 'description', 'generic_status', 'flow']),
    );

    data?.data.data && setLevels(filterdData);
  }, [data, data?.data.data]);

  useEffect(() => {
    const _privileges = user?.user_roles
      ?.filter((role) => role.id === 1)[0]
      .role_privileges?.map((privilege) => privilege.name);
    if (_privileges) setPrivileges(_privileges);
  }, [user]);

  const list = [
    { to: '', title: 'Academy Admin' },
    { to: 'users', title: 'Users' },
    { to: 'faculties', title: 'Faculty' },
    { to: 'levels', title: 'Programs' },
    { to: 'levels', title: 'Level' },
  ];

  if (privileges?.includes(Privileges.CAN_MODIFY_LEVEL)) {
    actions?.push({
      name: 'Edit level',
      handleAction: (id: string | number | undefined) => {
        history.push(`${path}/${id}/edit`); // go to edit level
      },
    });
  }
  return (
    <main className="px-4">
      <section>
        <BreadCrumb list={list}></BreadCrumb>
      </section>
      <section className="">
        <TableHeader title="Levels" totalItems={levels?.length || 0}>
          <Permission privilege={Privileges.CAN_CREATE_LEVEL}>
            <Link to={`${url}/add`}>
              <Button>Add Level</Button>
            </Link>
          </Permission>
        </TableHeader>
      </section>

      <section>
        {isLoading ? (
          <Loader />
        ) : levels && levels?.length > 0 ? (
          <Table<FilteredLevels>
            statusColumn="status"
            data={levels}
            uniqueCol={'id'}
            hide={['id']}
            actions={actions}
          />
        ) : (
          <NoDataAvailable
            icon="level"
            buttonLabel="Add new level"
            title={'No levels available'}
            handleClick={() => history.push(`${url}/add`)}
            description="No levels have been added yet."
          />
        )}
      </section>

      <Switch>
        {/* update level popup */}
        <Route
          exact
          path={`${path}/:id/edit`}
          render={() => {
            return (
              <PopupMolecule title="Update Level" open onClose={history.goBack}>
                <UpdateLevel academy_id={user?.academy.id.toString()} />
              </PopupMolecule>
            );
          }}
        />

        {/* add new level popup */}
        <Route
          exact
          path={`${path}/add`}
          render={() => {
            return (
              <PopupMolecule title="New Level" open onClose={history.goBack}>
                <NewLevel academy_id={user?.academy.id.toString()} />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}

export default Levels;
