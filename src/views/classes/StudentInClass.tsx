import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import Students from '../../components/Organisms/user/Students';
import { queryClient } from '../../plugins/react-query';
import { classStore, getStudentsByClass } from '../../store/administration/class.store';
import enrollmentStore from '../../store/administration/enrollment.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { Privileges } from '../../types';
import { IClass } from '../../types/services/class.types';
import { IntakePeriodParam } from '../../types/services/intake-program.types';
import { SelectorActionType } from '../../types/services/table.types';
import { UserInfo, UserTypes } from '../../types/services/user.types';
import AddSubjectToPeriod from '../subjects/AddSubjectToPeriod';
import SubjectPeriod from '../subjects/SubjectPeriod';
import AddStudents from './AddStudents';

type IStudentClass = {
  classObject: IClass;
};

function StudentInClass({ classObject }: IStudentClass) {
  const {
    level: levelId,
    intakeId,
    intakeProg,
    id,
    period,
  } = useParams<IntakePeriodParam>();
  const { path } = useRouteMatch();

  const [students, setStudents] = useState<UserTypes[]>([]);
  const [leaders, setLeaders] = useState<{
    instructor_in_charge_one?: UserInfo;
    instructor_in_charge_two?: UserInfo;
    instructor_in_charge_three?: UserInfo;
    class_representative_one?: UserInfo;
  }>({
    instructor_in_charge_one: undefined,
    instructor_in_charge_two: undefined,
    instructor_in_charge_three: undefined,
    class_representative_one: undefined,
  });
  const { data: studentsData, isLoading } = getStudentsByClass(classObject.id + '') || [];
  const { mutate } = classStore.removeStudentInClass();
  const history = useHistory();
  const { data: instructorProgramLevel } =
    enrollmentStore.getInstructorsInProgramLevel(levelId);

  const { data: studentsProgramLevel } =
    intakeProgramStore.getStudentsByIntakeProgramLevel(levelId);

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
  const { t } = useTranslation();

  useEffect(() => {
    setLeaders((leader) => ({
      ...leader,
      instructor_in_charge_one: instructorProgramLevel?.data.data.find(
        (inst) =>
          inst.intake_program_instructor.instructor.id ===
          classObject.instructor_class_incharge_id,
      )?.intake_program_instructor.instructor.user,
      instructor_in_charge_two: instructorProgramLevel?.data.data.find(
        (inst) =>
          inst.intake_program_instructor.instructor.id ===
          classObject.instructor_class_incharge_two_id,
      )?.intake_program_instructor.instructor.user,
      instructor_in_charge_three: instructorProgramLevel?.data.data.find(
        (inst) =>
          inst.intake_program_instructor.instructor.id ===
          classObject.instructor_class_incharge_three_id,
      )?.intake_program_instructor.instructor.user,
      class_representative_one: studentsProgramLevel?.data.data.find(
        (stud) =>
          stud.intake_program_student.student.id ===
          classObject.class_representative_one_id,
      )?.intake_program_student.student.user,
    }));
  }, [
    classObject.class_representative_one_id,
    classObject.instructor_class_incharge_id,
    classObject.instructor_class_incharge_three_id,
    classObject.instructor_class_incharge_two_id,
    instructorProgramLevel?.data.data,
    studentsProgramLevel?.data.data,
  ]);

  return (
    <div className="flex flex-col">
      <Switch>
        <Route
          exact
          path={`${path}`}
          render={() => {
            return (
              <>
                <div className="flex gap-4 self-end">
                  <Permission privilege={Privileges.CAN_CREATE_CLASSES}>
                    <Button
                      styleType="outline"
                      onClick={() =>
                        path.includes('learn')
                          ? history.push(
                              `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/learn/${levelId}/view-period/${period}/add-class`,
                            )
                          : path.includes('teach')
                          ? history.push(
                              `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/teach/${levelId}/view-period/${period}/add-class`,
                            )
                          : path.includes('manage')
                          ? history.push(
                              `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/manage/${levelId}/view-period/${period}/add-class`,
                            )
                          : {}
                      }>
                      Add {t('Class')}
                    </Button>
                  </Permission>

                  <Button
                    styleType="outline"
                    onClick={() =>
                      path.includes('learn')
                        ? history.push(
                            `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/learn/${levelId}/view-period/${period}/view-class/${classObject.id}/subject`,
                          )
                        : path.includes('teach')
                        ? history.push(
                            `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/teach/${levelId}/view-period/${period}/view-class/${classObject.id}/subject`,
                          )
                        : path.includes('manage')
                        ? history.push(
                            `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/manage/${levelId}/view-period/${period}/view-class/${classObject.id}/subject`,
                          )
                        : {}
                    }>
                    View subjects
                  </Button>
                  <Permission privilege={Privileges.CAN_ACCESS_REPORTS}>
                    <Button
                      styleType="outline"
                      onClick={() =>
                        history.push(
                          `/dashboard/intakes/peformance/${levelId}/${classObject.id}`,
                        )
                      }>
                      View performance
                    </Button>
                  </Permission>
                  <Permission privilege={Privileges.CAN_CREATE_CLASSES_MEMBERS}>
                    <AddStudents classId={parseInt(classObject.id + '')} />
                  </Permission>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                  <div className="flex gap-4 pb-2 items-center">
                    <Heading fontWeight="semibold" fontSize="sm" color="primary">
                      Instructor representative :
                    </Heading>
                    <Heading fontSize="sm">
                      {`${leaders.instructor_in_charge_one?.first_name || '---'} ${
                        leaders.instructor_in_charge_one?.last_name || '---'
                      }`}
                    </Heading>
                  </div>
                  {leaders.instructor_in_charge_two ? (
                    <div className="flex gap-4 pb-2 items-center">
                      <Heading fontWeight="semibold" fontSize="sm" color="primary">
                        {t('Instructor_representative')} backup 1 :
                      </Heading>
                      <Heading fontSize="sm">
                        {`${leaders.instructor_in_charge_two.first_name || '---'} ${
                          leaders.instructor_in_charge_two.last_name || '---'
                        }`}
                      </Heading>
                    </div>
                  ) : null}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex gap-4 pb-2 items-center">
                    <Heading fontWeight="semibold" fontSize="sm" color="primary">
                      {t('Class_representative')} :
                    </Heading>
                    <Heading fontSize="sm">
                      {`${leaders.class_representative_one?.first_name || '---'} ${
                        leaders.class_representative_one?.last_name || '---'
                      }`}
                    </Heading>
                  </div>
                  {leaders.instructor_in_charge_three ? (
                    <div className="flex gap-4 pb-2 items-center">
                      <Heading fontWeight="semibold" fontSize="sm" color="primary">
                        {t('Instructor_representative')} backup 2 :
                      </Heading>
                      <Heading fontSize="sm">
                        {`${leaders.instructor_in_charge_three.first_name || '---'} ${
                          leaders.instructor_in_charge_three.last_name || '---'
                        }`}
                      </Heading>
                    </div>
                  ) : null}
                </div>
                <section>
                  {isLoading ? (
                    <Loader />
                  ) : studentsData?.data.data && studentsData?.data.data?.length <= 0 ? (
                    <NoDataAvailable
                      showButton={false}
                      icon="user"
                      buttonLabel="Add new students"
                      title={'No students available in this class'}
                      handleClick={() => history.push(``)}
                      description={
                        'This ' +
                        t('Class') +
                        ' has not received any students. you can add one from the button on the top left.'
                      }
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
                        path.includes('learn')
                          ? history.push(
                              `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/learn/${levelId}/view-period/${period}/add-class`,
                            )
                          : path.includes('teach')
                          ? history.push(
                              `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/teach/${levelId}/view-period/${period}/add-class`,
                            )
                          : path.includes('learn')
                          ? history.push(
                              `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/manage/${levelId}/view-period/${period}/add-class`,
                            )
                          : {}
                      }>
                      Add {t('Class')}
                    </Button>
                  </Permission>

                  <Button
                    styleType="outline"
                    onClick={() =>
                      path.includes('learn')
                        ? history.push(
                            `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/learn/${levelId}/view-period/${period}/view-class`,
                          )
                        : path.includes('teach')
                        ? history.push(
                            `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/teach/${levelId}/view-period/${period}/view-class`,
                          )
                        : path.includes('manage')
                        ? history.push(
                            `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/manage/${levelId}/view-period/${period}/view-class`,
                          )
                        : {}
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
  );
}

export default StudentInClass;
