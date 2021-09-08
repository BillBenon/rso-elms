import React from 'react';

import Badge from './Badge';

type RowProps = {
  keys: string[];
  data: any;
  isEven: boolean;
};

const Row = ({ keys, data, isEven }: RowProps) => {
  return (
    <>
      {keys.map((key) => (
        <td
          className={`px-4 py-4 ${key.toLowerCase() == 'status' ? 'text-xs' : ''}`}
          style={{ backgroundColor: `${isEven ? '#FBFAFB' : ''}` }}
          key={key}>
          {key.toLowerCase() == 'status' ? (
            <Badge badgecolor="success">{data[key]}</Badge>
          ) : (
            data[key]
          )}
        </td>
      ))}
    </>
  );
};

export default Row;
