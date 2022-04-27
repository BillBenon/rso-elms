import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import TabNavigation, { TabType } from '../../components/Molecules/tabs/TabNavigation';
import useAuthenticator from '../../hooks/useAuthenticator';
import { classStore, getStudentsByClass } from '../../store/administration/class.store';
import { getClassTermlyOverallReport } from '../../store/evaluation/school-report.store';
import { ValueType } from '../../types';
import { IPerformanceTable } from '../../types/services/report.types';
import { UserType } from '../../types/services/user.types';
import { calculateGrade } from '../../utils/school-report';
import AllDSAssessment from './AllDSAssessment';
import ClassEvaluationPerformance from './ClassEvaluationPerformance';
import ClassFullYearDeliberation from './ClassFullYearDeliberation';
import TermModulePerfomance from './TermModulePerfomance';

interface IParamType {
  levelId: string;
  classId: string;
}

function OveralClassPerformance() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { user } = useAuthenticator();

  const { classId } = useParams<IParamType>();
  const { data: classInfo } = classStore.getClassById(classId);

  let periodOfThisClass = classInfo?.data.data.intake_academic_year_period_id;
  const { data: studentsData } = getStudentsByClass(classId) || [];
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
      }
    });
  });

  function handleSearch(_e: ValueType) {}

  const studentActions = [
    {
      name: 'View report',
      handleAction: (id: string | number | undefined) => {
        history.push(`${url}/report/${id}/${periodOfThisClass}`); // go to view user profile
      },
    },
    // {
    //   name: 'Edit student',
    //   handleAction: (id: string | number | undefined) => {
    //     history.push(`/dashboard/users/${id}/edit`); // go to edit user
    //   },
    // },
  ];
  const { t } = useTranslation();

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
            title={`${classInfo?.data.data.class_name || t('Class')} Performance`}
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

export default function ClassPeriodPerformance() {
  const { url, path } = useRouteMatch();

  // const user_role = usePickedRole();
  // const user_privileges = user_role?.role_privileges?.map((role) => role.name);
  // const hasPrivilege = (privilege: Privileges) => user_privileges?.includes(privilege);

  const tabs: TabType[] = [
    { label: 'Performance per subject', href: url },
    { label: 'Performance per evaluation', href: `${url}/by-evaluation` },
    { label: 'Performance per module', href: `${url}/by-module` },
    { label: 'Deliberation', href: `${url}/deliberation` },
    {
      label: 'DS Weekly Critics',
      href: `${url}/all-critics`,
      // privilege: Privileges.CAN_RECEIVE_WEEKLY_CRITICS,
    },
  ];

  return (
    <TabNavigation tabs={tabs}>
      <Switch>
        <Route path={`${path}`} exact component={OveralClassPerformance} />
        {/* {hasPrivilege(Privileges.CAN_RECEIVE_WEEKLY_CRITICS) && ( */}
        <Route path={`${path}/all-critics`} component={AllDSAssessment} />
        {/* )} */}
        {/* {hasPrivilege(Privileges.CAN_RECEIVE_WEEKLY_CRITICS) && ( */}
        <Route path={`${path}/deliberation`} component={ClassFullYearDeliberation} />
        {/* )} */}
        <Route path={`${path}/by-module`} component={TermModulePerfomance} />
        <Route
          path={`${path}/by-evaluation`}
          exact
          component={ClassEvaluationPerformance}
        />
      </Switch>
    </TabNavigation>
  );
}
