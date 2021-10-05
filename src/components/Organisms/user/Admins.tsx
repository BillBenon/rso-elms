import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import NoDataAvailable from '../../Molecules/cards/NoDataAvailable';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';

export default function Admins({ admins }: { admins: Object[] }) {
  const history = useHistory();
  function handleSearch(_e: ValueType) {}
  const adminActions = [
    { name: 'Add Role', handleAction: () => {} },
    { name: 'Edit admin', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
  ];
  return (
    <>
      <TableHeader
        title="Admins"
        totalItems={admins && admins.length > 0 ? admins.length : 0}
        handleSearch={handleSearch}>
        <div className="flex gap-3">
          <div className="flex gap-3">
            <Link to={`/dashboard/users/import`}>
              <Button styleType="outline">Import users</Button>
            </Link>
            <Link to={`/dashboard/users/add`}>
              <Button>New User</Button>
            </Link>
          </div>
        </div>
      </TableHeader>
      {admins && (
        <div className="pt-8">
          {admins.length <= 0 ? (
            <NoDataAvailable
              buttonLabel="Add new instructor"
              title={'No instructor available'}
              handleClick={() => history.push(`/dashboard/users/add`)}
              description="And the web just isnt the same without you. Lets get you back online!"
            />
          ) : (
            <Table statusColumn="status" data={admins} actions={adminActions} />
          )}
        </div>
      )}
    </>
  );
}
