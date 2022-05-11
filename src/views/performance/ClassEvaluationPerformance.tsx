import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import useAuthenticator from '../../hooks/useAuthenticator';
import { classStore, getStudentsByClass } from '../../store/administration/class.store';
import { getClassTermlyEvaluationReport } from '../../store/evaluation/school-report.store';
import { ValueType } from '../../types';
import { IPerformanceTable } from '../../types/services/report.types';
import { UserType } from '../../types/services/user.types';
import { calculateGrade } from '../../utils/school-report';

interface IParamType {
  levelId: string;
  classId: string;
}

export default function ClassEvaluationPerformance() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { user } = useAuthenticator();
  const { t } = useTranslation();

  const { classId } = useParams<IParamType>();
  const { data: classInfo } = classStore.getClassById(classId);

  let periodOfThisClass = classInfo?.data.data.intake_academic_year_period_id;

  const { data: studentsData } = getStudentsByClass(classId) || [];
  const {
    data: performance,
    isIdle,
    isLoading,
    isError,
  } = getClassTermlyEvaluationReport(
    classId,
    periodOfThisClass + '',
    !!periodOfThisClass,
  );

  const rankedStudents =
    studentsData?.data.data.filter((stud) => stud.student.user.person?.current_rank) ||
    [];
  const unrankedStudents =
    studentsData?.data.data.filter(
      (stud) => stud !== rankedStudents.find((ranked) => ranked.id === stud.id),
    ) || [];

  rankedStudents.sort(function (a, b) {
    if (a.student.user.person && b.student.user.person) {
      return (
        a.student.user.person.current_rank?.priority -
        b.student.user.person.current_rank?.priority
      );
    } else {
      return 0;
    }
  });
  const finalStudents = rankedStudents.concat(unrankedStudents);

  let data: IPerformanceTable[] = [];
  finalStudents.forEach((student) => {
    performance?.data.data.forEach((record) => {
      if (record.student.admin_id === student.student.id) {
        let processed: IPerformanceTable = {
          rank: student.student.user.person?.current_rank?.name || '',
          first_name: student.student.user.first_name,
          last_name: student.student.user.last_name,
          // reg_number: record.student.reg_number,
          id: record.student.admin_id,
        };

        record.attemptedEvaluations?.forEach((mark) => {
          processed[`${mark.evaluation} /${mark.totalMarks}`] =
            mark.obtainedMarks.toString();
        });

        processed[`total /${record.totalMarks}`] = `${record.obtainedMarks}`;

        processed['Grade'] = calculateGrade(record.obtainedMarks, record.totalMarks);

        processed['position'] = record.position;
        data.push(processed);
      }
    });
  });

  function handleSearch(_e: ValueType) {}

  return (
    <div>
      {isIdle || isLoading ? (
        <Loader />
      ) : isError ? (
        <div>
          <h2 className="text-error-500 py-2 mb-3 font-medium tracking-widest">
            That was an error! May be this {t('Class')} has no students or no assignments
            done het!
          </h2>
          <Button styleType="outline" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      ) : data.length === 0 ? (
        <NoDataAvailable
          title={'No marks for this association found'}
          description={
            'No data associated with this ' +
            t('Class') +
            ' an this period found. try changing the period'
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
            title={`${
              classInfo?.data.data.class_name || t('Class')
            } Termly Evaluation Performance`}
            totalItems={data.length}
            handleSearch={handleSearch}>
            {user?.user_type === UserType.ADMIN && (
              <Button
                styleType="outline"
                onClick={() => {
                  history.push(`${url}/deliberation`);
                }}>
                View in Deliberation Mode
              </Button>
            )}
          </TableHeader>

          <div className="mr-48">
            <Table statusColumn="status" data={data} hide={['id']} uniqueCol="id" />
          </div>
        </>
      )}
    </div>
  );
}
