/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';

import { ValueType } from '../../types';
import { UserView } from '../../types/services/user.types';
import Avatar from '../Atoms/custom/Avatar';
import Button from '../Atoms/custom/Button';
import Icon from '../Atoms/custom/Icon';
import Loader from '../Atoms/custom/Loader';
import Checkbox from '../Atoms/Input/CheckBox';
import Heading from '../Atoms/Text/Heading';
import NoDataAvailable from '../Molecules/cards/NoDataAvailable';
import SearchMolecule from '../Molecules/input/SearchMolecule';

interface IRightSidebar {
  label: string;
  open: boolean;
  handleClose: () => void;
  data: UserView[];
  selectorActions?: { name: string; handleAction: (_data?: string[]) => void }[];
  dataLabel: string;
  isLoading: boolean;
}

function RightSidebar({
  label,
  open,
  handleClose,
  selectorActions,
  data,
  isLoading,
  dataLabel = '',
}: IRightSidebar) {
  const handleSearch = () => {};
  const [selected, setSelected] = useState(new Set(''));

  //handle single select
  function _handleSelect(e: ValueType<HTMLInputElement>) {
    const val = e.value?.toString(); //stringfy value
    const newSelected = new Set(Array.from(selected));
    newSelected.has(val) ? newSelected.delete(val) : newSelected.add(val);
    setSelected(newSelected);

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

    // if (handleSelect) handleSelect(Array.from(selected));
  }

  function changeSelect(id: string, status: boolean) {
    data.map((row) => {
      if (row.id) {
        // @ts-ignore
        if (row[row.id] == id) row.selected = status;
      }
      return row;
    });
  }

  useEffect(() => {
    selected.forEach((sel) => changeSelect(sel, true));
  }, [data]);

  return (
    <div
      className={`bg-main z-50 shadow min-h-screen overflow-y-auto h-full w-96 px-6 absolute right-0 top-0 sidebar-menu ${
        open ? 'block' : 'hidden'
      }`}>
      <div className="flex justify-between">
        <Heading fontSize="lg" fontWeight="semibold" className="pt-3">
          {label}
        </Heading>
        <Button styleType="text" icon onClick={() => handleClose()} className="self-end">
          <Icon name="close" fill="txt-secondary" size={18} />
        </Button>
      </div>
      <div className="pt-4">
        {selected.size > 0 && (
          <div className="rounded mb-3 py-2 bg-main flex justify-between">
            <div>
              <p className="p-2">
                <strong>{selected.size}</strong> rows selected
              </p>
            </div>
            <div className="px-4">
              {selectorActions?.map((action) => (
                <Button
                  key={action.name + Math.random()}
                  styleType="outline"
                  onClick={() => action.handleAction(Array.from(selected))}>
                  {action.name}
                </Button>
              ))}
            </div>
          </div>
        )}
        <div className="py-4">
          <SearchMolecule
            placeholder="Search students"
            handleChange={handleSearch}
            width="w-48"
          />
        </div>

        <Heading fontSize="sm" fontWeight="semibold" color="primary" className="pb-4">
          {dataLabel}
        </Heading>

        {isLoading ? (
          <Loader />
        ) : data.length === 0 ? (
          <NoDataAvailable
            title={'No data available'}
            icon="user"
            description={'Please add some data first'}
            showButton={false}
          />
        ) : (
          data.map((user, i) => (
            <div className="flex w-full items-center pb-6 gap-4" key={i}>
              <Checkbox
                checked={user.selected}
                handleChange={_handleSelect}
                name={'user'}
                value={user.id.toString()}
              />

              <Avatar
                src={user.image_url || '/images/default-pic.png'}
                size="48"
                alt=""
              />
              <Heading fontSize="sm" fontWeight="semibold" className="text-center">
                {user.first_name} {user.last_name}
              </Heading>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RightSidebar;
