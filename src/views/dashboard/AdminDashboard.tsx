import 'react-calendar/dist/Calendar.css';
import '../../styles/components/Molecules/timetable/calendar.css';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useTranslation } from 'react-i18next';
import { Link as BrowserLink, useHistory } from 'react-router-dom';

import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import TableHeader from '../../components/Molecules/table/TableHeader';
// import Barchart from '../../components/Organisms/chart/Barchart';
import usePickedRole from '../../hooks/usePickedRole';
import { divisionStore } from '../../store/administration/divisions.store';
import { getIntakesByAcademy } from '../../store/administration/intake.store';
// import { getDepartmentStatsByAcademy } from '../../store/administration/stats.store';
import usersStore from '../../store/administration/users.store';
import { scheduleStore } from '../../store/timetable/calendar.store';
import { CommonCardDataType, Link } from '../../types';
import { IntakeStatus } from '../../types/services/intake.types';
import { UserType } from '../../types/services/user.types';
import { formatDateLikeGoogle } from '../../utils/date-helper';
import { advancedTypeChecker } from '../../utils/getOption';

const list: Link[] = [
  { to: 'home', title: 'home' },
  { to: 'dashboard', title: 'Academy' },
  { to: `admin`, title: 'dashboard' },
];

export default function AdminDashboard() {
  const [scheduleDate, setscheduleDate] = useState(new Date());
  const { t } = useTranslation();
  const history = useHistory();

  const picked_role = usePickedRole();

  const users =
    usersStore.getUsersByAcademy(picked_role?.academy_id + '', {
      page: 0,
      pageSize: 100000000,
      sortyBy: 'username',
    }).data?.data.data.content || [];

  // const { data: stats } = getDepartmentStatsByAcademy(picked_role?.academy_id + '');

  const departments =
    divisionStore.getDivisionsByAcademy('DEPARTMENT', picked_role?.academy_id + '').data
      ?.data.data || [];

  const faculties =
    divisionStore.getDivisionsByAcademy('FACULTY', picked_role?.academy_id + '').data
      ?.data.data || [];

  const loadesIntakes =
    getIntakesByAcademy(
      picked_role?.academy_id + '',
      false,
      !!picked_role?.academy_id,
    ).data?.data.data.filter((intake) => intake.intake_status === IntakeStatus.ONGOING) ||
    [];

  const intakes: CommonCardDataType[] = loadesIntakes.map((intake) => ({
    code: intake.title.toUpperCase(),
    description: `${intake.expected_start_date.toString().split(' ')[0]} - ${
      intake.expected_end_date.toString().split(' ')[0]
    }`,
    title: intake.description || ``,
    status: {
      type: advancedTypeChecker(intake.intake_status),
      text: intake.intake_status.toString(),
    },
    date: intake.expected_start_date,
    id: intake.id,
  }));

  const handleScheduleDate = (date: Date) => {
    setscheduleDate(date);
  };

  const schedules = scheduleStore.getAllSchedules().data?.data.data || [];

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
                  Total {t('Faculty')}
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
                  Total {t('Division')}
                </Heading>
                <Heading className="pt-4" fontSize="sm" fontWeight="bold">
                  {(departments?.length || 0) + (faculties?.length || 0)}
                </Heading>
              </div>
            </BrowserLink>
          </div>
          <div className="p-3 my-6">
            <Heading fontSize="lg" fontWeight="semibold" className="pb-3">
              Ongoing intakes
            </Heading>
            <div className="flex flex-wrap gap-2">
              {intakes.map((intake) => (
                <CommonCardMolecule
                  key={intake.id}
                  data={intake}
                  handleClick={() =>
                    history.push(`/dashboard/intakes/programs/${intake.id}`)
                  }
                />
              ))}
            </div>
          </div>
          {/* <div className="p-3 my-6 bg-white shadow-sm rounded-lg">
            <Heading className="px-6" fontWeight="semibold">
              Students in departments
            </Heading>
            <Barchart
              xAxisLabel={'department_name'}
              dataKey={'total_students'}
              data={stats?.data.data || []}
            />
          </div> */}
        </div>
        <div className="col-span-2 p-3">
          <Heading fontSize="lg" className="pb-3" fontWeight="semibold">
            Calendar
          </Heading>
          <Calendar onChange={handleScheduleDate} value={scheduleDate} />
          <div className="py-3">
            <Heading fontSize="lg" fontWeight="semibold">
              Schedule
            </Heading>
            {schedules.map((schedule) => (
              <div className="my-2 w-full flex" key={schedule.id}>
                <div className="bg-primary-500 rounded-l-lg text-white p-6">
                  <p className="text-sm font-medium">
                    {formatDateLikeGoogle(new Date().toLocaleDateString()).split(' ')[1]}
                  </p>
                  <p className="text-sm font-medium">
                    {formatDateLikeGoogle(new Date().toLocaleDateString()).split(' ')[0]}
                  </p>
                </div>
                <div className="bg-gray-50 w-full py-5">
                  <p className="text-gray-400 text-sm font-medium px-4">
                    {`${schedule.start_hour} - ${schedule.end_hour}`}
                  </p>
                  <div className="pt-2 text-sm font-medium px-4">
                    {schedule.event.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
