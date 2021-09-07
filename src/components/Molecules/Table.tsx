import React from 'react';

import Badge from '../atoms/custom/Badge';

const Table = () => {
  return (
    <div>
      <div className="overflow-x-auto m-5 rounded-lg shadow-lg">
        <table className="table-auto border-collapse w-full font-semibold">
          <thead>
            <tr
              className="text-left text-txt-secondary border-b"
              style={{ fontSize: '0.9674rem' }}>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2 ">Permissions</th>
              <th className="px-4 py-2 ">Status</th>
              <th className="px-4 py-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray py-10">
              <td className="px-4 py-4">
                <div>Adam</div>
                <div className="text-txt-secondary">hello@gmail.com</div>
              </td>
              <td className="px-4 py-4">Permission name</td>
              <td className="px-4 py-4">
                <Badge badgecolor="success">Active</Badge>
              </td>
              <td>
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="14"
                  height="24"
                  xmlnsXlink="http://www.w3.org/1999/xlink">
                  <path
                    d="M46,18.23V45.79H4V10H25.65V7H2.5A1.5,1.5,0,0,0,1,8.52V47.29a1.5,1.5,0,0,0,1.5,1.5h45a1.5,1.5,0,0,0,1.5-1.5V18.23Z"
                    fill="#000000"></path>
                  <path
                    d="M16.51,27.38l-2,7.68A1.48,1.48,0,0,0,15,36.5a1.5,1.5,0,0,0,1.05.43,1.39,1.39,0,0,0,.4-.06L24,34.76a1.5,1.5,0,0,0,.82-.59L47.58,10.39a1.52,1.52,0,0,0,0-2.08L42,2.52a1.55,1.55,0,0,0-2.17,0l-22.95,24A1.48,1.48,0,0,0,16.51,27.38Zm2.88.85L40.94,5.72l3.48,3.63L22.73,32l-4.63,1.3Z"
                    fill="#000000"></path>
                </svg>
                <svg
                  width="14"
                  height="4"
                  viewBox="0 0 14 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.4">
                    <circle cx="2.19796" cy="1.80139" r="1.38611" fill="#222222" />
                    <circle cx="11.9013" cy="1.80115" r="1.38611" fill="#222222" />
                    <circle cx="7.04991" cy="1.80115" r="1.38611" fill="#222222" />
                  </g>
                </svg>
              </td>
            </tr>
            <tr className="hover:bg-gray py-4">
              <td className="px-4 py-4">
                <div>Lori</div>
                <div className="text-txt-secondary">hello@gmail.com</div>
              </td>
              <td className="px-4 py-4">Permission name</td>
              <td className="px-4 py-4">
                <Badge badgecolor="error">Suspended</Badge>
              </td>
              <td>
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="14"
                  height="24"
                  xmlnsXlink="http://www.w3.org/1999/xlink">
                  <path
                    d="M46,18.23V45.79H4V10H25.65V7H2.5A1.5,1.5,0,0,0,1,8.52V47.29a1.5,1.5,0,0,0,1.5,1.5h45a1.5,1.5,0,0,0,1.5-1.5V18.23Z"
                    fill="#000000"></path>
                  <path
                    d="M16.51,27.38l-2,7.68A1.48,1.48,0,0,0,15,36.5a1.5,1.5,0,0,0,1.05.43,1.39,1.39,0,0,0,.4-.06L24,34.76a1.5,1.5,0,0,0,.82-.59L47.58,10.39a1.52,1.52,0,0,0,0-2.08L42,2.52a1.55,1.55,0,0,0-2.17,0l-22.95,24A1.48,1.48,0,0,0,16.51,27.38Zm2.88.85L40.94,5.72l3.48,3.63L22.73,32l-4.63,1.3Z"
                    fill="#000000"></path>
                </svg>
                <svg
                  width="14"
                  height="4"
                  viewBox="0 0 14 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.4">
                    <circle cx="2.19796" cy="1.80139" r="1.38611" fill="#222222" />
                    <circle cx="11.9013" cy="1.80115" r="1.38611" fill="#222222" />
                    <circle cx="7.04991" cy="1.80115" r="1.38611" fill="#222222" />
                  </g>
                </svg>
              </td>
            </tr>
            <tr className="hover:bg-gray  border-gray-200">
              <td className="px-4 py-4">
                <div>Chris</div>
                <div className="text-txt-secondary">hello@gmail.com</div>
              </td>
              <td className="px-4 py-4">Permission name</td>
              <td className="px-4 py-4">
                <Badge badgecolor="warning">Pending</Badge>
              </td>
              <td>
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="14"
                  height="24"
                  xmlnsXlink="http://www.w3.org/1999/xlink">
                  <path
                    d="M46,18.23V45.79H4V10H25.65V7H2.5A1.5,1.5,0,0,0,1,8.52V47.29a1.5,1.5,0,0,0,1.5,1.5h45a1.5,1.5,0,0,0,1.5-1.5V18.23Z"
                    fill="#000000"></path>
                  <path
                    d="M16.51,27.38l-2,7.68A1.48,1.48,0,0,0,15,36.5a1.5,1.5,0,0,0,1.05.43,1.39,1.39,0,0,0,.4-.06L24,34.76a1.5,1.5,0,0,0,.82-.59L47.58,10.39a1.52,1.52,0,0,0,0-2.08L42,2.52a1.55,1.55,0,0,0-2.17,0l-22.95,24A1.48,1.48,0,0,0,16.51,27.38Zm2.88.85L40.94,5.72l3.48,3.63L22.73,32l-4.63,1.3Z"
                    fill="#000000"></path>
                </svg>
                <svg
                  width="14"
                  height="4"
                  viewBox="0 0 14 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.4">
                    <circle cx="2.19796" cy="1.80139" r="1.38611" fill="#222222" />
                    <circle cx="11.9013" cy="1.80115" r="1.38611" fill="#222222" />
                    <circle cx="7.04991" cy="1.80115" r="1.38611" fill="#222222" />
                  </g>
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <Paginator
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default Table;
