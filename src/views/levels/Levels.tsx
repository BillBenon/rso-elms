import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
// import NewLevel from '../../components/Organisms/forms/level/NewLevel';
import UpdateLevel from '../../components/Organisms/forms/level/UpdateLevel';
import { authenticatorStore } from '../../store/administration';
import { levelStore } from '../../store/administration/level.store';
import { GenericStatus } from '../../types';
import { ILevel } from '../../types/services/levels.types';
import LevelUsers from './LevelUsers';

interface FilteredLevels
  extends Pick<ILevel, 'id' | 'name' | 'description' | 'generic_status'> {}

function Levels() {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const { data: userInfo } = authenticatorStore.authUser();
  const [levels, setLevels] = useState<FilteredLevels[]>();

  const { data, isLoading, isSuccess } = levelStore.getLevelsByAcademy(
    userInfo?.data.data.academy.id.toString() || '',
  ); // fetch levels

  useEffect(() => {
    // filter data to display
    const filterdData = data?.data.data.map((level) =>
      _.pick(level, ['id', 'name', 'description', 'generic_status', 'flow']),
    );

    data?.data.data && setLevels(filterdData);
  }, [data, data?.data.data]);

  const list = [
    { to: '', title: 'Academy Admin' },
    { to: 'users', title: 'Users' },
    { to: 'faculties', title: 'Faculty' },
    { to: 'levels', title: 'Programs' },
    { to: 'levels', title: 'Level' },
  ];

  //actions to be displayed in table
  const actions = [
    {
      name: 'Edit level',
      handleAction: (id: string | number | undefined) => {
        history.push(`${path}/${id}/edit`); // go to edit level
      },
    },
    {
      name: 'View Users',
      handleAction: (id: string | number | undefined) => {
        history.push(`${path}/${id}/users`); // go to edit level
      },
    },
  ];

  const levStatActions = Object.keys(GenericStatus).map((stat) => ({
    name: stat,
    type: stat as GenericStatus,
    handleStatusAction: () => {},
  }));

  return (
    <Switch>
      {/* update level popup */}
      <Route
        exact
        path={`${path}`}
        render={() => {
          return (
            <main className="px-4">
              <section>
                <BreadCrumb list={list}></BreadCrumb>
              </section>
              <section className="">
                <TableHeader title="Levels" totalItems={levels?.length || 0}>
                  <Link to={`${url}/add`}>
                    <Button>Add Level</Button>
                  </Link>
                </TableHeader>
              </section>

              <section>
                {isLoading && <Loader />}
                {isSuccess && (
                  <>
                    {levels && levels?.length > 0 ? (
                      <Table<FilteredLevels>
                        statusColumn="generic_status"
                        statusActions={levStatActions}
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
                  </>
                )}
              </section>
            </main>
          );
        }}
      />

      {/* update level popup */}
      <Route
        exact
        path={`${path}/:id/edit`}
        render={() => {
          return (
            <PopupMolecule title="Update Level" open onClose={history.goBack}>
              <UpdateLevel academy_id={userInfo?.data.data.academy.id.toString()} />
            </PopupMolecule>
          );
        }}
      />

      {/* add new level popup */}
      <Route
        path={`${path}/:id/users`}
        render={() => {
          return <LevelUsers />;
        }}
      />
    </Switch>
  );
}

export default Levels;
