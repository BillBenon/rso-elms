/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';

import Row from '../atoms/custom/Row';

type TableProps = {
  data: {}[];
  hasAction: boolean;
};

const Table = ({ data, hasAction }: TableProps) => {
  const getKeys = () => Object.keys(data[0]);
  const getHeader = () => {
    let keys = getKeys();
    return keys.map((key) => (
      <th className="px-4 py-2" key={key}>
        {key}
      </th>
    ));
  };

  const getRowsData = () => {
    let keys = getKeys();
    return data.map((row, index) => (
      <tr className="hover:bg-silver-400 py-4" key={index}>
        <Row key={index} data={row} keys={keys} />
        {hasAction ? (
          <td className="flex space-x-6">
            <span onClick={() => console.log('editing')}>
              {/* <Icon name="edit" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-edit text-txt-secondary w-3/4 my-1 cursor-pointer">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </span>
            <span onClick={() => console.log('more')}>
              <svg
                className="my-3 cursor-pointer"
                width="14"
                height="4"
                viewBox="0 0 14 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.4">
                  <circle cx="2.19796" cy="1.80139" r="1.38611" fill="#222222" />
                  <circle cx="11.9013" cy="1.80115" r="1.38611" fill="#222222" />
                  <circle cx="7.04991" cy="1.80115" r="1.38611" fill="#222222" />
                </g>
              </svg>
            </span>
          </td>
        ) : (
          ''
        )}
      </tr>
    ));
  };

  return (
    <div>
      <div className="overflow-x-auto m-5 rounded-lg shadow-lg text-sm">
        <table className="table-auto border-collapse w-full font-semibold">
          <thead>
            <tr className="text-left text-txt-secondary border-b border-silver-500">
              {getHeader()}
              {hasAction ? <th className="px-4 py-2 ">Actions</th> : ''}
            </tr>
          </thead>
          <tbody>
            {getRowsData()}
            {/* <tr className="hover:bg-silver-400 py-10">
              <td className="px-4 py-4">
                <div>Adam</div>
                <div className="text-txt-secondary">hello@gmail.com</div>
              </td>
              <td className="px-4 py-4">Permission name</td>
              <td className="px-4 py-4 text-xs">
                <Badge badgecolor="success">Active</Badge>
              </td>
              <td className="px-4 py-4">Location</td>
            </tr> */}
          </tbody>
        </table>
      </div>

      {/* <Paginator
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default Table;
