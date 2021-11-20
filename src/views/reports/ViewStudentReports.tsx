// import { Label } from "@headlessui/react/dist/components/label/label";

import React from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { Link, Switch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import { Tab, RoundedTabs } from '../../components/Molecules/tabs/tabs';
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewAcademy from '../../components/Organisms/forms/academy/NewAcademy';
import UpdateAcademy from '../../components/Organisms/forms/academy/UpdateAcademy';
import { authenticatorStore } from '../../store/administration';
import academyStore from '../../store/administration/academy.store';
import usersStore from '../../store/administration/users.store';
import { Link as LinkList } from '../../types';
import { GenericStatus, ValueType } from '../../types';

type AcademyTypes = {
  id: number | string | undefined;
  'full names': string;
  'math': string;
  'science': string;
  'english': string;
  'total': string;
  'position': string;
  status: string;
};

export default function Academy() {
  const { url, path } = useRouteMatch();
  const history = useHistory();

  const authUser = authenticatorStore.authUser().data?.data.data;
  const { data, isLoading, isSuccess } = academyStore.getAcademiesByInstitution(
    authUser?.institution_id || '',
  );
  const list: LinkList[] = [
    { to: '/', title: 'Institution Admin' },
    { to: 'academies', title: 'Academies' },
  ];
  const academyInfo = data?.data.data;
  let academies: AcademyTypes[] = [];
  const users = usersStore.fetchUsers();
  academyInfo?.map((obj) => {
    let { id, name, current_admin_id, phone_number, generic_status } = obj;

    let academy: AcademyTypes = {
      id: id,
      'full names': 'Didier Healer',
        // users.data?.data.data.find((admin) => admin.id === current_admin_id)?.first_name +
        //   ' ' +
        //   users.data?.data.data.find((admin) => admin.id === current_admin_id)
        //     ?.last_name || '',
      'math': '76',
      'english': '10',
      'science': '60',
      'total': '190',
      'position': '1',
      status: 'EXPELLED',
    };

    academies.push(academy);
  });

  function handleSearch(_e: ValueType) {}

  const academyActions = [
    { 
        name: 'Promote',
        handleAction: () => {} 
    },
    {
        name: 'Expel from School',
        handleAction: () => {}
    },
    { 
        name: 'Retake Class',
        handleAction: () => {} 
    },
  ]; 

  return (
    <>
      <Switch>
        <Route
          exact
          path={`${path}`}
          render={() => (
            <>
            
              {isLoading && academies.length === 0 && <Loader />}
              {academies.length > 0 && isSuccess ? (
                <>
                    {/* <RoundedTabs>
                        <Tab className={"bg-green-600 px-3 py-2 rounded"} label="First Term">Data1</Tab>
                        <Tab className={"bg-blue-600 px-3 py-2 rounded"} label="Second Term">Data2</Tab>
                        <Tab label="Third Term">Data3</Tab>
                    </RoundedTabs> */}
                  <div className="py-4">
                    <TableHeader
                      title="Academic Year 2021 RNP"
                      totalItems={academies.length}
                      handleSearch={handleSearch}>
                      {/* <Link to={`${url}/add`}>
                        <Button>New academy</Button>
                      </Link> */}
                      
                    </TableHeader>
                  </div>

                  <div className="mt-14">
                    {academyInfo && (
                      <Table<AcademyTypes>
                        statusColumn="status"
                        data={academies}
                        actions={academyActions}
                        hide={['id']}
                        uniqueCol="id"
                      />
                    )}
                  </div>
                </>
              ) : isSuccess && academies.length === 0 ? (
                <NoDataAvailable
                  icon="academy"
                  fill={false}
                  buttonLabel="Go back to class"
                  title={'No academies available'}
                  handleClick={() => history.push(`${url}`)}
                  description="The report has not yet been generated"
                />
              ) : null}
            </>
          )}
        />
        {/* create academy */}
        <Route exact path={`${path}/add`} render={() => <NewAcademy />} />

        {/* modify academy */}
        <Route exact path={`${path}/:id/edit`} render={() => <UpdateAcademy />} />
      </Switch>
    </>
  );
}
