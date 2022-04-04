import moment from 'moment';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';

import { ValueType } from '../../../types';
import { formatDateToIso, formatDateToYyMmDd } from '../../../utils/date-helper';
import DaySelect from '../../Atoms/Input/date/DaySelect';
import HourSelect from '../../Atoms/Input/date/HourSelect';
import MinuteSelect from '../../Atoms/Input/date/MinuteSelect';
import MonthSelect from '../../Atoms/Input/date/MonthSelect';
import YearSelect from '../../Atoms/Input/date/YearSelect';
import Error from '../../Atoms/Text/Error';
import ILabel from '../../Atoms/Text/ILabel';

type IProp = {
  showDate?: boolean;
  showTime?: boolean;
  width?: string;
  handleChange: (_value: ValueType) => void;
  name: string;
  children: ReactNode;
  startYear?: number;
  endYear?: number;
  yearClassName?: string;
  yearDisabled?: boolean;
  monthNumeric?: boolean;
  monthShort?: boolean;
  monthCapital?: boolean;
  monthDisabled?: boolean;
  monthClassName?: string;
  dayDisabled?: boolean;
  dayClassName?: string;
  yearWidth?: string;
  monthWidth?: string;
  dayWidth?: string;
  hourWidth?: string;
  minuteWidth?: string;
  hourDisabled?: boolean;
  minuteDisabled?: boolean;
  defaultValue?: string;
  reverse?: boolean;
  date_time_type?: boolean;
  breakToNextLine?: boolean;
  error?: string;
};

function DateMolecule({
  reverse = true,
  showDate = true,
  showTime = false,
  width = '60 md:w-80',
  children,
  handleChange,
  name,
  startYear,
  endYear,
  yearClassName,
  yearDisabled = false,
  monthNumeric = false,
  monthShort = true,
  monthCapital = false,
  monthDisabled = false,
  monthClassName,
  dayDisabled = false,
  dayClassName,
  yearWidth = '28',
  monthWidth = '28',
  dayWidth = '28',
  hourWidth = '28',
  minuteWidth = '28',
  hourDisabled = false,
  minuteDisabled = false,
  defaultValue,
  date_time_type = true,
  breakToNextLine = false,
  error = '',
}: IProp) {
  const [dateState, setDateState] = useState({
    Year: moment().year(),
    Month: moment().month() + 1,
    Day: `${moment().date()}`,
    Hours: `${moment().hours()}`,
    Minutes: `${moment().minutes()}`,
  });

  const dateFormat = useCallback(() => {
    let date = moment(
      `${dateState.Year}-${dateState.Month}-${dateState.Day} ${dateState.Hours}:${dateState.Minutes}:00`,
    ).format('YYYY-MM-DD hh:mm:ss');

    let selectedDate: string;
    if (date_time_type) {
      selectedDate = formatDateToIso(date);
    } else {
      selectedDate = formatDateToYyMmDd(date);
    }
    handleChange({ name: name, value: selectedDate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dateState.Day,
    dateState.Hours,
    dateState.Minutes,
    dateState.Month,
    dateState.Year,
    date_time_type,
    name,
  ]);

  useEffect(() => {
    dateFormat();
  }, [dateFormat]);

  const initiateDate = useCallback(() => {
    const dV = moment(
      defaultValue === '' || defaultValue === null ? undefined : defaultValue,
    );
    setDateState((old) => ({
      ...old,
      Year: dV.year(),
      Month: dV.month() + 1,
      Day: dV.date() < 10 ? `0${dV.date()}` : `${dV.date()}`,
      Hours: dV.hours() < 10 ? `0${dV.hours()}` : `${dV.hours()}`,
      Minutes: dV.minutes() < 10 ? `0${dV.minutes()}` : `${dV.minutes()}`,
    }));
  }, [defaultValue]);

  useEffect(() => {
    initiateDate();
  }, [initiateDate]);

  const handleDate = (e: ValueType) => {
    setDateState({ ...dateState, [e.name]: e.value });
  };

  return (
    <div className={`flex flex-col gap-2 pb-3 w-${width || 'full md:w-80'}`}>
      <ILabel size="sm" weight="medium">
        {children}
      </ILabel>
      <div className={`flex ${breakToNextLine && 'flex-col gap-4'} gap-2`}>
        {showDate && (
          <div className="flex gap-2">
            <YearSelect
              reverse={reverse}
              value={dateState.Year}
              onChange={handleDate}
              name="Year"
              width={yearWidth}
              start={startYear}
              end={endYear}
              className={yearClassName}
              disabled={yearDisabled}
              placeholder={'Year'}
            />
            <MonthSelect
              year={dateState.Year}
              value={dateState.Month}
              onChange={handleDate}
              short={monthShort}
              caps={monthCapital}
              name="Month"
              width={monthWidth}
              numeric={monthNumeric}
              className={monthClassName}
              disabled={monthDisabled}
              placeholder={'Month'}
            />
            <DaySelect
              year={dateState.Year}
              month={dateState.Month}
              value={dateState.Day}
              onChange={handleDate}
              name="Day"
              className={dayClassName}
              width={dayWidth}
              disabled={dayDisabled}
              placeholder={'Day'}
            />
          </div>
        )}
        {showTime && (
          <div className="flex gap-1">
            <HourSelect
              value={dateState.Hours}
              onChange={handleDate}
              name="Hours"
              width={hourWidth}
              disabled={hourDisabled}
              placeholder={'hrs'}
            />
            <MinuteSelect
              value={dateState.Minutes}
              onChange={handleDate}
              name="Minutes"
              width={minuteWidth}
              disabled={minuteDisabled}
              placeholder="mins"
            />
          </div>
        )}
      </div>
      <Error>{error && error}</Error>
    </div>
  );
}

export default DateMolecule;
