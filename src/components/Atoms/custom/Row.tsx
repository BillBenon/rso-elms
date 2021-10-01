import React from 'react';

import { Status, statusStyleType } from '../../../types';
import Badge from './Badge';

type RowProps = {
  keys: string[];
  data: Record<string, any>;
  statusColumn?: string;
  uniqueCol?: string | number | symbol | undefined;
  isUniqueColVisible?: boolean;
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

const Row = ({
  keys,
  data,
  statusColumn,
  uniqueCol,
  isUniqueColVisible = false,
}: RowProps) => {
  return (
    <>
      {keys.map((key) => {
        let val = data[key];
        return key !== uniqueCol ? (
          <td
            className={`px-4 py-2 ${key.toLowerCase() === statusColumn ? 'text-xs' : ''}`}
            key={key}>
            {key.toLowerCase() === statusColumn ? (
              <Badge
                badgecolor={val && statusColors[val.toLowerCase() as Status]}
                badgetxtcolor={val && statusColors[val.toLowerCase() as Status]}>
                {val}
              </Badge>
            ) : (
              val
            )}
          </td>
        ) : (
          isUniqueColVisible && (
            <td className="px-4 py-2" key={key}>
              val
            </td>
          )
        );
      })}
    </>
  );
};

export default Row;
