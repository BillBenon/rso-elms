import React from 'react';

import { statusStyleType } from '../../../types';
import Badge from './Badge';

type RowProps = {
  keys: string[];
  data: {};
  statusColumn?: string;
};

const statusColors: statusStyleType = {
  pending: 'warning',
  ongoing: 'warning',
  complete: 'success',
  active: 'success',
  inactive: 'error',
  suspended: 'error',
  cancelled: 'error',
};

const Row = ({ keys, data, statusColumn }: RowProps) => {
  return (
    <>
      {keys.map((key) => (
        <td
          className={`px-4 py-2 ${key.toLowerCase() === statusColumn ? 'text-xs' : ''}`}
          key={key}>
          {key.toLowerCase() === statusColumn ? (
            <Badge badgecolor={statusColors[data[key].toLowerCase()]}>{data[key]}</Badge>
          ) : (
            data[key]
          )}
        </td>
      ))}
    </>
  );
};

export default Row;
