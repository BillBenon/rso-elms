import React from 'react';

import { Status, statusStyleType } from '../../../types';
import Badge from './Badge';

type RowProps = {
  keys: string[];
  data: Record<string, any>;
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
      {keys.map((key) => {
        let val = data[key];
        return (
          <td
            className={`px-4 py-2 ${key.toLowerCase() === statusColumn ? 'text-xs' : ''}`}
            key={key}>
            {key.toLowerCase() === statusColumn ? (
              <Badge badgecolor={statusColors[val.toLowerCase() as Status] || ''}>
                {val}
              </Badge>
            ) : (
              val
            )}
          </td>
        );
      })}
    </>
  );
};

export default Row;
