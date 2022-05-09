import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import SelectMolecule from '../../components/Molecules/input/SelectMolecule';
import Table from '../../components/Molecules/table/Table';
import { useClasses } from '../../hooks/useClasses';
import { getStudentsByClass } from '../../store/administration/class.store';
import { markingStore } from '../../store/administration/marking.store';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { ParamType, ValueType } from '../../types';
import { IEvaluationInfo } from '../../types/services/evaluation.types';
import { UnMarkedStudent } from '../../types/services/marking.types';
import { Student } from '../../types/services/user.types';

// type PropsType = {
//   evaluationId: string;
// };

export default function UnBeguns() {
  const { id: evaluationId } = useParams<ParamType>();
  const [currentClassId, setCurrentClassId] = useState<string>('');
  const [students, setStudents] = useState<UnMarkedStudent[]>([]);
  const history = useHistory();
  const { data: evaluationInfo } =
    evaluationStore.getEvaluationById(evaluationId).data?.data || {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const markedStudents =
    markingStore.getEvaluationStudentEvaluations(evaluationId).data?.data.data || [];

  const { data: studentsData, isLoading } =
    getStudentsByClass(currentClassId.trim()) || [];

  const [classes, setclasses] = useState(
    evaluationInfo?.intake_level_class_ids.split(',') || [' '],
  );

  function handleClassChange(e: ValueType) {
    setCurrentClassId(e.value.toString());
  }

  const { path } = useRouteMatch();
  const { t } = useTranslation();

  const actions = [
    {
      name: 'View Student',
      handleAction: (id: string | number | undefined | IEvaluationInfo | Student) => {
        history.push(`/dashboard/user/${id}/profile`);
      },
    },
  ];

  useEffect(() => {
    setclasses(evaluationInfo?.intake_level_class_ids.split(',') || [' ']);
  }, [evaluationInfo?.intake_level_class_ids]);

  useEffect(() => {
    setCurrentClassId(classes?.[0] || ' ');
  }, [classes]);

  useEffect(() => {
    let newState: UnMarkedStudent[] = [];

    let markedIds: string[] = [];

    for (let index = 0; index < markedStudents.length; index++) {
      markedIds.push(markedStudents[index].student.admin_id);
    }

    const rankedStudents =
      studentsData?.data.data.filter((stud) => stud.student.user.person?.current_rank) ||
      [];
    const unrankedStudents =
      studentsData?.data.data.filter(
        (inst) => inst !== rankedStudents.find((ranked) => ranked.id === inst.id),
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

    finalStudents.forEach((std) => {
      if (!markedIds.includes(std.student.id + '')) {
        newState.push({
          id: std.student.user.id.toString(),
          rank: std.student.user.person?.current_rank?.name || '',
          first_name: std.student.user.first_name,
          last_name: std.student.user.last_name,
          out_of: evaluationInfo?.total_mark + '',
          obtained: 'N/A',
        });
      }
    });
    setStudents(newState);
  }, [evaluationInfo?.total_mark, markedStudents, studentsData?.data]);

  console.log({ isLoading, currentClassId });

  return (
    <div className="flex flex-col gap-8">
      <Heading fontWeight="semibold" className="pt-7">
        {useClasses(currentClassId).label || 'No choosen ' + t('Class')}{' '}
      </Heading>

      <div>
        <Heading fontWeight="medium" fontSize="sm">
          Select {t('Class')}
        </Heading>
        <SelectMolecule
          width="80"
          className=""
          value={currentClassId}
          handleChange={handleClassChange}
          name={'type'}
          placeholder={'Select ' + t('Class')}
          options={classes?.map((cl) => useClasses(cl)) || []}
        />
      </div>
      <Switch>
        <Route
          exact
          path={`${path}`}
          render={() => (
            <div>
              {isLoading ? (
                <Loader />
              ) : students.length === 0 ? (
                <NoDataAvailable
                  showButton={false}
                  icon="user"
                  buttonLabel="Add new student"
                  title={'All students attempted this evaluation.'}
                  description="There seems to be no students left who haven't attempted this evaluation"
                />
              ) : (
                <Table<UnMarkedStudent>
                  statusColumn="status"
                  data={students}
                  hide={['id']}
                  uniqueCol={'id'}
                  actions={actions}
                />
              )}
            </div>
          )}
        />
      </Switch>
    </div>
  );
}
