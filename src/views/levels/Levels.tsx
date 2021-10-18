import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewLevel from '../../components/Organisms/forms/level/NewLevel';
import UpdateLevel from '../../components/Organisms/forms/level/UpdateLevel';
import { authenticatorStore } from '../../store';
import { levelStore } from '../../store/level.store';
import { ILevel } from '../../types/services/levels.types';

interface FilteredLevels
  extends Pick<ILevel, 'id' | 'name' | 'description' | 'generic_status'> {}

function Levels() {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const { data: userInfo } = authenticatorStore.authUser();
  const [levels, setLevels] = useState<FilteredLevels[]>();

  const { data, isSuccess, isLoading } = levelStore.getLevels(); // fetch levels

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
  ];
  return (
    <main className="px-4">
      <section>
        <BreadCrumb list={list}></BreadCrumb>
      </section>
      <section className="">
        <TableHeader title="Levels" totalItems={3}>
          <Link to={`${url}/add`}>
            <Button>Add Level</Button>
          </Link>
        </TableHeader>
      </section>

      <section>
        {isLoading && 'levels loading...'}
        {isSuccess ? levels?.length === 0 : 'No levels found, try to add one'}
        {levels && (
          <Table<FilteredLevels>
            statusColumn="status"
            data={levels}
            uniqueCol={'id'}
            actions={actions}
          />
        )}
      </section>

      {/* add new level popup */}
      <Switch>
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

        <Route
          exact
          path={`${path}/add`}
          render={() => {
            return (
              <PopupMolecule title="New Level" open onClose={history.goBack}>
                <NewLevel academy_id={userInfo?.data.data.academy.id.toString()} />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}

export default Levels;
