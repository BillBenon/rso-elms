import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import SelectMolecule from '../../components/Molecules/input/SelectMolecule';
import Table from '../../components/Molecules/table/Table';
import { useClasses } from '../../hooks/useClasses';
import { classStore } from '../../store/administration/class.store';
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
    classStore.getStudentsByClass(currentClassId + '') || [];

  const [classes, setclasses] = useState(
    evaluationInfo?.intake_level_class_ids.split(','),
  );

  function handleClassChange(e: ValueType) {
    setCurrentClassId(e.value.toString());
  }

  const { path } = useRouteMatch();

  const actions = [
    {
      name: 'View Student',
      handleAction: (id: string | number | undefined | IEvaluationInfo | Student) => {
        history.push(`/dashboard/users/${id}/profile`);
      },
    },
  ];

  useEffect(() => {
    setclasses(evaluationInfo?.intake_level_class_ids.split(',') || ['']);
  }, [evaluationInfo?.intake_level_class_ids]);

  useEffect(() => {
    classes && setCurrentClassId(classes[0]);
  }, [classes]);

  //   useEffect(() => {}, [students]);

  useEffect(() => {
    let newState: UnMarkedStudent[] = [];

    let markedIds: string[] = [];

    for (let index = 0; index < markedStudents.length; index++) {
      markedIds.push(markedStudents[index].student.admin_id);
    }
    studentsData?.data.data.forEach((std) => {
      if (!markedIds.includes(std.student.id + '')) {
        newState.push({
          id: std.student.user.id.toString(),
          first_name: std.student.user.first_name,
          last_name: std.student.user.last_name,
          out_of: evaluationInfo?.total_mark + '',
          obtained: 'N/A',
        });
      }
    });
    setStudents(newState);
  }, [evaluationInfo?.total_mark, markedStudents, studentsData?.data]);

  return (
    <div className="flex flex-col gap-8">
      <Heading fontWeight="semibold" className="pt-7">
        Riding Class
      </Heading>

      <div>
        <Heading fontWeight="medium" fontSize="sm">
          Select class
        </Heading>
        <SelectMolecule
          width="80"
          className=""
          value={currentClassId}
          handleChange={handleClassChange}
          name={'type'}
          placeholder="Evaluation type"
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
                  title={'All students started attempted this evaluation.'}
                  description="And the web just isnt the same without you. Lets get you back online!"
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
