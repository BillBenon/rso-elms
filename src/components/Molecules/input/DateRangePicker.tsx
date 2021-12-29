import React from 'react';
import { DateRangePicker, DateRange } from 'materialui-daterange-picker';

interface IProps {
  open: boolean;
  initialDateRange?: DateRange;
  onChange: (dateRange: DateRange) => void;
  handleToggle: () => void;
}

export default function Picker({
  open = false,
  initialDateRange,
  onChange,
  handleToggle,
}: IProps) {
  return (
    <DateRangePicker
      open={open}
      initialDateRange={initialDateRange}
      toggle={handleToggle}
      onChange={onChange}
    />
  );
}
