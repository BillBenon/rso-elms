import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/components/Molecules/calendar.scss';

import moment from 'moment';
import React, { useState } from 'react';
import { Calendar, Event, momentLocalizer } from 'react-big-calendar';
import {
  Link as BrowserLink,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import SearchMolecule from '../../components/Molecules/input/SearchMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import NewSchedule from '../../components/Organisms/calendar/schedule/NewSchedule';
import programStore from '../../store/administration/program.store';
import { scheduleStore } from '../../store/timetable/schedule.store';
import { formatCalendarEvents } from '../../utils/calendar';
import { DateRange } from '../../types/services/schedule.types';
import { getWeekBorderDays } from '../../utils/date-helper';
import { ParamType, ValueType } from '../../types';

const localizer = momentLocalizer(moment);

export default function CalendarView() {
  const history = useHistory();
  const { search } = useLocation();
  const { path, url } = useRouteMatch();

  const [dateRange, setdateRange] = useState<DateRange>({
    start_date: getWeekBorderDays().monday,
    end_date: getWeekBorderDays().sunday,
  });

  // query parameters
  const inLevelId = new URLSearchParams(search).get('in_level_id');
  const classId = new URLSearchParams(search).get('class_id');

  const { id } = useParams<ParamType>();
  const programInfo = programStore.getProgramById(id).data?.data.data;

  //get events
  const events = formatCalendarEvents(
    (inLevelId
      ? scheduleStore.getAllByAcademicProgramIntakeLevel(inLevelId).data?.data.data
      : scheduleStore.getAllByAcademicProgram(id, dateRange).data?.data.data) || [],
  );

  const handleClose = () => {
    history.goBack();
  };

  return (
    <div>
      <Heading fontSize="2xl" className="my-6" fontWeight="semibold">
        {programInfo?.name}
      </Heading>
      <div className="my-5">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <Button styleType="outline">Change date range</Button>
          </div>
          <div className="flex flex-wrap justify-start items-center">
            <SearchMolecule handleChange={(_e: ValueType) => {}} />
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
        // events={[
        //   {
        //     id: '3fd387a7-d048-49a2-bfff-59284a406a51',
        //     title: 'Break time',
        //     start: 'Mon Dec 20 2021 05:42:00 GMT+0200 (Central Africa Time)',
        //     end: 'Mon Dec 20 2021 16:54:00 GMT+0200 (Central Africa Time)',
        //   },
        // ]}
        events={events}
        step={60}
        startAccessor="start"
        endAccessor="end"
        view="week"
        showMultiDayTimes={false}
        views={['day', 'week']}
        defaultDate={new Date()}
        timeslots={1}
        style={{ height: 900 }}
        min={new Date(2017, 10, 0, 4, 0, 0)}
        max={new Date(2017, 10, 0, 23, 59, 59)}
        // onSelectEvent={(event) => history.push(`${path}/event/${event.id}`)}
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
