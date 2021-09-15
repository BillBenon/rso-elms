import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import ILabel from '../../Atoms/Text/ILabel';
import SearchMolecule from '../../Molecules/input/SearchMolecule';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import { Tab, Tabs } from '../../Molecules/tabs/tabs';
import NewStudent from './NewStudent';

export default function Users() {
  const [userType, setUserType] = useState('Students');
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const handleCreateNewUserClick = () => {
    if (userType === 'Students') history.push('/users/students/new');
    else if (userType === 'Instructors') history.push('/users/instructors/new');
    else history.push('/users/admins/new');
  };

  const data = [
    {
      'full name': 'Col Florin Sandberg',
      role: 'Student / Sr',
      'phone number': 7869046715,
      status: 'Complete',
      NID: '195426611717168904',
    },
    {
      'full name': 'Kamili Abdulkhalim',
      role: 'Student / Sr',
      'phone number': 7869046743,
      status: 'Active',
      NID: '195426611717168904',
    },
    {
      'full name': 'Safari George',
      role: 'Student / Sr',
      'phone number': 7869046730,
      status: 'Suspended',
      NID: '120080010981917987',
    },
    {
      'full name': 'Dr. Lt  Col Kanama Nzeri',
      role: 'Student / Sr',
      'phone number': 7869046787,
      status: 'Pending',
      NID: '119788001098191798',
    },
    {
      'full name': 'Prof Gen Sandberg dotMe',
      role: 'Student / Sr',
      'phone number': 7869046728,
      status: 'Cancelled',
      NID: '195426611717168989',
    },
    {
      'full name': 'Col Florin Sandberg',
      role: 'Student / Sr',
      'phone number': 7869046715,
      status: 'Complete',
      NID: '195426611717168904',
    },
    {
      'full name': 'Kamili Abdulkhalim',
      role: 'Student / Sr',
      'phone number': 7869046743,
      status: 'Active',
      NID: '195426611717168904',
    },
    {
      'full name': 'Safari George',
      role: 'Student / Sr',
      'phone number': 7869046730,
      status: 'Suspended',
      NID: '120080010981917987',
    },
    {
      'full name': 'Dr. Lt  Col Kanama Nzeri',
      role: 'Student / Sr',
      'phone number': 7869046787,
      status: 'Pending',
      NID: '119788001098191798',
    },
    {
      'full name': 'Prof Gen Sandberg dotMe',
      role: 'Student / Sr',
      'phone number': 7869046728,
      status: 'Cancelled',
      NID: '195426611717168989',
    },
    {
      'full name': 'Col Florin Sandberg',
      role: 'Student / Sr',
      'phone number': 7869046715,
      status: 'Complete',
      NID: '195426611717168904',
    },
    {
      'full name': 'Kamili Abdulkhalim',
      role: 'Student / Sr',
      'phone number': 7869046743,
      status: 'Active',
      NID: '195426611717168904',
    },
    {
      'full name': 'Safari George',
      role: 'Student / Sr',
      'phone number': 7869046730,
      status: 'Suspended',
      NID: '120080010981917987',
    },
    {
      'full name': 'Dr. Lt  Col Kanama Nzeri',
      role: 'Student / Sr',
      'phone number': 7869046787,
      status: 'Pending',
      NID: '119788001098191798',
    },
    {
      'full name': 'Prof Gen Sandberg dotMe',
      role: 'Student / Sr',
      'phone number': 7869046728,
      status: 'Cancelled',
      NID: '195426611717168989',
    },
    {
      'full name': 'Col Florin Sandberg',
      role: 'Student / Sr',
      'phone number': 7869046715,
      status: 'Complete',
      NID: '195426611717168904',
    },
    {
      'full name': 'Kamili Abdulkhalim',
      role: 'Student / Sr',
      'phone number': 7869046743,
      status: 'Active',
      NID: '195426611717168904',
    },
    {
      'full name': 'Safari George',
      role: 'Student / Sr',
      'phone number': 7869046730,
      status: 'Suspended',
      NID: '120080010981917987',
    },
    {
      'full name': 'Dr. Lt  Col Kanama Nzeri',
      role: 'Student / Sr',
      'phone number': 7869046787,
      status: 'Pending',
      NID: '119788001098191798',
    },
    {
      'full name': 'Prof Gen Sandberg dotMe',
      role: 'Student / Sr',
      'phone number': 7869046728,
      status: 'Cancelled',
      NID: '195426611717168989',
    },
    {
      'full name': 'Col Florin Sandberg',
      role: 'Student / Sr',
      'phone number': 7869046715,
      status: 'Complete',
      NID: '195426611717168904',
    },
    {
      'full name': 'Kamili Abdulkhalim',
      role: 'Student / Sr',
      'phone number': 7869046743,
      status: 'Active',
      NID: '195426611717168904',
    },
    {
      'full name': 'Safari George',
      role: 'Student / Sr',
      'phone number': 7869046730,
      status: 'Suspended',
      NID: '120080010981917987',
    },
    {
      'full name': 'Dr. Lt  Col Kanama Nzeri',
      role: 'Student / Sr',
      'phone number': 7869046787,
      status: 'Pending',
      NID: '119788001098191798',
    },
    {
      'full name': 'Prof Gen Sandberg dotMe',
      role: 'Student / Sr',
      'phone number': 7869046728,
      status: 'Cancelled',
      NID: '195426611717168989',
    },
    {
      'full name': 'Col Florin Sandberg',
      role: 'Student / Sr',
      'phone number': 7869046715,
      status: 'Complete',
      NID: '195426611717168904',
    },
    {
      'full name': 'Kamili Abdulkhalim',
      role: 'Student / Sr',
      'phone number': 7869046743,
      status: 'Active',
      NID: '195426611717168904',
    },
    {
      'full name': 'Safari George',
      role: 'Student / Sr',
      'phone number': 7869046730,
      status: 'Suspended',
      NID: '120080010981917987',
    },
    {
      'full name': 'Dr. Lt  Col Kanama Nzeri',
      role: 'Student / Sr',
      'phone number': 7869046787,
      status: 'Pending',
      NID: '119788001098191798',
    },
    {
      'full name': 'Prof Gen Sandberg dotMe',
      role: 'Student / Sr',
      'phone number': 7869046728,
      status: 'Cancelled',
      NID: '195426611717168989',
    },
  ];

  let instractors = data.slice(6, 13);
  let admins = data.slice(24, 28);
  return (
    <>
      <div className="flex flex-wrap justify-start items-center">
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
      <div className="py-4">
        <div className="flex flex-wrap justify-between items-center">
          <ILabel size="2xl" weight="bold">
            Users
          </ILabel>
          <div className="flex flex-wrap justify-start items-center">
            <SearchMolecule />
            <button className="border p-0 rounded-md mx-2">
              <Icon name="filter" />
            </button>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => console.log(e)} type="outline">
              Import users
            </Button>
            <Button onClick={() => handleCreateNewUserClick()}>New {userType}</Button>
          </div>
        </div>
      </div>
      <Tabs onTabChange={(e) => setUserType(e.activeTabLabel)}>
        <Tab label="Students" className="pt-4">
          <Table statusColumn="status" data={data} hasAction={true} />
        </Tab>
        <Tab label="Instructors" className="pt-4">
          <Table statusColumn="status" data={instractors} hasAction={true} />
        </Tab>
        <Tab label="Admins" className="pt-4">
          <Table statusColumn="status" data={admins} hasAction={true} />
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
