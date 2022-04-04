import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useRouteMatch } from 'react-router';
import { Route, Switch, useParams } from 'react-router-dom';

import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import { Tab } from '../../components/Molecules/tabs/tabs';
import Students from '../../components/Organisms/user/Students';
import { queryClient } from '../../plugins/react-query';
import { classStore } from '../../store/administration/class.store';
import { ParamType, Privileges } from '../../types';
import { IntakePeriodParam } from '../../types/services/intake-program.types';
import { SelectorActionType } from '../../types/services/table.types';
import { UserTypes } from '../../types/services/user.types';
import { setLocalStorageData } from '../../utils/getLocalStorageItem';
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
  const { id: programId } = useParams<ParamType>();
  const [students, setStudents] = useState<UserTypes[]>([]);
  const { data: studentsData, isLoading } = classStore.getStudentsByClass(classId) || [];
  const { mutate } = classStore.removeStudentInClass();
  const history = useHistory();

  useEffect(() => {
    let tempStuds: UserTypes[] = [];
    studentsData?.data.data.forEach((stud) => {
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
  }, [studentsData?.data.data]);

  function remove(data?: string[]) {
    data?.map((student) =>
      mutate(student, {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['class/students']);
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      }),
    );
  }

  let actions: SelectorActionType[] = [
    {
      name: 'remove students',
      handleAction: (data?: string[]) => remove(data),
      privilege: Privileges.CAN_DELETE_CLASSES_MEMBERS,
    },
  ];
  function goToNewEvaluation() {
    setLocalStorageData('currentStep', 0);
    history.push(`/dashboard/evaluations/new?prd=${period}&prg=${programId}`);
  }

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
                  <div className="flex justify-between py-2">
                    {/* UNCOMMENT THIS LINE AFTER DEVELOPMENT TO RESPECT PRIVILEGES */}
                    {/* <Permission privilege={Privileges.CAN_CREATE_EVALUATIONS}> */}
                    <div>
                      <Button onClick={goToNewEvaluation}> New evaluation</Button>
                    </div>
                    {/* </Permission> */}
                    <div className="flex gap-4 self-end">
                      <Permission privilege={Privileges.CAN_CREATE_CLASSES}>
                        <Button
                          styleType="outline"
                          onClick={() =>
                            history.push(
                              `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${levelId}/view-period/${period}/add-class`,
                            )
                          }>
                          Add class
                        </Button>
                      </Permission>

                      <Button
                        styleType="outline"
                        onClick={() =>
                          history.push(
                            `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${levelId}/view-period/${period}/view-class/${classId}/subject`,
                          )
                        }>
                        View subjects
                      </Button>
                      <Permission privilege={Privileges.CAN_ACCESS_REPORTS}>
                        <Button
                          styleType="outline"
                          onClick={() =>
                            history.push(
                              `/dashboard/intakes/peformance/${levelId}/${classId}`,
                            )
                          }>
                          View performance
                        </Button>
                      </Permission>
                      <Permission privilege={Privileges.CAN_CREATE_CLASSES_MEMBERS}>
                        <AddStudents classId={parseInt(classId)} />
                      </Permission>
                    </div>
                  </div>
                  <section>
                    {isLoading ? (
                      <Loader />
                    ) : studentsData?.data.data &&
                      studentsData?.data.data?.length <= 0 ? (
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
                        selectorActions={actions}
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
            path={`${path}/:classId/subject`}
            render={() => {
              return (
                <>
                  <div className="flex gap-4 self-end">
                    <Permission privilege={Privileges.CAN_CREATE_CLASSES}>
                      <Button
                        styleType="outline"
                        onClick={() =>
                          history.push(
                            `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${levelId}/view-period/${period}/add-class`,
                          )
                        }>
                        Add class
                      </Button>
                    </Permission>

                    <Button
                      styleType="outline"
                      onClick={() =>
                        history.push(
                          `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${levelId}/view-period/${period}/view-class`,
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
            path={`${path}/:classId/add-subject`}
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
