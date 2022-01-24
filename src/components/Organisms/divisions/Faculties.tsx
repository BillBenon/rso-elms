import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import useAuthenticator from '../../../hooks/useAuthenticator';
import { divisionStore } from '../../../store/administration/divisions.store';
import { DivisionInfo } from '../../../types/services/division.types';
import Button from '../../Atoms/custom/Button';
import Loader from '../../Atoms/custom/Loader';
import NoDataAvailable from '../../Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import NewDepartment from '../forms/divisions/NewDepartment';
import NewFaculty from '../forms/divisions/NewFaculty';
import UpdateFaculty from '../forms/divisions/UpdateFaculty';

interface FilteredData
  extends Pick<
    DivisionInfo,
    'id' | 'name' | 'description' | 'generic_status' | 'total_num_childreen'
  > {}

interface IFaculties {
  fetchType: string;
}

export default function Faculties({ fetchType }: IFaculties) {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const [faculties, setFaculties] = useState<FilteredData[]>([]);
  const { user } = useAuthenticator();

  const { data, isLoading } = divisionStore.getDivisionsByAcademy(
    fetchType.toUpperCase() || 'FACULTY',
    user?.academy.id.toString() || '',
  );

  useEffect(() => {
    let formattedFaculties: any = [];
    if (data?.data) {
      const filteredFaculties = data?.data.data.map((faculty: DivisionInfo) =>
        _.pick(faculty, [
          'id',
          'name',
          'description',
          'generic_status',
          'total_num_childreen',
        ]),
      );

      filteredFaculties?.map((faculty: any) => {
        let filteredInfo: any = {
          id: faculty.id.toString(),
          decription: faculty.description,
          name: faculty.name,
          status: faculty.generic_status,
          departments: faculty.total_num_childreen || 0,
        };
        formattedFaculties.push(filteredInfo);
      });

      data?.data.data && setFaculties(formattedFaculties);
    }
  }, [data]);

  function handleClose() {
    history.goBack();
  }

  const actions = [
    {
      name: 'Edit Faculty',
      handleAction: (id: string | number | undefined) => {
        history.push(`${path}/${id}/edit`); // go to edit faculties
      },
    },
    {
      name: 'Add Department',
      handleAction: (id: string | number | undefined) => {
        history.push(`${path}/${id}/new`);
      },
    },
    {
      name: 'View Departments',
      handleAction: (id: string | number | undefined) => {
        history.push({
          pathname: `/dashboard/divisions/departments`,
          search: `?fac=${id}`,
        });
      },
    },
  ];

  return (
    <main>
      <section>
        {faculties.length > 0 ? (
          <TableHeader
            title="Faculty"
            totalItems={faculties?.length || 0}
            handleSearch={() => {}}>
            <Link to={`${url}/new`}>
              <Button>Add Faculty</Button>
            </Link>
          </TableHeader>
        ) : (
          <></>
        )}
      </section>
      <section>
        {isLoading ? (
          <Loader />
        ) : faculties.length === 0 ? (
          <NoDataAvailable
            icon="faculty"
            buttonLabel="Add new faculty"
            title={'No faculty available'}
            handleClick={() => history.push(`/dashboard/divisions/new`)}
            description="And the web just isnt the same without you. Lets get you back online!"
          />
        ) : (
          <Table<FilteredData>
            handleSelect={() => {}}
            statusColumn="status"
            data={faculties}
            uniqueCol={'id'}
            hide={['id']}
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
              <PopupMolecule title="Update Faculty" open={true} onClose={handleClose}>
                <UpdateFaculty academy_id={user?.academy.id.toString()} />
              </PopupMolecule>
            );
          }}
        />

        <Route
          exact
          path={`${path}/new`}
          render={() => {
            return (
              <PopupMolecule title="New Faculty" open onClose={handleClose}>
                <NewFaculty academy_id={user?.academy.id.toString()} />
              </PopupMolecule>
            );
          }}
        />

        <Route
          exact
          path={`${path}/:id/new`}
          render={() => {
            return (
              <PopupMolecule title="New Department" open onClose={handleClose}>
                <NewDepartment academy_id={user?.academy.id.toString()} />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}
