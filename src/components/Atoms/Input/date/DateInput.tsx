import React, { useState } from 'react';

import { ValueType } from '../../../../types';
import DaySelect from './daySelect';
import MonthSelect from './monthSelect';
import YearSelect from './yearSelect';

const DateInput = () => {
  const [dateState, setDateState] = useState({
    selectedDay: 1,
    selectedMonth: 0,
    selectedYear: '',
  });

  return (
    <>
      {/* <!-- yearContainer --> */}
      <div className="classes">
        {/* <!-- year --> */}
        <YearSelect
          value={dateState.selectedYear}
          onChange={(e: ValueType) =>
            setDateState({ ...dateState, selectedYear: e.value })
          }
          name="Year"
        />
      </div>

      {/* <!-- monthContainer --> */}
      <div className="classes">
        {/* <!-- month --> */}
        <MonthSelect
          year={0}
          value={dateState.selectedMonth}
          onChange={
            (e: ValueType) => console.log(e)
            // setDateState({ ...dateState, selectedMonth: e.value })
          }
          name="Month"
        />
      </div>

      {/* <!-- dayContainer --> */}
      <div className="classes">
        {/* <!-- day --> */}
        <DaySelect
          year={0}
          month={0}
          value={dateState.selectedDay}
          onChange={(e: ValueType) =>
            setDateState({ ...dateState, selectedDay: e.value })
          }
          name="Day"
        />
      </div>
    </>
  );
};

export default DateInput;
