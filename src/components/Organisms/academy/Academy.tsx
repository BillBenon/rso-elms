// import { Label } from "@headlessui/react/dist/components/label/label";
import React, { useState } from 'react';

import Dashboard from '../../../layout/Dashboard';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import ILabel from '../../atoms/Text/ILabel';
import SearchMolecule from '../../Molecules/input/SearchMolecule';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/Table';

export default function Academies() {
  const [open, setOpen] = useState(false);

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

  return (
    <Dashboard activeIndex={2}>
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
        <div className="flex flex-wrap justify-between items-center">
          <ILabel size="2xl" weight="bold">
            Academy
          </ILabel>
          <div className="flex flex-wrap justify-start items-center">
            <SearchMolecule />
            <button className="border p-0 rounded-md mx-2">
              <Icon name="filter" />
            </button>
          </div>
          <div className="flex gap-3">
            <Button type="outline">Import academy</Button>
            <Button onClick={() => setOpen(true)}>New academy</Button>
          </div>
        </div>
      </div>

      <Table statusColumn="status" data={data} hasAction={true} />
      <PopupMolecule open={open} onClose={() => setOpen(false)}>
        <div className="w-60">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni omnis
          delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate ea,
          accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam doloribus.
          Odit, aut.
        </div>
      </PopupMolecule>
    </Dashboard>
  );
}
