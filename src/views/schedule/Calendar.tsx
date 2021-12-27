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
import { classStore } from '../../store/administration/class.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import programStore from '../../store/administration/program.store';
import { scheduleStore } from '../../store/timetable/calendar.store';
import { ParamType, ValueType } from '../../types';
import { formatCalendarEvents } from '../../utils/calendar';
import { formatDateToYyMmDd, getWeekBorderDays } from '../../utils/date-helper';
import Picker from '../../components/Molecules/input/DateRangePicker';
import { DateRange } from '../../types/services/schedule.types';

const localizer = momentLocalizer(moment);

export default function CalendarView() {
  const history = useHistory();
  const { search } = useLocation();
  const { path, url } = useRouteMatch();
  const { id } = useParams<ParamType>();

  const [dateRange, setdateRange] = useState<DateRange>({
    startDate: getWeekBorderDays().monday,
    endDate: getWeekBorderDays().sunday,
  });

  const [isChangeRangeOpen, setisChangeRangeOpen] = useState(false);

  // query parameters
  const inLevelId = new URLSearchParams(search).get('in_level_id');
  const classId = new URLSearchParams(search).get('class_id');

  const programInfo = programStore.getProgramById(id).data?.data.data;
  const levelInfo = intakeProgramStore.getIntakeLevelById(inLevelId + '').data?.data.data;
  const classInfo = classStore.getClassById(classId + '').data?.data.data;

  // get events
  const events = formatCalendarEvents(
    (inLevelId
      ? scheduleStore.getAllByAcademicProgramIntakeLevel(inLevelId, dateRange).data?.data
          .data
      : classId
      ? scheduleStore.getAllByIntakeLevelClass(classId, dateRange).data?.data.data
      : scheduleStore.getAllByAcademicProgram(id, dateRange).data?.data.data) || [],
  );

  const handleClose = () => {
    history.goBack();
  };

  const handleDateRangeChange = (r: DateRange) => {
    setisChangeRangeOpen(false);
    setdateRange({ startDate: r.startDate, endDate: r.endDate });
  };

  return (
    <div>
      <Heading fontSize="2xl" className="my-6" fontWeight="semibold">
        {inLevelId
          ? `${levelInfo?.academic_program_level.program.name} - ${levelInfo?.academic_program_level.level.name} `
          : classId
          ? `${classInfo?.academic_year_program_intake_level.academic_program_level.program.name} - ${classInfo?.academic_year_program_intake_level.academic_program_level.level.name} - ${classInfo?.class_name}`
          : programInfo?.name}
      </Heading>
      <Heading fontSize="lg" fontWeight="semibold">
        {`${dateRange.startDate} to ${dateRange.endDate}`}
      </Heading>
      <div className="my-5">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <Button styleType="outline" onClick={() => setisChangeRangeOpen(true)}>
              Change date range
            </Button>
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

      <PopupMolecule open={isChangeRangeOpen} title="Change date range">
        <Picker
          open
          onChange={(r) =>
            handleDateRangeChange({
              startDate: formatDateToYyMmDd(r.startDate?.toDateString() + ''),
              endDate: formatDateToYyMmDd(r.endDate?.toDateString() + ''),
            } as DateRange)
          }
          handleToggle={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </PopupMolecule>

      <Calendar
        localizer={localizer}
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
        date={dateRange.startDate}
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
