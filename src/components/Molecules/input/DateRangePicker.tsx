import React from 'react';

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface IProps {
  open: boolean;
  initialDateRange?: DateRange;
  onChange: (_dateRange: DateRange) => void;
  handleToggle: () => void;
}

export default function Picker(props: IProps) {
  return (
    // <DateRangePicker
    //   open={open}
    //   initialDateRange={initialDateRange}
    //   toggle={handleToggle}
    //   onChange={onChange}
    // />

    <h2>Not working</h2>
  );
}
