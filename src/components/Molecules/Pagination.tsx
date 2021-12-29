import React from 'react';

import Icon from '../Atoms/custom/Icon';
import Indicator from '../Atoms/custom/Indicator';

type PaginationProps = {
  totalElements: number;
  paginate: (_pnber: number) => void;
  totalPages: number;
  currentPage: number;
  rowsPerPage: number;
};
const Pagination = ({
  rowsPerPage,
  totalPages = 1,
  totalElements,
  paginate,
  currentPage = 0,
}: PaginationProps) => {
  const pageNumbers = [1];

  // if (totalElements > rowsPerPage) {
  //   for (let i = 1; i <= Math.ceil(totalElements / rowsPerPage); i++) {
  //     pageNumbers.push(i);
  //   }
  // }

  for (let i = 1; i < totalPages; i++) {
    pageNumbers.push(i + 1);
  }

  console.log(pageNumbers);

  const onNext = () => {
    paginate(currentPage + 1);
  };

  const onPrev = () => {
    paginate(currentPage - 1);
  };

  let lastPage = pageNumbers.length;

  return totalPages > 1 ? (
    <div className="py-2">
      <nav className="my-2 flex justify-end">
        <ul className="flex pl-0 rounded list-none flex-wrap justify-center">
          <button className="mr-3" onClick={onPrev} disabled={currentPage === 1}>
            <Icon name="left-arrow" size={12} stroke="none" />
          </button>
          <li className="space-x-2">
            {pageNumbers.map((number) => (
              <Indicator
                key={number}
                isCircular={false}
                isActive={currentPage === number}
                hasError={false}
                isComplete={false}
                clicked={() => paginate(number)}>
                {number}
              </Indicator>
            ))}
          </li>
          <button className="ml-3" onClick={onNext} disabled={currentPage === lastPage}>
            <Icon name="right-arrow" size={12} stroke="none" />
          </button>
        </ul>
      </nav>
    </div>
  ) : (
    <></>
  );
};
export default Pagination;
