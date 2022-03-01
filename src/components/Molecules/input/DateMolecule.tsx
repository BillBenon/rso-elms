import React, { ReactNode, useCallback, useEffect, useState } from 'react';

import { ValueType } from '../../../types';
import { formatDateToIso, formatDateToYyMmDd } from '../../../utils/date-helper';
import DaySelect from '../../Atoms/Input/date/DaySelect';
import HourSelect from '../../Atoms/Input/date/HourSelect';
import MinuteSelect from '../../Atoms/Input/date/MinuteSelect';
import MonthSelect from '../../Atoms/Input/date/MonthSelect';
import YearSelect from '../../Atoms/Input/date/YearSelect';
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
}: IProp) {
  let defaultValueDate = defaultValue ? new Date(defaultValue) : new Date();

  const [dateState, setDateState] = useState({
    Day: new Date().getDate(),
    Month: new Date().getMonth() + 1,
    Year: new Date().getFullYear(),
    Hours: new Date().getHours(),
    Minutes: '00',
  });

  const dateFormat = useCallback(() => {
    let date = `${dateState.Year}-${
      dateState.Month >= 10 ? dateState.Month : `${dateState.Month}`
    }-${dateState.Day >= 10 ? dateState.Day : `0${dateState.Day}`} ${
      dateState.Hours >= 10 ? dateState.Hours : `0${dateState.Hours}`
    }:${dateState.Minutes}:00`;

    let selectedDate: string;
    if (date_time_type) {
      selectedDate = formatDateToIso(new Date(date));
    } else {
      selectedDate = formatDateToYyMmDd(new Date(date).toString());
    }
    handleChange({ name: name, value: selectedDate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dateState.Day,
    dateState.Hours,
    dateState.Minutes,
    dateState.Month,
    dateState.Year,
  ]);

  useEffect(() => {
    dateFormat();
  }, [dateFormat]);

  useEffect(() => {
    if (defaultValue) {
      const dV = new Date(defaultValue || '');

      setDateState((old) => ({
        ...old,
        Year: dV.getFullYear(),
        Month: dV.getMonth() + 1,
        Day: dV.getDate(),
        Hours: dV.getHours(),
        Minutes: dV.getMinutes().toString(),
      }));
    }
  }, [defaultValue]);

  const handleDate = (e: ValueType) => {
    // setDateState((date) => ({ ...date, [e.name]: e.value }));
    setDateState((prevDate) => {
      return { ...prevDate, [e.name]: e.value };
    });
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
              value={dateState.Year || defaultValueDate.getFullYear()}
              onChange={handleDate}
              name="Year"
              width={yearWidth}
              start={startYear}
              end={endYear}
              className={yearClassName}
              disabled={yearDisabled}
              placeholder={'year'}
            />
            <MonthSelect
              year={dateState.Year}
              value={dateState.Month || defaultValueDate.getMonth()}
              onChange={handleDate}
              short={monthShort}
              caps={monthCapital}
              name="Month"
              width={monthWidth}
              numeric={monthNumeric}
              className={monthClassName}
              disabled={monthDisabled}
              placeholder={'month'}
            />
            <DaySelect
              year={dateState.Year}
              month={dateState.Month}
              value={dateState.Day || defaultValueDate.getDate()}
              onChange={handleDate}
              name="Day"
              className={dayClassName}
              width={dayWidth}
              disabled={dayDisabled}
              placeholder={'day'}
            />
          </div>
        )}
        {showTime && (
          <div className="flex gap-1">
            <HourSelect
              defaultValue={dateState.Hours.toString()}
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
              placeholder="mins"
              width={minuteWidth}
              disabled={minuteDisabled}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DateMolecule;
