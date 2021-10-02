import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import ImportUsers from './ImportUsers';
import NewStudent from './NewStudent';

export default function Students({ students }: { students: Object[] }) {
  const { url, path } = useRouteMatch();
  const history = useHistory();

  function handleSearch(_e: ValueType) {}
  const studentActions = [
    { name: 'Add Role', handleAction: () => {} },
    { name: 'Edit student', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
  ];
  return (
    <>
      <Switch>
        <Route
          exact
          path={`${path}`}
          render={() => {
            return (
              <>
                <TableHeader
                  title="Students"
                  totalItems={students && students.length > 0 ? students.length : 0}
                  handleSearch={handleSearch}>
                  <div className="flex gap-3">
                    <Link to={`${url}/import`}>
                      <Button styleType="outline">Import users</Button>
                    </Link>
                    <Link to={`${url}/add`}>
                      <Button>New Student</Button>
                    </Link>
                  </div>
                </TableHeader>
                {students && students.length > 0 && (
                  <div className="pt-8">
                    <Table
                      statusColumn="status"
                      data={students}
                      actions={studentActions}
                    />
                  </div>
                )}
              </>
            );
          }}
        />
        <Route
          exact
          path={`${path}/import`}
          render={() => {
            return (
              <PopupMolecule title="Import students" open={true} onClose={history.goBack}>
                <ImportUsers userType="students" />
              </PopupMolecule>
            );
          }}
        />
        <Route exact path={`${path}/add`} render={() => <NewStudent />} />
      </Switch>
    </>
  );
}
