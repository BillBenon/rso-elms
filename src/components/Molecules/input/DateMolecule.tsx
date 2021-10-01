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
};

function DateMolecule({
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
  defaultValue,
}: IProp) {
  const [dateState, setDateState] = useState({
    Day: new Date().getDate(),
    Month: new Date().getMonth() + 1,
    Year: new Date().getFullYear(),
    Hours: new Date().getHours(),
    Minutes: 0,
  });

  const dateFormat = () => {
    const months = dateState.Month < 10 ? '0' + dateState.Month : '' + dateState.Month;
    const minutes =
      dateState.Minutes < 10 ? '0' + dateState.Minutes : '' + dateState.Minutes;
    let selectedDate: string = `${dateState.Year}-${months}-${dateState.Day} ${dateState.Hours}:${minutes}:00`;
    handleChange({ name: name, value: selectedDate });
  };

  useEffect(() => {
    console.log('default', defaultValue);
    defaultValue && setDate();
  }, []);

  function setDate() {
    const dV = new Date(defaultValue || '');
    console.log('he');
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
              reverse
              defaultValue={dateState.Year.toString()}
              value={dateState.Year}
              onChange={handleDate}
              name="Year"
              width={yearWidth}
              start={startYear}
              end={endYear}
              className={yearClassName}
              disabled={yearDisabled}
              placeholder={dateState.Year.toString()}
            />
            <MonthSelect
              year={dateState.Year}
              defaultValue={dateState.Month.toString()}
              value={dateState.Month}
              onChange={handleDate}
              short={monthShort}
              caps={monthCapital}
              name="Month"
              width={monthWidth}
              numeric={monthNumeric}
              className={monthClassName}
              disabled={monthDisabled}
              placeholder={dateState.Month.toString()}
            />
            <DaySelect
              year={dateState.Year}
              month={dateState.Month}
              defaultValue={dateState.Day.toString()}
              value={dateState.Day}
              onChange={handleDate}
              name="Day"
              className={dayClassName}
              placeholder={dateState.Day.toString()}
              width={dayWidth}
              disabled={dayDisabled}
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
            />
            <MinuteSelect
              defaultValue={dateState.Minutes.toString()}
              value={dateState.Minutes}
              onChange={handleDate}
              name="Minutes"
              placeholder="Minutes"
              width={minuteWidth}
              disabled={minuteDisabled}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default DateMolecule;
