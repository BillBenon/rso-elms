import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { authenticatorStore } from '../../../store/administration';
import { GenericStatus, ValueType } from '../../../types';
import { StudentApproval } from '../../../types/services/enrollment.types';
import { AcademyUserType, UserType, UserTypes } from '../../../types/services/user.types';
import Button from '../../Atoms/custom/Button';
import NoDataAvailable from '../../Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import ImportUsers from './ImportUsers';

export default function Students({
  students,
  showTableHeader = true,
  handleStatusAction,
  studentActions,
  enumtype,
  selectorActions,
}: {
  students: UserTypes[] | AcademyUserType[];
  showTableHeader?: boolean;
  handleStatusAction: () => void;
  studentActions: {
    name: string;
    handleAction: (_id: string | number | undefined) => void;
  }[];
  selectorActions?: { name: string; handleAction: (_data?: string[]) => void }[];
  enumtype: string;
}) {
  const { url } = useRouteMatch();
  const history = useHistory();

  function handleSearch(_e: ValueType) {}

  const authUser = authenticatorStore.authUser().data?.data.data;

  const studentStatActions =
    enumtype === 'UserTypes'
      ? Object.keys(GenericStatus).map((stat) => ({
          name: stat,
          type: stat as GenericStatus,
          handleStatusAction: handleStatusAction,
        }))
      : Object.keys(StudentApproval).map((stat) => ({
          name: stat,
          type: stat as StudentApproval,
          handleStatusAction: handleStatusAction,
        }));

  return (
    <>
      {showTableHeader && (
        <TableHeader
          title="Students"
          totalItems={students && students.length > 0 ? students.length : 0}
          handleSearch={handleSearch}
          showSearch={students && students.length > 0}>
          {authUser?.user_type === UserType.SUPER_ADMIN && (
            <div className="flex gap-3">
              <Link to={`${url}/import`}>
                <Button styleType="outline">Import students</Button>
              </Link>
              <Link to={`${url}/add/${UserType.STUDENT}`}>
                <Button>New student</Button>
              </Link>
            </div>
          )}
        </TableHeader>
      )}
      {students && (
        <div className="pt-8">
          {students.length <= 0 ? (
            <NoDataAvailable
              showButton={authUser?.user_type === UserType.ADMIN}
              icon="user"
              buttonLabel="Add new student"
              title={'No students available'}
              handleClick={() => history.push(`/dashboard/users/add`)}
              description="And the web just isnt the same without you. Lets get you back online!"
            />
          ) : (
            <Table<UserTypes | AcademyUserType>
              statusColumn="status"
              data={students}
              actions={studentActions}
              statusActions={studentStatActions}
              hide={['id', 'user_type']}
              selectorActions={selectorActions}
              uniqueCol="id"
            />
          )}
        </div>
      )}
      <Switch>
        <Route
          exact
          path={`${url}/import`}
          render={() => (
            <PopupMolecule
              closeOnClickOutSide={false}
              title="Import students"
              open={true}
              onClose={history.goBack}>
              <ImportUsers userType={UserType.STUDENT} />
            </PopupMolecule>
          )}
        />
      </Switch>
    </>
  );
}
