import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/components/Molecules/calendar.scss';

import moment from 'moment';
import React from 'react';
import { Calendar, Event, momentLocalizer } from 'react-big-calendar';
import {
  Link as BrowserLink,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import SearchMolecule from '../../components/Molecules/input/SearchMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import NewSchedule from '../../components/Organisms/calendar/schedule/NewSchedule';
import { events } from '../../static/events';
import { ValueType } from '../../types';

const localizer = momentLocalizer(moment);

export default function CalendarView() {
  const handleSearch = (_e: ValueType) => {};
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const handleClose = () => {
    history.goBack();
  };

  return (
    <div>
      <Heading fontSize="2xl" className="my-6" fontWeight="semibold">
        Class 2 C
      </Heading>
      <div className="my-5">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <Button styleType="outline">Change date range</Button>
          </div>
          <div className="flex flex-wrap justify-start items-center">
            <SearchMolecule handleChange={handleSearch} />
            <button className="border p-0 rounded-md mx-2">
              <Icon name="filter" />
            </button>
          </div>

          <div className="flex gap-3">
            <BrowserLink to={`${url}/new-schedule`}>
              <Button>New schedule</Button>
            </BrowserLink>
          </div>
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        step={60}
        startAccessor="start"
        endAccessor="end"
        view="week"
        showMultiDayTimes={false}
        views={['day', 'week']}
        defaultDate={new Date(2015, 3, 12)}
        style={{ height: 900 }}
        onSelectEvent={(event) => history.push(`${path}/event/${event.id}`)}
        // components={{
        //   event: CustomEvent,
        //   // eventWrapper: (event) => <div className="bg-gray-400 rounded"></div>,
        // }}
      />
      <Switch>
        <Route
          exact
          path={`${path}/new-schedule`}
          render={() => (
            <PopupMolecule title="New Schedule" open onClose={handleClose}>
              <NewSchedule />
            </PopupMolecule>
          )}
        />
      </Switch>
    </div>
  );
}

interface Iprops {
  event: Event;
}

export function CustomEvent({ event }: Iprops) {
  return <div className="py-3 px-1 rounded bg-primary-500 text-white">{event.title}</div>;
}
