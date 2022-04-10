import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { classStore } from '../../store/administration/class.store';
import { getDSCriticsReport } from '../../store/evaluation/school-report.store';
import { Privileges, ValueType } from '../../types';

interface IParamType {
  levelId: string;
  classId: string;
}

interface DSTable {
  id: string;
  author: string;
  receiver: string;
  week_number: number;
}

export default function AllDSAssessment() {
  const history = useHistory();

  const { classId, levelId } = useParams<IParamType>();
  const { data: classInfo } = classStore.getClassById(classId);

  let periodOfThisClass = classInfo?.data.data.intake_academic_year_period_id;

  const {
    data: performance,
    isIdle,
    isLoading,
  } = getDSCriticsReport(periodOfThisClass || 0);
  let data: DSTable[] = [];

  performance?.data.data.forEach((record) => {
    let processed: DSTable = {
      id: record.id,
      author: record.author.username,
      receiver: record.receiver.username,
      //   week_number: record.week_number,
      week_number: 0,
    };
    data.push(processed);
  });

  function handleSearch(_e: ValueType) {}

  const actions = [
    {
      name: 'View details',
      handleAction: (id: string | number | undefined) => {
        history.push(
          `/dashboard/intakes/performance/${levelId}/${classId}/critics/${id}`,
        ); // go to view user profile
      },
    },
  ];

  return (
    <>
      <div>
        {isIdle || isLoading ? (
          <Loader />
        ) : data.length === 0 ? (
          <NoDataAvailable
            icon="academy"
            fill={false}
            showButton={false}
            title={'Report has not been processed'}
            description="This report has not been processed yet or you are currently not allowed to see it"
            privilege={Privileges.CAN_ACCESS_REPORTS}
          />
        ) : (
          <>
            <Button
              styleType={'text'}
              onClick={() => history.goBack()}
              icon
              className="flex items-center p-2 hover:underline">
              <Icon name="chevron-left" fill="primary" size={16} />
              Back
            </Button>
            <TableHeader
              title={`DS Assessments reports`}
              totalItems={data.length}
              handleSearch={handleSearch}
            />

            <Table
              statusColumn="status"
              data={data}
              actions={actions}
              hide={['id']}
              uniqueCol="id"
            />
          </>
        )}
      </div>
    </>
  );
}
