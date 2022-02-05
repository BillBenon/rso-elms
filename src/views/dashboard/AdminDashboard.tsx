import React from 'react';
import { Link as BrowserLink } from 'react-router-dom';

import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import TableHeader from '../../components/Molecules/table/TableHeader';
import Barchat from '../../components/Organisms/chart/Barchart';
import useAuthenticator from '../../hooks/useAuthenticator';
import { divisionStore } from '../../store/administration/divisions.store';
import usersStore from '../../store/administration/users.store';
import { Link } from '../../types';
import { UserType } from '../../types/services/user.types';

const list: Link[] = [
  { to: 'home', title: 'home' },
  { to: 'dashboard', title: 'Academy' },
  { to: `admin`, title: 'dashboard' },
];

export default function AdminDashboard() {
  const { user } = useAuthenticator();

  const { data: users } = usersStore.getUsersByAcademy(user?.academy.id || '', {
    page: 0,
    pageSize: 100000000,
    sortyBy: 'username',
  });

  const departments = divisionStore.getDivisionsByAcademy(
    'DEPARTMENT',
    user?.academy?.id.toString() || '',
  ).data?.data.data;

  const faculties = divisionStore.getDivisionsByAcademy(
    'FACULTY',
    user?.academy?.id.toString() || '',
  ).data?.data.data;

  const chartData = [
    { department: 'Technology', students: 38 },
    { department: 'Peace keeping', students: 52 },
    { department: 'Weapon engineering', students: 61 },
    { department: 'Music band', students: 45 },
    { department: 'Medicine', students: 48 },
    { department: 'Aviation', students: 38 },
    { department: 'Construction', students: 58 },
    { department: 'Finance', students: 38 },
  ];

  return (
    <div className="py-2">
      <BreadCrumb list={list} />
      <TableHeader title="Dashboard" showBadge={false} showSearch={false} />

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-5">
            <BrowserLink to={'/dashboard/users'}>
              <div className="bg-main shadow-sm rounded-lg p-6 hover:border cursor-pointer">
                <Heading fontSize="sm" color="txt-secondary" fontWeight="medium">
                  Total students
                </Heading>
                <Heading className="pt-4" fontSize="sm" fontWeight="bold">
                  {
                    (users?.data.data.content || []).filter(
                      (user) => user.user_type === UserType.STUDENT,
                    ).length
                  }
                </Heading>
              </div>
            </BrowserLink>
            <BrowserLink to={'/dashboard/users/instructors'}>
              <div className="bg-main shadow-sm rounded-lg p-6 hover:border cursor-pointer">
                <Heading fontSize="sm" color="txt-secondary" fontWeight="medium">
                  Total instructors
                </Heading>
                <Heading className="pt-4" fontSize="sm" fontWeight="bold">
                  {
                    (users?.data.data.content || []).filter(
                      (user) => user.user_type === UserType.INSTRUCTOR,
                    ).length
                  }
                </Heading>
              </div>
            </BrowserLink>
            <BrowserLink to={'/dashboard/divisions'}>
              <div className="bg-main shadow-sm rounded-lg p-6 hover:border cursor-pointer">
                <Heading fontSize="sm" color="txt-secondary" fontWeight="medium">
                  Total Faculties
                </Heading>
                <Heading className="pt-4" fontSize="sm" fontWeight="bold">
                  {faculties?.length}
                </Heading>
              </div>
            </BrowserLink>
            <BrowserLink to={'/dashboard/intakes'}>
              <div className="bg-main shadow-sm rounded-lg p-6 hover:border cursor-pointer">
                <Heading fontSize="sm" color="txt-secondary" fontWeight="medium">
                  Total intakes
                </Heading>
                <Heading className="pt-4" fontSize="sm" fontWeight="bold">
                  0
                </Heading>
              </div>
            </BrowserLink>
            <BrowserLink to={'/dashboard/divisions/departments'}>
              <div className="bg-main shadow-sm rounded-lg p-6 hover:border cursor-pointer">
                <Heading fontSize="sm" color="txt-secondary" fontWeight="medium">
                  Total departments
                </Heading>
                <Heading className="pt-4" fontSize="sm" fontWeight="bold">
                  {departments?.length}
                </Heading>
              </div>
            </BrowserLink>
            <BrowserLink to={'/dashboard/divisions'}>
              <div className="bg-main shadow-sm rounded-lg p-6 hover:border cursor-pointer">
                <Heading fontSize="sm" color="txt-secondary" fontWeight="medium">
                  Total divisions
                </Heading>
                <Heading className="pt-4" fontSize="sm" fontWeight="bold">
                  {(departments?.length || 0) + (faculties?.length || 0)}
                </Heading>
              </div>
            </BrowserLink>
          </div>
          <div className="p-3 my-6 bg-white shadow-sm rounded-lg">
            <Heading className="px-6" fontWeight="semibold">
              Students in departments
            </Heading>
            <Barchat data={chartData} position={'department*students'} />
          </div>
        </div>
        <div className="col-span-2 h-56 border-2 rounded"></div>
      </div>
    </div>
  );
}
