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
};

function DateMolecule({
  showDate = true,
  showTime = false,
  width,
  children,
  handleChange,
  name,
}: IProp) {
  const [dateState, setDateState] = useState({
    Day: new Date().getDate(),
    Month: new Date().getMonth() + 1,
    Year: new Date().getFullYear(),
    Hours: new Date().getHours(),
    Minutes: 0,
  });

  const dateFormat = () => {
    let selectedDate: string = `${dateState.Month}/${dateState.Day}/${dateState.Year} ${dateState.Hours}:${dateState.Minutes}`;
    handleChange({ name: name, value: selectedDate });
  };

  useEffect(() => {
    dateFormat();
  }, [dateState]);

  const handleDate = (e: ValueType) => {
    setDateState({ ...dateState, [e.name]: e.value });
  };

  return (
    <div className={`flex flex-col gap-3 w-${width || 'full md:w-80'}`}>
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
              placeholder="Year"
              width="28"
            />
            <MonthSelect
              year={dateState.Year}
              defaultValue={dateState.Month.toString()}
              value={dateState.Month}
              onChange={handleDate}
              short
              name="Month"
              placeholder="Month"
              width="28"
            />
            <DaySelect
              year={dateState.Year}
              month={dateState.Month}
              defaultValue={dateState.Day.toString()}
              value={dateState.Day}
              onChange={handleDate}
              name="Day"
              placeholder="Day"
              width="28"
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
              placeholder="Hours"
              width="28"
            />
            <MinuteSelect
              defaultValue={dateState.Minutes.toString()}
              value={dateState.Minutes}
              onChange={handleDate}
              name="Minutes"
              placeholder="Minutes"
              width="28"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default DateMolecule;
