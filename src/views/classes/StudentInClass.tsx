import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Route, Switch, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import { Tab } from '../../components/Molecules/tabs/tabs';
import Students from '../../components/Organisms/user/Students';
import { classStore } from '../../store/administration/class.store';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { IntakePeriodParam } from '../../types/services/intake-program.types';
import { UserTypes } from '../../types/services/user.types';
import AddSubjectToPeriod from '../subjects/AddSubjectToPeriod';
import SubjectPeriod from '../subjects/SubjectPeriod';
import AddStudents from './AddStudents';

type IStudentClass = {
  classId: string;
  label: string;
};

function StudentInClass({ classId, label }: IStudentClass) {
  const {
    level: levelId,
    intakeId,
    intakeProg,
    id,
    period,
  } = useParams<IntakePeriodParam>();
  const { path } = useRouteMatch();
  const [students, setStudents] = useState<UserTypes[]>([]);
  const { data, isLoading } = classStore.getStudentsByClass(classId);
  const history = useHistory();

  const studentsData = data?.data.data || [];
  useEffect(() => {
    let tempStuds: UserTypes[] = [];
    studentsData.forEach((stud) => {
      tempStuds.push({
        id: stud.id.toString(),
        username: stud.student.user.username,
        'full name': stud.student.user.first_name + ' ' + stud.student.user.last_name,
        email: stud.student.user.email,
        'ID Card': stud.student.user.person.nid,
        academy: stud.student.user.academy.name,
        status: stud.student.user.generic_status,
        user_type: stud.student.user.user_type,
      });
    });
    setStudents(tempStuds);
  }, [studentsData]);

  return (
    <Tab label={label}>
      <div className="flex flex-col">
        <Switch>
          <Route
            exact
            path={`${path}`}
            render={() => {
              return (
                <>
                  <div className="flex gap-4 self-end">
                    <Button
                      styleType="outline"
                      onClick={() =>
                        history.push(
                          `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${levelId}/view-period/${period}/add-class`,
                        )
                      }>
                      Add class
                    </Button>

                    <Button
                      styleType="outline"
                      onClick={() =>
                        history.push(
                          `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${levelId}/view-period/${period}/view-class/${classId}/subject`,
                        )
                      }>
                      View subjects
                    </Button>
                    <Button
                      styleType="outline"
                      onClick={() =>
                        history.push(
                          `/dashboard/intakes/peformance/${levelId}/${classId}`,
                        )
                      }>
                      View performance
                    </Button>
                    <AddStudents classId={parseInt(classId)} />
                  </div>
                  <section>
                    {isLoading ? (
                      <Loader />
                    ) : studentsData.length <= 0 ? (
                      <NoDataAvailable
                        showButton={false}
                        icon="user"
                        buttonLabel="Add new students"
                        title={'No students available in this class'}
                        handleClick={() => history.push(``)}
                        description="This class has not received any students. you can add one from the button on the top left."
                      />
                    ) : (
                      <Students
                        students={students}
                        showTableHeader={false}
                        handleStatusAction={() => {}}
                        studentActions={[]}
                        enumtype={'UserTypes'}
                      />
                    )}
                  </section>
                </>
              );
            }}
          />
          <Route
            exact
            path={`${path}/subject`}
            render={() => {
              return (
                <>
                  <div className="flex gap-4 self-end">
                    <Button
                      styleType="outline"
                      onClick={() =>
                        history.push(
                          `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${levelId}/view-period/${period}/add-class`,
                        )
                      }>
                      Add class
                    </Button>

                    <Button
                      styleType="outline"
                      onClick={() =>
                        history.push(
                          `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${levelId}/view-period/${period}/view-class/${classId}`,
                        )
                      }>
                      View students
                    </Button>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <Heading fontWeight="semibold" fontSize="xl" className="py-2">
                      Subjects
                    </Heading>
                  </div>
                  <SubjectPeriod />
                </>
              );
            }}
          />
          {/* add subject to period */}
          <Route
            exact
            path={`${path}/add-subject`}
            render={() => (
              <PopupMolecule
                title="Add subject to period"
                closeOnClickOutSide={false}
                open
                onClose={history.goBack}>
                <AddSubjectToPeriod />
              </PopupMolecule>
            )}
          />
        </Switch>
      </div>
    </Tab>
  );
}

export default StudentInClass;
