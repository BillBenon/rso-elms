import React from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import Promote from '../../components/Organisms/forms/deliberation/Promote';
import { classStore, getStudentsByClass } from '../../store/administration/class.store';
import { getClassTermlyOverallReport } from '../../store/evaluation/school-report.store';
import { ValueType } from '../../types';
import { IPerformanceTable } from '../../types/services/report.types';
import { calculateGrade } from '../../utils/school-report';

interface IParamType {
  levelId: string;
  classId: string;
}

export default function ClassFullYearDeliberation() {
  const history = useHistory();
  const { url, path } = useRouteMatch();

  const { classId } = useParams<IParamType>();
  const { data: classInfo } = classStore.getClassById(classId);
  const { data: studentsData } = getStudentsByClass(classId) || [];

  let periodOfThisClass = classInfo?.data.data.intake_academic_year_period_id;

  const {
    data: performance,
    isIdle,
    isLoading,
    isError,
  } = getClassTermlyOverallReport(classId, periodOfThisClass + '', !!periodOfThisClass);

  let data: IPerformanceTable[] = [];
  studentsData?.data.data.forEach((student) => {
    performance?.data.data.forEach((record) => {
      if (record.student.admin_id === student.student.id) {
        let processed: IPerformanceTable = {
          rank: student.student.user.person.current_rank?.name || '',
          first_name: student.student.user.first_name,
          last_name: student.student.user.last_name,
          // reg_number: record.student.reg_number,
          id: record.student.admin_id,
        };

        processed[`total /${record.total_marks}`] = `${
          record.quiz_obtained_marks + record.exam_obtained_marks
        }`;

        processed['Grade'] = calculateGrade(
          record.quiz_obtained_marks + record.exam_obtained_marks,
          record.total_marks,
        );

        processed['position'] = record.position;
        processed['promotion_status'] = record.promotion_status;
        data.push(processed);
      }
    });
  });

  function handleSearch(_e: ValueType) {}

  const studentActions = [
    {
      name: 'Promote',
      handleAction: (id: string | number | undefined) => {
        history.push(`${url}/${id}/promotion`);
      },
    },
  ];

  return (
    <div>
      <Switch>
        <Route
          path={`${path}/:reportId/promotion`}
          render={() => {
            return (
              <PopupMolecule
                title="Student Promotion"
                open
                onClose={history.goBack}
                closeOnClickOutSide={false}>
                <Promote />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
      {isIdle || isLoading ? (
        <Loader />
      ) : isError ? (
        <div>
          <h2 className="text-error-500 py-2 mb-3 font-medium tracking-widest">
            Error Occurred: Class Deliberation can&apos;t take place as there are no
            students in class
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
          <Button
            styleType={'text'}
            onClick={() => history.goBack()}
            icon
            className="flex items-center p-2 hover:underline">
            <Icon name="chevron-left" fill="primary" size={16} />
            Back
          </Button>
          <TableHeader
            title={`${classInfo?.data.data.class_name || 'class'} Promotions`}
            totalItems={data.length}
            handleSearch={handleSearch}
          />
          <Table
            statusColumn="promotion_status"
            anotherStatusColumn="enroll_to"
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
