import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { authenticatorStore } from '../../../store';
import { divisionStore } from '../../../store/divisions.store';
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
  const [faculties, setFaculties] = useState<FilteredData[]>();
  const { data: userInfo } = authenticatorStore.authUser();

  const { data, isSuccess, isLoading, isError } = divisionStore.getDivisionByType(
    fetchType.toUpperCase(),
  );

  useEffect(() => {
    let formattedFaculties: any = [];
    if (isSuccess && data?.data) {
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
    } else if (isError) toast.error('error occurred when loading faculties');
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
        history.push(`${path}/${id}/add`);
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
        {faculties && faculties?.length > 0 && (
          <TableHeader
            title="Faculty"
            totalItems={`${faculties?.length} faculties` || 0}
            handleSearch={() => {}}>
            <Link to={`${url}/add`}>
              <Button>Add Faculty</Button>
            </Link>
          </TableHeader>
        )}
      </section>
      <section>
        {/* {isSuccess ? (
          faculties?.length === 0
        ) : (
          <NoDataAvailable
            buttonLabel="Add new faculty"
            title="No faculties available"
            handleClick={() => {
              history.push(`${url}/add`);
            }}
            description="Try adding some faculties as none have been added yet!"
          />
        )} */}
        {faculties && faculties?.length > 0 ? (
          <Table<FilteredData>
            handleSelect={() => {}}
            statusColumn="status"
            data={faculties}
            uniqueCol={'id'}
            hide={['id']}
            actions={actions}
          />
        ) : (
          <NoDataAvailable
            buttonLabel="Add new department"
            title={'No department available'}
            handleClick={() => history.push(`/dashboard/divisions/add`)}
            description="And the web just isnt the same without you. Lets get you back online!"
          />
        )}
        {isLoading && <Loader />}
      </section>

      <Switch>
        {/* modify faculty */}
        <Route
          exact
          path={`${path}/:id/edit`}
          render={() => {
            return (
              <PopupMolecule title="Update Faculty" open={true} onClose={handleClose}>
                <UpdateFaculty academy_id={userInfo?.data.data.academy.id.toString()} />
              </PopupMolecule>
            );
          }}
        />

        <Route
          exact
          path={`${path}/add`}
          render={() => {
            return (
              <PopupMolecule title="New Faculty" open onClose={handleClose}>
                <NewFaculty academy_id={userInfo?.data.data.academy.id.toString()} />
              </PopupMolecule>
            );
          }}
        />

        <Route
          exact
          path={`${path}/:id/add`}
          render={() => {
            return (
              <PopupMolecule title="New Department" open onClose={handleClose}>
                <NewDepartment academy_id={userInfo?.data.data.academy.id.toString()} />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}
