import React, { ReactNode, useState } from 'react';

import { ValueType } from '../../../types';
import DaySelect from '../../Atoms/Input/date/DaySelect';
import HourSelect from '../../Atoms/Input/date/HourSelect';
import MinuteSelect from '../../Atoms/Input/date/MinuteSelect';
import MonthSelect from '../../Atoms/Input/date/MonthSelect';
import SecondSelect from '../../Atoms/Input/date/SecondSelect';
import YearSelect from '../../Atoms/Input/date/YearSelect';
import ILabel from '../../Atoms/Text/ILabel';

type IProp = {
  showDate?: boolean;
  showTime?: boolean;
  width?: string;
  children: ReactNode;
};

const DateMolecule = ({ showDate = true, showTime = false, width, children }: IProp) => {
  const [dateState, setDateState] = useState({
    Day: new Date().getDate(),
    Month: new Date().getMonth(),
    Year: new Date().getFullYear(),
    Hours: new Date().getHours(),
    Minutes: new Date().getMinutes(),
    Seconds: new Date().getSeconds(),
  });

  const handleChange = (e: ValueType) => {
    setDateState({
      ...dateState,
      [e.name]: e.value,
    });
  };

  return (
    <div className={`flex flex-col gap-3 w-${width || 'full md:w-80'}`}>
      <ILabel weight="bold">{children}</ILabel>
      <div className="flex gap-2">
        {showDate && (
          <>
            <YearSelect
              reverse
              value={dateState.Year}
              onChange={handleChange}
              name="Year"
              placeholder="Year"
              width="28"
            />
            <MonthSelect
              year={dateState.Year}
              value={dateState.Month}
              onChange={handleChange}
              short
              name="Month"
              placeholder="Month"
              width="28"
            />
            <DaySelect
              year={dateState.Year}
              month={dateState.Month}
              value={dateState.Day}
              onChange={handleChange}
              name="Day"
              placeholder="Day"
              width="28"
            />
          </>
        )}
        {showTime && (
          <>
            <HourSelect
              value={dateState.Hours}
              onChange={handleChange}
              name="Hours"
              placeholder="Hours"
              width="28"
            />
            <MinuteSelect
              value={dateState.Minutes}
              onChange={handleChange}
              name="Minutes"
              placeholder="Minutes"
              width="28"
            />
            <SecondSelect
              value={dateState.Seconds}
              onChange={handleChange}
              name="Seconds"
              placeholder="Seconds"
              width="28"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DateMolecule;
