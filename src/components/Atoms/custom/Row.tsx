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
  initial: 'warning',
  closed: 'error',
  complete: 'success',
  active: 'success',
  inactive: 'error',
  suspended: 'error',
  cancelled: 'error',
  started: 'success',
};

const Row = ({ keys, data, statusColumn }: RowProps) => {
  return (
    <>
      {keys.map((key) => {
        let val = data[key];
        return (
          <td
            className={`px-4 py-2 ${key.toLowerCase() === statusColumn ? 'text-xs' : ''}`}
            key={key + Math.random() * 16}>
            {key.toLowerCase() === statusColumn ? (
              <Badge
                badgecolor={val && statusColors[val.toLowerCase() as Status]}
                badgetxtcolor={val && statusColors[val.toLowerCase() as Status]}>
                {val || '----'}
              </Badge>
            ) : (
              val || '----'
            )}
          </td>
        );
      })}
    </>
  );
};

export default Row;
