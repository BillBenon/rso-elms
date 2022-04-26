import 'react-calendar/dist/Calendar.css';
import '../../styles/components/Molecules/timetable/calendar.css';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useTranslation } from 'react-i18next';
import { Link as BrowserLink } from 'react-router-dom';

import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import TableHeader from '../../components/Molecules/table/TableHeader';
import Barchart from '../../components/Organisms/chart/Barchart';
import usePickedRole from '../../hooks/usePickedRole';
import { divisionStore } from '../../store/administration/divisions.store';
import { getDepartmentStatsByAcademy } from '../../store/administration/stats.store';
import usersStore from '../../store/administration/users.store';
import { Link } from '../../types';
import { UserType } from '../../types/services/user.types';

const list: Link[] = [
  { to: 'home', title: 'home' },
  { to: 'dashboard', title: 'Academy' },
  { to: `admin`, title: 'dashboard' },
];

export default function AdminDashboard() {
  const [scheduleDate, setscheduleDate] = useState(new Date());
  const { t } = useTranslation();

  const picked_role = usePickedRole();
  const users =
    usersStore.getUsersByAcademy(picked_role?.academy_id + '', {
      page: 0,
      pageSize: 100000000,
      sortyBy: 'username',
    }).data?.data.data.content || [];

  const { data: stats } = getDepartmentStatsByAcademy(picked_role?.academy_id + '');

  const departments =
    divisionStore.getDivisionsByAcademy('DEPARTMENT', picked_role?.academy_id + '').data
      ?.data.data || [];

  const faculties =
    divisionStore.getDivisionsByAcademy('FACULTY', picked_role?.academy_id + '').data
      ?.data.data || [];

  const handleScheduleDate = (date: Date) => {
    setscheduleDate(date);
  };

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
                  {users.filter((user) => user.user_type === UserType.STUDENT).length}
                </Heading>
              </div>
            </BrowserLink>
            <BrowserLink to={'/dashboard/users/instructors'}>
              <div className="bg-main shadow-sm rounded-lg p-6 hover:border cursor-pointer">
                <Heading fontSize="sm" color="txt-secondary" fontWeight="medium">
                  Total {t('Instructor')}
                </Heading>
                <Heading className="pt-4" fontSize="sm" fontWeight="bold">
                  {users.filter((user) => user.user_type === UserType.INSTRUCTOR).length}
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
            <Barchart
              xAxisLabel={'department_name'}
              dataKey={'total_students'}
              data={stats?.data.data || []}
            />
          </div>
        </div>
        <div className="col-span-2 p-3">
          <Heading fontSize="lg" className="pb-3" fontWeight="medium">
            Calendar
          </Heading>
          <Calendar onChange={handleScheduleDate} value={scheduleDate} />
          <div className="py-3">
            <Heading fontSize="lg" fontWeight="medium">
              Schedule
            </Heading>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex w-full">
                <div className="bg-primary-500 rounded-l-lg text-white p-6">
                  <p className="text-sm font-medium">{new Date().getDate()}</p>
                  <p className="text-sm font-medium">
                    {new Date().toDateString().split(' ')[1]}
                  </p>
                </div>
                <div className="bg-gray-50 w-full py-5">
                  <p className="text-gray-400 text-sm font-medium px-4">
                    10:00 AM - 12:00 PM
                  </p>
                  <div className="pt-2 text-sm font-medium px-4">
                    Conference with the academy principals
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="bg-gray-300 rounded-l-lg p-6">
                  <p className="text-sm font-medium">{new Date().getDate()}</p>
                  <p className="text-sm font-medium">
                    {new Date().toDateString().split(' ')[1]}
                  </p>
                </div>
                <div className="bg-gray-50 w-full py-5">
                  <p className="text-gray-400 text-sm font-medium px-4">
                    10:00 AM - 12:00 PM
                  </p>
                  <div className="pt-2 text-sm font-medium px-4">
                    Conference with the academy principals
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
