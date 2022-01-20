import React from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { classStore } from '../../store/administration/class.store';
import { getClassTermlyOverallReport } from '../../store/evaluation/school-report.store';
import { ValueType } from '../../types';
import { calculateGrade } from '../../utils/school-report';

interface IParamType {
  levelId: string;
  classId: string;
}

interface IPerformanceTable {
  id: string;
  reg_number: string;
  [index: string]: string | number;
}

export default function ClassPeriodPerformance() {
  const history = useHistory();
  const { url } = useRouteMatch();

  const { classId } = useParams<IParamType>();
  const { data: classInfo } = classStore.getClassById(classId);

  let periodOfThisClass = classInfo?.data.data.intake_academic_year_period_id;

  const {
    data: performance,
    isIdle,
    isLoading,
    isError,
  } = getClassTermlyOverallReport(classId, periodOfThisClass + '', !!periodOfThisClass);

  let data: IPerformanceTable[] = [];

  performance?.data.data.forEach((record) => {
    let processed: IPerformanceTable = {
      reg_number: record.student.reg_number,
      id: record.student.admin_id,
    };

    record.subject_marks?.forEach((mark) => {
      processed[`${mark.subject.title} /${mark.total_marks}`] =
        mark.obtained_marks.toString();
    });

    processed[`total /${record.total_marks}`] = `${
      record.quiz_obtained_marks + record.exam_obtained_marks
    }`;

    processed['Grade'] = calculateGrade(
      record.quiz_obtained_marks + record.exam_obtained_marks,
      record.total_marks,
    );

    processed['position'] = record.position;
    data.push(processed);
  });

  function handleSearch(_e: ValueType) {}

  const studentActions = [
    {
      name: 'View report',
      handleAction: (id: string | number | undefined) => {
        history.push(`${url}/report/${id}/${periodOfThisClass}`); // go to view user profile
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
        {`${
          classInfo?.data.data.academic_year_program_intake_level.academic_program_level
            .program.name || ''
        } - 
        ${
          classInfo?.data.data.academic_year_program_intake_level.academic_program_level
            .level.name || ''
        } 
       `}
      </Heading>
      {isIdle || isLoading ? (
        <Loader />
      ) : isError ? (
        <div>
          <h2 className="text-error-500 py-2 mb-3 font-medium tracking-widest">
            That was an error! May be this class has no students or no assignments done
            het!
          </h2>
          <Button styleType="outline" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      ) : data.length === 0 ? (
        <NoDataAvailable
          title={'No marks for this association found'}
          description={
            'No data associated with this class an this period found. try changing the period'
          }
          showButton={false}
        />
      ) : (
        <>
          <TableHeader
            title={`${classInfo?.data.data.class_name || 'class'} Performance`}
            totalItems={data.length}
            handleSearch={handleSearch}
          />
          <Table
            statusColumn="status"
            data={data}
            actions={studentActions}
            hide={['id']}
            uniqueCol="id"
          />
        </>
      )}
    </div>
  );
}
