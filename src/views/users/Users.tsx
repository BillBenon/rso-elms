import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import ILabel from '../../components/Atoms/Text/ILabel';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import usersStore from '../../store/users.store';
import { GenericStatus, ValueType } from '../../types';
import { UserType } from '../../types/services/user.types';
import NewStudent from './NewStudent';

type UserTypes = {
  'full name': string;
  NID: string;
  academy: string;
  status: GenericStatus;
  userType: UserType;
};

export default function Users() {
  const [userType, setUserType] = useState('Students');
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const { data } = usersStore.fetchUsers();
  const userInfo = data?.data.data;

  console.log(userInfo);

  let users: UserTypes[] = [];
  userInfo?.map((obj) => {
    let { firstName, lastName, nid, academy, status, userType } = obj;

    let user: UserTypes = {
      'full name': firstName + ' ' + lastName,
      NID: nid,
      academy: academy.name,
      status: status,
      userType: userType,
    };

    users.push(user);
  });

  let students = users.filter((user) => user.userType == UserType.STUDENT);
  let instructors = users.filter((user) => user.userType == UserType.INSTRUCTOR);
  let admins = users.filter((user) => user.userType == UserType.ADMIN);

  function handleSearch(_e: ValueType) {}

  const handleCreateNewUserClick = () => {
    if (userType === 'Students') history.push('/dashboard/users/students/new');
    else if (userType === 'Instructors') history.push('/dashboard/users/instructors/new');
    else history.push('/users/admins/new');
  };

  const studentActions = [
    { name: 'Add Role', handleAction: () => {} },
    { name: 'Edit student', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
  ];

  const instructorActions = [
    { name: 'Add Role', handleAction: () => {} },
    { name: 'Edit instructor', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
  ];

  const adminActions = [
    { name: 'Add Role', handleAction: () => {} },
    { name: 'Edit admin', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
  ];

  return (
    <>
      <div className="flex flex-wrap justify-start items-center pt-2">
        <ILabel size="sm" color="gray" weight="medium">
          Institution Admin
        </ILabel>
        <Icon name="chevron-right" />

        <ILabel size="sm" color="gray" weight="medium">
          Users
        </ILabel>
        <Icon name="chevron-right" fill="gray" />
        <ILabel size="sm" color="primary" weight="medium">
          {userType}
        </ILabel>
      </div>

      <TableHeader title="Users" totalItems={30} handleSearch={handleSearch}>
        <div className="flex gap-3">
          <Button styleType="outline">Import users</Button>
          {userType !== 'Admins' ? (
            <Button onClick={() => handleCreateNewUserClick()}>New {userType}</Button>
          ) : (
            <></>
          )}
        </div>
      </TableHeader>
      <Tabs onTabChange={(e) => setUserType(e.activeTabLabel)}>
        <Tab label="Students" className="pt-8">
          {students && (
            <Table<UserTypes>
              statusColumn="status"
              data={students}
              actions={studentActions}
            />
          )}
        </Tab>
        <Tab label="Instructors" className="pt-8">
          <Table statusColumn="status" data={instructors} actions={instructorActions} />
        </Tab>
        <Tab label="Admins" className="pt-8">
          <Table statusColumn="status" data={admins} actions={adminActions} />
        </Tab>
      </Tabs>
      <PopupMolecule
        open={modalOpen && userType === 'Students'}
        onClose={() => setModalOpen(false)}>
        <NewStudent />
      </PopupMolecule>
    </>
  );
}
