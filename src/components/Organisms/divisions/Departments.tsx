import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import { authenticatorStore } from '../../../store';
import { divisionStore } from '../../../store/divisions.store';
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
  const { data, isSuccess, isLoading, isError } = facultyId
    ? divisionStore.getDepartmentsInFaculty(facultyId)
    : divisionStore.getDivisionByType(fetchType.toUpperCase());

  let facultyData: any;

  if (facultyId) {
    ({ data: facultyData, isSuccess } = divisionStore.getDivision(facultyId));
  }

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
            {departments && departments?.length > 0 && (
              <section>
                <TableHeader
                  title={`${
                    facultyData?.data.data.name
                      ? `${facultyData?.data.data.name} / Department`
                      : 'department'
                  }`}
                  totalItems={`${departments?.length} departments` || 0}
                  handleSearch={() => {}}></TableHeader>
              </section>
            )}

            <section>
              {isLoading && departments.length === 0 && <Loader />}
              {isSuccess && departments?.length > 0 ? (
                <Table<FilteredData>
                  handleSelect={() => {}}
                  statusColumn="status"
                  data={departments}
                  uniqueCol={'id'}
                  hide={['id']}
                  actions={actions}
                />
              ) : isSuccess && departments.length === 0 ? (
                <NoDataAvailable
                  icon="faculty"
                  buttonLabel="Add new department"
                  title="No department available"
                  handleClick={() => history.push(`/dashboard/divisions/departments/new`)}
                  description="And the web just isnt the same without you. Lets get you back online!"
                />
              ) : null}
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
