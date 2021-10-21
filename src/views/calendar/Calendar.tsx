import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/components/Molecules/calendar.scss';

import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import SearchMolecule from '../../components/Molecules/input/SearchMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import EventDetails from '../../components/Organisms/calendar/EventDetails';
import { events } from '../../static/events';
import { Link, ValueType } from '../../types';

const localizer = momentLocalizer(moment);
const list: Link[] = [
  { to: 'home', title: 'home' },
  { to: 'academy', title: 'Academy' },
  { to: `calendar`, title: 'Calendar' },
];

export default function CalendarView() {
  const handleSearch = (_e: ValueType) => {};
  const history = useHistory();
  const { path } = useRouteMatch();

  return (
    <div>
      <BreadCrumb list={list} />
      <Heading fontSize="2xl" fontWeight="semibold">
        Class 2 C
      </Heading>
      <div className="flex items-center gap-5 py-2 ">
        <Heading fontSize="lg" fontWeight="semibold" className="pt-5">
          {'Sept 2021'}
        </Heading>
        <div className="flex items-center gap-2">
          <button className="block">
            <Icon
              name="chevron-right"
              fill="primary"
              bgColor="txt-secondary"
              useheightandpadding={false}
              size={20}
            />
          </button>
          <button className="block">
            <Icon
              name="chevron-left"
              fill="primary"
              bgColor="txt-secondary"
              size={20}
              useheightandpadding={false}
            />
          </button>
        </div>
      </div>
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
            <Button>New schedule</Button>
          </div>
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        step={60}
        startAccessor="start"
        endAccessor="end"
        view="day"
        showMultiDayTimes={false}
        views={['day', 'week']}
        defaultDate={new Date(2015, 3, 12)}
        style={{ height: 800 }}
        onSelectEvent={(event) => history.push(`${path}/event/${event.id}`)}
      />
      <Switch>
        <Route
          exact
          path={`${path}/event/:eventId`}
          render={() => (
            <PopupMolecule title="Event details" open>
              <EventDetails />
            </PopupMolecule>
          )}
        />
      </Switch>
    </div>
  );
}
