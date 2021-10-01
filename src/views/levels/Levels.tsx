import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Cacumber from '../../components/Molecules/Cacumber';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewLevel from '../../components/Organisms/forms/level/NewLevel';
import UpdateLevel from '../../components/Organisms/forms/level/UpdateLevel';
import { levelStore } from '../../store/level.store';
import { ILevel } from '../../types/services/levels.types';

interface FilteredLevels
  extends Pick<ILevel, 'id' | 'name' | 'description' | 'generic_status'> {}

function Levels() {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const [levels, setLevels] = useState<FilteredLevels[]>();

  const { data, isSuccess, isLoading } = levelStore.getLevels(); // fetch levels

  useEffect(() => {
    // filter data to display
    const filterdData = data?.data.data.map((level) =>
      _.pick(level, ['id', 'name', 'description', 'generic_status']),
    );

    data?.data.data && setLevels(filterdData);
  }, [data]);
  console.log(data);

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
      name: 'View',
      handleAction: (id: string | number | undefined) => {
        history.push(`${path.replace(/levels/i, 'level')}/${id}/view`); // go to view level
      },
    },
  ];
  return (
    <main className="px-4">
      <section>
        <Cacumber list={list}></Cacumber>
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
        <Route
          exact
          path={`${path}/add`}
          render={() => {
            return (
              <PopupMolecule title="New Role" open onClose={history.goBack}>
                <NewLevel />
              </PopupMolecule>
            );
          }}
        />
      </Switch>

      {/* update level popup */}
      <PopupMolecule title="New Level" open>
        <UpdateLevel />
      </PopupMolecule>
    </main>
  );
}

export default Levels;
