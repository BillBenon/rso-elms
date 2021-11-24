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
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewEvent from '../../components/Organisms/calendar/NewEvent';
import NewVenue from '../../components/Organisms/calendar/NewVenue';
import { authenticatorStore } from '../../store/administration';
import { intakeStore } from '../../store/administration/intake.store';
import { CommonCardDataType, Link } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';
import CalendarView from './Calendar';
import IntakePrograms from './IntakePrograms';
import TimeTable from './TimeTable';

const list: Link[] = [
  { to: 'home', title: 'home' },
  { to: 'academy', title: 'Academy' },
  { to: `calendar`, title: 'Schedule' },
];

export default function ScheduleHome() {
  const history = useHistory();
  const { path } = useRouteMatch();

  const { data: userInfo } = authenticatorStore.authUser();
  const { data, isLoading } = intakeStore.getIntakesByAcademy(
    userInfo?.data.data.academy.id.toString()!,
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

      <Switch>
        <Route path={`${path}/intake/:id`} component={IntakePrograms} />
        <Route path={`${path}/calendar/:id`} component={CalendarView} />
        <Route path={`${path}/timetable/:id`} component={TimeTable} />
        <Route
          path={`${path}`}
          render={() => (
            <>
              <TableHeader totalItems={`${intakes.length} intakes`} title={'Schedule'}>
                <div className="flex gap-4">
                  <BrowserLink to={`${path}/event/new`}>
                    <Button>Add event</Button>
                  </BrowserLink>
                  <BrowserLink to={`${path}/venue/new`}>
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
              <Route
                exact
                path={`${path}/event/new`}
                render={() => (
                  <PopupMolecule title="New Event" open onClose={handleClose}>
                    <NewEvent />
                  </PopupMolecule>
                )}
              />
              <Route
                exact
                path={`${path}/venue/new`}
                render={() => (
                  <PopupMolecule title="New Venue" open onClose={handleClose}>
                    <NewVenue />
                  </PopupMolecule>
                )}
              />
            </>
          )}
        />
      </Switch>
    </div>
  );
}
