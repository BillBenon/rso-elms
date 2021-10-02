import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import ImportUsers from './ImportUsers';
import NewInstructor from './NewInstructor';

export default function Instructors({ instructors }: { instructors: Object[] }) {
  const { url, path } = useRouteMatch();
  const history = useHistory();

  function handleSearch(_e: ValueType) {}
  const instructorActions = [
    { name: 'Add Role', handleAction: () => {} },
    { name: 'Edit instructor', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
  ];
  return (
    <Switch>
      <Route
        exact
        path={`${path}`}
        render={() => {
          return (
            <>
              <TableHeader
                title="Instructors"
                totalItems={
                  instructors && instructors.length > 0 ? instructors.length : 0
                }
                handleSearch={handleSearch}>
                <div className="flex gap-3">
                  <Link to={`${url}/import`}>
                    <Button styleType="outline">Import users</Button>
                  </Link>
                  <Link to={`${url}/add`}>
                    <Button>New Instructor</Button>
                  </Link>
                </div>
              </TableHeader>
              {instructors && instructors.length > 0 && (
                <div className="pt-8">
                  <Table
                    statusColumn="status"
                    data={instructors}
                    actions={instructorActions}
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
        render={() => (
          <PopupMolecule title="Import instructors" open={true} onClose={history.goBack}>
            <ImportUsers userType="instructors" />
          </PopupMolecule>
        )}
      />
      <Route exact path={`${path}/add`} render={() => <NewInstructor />} />
    </Switch>
  );
}
