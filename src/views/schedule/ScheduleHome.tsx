import React from 'react';
import {
  Link as BrowserLink,
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import TabNavigation, { TabType } from '../../components/Molecules/tabs/TabNavigation';
import NewSchedule from '../../components/Organisms/schedule/calendar/NewSchedule';
import { authenticatorStore } from '../../store/administration';
import { getIntakesByAcademy } from '../../store/administration/intake.store';
import {
  getIntakeProgramsByStudent,
  getStudentShipByUserId,
} from '../../store/administration/intake-program.store';
import { CommonCardDataType, Link } from '../../types';
import { UserType } from '../../types/services/user.types';
import { advancedTypeChecker } from '../../utils/getOption';
import CalendarView from './Calendar';
import ClassTimeTable from './ClassTimeTable';
import Events from './Events';
import IntakePrograms from './IntakePrograms';
import Venues from './Venues';

const list: Link[] = [
  { to: 'home', title: 'home' },
  { to: 'academy', title: 'Academy' },
  { to: `calendar`, title: 'Schedule' },
];

const tabs: TabType[] = [
  {
    label: 'Schedule',
    href: '/dashboard/schedule',
  },
  {
    label: 'Events',
    href: '/dashboard/schedule/events',
  },
  {
    label: 'Venues',
    href: '/dashboard/schedule/venues',
  },
];

export default function ScheduleHome() {
  const history = useHistory();
  const { path } = useRouteMatch();

  const userInfo = authenticatorStore.authUser().data?.data.data;
  const { data, isLoading } = getIntakesByAcademy(userInfo?.academy.id + '', false);

  let intakes: CommonCardDataType[] =
    data?.data.data.map((intake) => ({
      id: intake.id,
      code: intake.code.toUpperCase(),
      description: intake.description,
      title: intake.title || `------`,
      status: {
        type: advancedTypeChecker(intake.intake_status),
        text: intake.intake_status.toString(),
      },
    })) || [];

  const handleNewScheduleClose = () => {
    history.goBack();
  };

  return (
    <div>
      <BreadCrumb list={list} />

      <TabNavigation tabs={tabs}>
        <Switch>
          <Route path={`${path}/intake/:id`} component={IntakePrograms} />
          <Route path={`${path}/calendar/:id`} component={CalendarView} />
          <Route path={`${path}/timetable/:id`} component={ClassTimeTable} />
          <Route path={`${path}/events`} component={Events} />
          <Route path={`${path}/venues`} component={Venues} />

          <Route
            path={`${path}`}
            render={() =>
              userInfo?.user_type === UserType.STUDENT ? (
                <RedirectStudent userId={userInfo.id + ''} />
              ) : (
                <>
                  <TableHeader
                    totalItems={`${intakes.length} intakes`}
                    title={'Schedule'}>
                    <BrowserLink to={`${path}/schedule/new`}>
                      <Button>New Schedule</Button>
                    </BrowserLink>
                  </TableHeader>
                  <div className="mt-4 flex gap-4 flex-wrap">
                    {intakes.length === 0 && isLoading ? (
                      <Loader />
                    ) : (
                      intakes.map((intake) => (
                        <CommonCardMolecule
                          key={intake.id}
                          data={intake}
                          handleClick={() =>
                            history.push(`/dashboard/schedule/intake/${intake.id}`)
                          }
                        />
                      ))
                    )}
                  </div>
                  <Route
                    path={`${path}/schedule/new`}
                    render={() => (
                      <PopupMolecule
                        title="New Schedule"
                        open
                        onClose={handleNewScheduleClose}>
                        <NewSchedule />
                      </PopupMolecule>
                    )}
                  />
                </>
              )
            }
          />
        </Switch>
      </TabNavigation>
    </div>
  );
}

interface IProps {
  userId?: string;
}

function RedirectStudent({ userId }: IProps) {
  const studentInfo = getStudentShipByUserId(userId || '', !!userId).data?.data.data[0];

  const { data, isLoading, isIdle } = getIntakeProgramsByStudent(
    studentInfo?.id + '',
    !!studentInfo?.id,
  );

  return (
    <div>
      {isLoading || isIdle ? (
        <Loader />
      ) : (
        <Redirect
          to={`/dashboard/schedule/intake/${data?.data.data[0].intake_program.intake.id}/${data?.data.data[0].intake_program.id}`}
        />
      )}
    </div>
  );
}
