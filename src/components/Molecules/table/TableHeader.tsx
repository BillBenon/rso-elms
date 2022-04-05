import React from 'react';

import { ValueType } from '../../../types';
import Badge from '../../Atoms/custom/Badge';
import Icon from '../../Atoms/custom/Icon';
import Heading from '../../Atoms/Text/Heading';
import SearchMolecule from '../input/SearchMolecule';

type ITableHeader = {
  title?: string;
  totalItems?: number | string;
  children?: React.ReactNode;
  showSearch?: boolean;
  showBadge?: boolean;
  usePadding?: boolean;
  handleSearch?: (_e: ValueType) => void;
};

export default function TableHeader({
  title,
  totalItems,
  handleSearch,
  children,
  showBadge = true,
  showSearch = true,
  usePadding = true,
}: ITableHeader) {
  const handleChange = (e: ValueType) => {
    if (showSearch && handleSearch) {
      handleSearch(e);
    }
  };

  return (
    <div className={`pt-4 ${usePadding && 'pb-6'}`}>
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex gap-2 items-center">
          <Heading fontSize="2xl" fontWeight="bold">
            {title}
          </Heading>

          {showBadge && (
            <Badge
              badgetxtcolor="main"
              badgecolor="primary"
              fontWeight="normal"
              className="h-6 flex justify-center items-center">
              {totalItems}
            </Badge>
          )}
        </div>
        {showSearch && (
          <div className="flex flex-wrap justify-start items-center">
            <SearchMolecule handleChange={handleChange} />
            <button aria-label="filter" className="border p-0 rounded-md mx-2">
              <Icon name="filter" />
            </button>
          </div>
        )}

        <div className="flex gap-3">{children}</div>
      </div>
    </div>
  );
}
