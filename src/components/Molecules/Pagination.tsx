import React from 'react';

import Indicator from '../atoms/custom/Indicator';

type PaginationProps = {
  rowsPerPage: number;
  totalRows: number;
  paginate: (_pnber: number) => void;
  currentPage: number;
};
export default function Pagination({
  rowsPerPage,
  totalRows,
  paginate,
  currentPage,
}: PaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="py-2">
      <nav className="my-2 block">
        <ul className="flex pl-0 rounded list-none flex-wrap justify-center">
          <li className="space-x-4">
            {pageNumbers.map((number) => (
              <Indicator
                key={number}
                isCircular={false}
                isActive={currentPage === number}
                hasError={false}
                hasBoldBg={true}
                isComplete={false}
                clicked={() => paginate(number)}>
                {number}
              </Indicator>
            ))}
          </li>
        </ul>
      </nav>
    </div>
  );
}
