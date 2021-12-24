import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import { authenticatorStore } from '../../../store/administration';
import { divisionStore } from '../../../store/administration/divisions.store';
import { DivisionInfo } from '../../../types/services/division.types';
import NewAcademicProgram from '../../../views/programs/NewAcademicProgram';
import Loader from '../../Atoms/custom/Loader';
import NoDataAvailable from '../../Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
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
  const { path } = useRouteMatch();
  const history = useHistory();
  const [departments, setDepartments] = useState<FilteredData[]>([]);
  const { search } = useLocation();
  const facultyId = new URLSearchParams(search).get('fac');
  const { data: userInfo } = authenticatorStore.authUser();
  let { data, isLoading } = facultyId
    ? divisionStore.getDepartmentsInFaculty(facultyId)
    : divisionStore.getDivisionsByAcademy(
        fetchType.toUpperCase(),
        userInfo?.data.data.academy.id.toString() || '',
      );

  let facultyData: any;

  if (facultyId) {
    ({ data: facultyData } = divisionStore.getDivision(facultyId));
  }

  useEffect(() => {
    // extract department data to display
    let formattedDeparts: any = [];

    if (data?.data) {
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
    }
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
        history.push({ pathname: `/dashboard/programs/add`, search: `?dp=${id}` });
      },
    },
    {
      name: 'View Programs',
      handleAction: (id: string | number | undefined) => {
        history.push({ pathname: `/dashboard/programs/`, search: `?dp=${id}` });
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
            {departments.length > 0 ? (
              <section>
                <TableHeader
                  title={`${
                    facultyData?.data.data.name
                      ? `Departments in ${facultyData?.data.data.name}`
                      : 'Department'
                  }`}
                  totalItems={departments?.length}
                  handleSearch={() => {}}></TableHeader>
              </section>
            ) : null}

            <section>
              {isLoading ? (
                <Loader />
              ) : departments.length === 0 ? (
                <NoDataAvailable
                  icon="faculty"
                  showButton={false}
                  buttonLabel="Add new department"
                  title="No department available"
                  handleClick={() => history.push(`/dashboard/divisions/departments/new`)}
                  description="And the web just isnt the same without you. Lets get you back online!"
                />
              ) : (
                <Table<FilteredData>
                  handleSelect={() => {}}
                  statusColumn="status"
                  data={departments}
                  uniqueCol={'id'}
                  hide={['id']}
                  actions={actions}
                />
              )}
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
          </main>
        )}
      />
    </Switch>
  );
}
