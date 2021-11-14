import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import academicperiodStore from '../../store/administration/academicperiod.store';
import { Link as Links, ParamType } from '../../types';
import { PeriodType } from '../../types/services/intake.types';

type FilteredPeriod = {
  name: string;
  id: string | number;
  period_type: PeriodType;
  academic_name: string;
};

export default function AcademicPeriod() {
  const { url, path } = useRouteMatch();
  const { id: yearId } = useParams<ParamType>();
  const history = useHistory();
  const location = useLocation();

  const { data, isSuccess, isLoading, refetch } =
    academicperiodStore.getAcademicPeriodsByAcademicYear(yearId); // fetch periods

  let periods: FilteredPeriod[] | undefined = data?.data.data.map((period) => ({
    name: period.name,
    id: period.id,
    period_type: period.period_type,
    academic_name: period.academic_year.name,
  }));

  const list: Links[] = [
    { to: '', title: 'home' },
    { to: '/dashboard/academic-years', title: 'Academic years' },
    { to: `${url}`, title: 'Academic period' },
  ];

  // re fetch data whenever user come back on this page
  useEffect(() => {
    if (location.pathname === path || location.pathname === `${path}/`) {
      refetch();
    }
  }, [location]);

  return (
    <main>
      <section>
        <BreadCrumb list={list} />
      </section>
      {periods && periods.length > 0 && (
        <section>
          <TableHeader
            title={`${
              data?.data.data[0].academic_year.name
                ? `${data?.data.data[0].academic_year.name} / academic period`
                : 'academic period'
            }`}
            totalItems={periods.length || 0}
            showSearch={false}
          />
        </section>
      )}
      <section>
        {isLoading && <Loader />}
        {periods && periods.length > 0 && isSuccess ? (
          <Table<FilteredPeriod>
            hide={['id']}
            statusColumn="status"
            data={periods}
            uniqueCol={'id'}
          />
        ) : isSuccess && periods?.length === 0 ? (
          <NoDataAvailable
            icon="program"
            buttonLabel="Add academic period "
            title="No academic period available"
            handleClick={() => {
              history.push(`/dashboard/academic-years/${yearId}/period/add`);
            }}
            description="You might have forgotten to add the academic period these academic year will have! Add some"
          />
        ) : null}
      </section>
    </main>
  );
}
