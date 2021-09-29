/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import '../../../styles/components/Molecules/table/table.scss';

import React, { useState } from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import Row from '../../Atoms/custom/Row';
import Checkbox from '../../Atoms/Input/CheckBox';
import Pagination from '../Pagination';
import Tooltip from '../Tooltip';

interface Selected {
  selected?: boolean;
}

interface TableProps<T> {
  data: (Selected & T)[];
  uniqueCol?: keyof T;
  actions?: { name: string; handleAction: (_data?: T[keyof T]) => void }[];
  handleClick?: () => void;
  statusColumn?: string;
  rowsPerPage?: number;
  handleSelect?: (_selected: string[] | null) => void;
}

export function Table<T>({
  uniqueCol,
  data,
  actions,
  statusColumn,
  rowsPerPage = 10,
  handleSelect,
}: TableProps<T>) {
  const [rowsOnPage] = useState(rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  //Get current rows
  const indexOfLastRow = currentPage * rowsOnPage;
  const indexOfFirstRow = indexOfLastRow - rowsOnPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  function _handleSelect(e: ValueType<HTMLInputElement>) {
    if (handleSelect) handleSelect(e.value ? [e.value + ''] : null);
  }

  const getKeys = () => Object.keys(currentRows[0]);
  const getHeader = () => {
    let keys = getKeys();
    // eslint-disable-next-line no-undef
    let header: JSX.Element[] = [];

    header.push(
      <th className="checkbox-tb">
        {uniqueCol && (
          <Checkbox
            handleChange={console.log}
            name={uniqueCol + ''}
            value={'all'}></Checkbox>
        )}
      </th>,
    );

    const dynamicHeaders = keys.map((key) => (
      <th className="px-4 py-5 capitalize" key={key}>
        {key}
      </th>
    ));

    header.push(...dynamicHeaders);

    return header;
  };

  const getRowsData = () => {
    let keys = getKeys();

    return currentRows.map((row, index) => (
      <tr key={index}>
        <td className="checkbox-tb">
          {uniqueCol && (
            <Checkbox
              checked={row.selected}
              handleChange={_handleSelect}
              name={uniqueCol + ''}
              value={row[uniqueCol] + ''}></Checkbox>
          )}
        </td>

        <Row key={index} data={row} keys={keys} statusColumn={statusColumn} />
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
