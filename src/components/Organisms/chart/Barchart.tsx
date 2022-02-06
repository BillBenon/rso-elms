import { Chart, Interval, Tooltip } from 'bizcharts';
import React from 'react';

import { IChart } from '../../../types';

export default function Barchat({ data, position }: IChart) {
  return (
    <Chart
      height={400}
      autoFit
      data={data}
      interactions={['active-region']}
      padding={[30, 30, 30, 50]}>
      <Interval position={position} />
      <Tooltip shared />
    </Chart>
  );
}
