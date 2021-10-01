/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import '../../../styles/components/Molecules/table/table.scss';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import Row from '../../Atoms/custom/Row';
import Checkbox from '../../Atoms/Input/CheckBox';
import DropDown from '../../Atoms/Input/Dropdown';
import Pagination from '../Pagination';
import Tooltip from '../Tooltip';

interface Selected {
  selected?: boolean;
}

interface TableProps<T> {
  data: (T & Selected)[];
  uniqueCol?: keyof T;
  hide?: (keyof T)[];
  actions?: { name: string; handleAction: (_data?: T[keyof T]) => void }[];
  handleClick?: () => void;
  statusColumn?: string;
  rowsPerPage?: number;
  handleSelect?: (_selected: string[] | null) => void;
}

export function Table<T>({
  uniqueCol,
  hide = [],
  data,
  actions,
  statusColumn,
  rowsPerPage = 10,
  handleSelect,
}: TableProps<T>) {
  const [rowsOnPage] = useState(rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const countsToDisplay = [
    { label: '25', value: '25' },
    { label: '50', value: '50' },
    { label: '50', value: '50' },
  ];

  //Get current rows
  const indexOfLastRow = currentPage * rowsOnPage;
  const indexOfFirstRow = indexOfLastRow - rowsOnPage;
  const [currentRows, setCurrentRows] = useState(
    data.slice(indexOfFirstRow, indexOfLastRow),
  );
  const [selected, setSelected] = useState(new Set(''));

  const rowsToHide: (keyof (T & Selected))[] = ['selected'];
  hide.length > 0 && rowsToHide.push(...hide); // add unique col to elements that gonna be hidden

  useEffect(() => {
    setCurrentRows(data.slice(indexOfFirstRow, indexOfLastRow));
  }, [currentPage]);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // console.log(data);

  // handle select all
  function _handleSelectAll() {
    // when set is full we uncheck
    if (selected.size === currentRows.length) {
      setSelected(new Set('')); // set set to empty, since we unselected each and everything

      _.map(currentRows, 'id').forEach((val) => {
        changeSelect(val, false); // unmark all current rows in table as selected
      });

      if (handleSelect) handleSelect([]);
    } else {
      const newSelRow = new Set('');

      // else when set is not full we add  all ids
      _.map(currentRows, 'id').forEach((val) => {
        changeSelect(val, true); // mark current rows in table as selected
        newSelRow.add(val + '');
      });
      setSelected(new Set([...newSelRow])); // add new selected list in selected state
      if (handleSelect) handleSelect(Array.from(newSelRow));
    }
  }

  //handle single select
  function _handleSelect(e: ValueType<HTMLInputElement>) {
    const val = e.value?.toString(); //stringfy value

    // if value exist we chop it
    if (val && selected.has(val)) {
      setSelected((prev) => {
        prev.delete(val);
        return prev;
      });
      changeSelect(val, false);
    }
    // else we add it
    else if (val) {
      setSelected((prev) => prev.add(val));
      changeSelect(val, true);
    }

    if (handleSelect) handleSelect(Array.from(selected));
  }

  function changeSelect(id: string, status: boolean) {
    const cr = currentRows.map((row) => {
      if (uniqueCol) {
        // @ts-ignore
        if (row[uniqueCol] == id) row.selected = status;
      }
      return row;
    });
    setCurrentRows(cr);
  }

  function handleCountSelect(e: ValueType) {
    console.log(e);
  }

  const getKeys = () => {
    const keys = Object.keys(currentRows[0]) as (keyof (T & Selected))[];
    return keys.filter((item) => !rowsToHide.includes(item));
  };

  const getHeader = () => {
    let keys = getKeys();
    // eslint-disable-next-line no-undef
    let header: JSX.Element[] = [];

    header.push(
      <th className="checkbox-tb">
        {uniqueCol && (
          <Checkbox
            checked={selected.size === currentRows.length}
            handleChange={() => _handleSelectAll()}
            name={uniqueCol + ''}
            value={'all'}></Checkbox>
        )}
      </th>,
    );

    /**
     * show dynamic headers, but exclude keys that are marked as to be hidden, in @link row
     */
    const dynamicHeaders = keys.map((key) =>
      !rowsToHide.includes(key) ? (
        <th className="px-4 py-5 capitalize" key={key as string}>
          {key}
        </th>
      ) : (
        <></>
      ),
    );

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

        <Row key={index} data={row} keys={keys as string[]} statusColumn={statusColumn} />
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
      <div className="h-8">
        {selected.size > 0 && (
          <p className="py-2">
            <strong>{selected.size}</strong> rows selected
          </p>
        )}
      </div>
      <table className="table-auto border-collapse font-medium bg-main w-full m-auto">
        <thead>
          <tr className="text-left text-txt-secondary border-b border-silver">
            {getHeader()}
            {actions && actions.length > 0 ? <th className="px-4 py-2 ">Actions</th> : ''}
          </tr>
        </thead>
        <tbody>{getRowsData()}</tbody>
      </table>
      <div className="flex justify-between mt-4 mb-5">
        <div className="flex items-center py-2">
          <span>Show</span>
          <DropDown
            className="px-3"
            width="30"
            defaultValue={countsToDisplay[0]}
            handleChange={handleCountSelect}
            name="rowstoDisplay"
            options={countsToDisplay}></DropDown>
          <span>Entries</span>
        </div>
        <Pagination
          rowsPerPage={rowsOnPage}
          totalRows={data.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Table;
