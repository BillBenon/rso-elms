// import { Label } from "@headlessui/react/dist/components/label/label";
import React from 'react';

import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import ILabel from '../../atoms/Text/ILabel';
import Dashboard from '../../Molecules/Dashboard';
import SearchMolecule from '../../Molecules/input/SearchMolecule';
import Table from '../../Molecules/Table';
import { Tab, Tabs } from '../../Molecules/tabs/tabs';

export default function Students() {
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
    <Dashboard>
      <div className="flex flex-wrap justify-start items-center">
        <ILabel size="sm" color="gray" weight="medium">
          Institution Admin
        </ILabel>
        <Icon name="chevron-right" fill="gray" />

        <ILabel size="sm" color="gray" weight="medium">
          Users
        </ILabel>
        <Icon name="chevron-right" fill="gray" />
        <ILabel size="sm" color="primary" weight="medium">
          Students
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
          <div>
            <Button type="outline">Import users</Button>
            <span className="px-2"></span>
            <Button>New student</Button>
          </div>
        </div>
      </div>
      <Tabs>
        <Tab label="Students" className="pt-4">
          <Table statusColumn="status" data={data} hasAction={true} />
        </Tab>
        <Tab label="Instructors">
          <Table statusColumn="status" data={instractors} hasAction={true} />
        </Tab>
        <Tab label="Admins">
          <Table statusColumn="status" data={admins} hasAction={true} />
        </Tab>
      </Tabs>
    </Dashboard>
  );
}
