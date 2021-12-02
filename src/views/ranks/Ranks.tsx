import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewRank from '../../components/Organisms/forms/ranks/NewRank';
import UpdateRank from '../../components/Organisms/forms/ranks/UpdateRank';
import { rankStore } from '../../store/administration/rank.store';
import { RankRes } from '../../types/services/rank.types';

interface FilteredRanks
  extends Pick<RankRes, 'id' | 'name' | 'description' | 'category' | 'institution_id'> {}

export default function Ranks() {
  const { url, path } = useRouteMatch();
  const [ranks, setRanks] = useState<FilteredRanks[]>();
  const history = useHistory();
  const location = useLocation();

  const { data, isSuccess, isLoading, refetch } = rankStore.getRanks(); // fetch ranks

  useEffect(() => {
    // filter data to display
    const filterdData = data?.data.data.map((rank) =>
      _.pick(rank, ['id', 'name', 'description', 'category', 'institution_id']),
    );

    data?.data.data && setRanks(filterdData);
  }, [data]);

  // re fetch data whenever user come back on this page
  useEffect(() => {
    if (location.pathname === path || location.pathname === `${path}/`) {
      refetch();
    }
  }, [location]);

  //actions to be displayed in table
  const actions = [
    {
      name: 'Edit rank',
      handleAction: (id: string | number | undefined) => {
        history.push(`${path}/${id}/edit`); // go to edit rank
      },
    },
  ];

  const manyActions = [
    {
      name: 'Disable/Enable',
      handleAction: (data?: string[]) => {
        alert(`handling many at once ${data}`);
      },
    },
  ];

  function submited() {}
  function handleSearch() {}

  function handleSelect(_selected: string[] | null) {}

  return (
    <main>
      <section>
        <BreadCrumb list={[{ title: 'Ranks', to: 'ranks' }]} />
      </section>
      <section>
        <TableHeader
          title="Ranks"
          totalItems={ranks && ranks.length > 0 ? ranks.length : 0}
          handleSearch={handleSearch}>
          <Link to={`${url}/add`}>
            <Button>Add Rank</Button>
          </Link>
        </TableHeader>
      </section>
      <section>
        {isLoading && <Loader />}
        {ranks && ranks.length > 0 && isSuccess ? (
          <Table<FilteredRanks>
            selectorActions={manyActions}
            hide={['id']}
            handleSelect={handleSelect}
            statusColumn="status"
            data={ranks}
            uniqueCol={'id'}
            actions={actions}
          />
        ) : isSuccess && ranks?.length === 0 ? (
          <NoDataAvailable
            icon="role"
            buttonLabel="Add new rank"
            title={'No ranks available'}
            handleClick={() => history.push(`${url}/add`)}
            description="There are no ranks added yet. Click below to add some"
          />
        ) : null}
      </section>

      <Switch>
        {/* create rank */}
        <Route
          exact
          path={`${path}/add`}
          render={() => {
            return (
              <PopupMolecule title="New Rank" open={true} onClose={history.goBack}>
                <NewRank onSubmit={submited} />
              </PopupMolecule>
            );
          }}
        />

        {/* modify rank */}
        <Route
          exact
          path={`${path}/:id/edit`}
          render={() => {
            return (
              <PopupMolecule title="Update Rank" open onClose={history.goBack}>
                <UpdateRank onSubmit={submited} />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}
