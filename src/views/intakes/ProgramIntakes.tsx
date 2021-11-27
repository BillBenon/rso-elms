import React from 'react';
import { useParams, useRouteMatch } from 'react-router';

import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { intakeStore } from '../../store/administration/intake.store';
import { Link } from '../../types';

interface Param {
  id: string;
}

function ProgramIntakes() {
  const { id } = useParams<Param>();
  const { url } = useRouteMatch();

  const list: Link[] = [
    { to: '/dashboard/instructor', title: 'Dashboard' },
    { to: '/dashboard/instructor', title: 'Programs' },
    { to: `${url}`, title: 'Intakes' },
  ];

  const { data, isLoading } = intakeStore.getIntakesByProgram(id);
  const intakes = data?.data.data || [];

  return (
    <div>
      <BreadCrumb list={list} />
      <TableHeader title="Intakes" totalItems={`${intakes.length}`} />

      <section className="flex flex-wrap justify-start gap-4 mt-2">
        {isLoading ? (
          <Loader />
        ) : intakes.length === 0 ? (
          <NoDataAvailable
            fill={false}
            icon="academy"
            title={'No intake available'}
            description="No intakes available for this program. contact the admin to add some"
          />
        ) : (
          intakes.map((intake) => (
            <div key={intake.intake.code + Math.random() * 10} className="p-1 mt-3">
              {/* <Tooltip
                key={intake.intake.code + Math.random() * 10}
                trigger={ */}
              <div className="p-1 mt-3">
                <CommonCardMolecule className="cursor-pointer" data={intake.intake} />
              </div>
              {/* }
                open>
                <div className="w-96">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <Heading color="txt-secondary" fontSize="sm">
                        Total Students Enrolled
                      </Heading>
                      <Heading fontSize="sm" fontWeight="semibold">
                        {intake.intake.total_num_students || 0}
                      </Heading>
                    </div>
                  </div>
                </div>
              </Tooltip> */}
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default ProgramIntakes;
