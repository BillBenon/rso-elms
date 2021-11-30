import React from 'react';
import {
  Link as BrowserLink,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import TableHeader from '../../components/Molecules/table/TableHeader';
import TabNavigation, { TabType } from '../../components/Molecules/tabs/TabNavigation';
import { authenticatorStore } from '../../store/administration';
import { getIntakesByAcademy } from '../../store/administration/intake.store';
import { CommonCardDataType, Link } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';
import CalendarView from './Calendar';
import Events from './Events';
import IntakePrograms from './IntakePrograms';
import TimeTable from './TimeTable';
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
  const { data, isLoading } = getIntakesByAcademy(
    userInfo?.academy.id + '',
    false,
    userInfo?.academy.id != undefined,
  );

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

  const handleClose = () => {
    history.goBack();
  };

  return (
    <div>
      <BreadCrumb list={list} />

      <TabNavigation tabs={tabs}>
        <Switch>
          <Route path={`${path}/intake/:id`} component={IntakePrograms} />
          <Route path={`${path}/calendar/:id`} component={CalendarView} />
          <Route path={`${path}/timetable/:id`} component={TimeTable} />
          <Route path={`${path}/events`} component={Events} />
          <Route path={`${path}/venues`} component={Venues} />
          <Route
            path={`${path}`}
            render={() => (
              <>
                <TableHeader totalItems={`${intakes.length} intakes`} title={'Schedule'}>
                  <div className="flex gap-4">
                    <BrowserLink to={`/dashboard/schedule/events/new`}>
                      <Button>Add event</Button>
                    </BrowserLink>
                    <BrowserLink to={`/dashboard/schedule/venues/new`}>
                      <Button styleType="outline">Add Venue</Button>
                    </BrowserLink>
                  </div>
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
              </>
            )}
          />
        </Switch>
      </TabNavigation>
    </div>
  );
}
