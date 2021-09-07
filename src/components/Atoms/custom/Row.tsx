import React from 'react';

import Badge from './Badge';

type RowProps = {
  keys: string[];
  data: any;
};

const Row = ({ keys, data }: RowProps) => {
  return (
    <>
      {keys.map((key) => (
        <td
          className={`px-4 py-4 ${key.toLowerCase() == 'status' ? 'text-xs' : ''}`}
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
