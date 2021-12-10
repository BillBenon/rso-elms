import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Tabs, Tab } from '../../components/Molecules/tabs/tabs';
import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import academicperiodStore from '../../store/administration/academicperiod.store';
import { classStore } from '../../store/administration/class.store';
import Loader from '../../components/Atoms/custom/Loader';
import { GenericStatus } from '../../types';
import Table from '../../components/Molecules/table/Table';

interface ParamType {
  levelId: string;
  classId: string;
}

const data = [
  {
    id: 1,
    fullName: 'Ineza Lora',
    'Critical thinking': '0',
    'Test module': '0',
    Total: '0',
    position: 1,
    status: GenericStatus.ACTIVE,
  },
  {
    id: 2,
    fullName: 'Ineza Lora',
    'Critical thinking': '0',
    'Test module': '0',
    Total: '0',
    position: 1,
    status: GenericStatus.ACTIVE,
  },
];

export default function ClassPeriodPerformance() {
  const { levelId, classId } = useParams<ParamType>();
  const { data: classInfo, isLoading } = classStore.getClassById(classId);
  const history = useHistory();

  const { url, path } = useRouteMatch();

  const [activePeriod, setactivePeriod] = useState('');

  const { data: periods, isLoading: periodsLoading } =
    academicperiodStore.getAcademicPeriodsByAcademicYear(
      classInfo?.data.data.academic_year_program_intake_level.academic_year.id + '',
    );

  useEffect(() => {
    setactivePeriod(periods?.data.data['0'].id + '' || '');
  }, [periods?.data]);

  const studentActions = [
    {
      name: 'View report',
      handleAction: (id: string | number | undefined) => {
        history.push(`${url}/${id}/profile`); // go to view user profile
      },
    },
    {
      name: 'Edit student',
      handleAction: (id: string | number | undefined) => {
        history.push(`/dashboard/users/${id}/edit`); // go to edit user
      },
    },
  ];

  return (
    <div>
      <Heading fontSize="lg" fontWeight="bold" className="py-2">
        {classInfo?.data.data.academic_year_program_intake_level.academic_year.name}
      </Heading>
      {periodsLoading ? (
        <Loader />
      ) : (
        <Tabs>
          {(periods?.data.data || []).map((p) => (
            <Tab label={p.name} key={p.id} className="py-3">
              <Table
                statusColumn="status"
                data={data}
                actions={studentActions}
                //   statusActions={studentStatActions}
                hide={['id']}
                uniqueCol="id"
              />
            </Tab>
          ))}
        </Tabs>
      )}
    </div>
  );
}
