// import { Label } from "@headlessui/react/dist/components/label/label";
import './academy.scss';

import React from 'react';
import { useHistory } from 'react-router';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import ILabel from '../../Atoms/Text/ILabel';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';

export default function Academy() {
  const history = useHistory();

  function handleSearch(_e: ValueType) {}

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
      email: '',
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

  return (
    <>
      <div className="flex flex-wrap justify-start items-center">
        <ILabel size="sm" color="gray" weight="medium">
          Institution Admin
        </ILabel>
        <Icon name="chevron-right" />

        <ILabel size="sm" color="gray" weight="medium">
          Academies
        </ILabel>
        <Icon name="chevron-right" fill="gray" />
        <ILabel size="sm" color="primary" weight="medium">
          Academy
        </ILabel>
      </div>
      <div className="py-4">
        <TableHeader title="Academy" totalUsers={300} handleSearch={handleSearch}>
          <Button onClick={() => history.push('/academies/new')}>New academy</Button>
        </TableHeader>
      </div>

      <div className="mt-14">
        <Table statusColumn="status" data={data} hasAction={true} />
      </div>
    </>
  );
}
