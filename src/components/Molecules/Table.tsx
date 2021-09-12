/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import '../../styles/components/molecules/table/table.scss';

import React, { useState } from 'react';

import Icon from '../atoms/custom/Icon';
import Row from '../atoms/custom/Row';
import Pagination from './Pagination';

type TableProps = {
  data: {}[];
  hasAction: boolean;
  statusColumn?: string;
};

const Table = ({ data, hasAction, statusColumn }: TableProps) => {
  const [rowsPerPage] = useState(5);
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
      <th className="px-4 py-5 capitalize" key={key}>
        {key}
      </th>
    ));
  };

  const getRowsData = () => {
    let keys = getKeys();
    return currentRows.map((row, index) => (
      <tr key={index}>
        <Row key={index} data={row} keys={keys} statusColumn={statusColumn} />
        {hasAction ? (
          <td className="flex space-x-6 py-4">
            <span onClick={() => console.log('more')}>
              <Icon name="more" stroke="txt-secondary" fill="primary" />
            </span>
          </td>
        ) : (
          ''
        )}
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto rounded-lg text-sm">
      <table className="table-auto border-collapse font-semibold bg-main w-full m-auto">
        <thead>
          <tr className="text-left text-txt-secondary border-b border-silver">
            {getHeader()}
            {hasAction ? <th className="px-4 py-2 ">Actions</th> : ''}
          </tr>
        </thead>
        <tbody>{getRowsData()}</tbody>
      </table>
      <Pagination
        rowsPerPage={rowsPerPage}
        totalRows={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Table;
