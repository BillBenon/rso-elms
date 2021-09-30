/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import '../../../styles/components/Molecules/table/table.scss';

import React, { useState } from 'react';

import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import Row from '../../Atoms/custom/Row';
import Pagination from '../Pagination';
import Tooltip from '../Tooltip';

interface TableProps<T> {
  data: T[];
  uniqueCol?: keyof T;
  isUniqueColVisible?: boolean;
  actions?: { name: string; handleAction: (_data?: T[keyof T]) => void }[];
  handleClick?: () => void;
  statusColumn?: string;
  rowsPerPage?: number;
}

export function Table<T>({
  uniqueCol,
  data,
  actions,
  statusColumn,
  rowsPerPage = 10,
}: TableProps<T>) {
  const [rowsOnPage] = useState(rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  //Get current rows
  const indexOfLastRow = currentPage * rowsOnPage;
  const indexOfFirstRow = indexOfLastRow - rowsOnPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getKeys = () => Object.keys(currentRows[0]);
  const getHeader = () => {
    let keys = getKeys();

    return keys.map(
      (key) =>
        key !== uniqueCol && (
          <th className="px-4 py-5 capitalize" key={key}>
            {key}
          </th>
        ),
    );
  };

  const getRowsData = () => {
    let keys = getKeys();

    return currentRows.map((row, index) => (
      <tr key={index}>
        <Row
          key={index}
          data={row}
          keys={keys}
          statusColumn={statusColumn}
          uniqueCol={uniqueCol}
        />
        {actions && actions.length > 0 ? (
          <td className="flex space-x-6 cursor-pointer">
            <Tooltip
              on="click"
              trigger={
                <span onClick={() => {}}>
                  <Icon name="more" stroke={'txt-secondary'} fill={'txt-secondary'} />
                </span>
              }
              open>
              <ul>
                {actions.map(({ name, handleAction }) => (
                  <li className="hover:bg-secondary" key={name}>
                    <Button
                      styleType="text"
                      hoverStyle="no-underline"
                      color="txt-primary"
                      onClick={() => handleAction(uniqueCol && row[uniqueCol])}>
                      {name}
                    </Button>
                  </li>
                ))}
              </ul>
            </Tooltip>
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
            {actions && actions.length > 0 ? <th className="px-4 py-2 ">Actions</th> : ''}
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
}

export default Table;
