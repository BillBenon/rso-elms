import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { divisionStore } from '../../../store/divisions.store';
import { DivisionInfo } from '../../../types/services/division.types';
import Button from '../../Atoms/custom/Button';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';

interface FilteredData
  extends Pick<DivisionInfo, 'id' | 'name' | 'description' | 'generic_status'> {}

interface IFaculties {
  fetchType: string;
  doRefetch: boolean;
}

export default function Faculties({ fetchType, doRefetch }: IFaculties) {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const [faculties, setFaculties] = useState<FilteredData[]>();
  const { data, isSuccess, isLoading, refetch } = divisionStore.getDivisionByType(
    fetchType.toUpperCase(),
  );

  useEffect(() => {
    // extract faculty data to display
    const filteredInfo = data?.data.data.map((faculty: DivisionInfo) =>
      _.pick(faculty, ['id', 'name', 'description', 'generic_status']),
    );

    doRefetch && refetch();

    console.log('i did a refetch', doRefetch);

    data?.data.data && setFaculties(filteredInfo);
  }, [data, doRefetch]);

  function handleClose() {
    history.goBack();
  }

  const actions = [
    {
      name: 'Edit Faculty',
      handleAction: (id: string | number | undefined) => {
        history.push(`${path}/${id}/edit`); // go to edit role
      },
    },
    { name: 'View', handleAction: () => {} },
  ];

  return (
    <main>
      <section>
        <TableHeader title="Faculty" totalItems={4} handleSearch={() => {}}>
          <Link to={`${url}/add`}>
            <Button>Add Faculty</Button>
          </Link>
        </TableHeader>
      </section>
      <section>
        {isLoading && 'Faculty loading...'}
        {isSuccess ? faculties?.length === 0 : 'No Roles found, try to add one'}
        {faculties && (
          <Table<FilteredData>
            handleSelect={() => {}}
            statusColumn="status"
            data={faculties}
            uniqueCol={'id'}
            actions={actions}
          />
        )}
      </section>

      <Switch>
        {/* modify faculty */}
        <Route
          exact
          path={`${path}/:id/edit`}
          render={() => {
            return (
              <PopupMolecule title="Update Role" open={true} onClose={handleClose}>
                {/* update division here */}
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}
