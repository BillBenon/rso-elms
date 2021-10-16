import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { authenticatorStore } from '../../../store';
import { divisionStore } from '../../../store/divisions.store';
import { DivisionInfo } from '../../../types/services/division.types';
import NewAcademicProgram from '../../../views/programs/NewAcademicProgram';
import Button from '../../Atoms/custom/Button';
import Loader from '../../Atoms/custom/Loader';
import NoDataAvailable from '../../Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import NewDepartment from '../forms/divisions/NewDepartment';
import UpdateDepartment from '../forms/divisions/UpdateDepartment';

interface FilteredData
  extends Pick<
    DivisionInfo,
    'id' | 'name' | 'description' | 'generic_status' | 'total_num_childreen'
  > {}

interface IDepartment {
  fetchType: string;
}

export default function Departments({ fetchType }: IDepartment) {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const [departments, setDepartments] = useState<FilteredData[]>();
  const { data: userInfo } = authenticatorStore.authUser();
  const { data, isSuccess, isLoading, isError } = divisionStore.getDivisionByType(
    fetchType.toUpperCase(),
  );

  useEffect(() => {
    // extract department data to display
    let formattedDeparts: any = [];

    if (isSuccess && data?.data) {
      const filteredInfo = data?.data.data.map((department: DivisionInfo) =>
        _.pick(department, [
          'id',
          'name',
          'description',
          'generic_status',
          'total_num_childreen',
        ]),
      );

      filteredInfo?.map((department: any) => {
        let filteredData: any = {
          id: department.id.toString(),
          decription: department.description,
          name: department.name,
          status: department.generic_status,
          programs: department.total_num_childreen || 0,
        };
        formattedDeparts.push(filteredData);
      });

      data?.data.data && setDepartments(formattedDeparts);
    } else if (isError) toast.error('error occurred when loading departments');
  }, [data]);

  function handleClose() {
    history.goBack();
  }

  const actions = [
    {
      name: 'Edit Department',
      handleAction: (id: string | number | undefined) => {
        history.push(`${path}/${id}/edit`); // go to edit dep
      },
    },
    {
      name: 'Add Program',
      handleAction: (id: string | number | undefined) => {
        history.push(`${path}/${id}/add`); // go to add prog
      },
    },
    {
      name: 'View Programs',
      handleAction: (id: string | number | undefined) => {
        history.push({ pathname: `/dashboard/programs/`, search: `?query=${id}` });
      },
    },
  ];

  return (
    <Switch>
      <Route
        exact
        path={`${path}/:id/add`}
        render={() => {
          return <NewAcademicProgram />;
        }}
      />
      <Route
        path="*"
        render={() => (
          <main>
            <section>
              <TableHeader
                title="Department"
                totalItems={departments?.length || 0}
                handleSearch={() => {}}>
                <Link to={`${url}/add`}>
                  <Button>Add department</Button>
                </Link>
              </TableHeader>
            </section>
            <section>
              {isSuccess ? (
                departments?.length === 0
              ) : (
                <NoDataAvailable
                  buttonLabel="Add new department"
                  title="No departments available"
                  handleClick={() => {
                    history.push(`${url}/add`);
                  }}
                  description="Try adding some departments as none have been added yet!"
                />
              )}
              {departments && (
                <Table<FilteredData>
                  handleSelect={() => {}}
                  statusColumn="status"
                  data={departments}
                  uniqueCol={'id'}
                  hide={['id']}
                  actions={actions}
                />
              )}
              {isLoading && <Loader />}
            </section>
            {/* modify department */}
            <Route
              exact
              path={`${path}/:id/edit`}
              render={() => {
                return (
                  <PopupMolecule
                    title="Update Department"
                    open={true}
                    onClose={handleClose}>
                    <UpdateDepartment
                      academy_id={userInfo?.data.data.academy.id.toString()}
                    />
                  </PopupMolecule>
                );
              }}
            />

            <Route
              exact
              path={`${path}/add`}
              render={() => {
                return (
                  <PopupMolecule
                    title="New Department"
                    open
                    onClose={() => history.goBack()}>
                    <NewDepartment
                      academy_id={userInfo?.data.data.academy.id.toString()}
                    />
                  </PopupMolecule>
                );
              }}
            />
          </main>
        )}
      />
    </Switch>
  );
}
