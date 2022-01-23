import React, { useState } from 'react';

import Heading from '../../components/Atoms/Text/Heading';
import CalendarComponent from '../../components/Organisms/schedule/calendar/CalendarComponent';
import { BigCalendarEvent, DateRange } from '../../types/services/schedule.types';
import { getWeekBorderDays } from '../../utils/date-helper';

export default function StudentCalendar() {
  const [dateRange, setdateRange] = useState<DateRange>({
    start_date: getWeekBorderDays().monday,
    end_date: getWeekBorderDays().sunday,
  });

  const handleApplyDateRange = (r: DateRange) => {
    setdateRange(r);
    // refetch();
  };

  const events: BigCalendarEvent[] = [];

  return (
    <div>
      <CalendarComponent
        events={events}
        defaultDateRange={dateRange}
        onDateChange={handleApplyDateRange}>
        <Heading fontSize="lg" fontWeight="semibold">
          {`${new Date(dateRange.start_date).toLocaleDateString()} - ${new Date(
            dateRange.end_date,
          ).toLocaleDateString()}`}
        </Heading>
      </CalendarComponent>
    </div>
  );
}
