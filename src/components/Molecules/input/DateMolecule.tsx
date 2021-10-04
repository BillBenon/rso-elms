import React, { ReactNode, useEffect, useState } from 'react';

import { ValueType } from '../../../types';
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
  hourPlaceholder?: string;
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
  padding?: number;
};

function DateMolecule({
  reverse = true,
  showDate = true,
  showTime = false,
  width,
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
  hourPlaceholder = 'Hours',
  dayDisabled = false,
  dayClassName,
  yearWidth = '28',
  monthWidth = '28',
  dayWidth = '28',
  hourWidth = '28',
  minuteWidth = '28',
  hourDisabled = false,
  minuteDisabled = false,
  padding,
  defaultValue,
}: IProp) {
  let defaultValueDate = defaultValue ? new Date(defaultValue) : new Date();

  const [dateState, setDateState] = useState({
    Day: new Date().getDate(),
    Month: new Date().getMonth() + 1,
    Year: new Date().getFullYear(),
    Hours: new Date().getHours(),
    Minutes: 0,
  });

  const dateFormat = () => {
    const months = dateState.Month < 10 ? '0' + dateState.Month : '' + dateState.Month;
    const days = dateState.Day < 10 ? '0' + dateState.Day : '' + dateState.Day;
    const minutes =
      dateState.Minutes < 10 ? '0' + dateState.Minutes : '' + dateState.Minutes;
    let selectedDate: string = `${dateState.Year}-${months}-${days} ${dateState.Hours}:${minutes}:00`;
    handleChange({ name: name, value: selectedDate });
  };

  useEffect(() => {
    defaultValue && setDate();
  }, []);

  function setDate() {
    const dV = new Date(defaultValue || '');
    setDateState((old) => ({
      ...old,
      Year: dV.getFullYear(),
      Month: dV.getMonth() + 1,
      Day: dV.getDay(),
      Hours: dV.getHours(),
      Minutes: dV.getMinutes(),
    }));
  }

  useEffect(() => {
    dateFormat();
  }, [dateState]);

  const handleDate = (e: ValueType) => {
    setDateState({ ...dateState, [e.name]: e.value });
  };

  return (
    <div className={`flex flex-col gap-2 pb-2 w-${width || 'full md:w-80'}`}>
      <ILabel size="sm" weight="medium">
        {children}
      </ILabel>
      <div className="flex gap-2">
        {showDate && (
          <>
            <YearSelect
              reverse={reverse}
              defaultValue={defaultValueDate.getFullYear().toString()}
              value={dateState.Year}
              onChange={handleDate}
              name="Year"
              width={yearWidth}
              start={startYear}
              end={endYear}
              className={yearClassName}
              disabled={yearDisabled}
              padding={padding}
              // placeholder={dateState.Year.toString()}
            />
            <MonthSelect
              year={dateState.Year}
              defaultValue={defaultValueDate.getMonth().toString()}
              value={dateState.Month}
              onChange={handleDate}
              short={monthShort}
              caps={monthCapital}
              name="Month"
              width={monthWidth}
              numeric={monthNumeric}
              className={monthClassName}
              disabled={monthDisabled}
              padding={padding}
              // placeholder={dateState.Month.toString()}
            />
            <DaySelect
              year={dateState.Year}
              month={dateState.Month}
              defaultValue={defaultValueDate.getDate().toString()}
              value={dateState.Day}
              onChange={handleDate}
              name="Day"
              className={dayClassName}
              width={dayWidth}
              disabled={dayDisabled}
              padding={padding}
            />
          </>
        )}
        {showTime && (
          <>
            <HourSelect
              defaultValue={dateState.Hours.toString()}
              value={dateState.Hours}
              onChange={handleDate}
              name="Hours"
              placeholder={hourPlaceholder}
              width={hourWidth}
              disabled={hourDisabled}
              padding={padding}
            />
            <MinuteSelect
              defaultValue={dateState.Minutes.toString()}
              value={dateState.Minutes}
              onChange={handleDate}
              name="Minutes"
              placeholder="Minutes"
              width={minuteWidth}
              disabled={minuteDisabled}
              padding={padding}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default DateMolecule;
