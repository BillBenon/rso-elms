import React from 'react';

import Indicator from '../atoms/custom/Indicator';

type PaginationProps = {
  rowsPerPage: number;
  totalRows: number;
  // eslint-disable-next-line no-unused-vars
  paginate: (pnber: number) => void;
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
      <div>
        <p className="text-sm text-txt-secondary text-center mb-3 font-semibold">
          Showing
          <span> {currentPage * rowsPerPage - 10} </span>
          to
          <span> {currentPage * rowsPerPage} </span>
          of
          <span> {totalRows} </span>
          results
        </p>
      </div>
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap justify-center">
          <li className="space-x-2">
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
              //   <a
              //     key={number}
              //     onClick={() => {
              //       paginate(number);
              //     }}
              //     href="#"
              //     className={
              //       currentPage === number
              //         ? 'bg-blue border-red-300 text-red-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
              //         : 'bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
              //     }>
              //     {number}
              //   </a>
            ))}
          </li>
        </ul>
      </nav>
    </div>
  );
}
