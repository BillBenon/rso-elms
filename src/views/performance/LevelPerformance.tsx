import React from 'react';
import { useParams } from 'react-router-dom';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import academicperiodStore from '../../store/administration/academicperiod.store';
import { getLevelTermlyOverallReport } from '../../store/evaluation/school-report.store';
import { Privileges, ValueType } from '../../types';
import { IPerformanceTable } from '../../types/services/report.types';
import { calculateGrade } from '../../utils/school-report';
import ClassPeriodPerformance from './ClassPeriodPerformance';
import DSReportOnStudent from './DSReportOnStudent';
import EndOfLevelReport from './EndOfLevelReport';
import EndTermForm from './EndTermForm';
import StudentAcademicReport from './StudentAcademicReport';

interface ParamType {
  levelId: string;
}

const list = [
  { to: 'home', title: 'Institution Admin' },
  { to: 'programs', title: 'Programs' },
  { to: 'level', title: 'Performance' },
];

export default function LevelPerformance() {
  const { levelId } = useParams<ParamType>();
  const history = useHistory();
  const { path } = useRouteMatch();

  const { data: prds, isLoading } =
    academicperiodStore.getPeriodsByIntakeLevelId(levelId);

  const prdIds = prds?.data.data.map((prd) => prd.id).join(',');

  const { data } = getLevelTermlyOverallReport(prdIds || '');

  let performance: IPerformanceTable[] = [];

  data?.data.data?.forEach((record) => {
    console.log(record);

    let processed: IPerformanceTable = {
      term: 'term one',
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

    // processed['Grade'] = calculateGrade(
    //   record.quiz_obtained_marks + record.exam_obtained_marks,
    //   record.total_marks,
    // );

    // processed['position'] = record.position;
    performance.push(processed);
  });

  // const { data, isLoading } = classStore.getClassByPeriod(levelId);

  // const periods: CommonCardDataType[] = data?.data.data.map((clas) => ({
  //   id: clas.id,
  //   code: clas.academic_period.name.toUpperCase(),
  //   description:
  //     clas.academic_year_program_intake_level.academic_program_level.level.description,
  //   title: clas.academic_period.academic_year.name,
  //   status: {
  //     type: advancedTypeChecker(clas.progress_status),
  //     text: clas.progress_status.toString(),
  //   },
  // })) || [];

  // const classes: CommonCardDataType[] =
  //   data?.data.data.map((clas) => ({
  //     id: clas.id,
  //     code: clas.class_group_type.toUpperCase(),
  //     description:
  //       clas.academic_year_program_intake_level.academic_program_level.level.description,
  //     title: clas.class_name,
  //     status: {
  //       type: advancedTypeChecker(clas.generic_status),
  //       text: clas.generic_status.toString(),
  //     },
  //   })) || [];

  function handleSearch(_e: ValueType) {}

  const studentActions = [
    {
      name: 'View report',
      handleAction: (_id: string | number | undefined) => {
        history.push(``);
      },
    },
  ];

  const terms = [
    {
      name: 'term 1',
    },
    {
      name: 'term 2',
    },
    {
      name: 'term 3',
    },
  ];

  return (
    <>
      <BreadCrumb list={list} />

      <Switch>
        <Route
          exact
          path={`${path}/:classId/report/:studentId/:periodId`}
          render={() => (
            <Tabs>
              <Tab label="Academic report">
                <Button
                  styleType={'text'}
                  onClick={() => history.goBack()}
                  icon
                  className="flex items-center p-2 hover:underline">
                  <Icon name="chevron-left" fill="primary" size={16} />
                  Back
                </Button>
                <StudentAcademicReport />
              </Tab>
              <Tab label="Informative report">
                <Button
                  styleType={'text'}
                  onClick={() => history.goBack()}
                  icon
                  className="flex items-center p-2 hover:underline">
                  <Icon name="chevron-left" fill="primary" size={16} />
                  Back
                </Button>
                <EndTermForm />
              </Tab>
              <Tab label="TEWT report">
                <Button
                  styleType={'text'}
                  onClick={() => history.goBack()}
                  icon
                  className="flex items-center p-2 hover:underline">
                  <Icon name="chevron-left" fill="primary" size={16} />
                  Back
                </Button>
                <DSReportOnStudent />
              </Tab>
              <Tab label="Yearly report">
                <Button
                  styleType={'text'}
                  onClick={() => history.goBack()}
                  icon
                  className="flex items-center p-2 hover:underline">
                  <Icon name="chevron-left" fill="primary" size={16} />
                  Back
                </Button>
                <EndOfLevelReport />
              </Tab>
            </Tabs>
          )}
        />
        <Route path={`${path}/:classId`} component={ClassPeriodPerformance} />
        <Route
          path={`${path}`}
          render={() => (
            <>
              {isLoading ? (
                <Loader />
              ) : // <section className="flex flex-wrap justify-start gap-4 mt-2">
              //   {classes.map((cl) => (
              //     <CommonCardMolecule
              //       key={cl.id}
              //       data={cl}
              //       handleClick={() => history.push(`${url}/${cl.id}`)}
              //     />
              // ))} :
              performance.length === 0 ? (
                <NoDataAvailable
                  icon="academy"
                  fill={false}
                  showButton={false}
                  title={'Report has not been processed'}
                  description="Overall report for this level has not been processed yet or you are currently not allowed to see it"
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
                  {/* <TableHeader
                    title={`${level?.data.data.class_name || 'class'} Performance`}
                    totalItems={data.length}
                    handleSearch={handleSearch}
                  /> */}

                  <Table<IPerformanceTable>
                    statusColumn="status"
                    data={performance}
                    actions={studentActions}
                    hide={['id']}
                    uniqueCol="id"
                  />
                  <Table<IPerformanceTable>
                    statusColumn="status"
                    data={performance}
                    actions={studentActions}
                    hide={['id']}
                    uniqueCol="id"
                  />
                </>
              )}
            </>
          )}
        />
      </Switch>
    </>
  );
}
