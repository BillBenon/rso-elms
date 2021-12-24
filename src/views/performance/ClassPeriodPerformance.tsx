import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Tabs, Tab, tabEventTypes } from '../../components/Molecules/tabs/tabs';
import Heading from '../../components/Atoms/Text/Heading';
import academicperiodStore from '../../store/administration/academicperiod.store';
import { classStore } from '../../store/administration/class.store';
import Loader from '../../components/Atoms/custom/Loader';
import Table from '../../components/Molecules/table/Table';
import { getClassTermlyOverallReport } from '../../store/evaluation/school-report.store';
import Button from '../../components/Atoms/custom/Button';

interface IParamType {
  levelId: string;
  classId: string;
}

interface IPerformanceTable {
  id: string;
  full_name: string;
  [index: string]: string;
}

export default function ClassPeriodPerformance() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [activePeriod, setactivePeriod] = useState('');

  const { levelId, classId } = useParams<IParamType>();
  const { data: classInfo } = classStore.getClassById(classId);

  const { data: periods, isLoading: periodsLoading } =
    academicperiodStore.getPeriodsByIntakeLevelId(levelId);

  const {
    data: performance,
    isLoading: studentsLoading,
    isError,
  } = getClassTermlyOverallReport(classId, activePeriod, activePeriod.length > 0);

  let data: IPerformanceTable[] = [];

  performance?.data.data.forEach((record) => {
    let processed: IPerformanceTable = {
      full_name: record.student.username,
      id: record.id,
    };

    record.subject_marks.forEach((mark) => {
      processed[mark.subject.title] = mark.obtained_marks.toString();
    });
  });

  useEffect(() => {
    setactivePeriod(periods?.data.data['0'].id + '' || '');
  }, [periods?.data]);

  const handleTabChange = (e: tabEventTypes) => {
    setactivePeriod(periods?.data.data[e.activeTabIndex].id + '');
  };

  const studentActions = [
    {
      name: 'View report',
      handleAction: (id: string | number | undefined) => {
        history.push(`${url}/report/${id}`); // go to view user profile
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
        {`${classInfo?.data.data.academic_year_program_intake_level.academic_program_level.program.name} - 
        ${classInfo?.data.data.academic_year_program_intake_level.academic_program_level.level.name} 
        ${classInfo?.data.data.class_name} -
        ${classInfo?.data.data.academic_year_program_intake_level.academic_year.name}`}
      </Heading>
      {periodsLoading ? (
        <Loader />
      ) : (
        <Tabs onTabChange={handleTabChange}>
          {(periods?.data.data || []).map((p) => (
            <Tab label={p.academic_period.name} key={p.id} className="py-3">
              {studentsLoading ? (
                <Loader />
              ) : isError ? (
                <div>
                  <h2 className="text-error-500 py-2 mb-3 font-medium tracking-widest">
                    That was an error! May be this class has no students or no assignments
                    done het!
                  </h2>
                  <Button styleType="outline" onClick={() => window.location.reload()}>
                    Reload
                  </Button>
                </div>
              ) : (
                <Table
                  // statusColumn="status"
                  data={data}
                  actions={studentActions}
                  hide={['id']}
                  uniqueCol="id"
                />
              )}
            </Tab>
          ))}
        </Tabs>
      )}
    </div>
  );
}
