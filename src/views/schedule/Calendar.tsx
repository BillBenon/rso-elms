import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/components/Molecules/calendar.scss';

import moment from 'moment';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
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
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import SearchMolecule from '../../components/Molecules/input/SearchMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import NewSchedule from '../../components/Organisms/schedule/calendar/NewSchedule';
import { authenticatorStore } from '../../store/administration/authenticator.store';
import { classStore } from '../../store/administration/class.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import programStore from '../../store/administration/program.store';
import { scheduleStore } from '../../store/timetable/calendar.store';
import { ParamType, ValueType } from '../../types';
import { DateRange } from '../../types/services/schedule.types';
import { UserType } from '../../types/services/user.types';
import { formatCalendarEvents } from '../../utils/calendar';
import { formatDateToYyMmDd, getWeekBorderDays } from '../../utils/date-helper';

const localizer = momentLocalizer(moment);

export default function CalendarView() {
  const history = useHistory();

  const { search } = useLocation();
  const { path, url } = useRouteMatch();
  const { id } = useParams<ParamType>();

  const [dateRange, setdateRange] = useState<DateRange>({
    start_date: getWeekBorderDays().monday,
    end_date: getWeekBorderDays().sunday,
  });

  const [isChangeRangeOpen, setisChangeRangeOpen] = useState(false);

  // query parameters
  const inLevelId = new URLSearchParams(search).get('in_level_id');
  const classId = new URLSearchParams(search).get('class_id');

  const programInfo = programStore.getProgramById(id).data?.data.data;
  const levelInfo = intakeProgramStore.getIntakeLevelById(inLevelId + '').data?.data.data;
  const classInfo = classStore.getClassById(classId + '').data?.data.data;

  // auth info
  const authUser = authenticatorStore.authUser().data?.data.data;

  // get events
  const { data, refetch } = inLevelId
    ? scheduleStore.getAllByAcademicProgramIntakeLevel(inLevelId, dateRange)
    : classId
    ? scheduleStore.getAllByIntakeLevelClass(classId, dateRange)
    : scheduleStore.getAllByAcademicProgram(id, dateRange);

  const events = formatCalendarEvents(data?.data.data || []);

  const handleNewScheduleClose = () => {
    history.goBack();
  };

  const handleApplyDateRange = () => {
    refetch();
    setisChangeRangeOpen(false);
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
        {`${dateRange.start_date} to ${dateRange.end_date}`}
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
            {authUser?.user_type != UserType.STUDENT && (
              <BrowserLink to={`${url}/new-schedule`}>
                <Button>New schedule</Button>
              </BrowserLink>
            )}
          </div>
        </div>
      </div>

      <PopupMolecule
        open={isChangeRangeOpen}
        onClose={() => setisChangeRangeOpen(false)}
        title="Change date range">
        <div>
          <InputMolecule
            type="date"
            value={dateRange.start_date}
            handleChange={(e) =>
              setdateRange({
                ...dateRange,
                start_date: formatDateToYyMmDd(e.value.toString()),
              })
            }
            name={'expected_start_date'}>
            From:
          </InputMolecule>
          <InputMolecule
            type="date"
            name={'expected_end_date'}
            value={dateRange.end_date}
            handleChange={(e) =>
              setdateRange({
                ...dateRange,
                end_date: formatDateToYyMmDd(e.value.toString()),
              })
            }>
            To:
          </InputMolecule>
          <Button onClick={handleApplyDateRange}>Apply</Button>
        </div>
      </PopupMolecule>

      <Calendar
        localizer={localizer}
        events={events}
        step={60}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        // view="week"
        showMultiDayTimes={false}
        timeslots={1}
        style={{ height: 900 }}
        min={new Date(2017, 10, 0, 4, 0, 0)}
        max={new Date(2017, 10, 0, 23, 59, 59)}
        date={new Date(dateRange.start_date)}
        onNavigate={(_newDate, _view, _action) => {}}
      />
      <Switch>
        <Route
          exact
          path={`${path}/new-schedule`}
          render={() => (
            <PopupMolecule title="New Schedule" open onClose={handleNewScheduleClose}>
              <NewSchedule />
            </PopupMolecule>
          )}
        />
      </Switch>
    </div>
  );
}
