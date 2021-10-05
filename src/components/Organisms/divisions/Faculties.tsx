import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { divisionStore } from '../../../store/divisions.store';
import { DivisionInfo, Status } from '../../../types/services/division.types';
import Button from '../../Atoms/custom/Button';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import NewFaculty from '../forms/divisions/NewFaculty';
import UpdateFaculty from '../forms/divisions/UpdateFaculty';

interface FilteredData
  extends Pick<DivisionInfo, 'id' | 'name' | 'description' | 'generic_status'> {}

interface IFaculties {
  fetchType: string;
}

export default function Faculties({ fetchType }: IFaculties) {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const [faculties, setFaculties] = useState<FilteredData[]>();
  const { data, isSuccess, isLoading } = divisionStore.getDivisionByType(
    fetchType.toUpperCase(),
  );

  useEffect(() => {
    let formattedFaculties: any = [];
    const filteredFaculties = data?.data.data.map((faculty: DivisionInfo) =>
      _.pick(faculty, ['id', 'name', 'description', 'generic_status']),
    );

    filteredFaculties?.map((faculty: any) => {
      let filteredInfo: any = {
        id: faculty.id.toString(),
        decription: faculty.description,
        name: faculty.name,
        status: faculty.generic_status,
      };
      formattedFaculties.push(filteredInfo);
    });

    data?.data.data && setFaculties(formattedFaculties);
  }, [data, data?.data.data]);

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
        {isSuccess ? faculties?.length === 0 : 'No Faculties found, try to add one'}
        {faculties && (
          <Table<FilteredData>
            handleSelect={() => {}}
            statusColumn="status"
            data={faculties}
            uniqueCol={'id'}
            actions={actions}
            hide={['id']}
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
              <PopupMolecule title="Update Faculty" open={true} onClose={handleClose}>
                <UpdateFaculty handleAfterCreate={() => {}} />
              </PopupMolecule>
            );
          }}
        />

        <Route
          exact
          path={`${path}/add`}
          render={() => {
            return (
              <PopupMolecule title="New Faculty" open onClose={() => history.goBack()}>
                <NewFaculty handleAfterCreate={() => {}} />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}
