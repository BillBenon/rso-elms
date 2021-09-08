/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';

import Row from '../atoms/custom/Row';
import Pagination from './Pagination';

type TableProps = {
  data: {}[];
  hasAction: boolean;
};

const Table = ({ data, hasAction }: TableProps) => {
  const [rowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  //Get current rows
  const indexOfLastPost = currentPage * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  const currentRows = data.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getKeys = () => Object.keys(currentRows[0]);
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
    return currentRows.map((row, index) => (
      <tr className="hover:bg-silver-400" key={index}>
        <Row key={index} data={row} keys={keys} isEven={index % 2 === 0} />
        {hasAction ? (
          <td
            className="flex space-x-6 py-4"
            style={{ backgroundColor: `${index % 2 === 0 ? '#FBFAFB' : ''}` }}>
            <span onClick={() => console.log('more')}>
              <svg
                className="justify-center m-4 cursor-pointer"
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

      <Pagination
        rowsPerPage={rowsPerPage}
        totalRows={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />

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
