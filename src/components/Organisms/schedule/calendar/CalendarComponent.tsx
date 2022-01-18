import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/components/Molecules/calendar.scss';

import moment from 'moment';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import { BigCalendarEvent } from '../../../../types/services/schedule.types';
import { DateRange } from '../../../../types/services/schedule.types';
import Button from '../../../Atoms/custom/Button';
import PopupMolecule from '../../../Molecules/Popup';
import DateRangePicker from './DateRangePicker';

type Props = {
  events: BigCalendarEvent[];
  defaultDateRange: DateRange;
  onDateChange: (_r: DateRange) => void;
  children?: React.ReactNode;
};

const localizer = momentLocalizer(moment);

export default function CalendarComponent({
  events,
  defaultDateRange,
  onDateChange,
  children,
}: Props) {
  const [isChangeRangeOpen, setisChangeRangeOpen] = useState(false);

  const handleApply = (r: DateRange) => {
    onDateChange(r);
    setisChangeRangeOpen(false);
  };

  return (
    <div>
      <div className="my-5">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <Button styleType="outline" onClick={() => setisChangeRangeOpen(true)}>
              Change date range
            </Button>
          </div>
          {children}
        </div>
      </div>

      <PopupMolecule
        open={isChangeRangeOpen}
        onClose={() => setisChangeRangeOpen(false)}
        title="Change date range">
        <DateRangePicker defaultRange={defaultDateRange} handleApply={handleApply} />
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
        date={new Date(defaultDateRange.start_date)}
        onNavigate={(_newDate, _view, _action) => {}}
      />
    </div>
  );
}
