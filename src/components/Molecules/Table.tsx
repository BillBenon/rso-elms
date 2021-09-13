/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import '../../styles/components/Molecules/table/table.scss';

import React, { useState } from 'react';

import Icon from '../Atoms/custom/Icon';
import Row from '../Atoms/custom/Row';
import Pagination from './Pagination';

type TableProps = {
  data: {}[];
  hasAction: boolean;
  statusColumn?: string;
  rowsPerPage?: number;
};

const Table = ({ data, hasAction, statusColumn, rowsPerPage = 10 }: TableProps) => {
  const [rowsOnPage] = useState(rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  //Get current rows
  const indexOfLastPost = currentPage * rowsOnPage;
  const indexOfFirstPost = indexOfLastPost - rowsOnPage;
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
          <td className="flex space-x-6">
            <span onClick={() => console.log('editing')}>
              <Icon name="edit" stroke="primary" />
            </span>
            <span onClick={() => console.log('more')}></span>
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
        rowsPerPage={rowsOnPage}
        totalRows={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Table;
