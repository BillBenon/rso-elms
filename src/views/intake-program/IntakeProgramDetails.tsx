import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import UsersPreview from '../../components/Molecules/cards/UsersPreview';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation, { TabType } from '../../components/Molecules/tabs/TabNavigation';
import AddPrerequesitesForm from '../../components/Organisms/forms/modules/AddPrerequisiteForm';
import NewModuleForm from '../../components/Organisms/forms/modules/NewModuleForm';
import useAuthenticator from '../../hooks/useAuthenticator';
import enrollmentStore from '../../store/administration/enrollment.store';
import intakeProgramStore, {
  getIntakeProgramsByStudent,
  getStudentLevels,
  getStudentShipByUserId,
} from '../../store/administration/intake-program.store';
import programStore, {
  getLevelsByAcademicProgram,
} from '../../store/administration/program.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { Link as Links, Privileges } from '../../types';
import { StudentApproval } from '../../types/services/enrollment.types';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import { UserType, UserView } from '../../types/services/user.types';
import { advancedTypeChecker } from '../../utils/getOption';
import { IProgramData } from '../programs/AcademicPrograms';
import AddLevelToProgram from '../programs/AddLevelToProgram';
import ApproveStudent from '../users/ApproveStudent';
import EnrollInstructorIntakeProgram from './EnrollInstructorIntakeProgram';
import EnrollRetakingStudents from './EnrollRetakingStudents';
import EnrollStudentIntakeProgram from './EnrollStudentIntakeProgram';
import IntakeProgramLevel from './IntakeProgramLevel';
import IntakeProgramModules from './IntakeProgramModules';

function IntakeProgramDetails() {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { id, intakeId, intakeProg } = useParams<IntakeProgParam>();

  const { data: studentsProgram, isLoading: studLoading } =
    intakeProgramStore.getStudentsByIntakeProgramByStatus(
      intakeProg,
      StudentApproval.APPROVED,
    );
  const { data: instructorsProgram, isLoading: instLoading } =
    intakeProgramStore.getInstructorsByIntakeProgram(intakeProg);

  const { user } = useAuthenticator();

  const [students, setStudents] = useState<UserView[]>([]);
  const [instructors, setInstructors] = useState<UserView[]>([]);
  const initialShowSidebar = {
    showStudent: false,
    showInstructor: false,
    enrollStudent: false,
    enrollInstructor: false,
    enrollRetaking: false,
  };
  const [showSidebar, setShowSidebar] = useState(initialShowSidebar);

  useEffect(() => {
    let studentsView: UserView[] = [];
    studentsProgram?.data.data.forEach((stud) => {
      let studentView: UserView = {
        id: stud.id,
        first_name: stud.student.user.first_name,
        last_name: stud.student.user.last_name,
        image_url: stud.student.user.image_url,
      };
      studentsView.push(studentView);
    });
    setStudents(studentsView);
  }, [studentsProgram]);

  useEffect(() => {
    let demoInstructors: UserView[] = [];
    instructorsProgram?.data.data.map((inst) => {
      demoInstructors.push({
        id: inst.id,
        first_name: inst.instructor.user.first_name,
        last_name: inst.instructor.user.last_name,
        image_url: inst.instructor.user.image_url,
      });
    });
    setInstructors(demoInstructors);
  }, [instructorsProgram]);

  const { data: programs, isLoading } = programStore.getProgramById(id);
  const program = programs?.data.data;

  const getProgramData = () => {
    let programData: IProgramData | undefined;
    if (program) {
      programData = {
        status: {
          type: advancedTypeChecker(program.generic_status),
          text: program.generic_status.toString(),
        },
        total_num_modules: program.total_num_modules,
        code: program.code,
        title: program.name,
        subTitle: program.type,
        description: program.description,
        department: program.department,
      };
    }

    return programData;
  };
  //
  const getLevels =
    intakeProgramStore.getLevelsByIntakeProgram(intakeProg).data?.data.data || [];
  const programLevels = getLevelsByAcademicProgram(id).data?.data.data;

  const unaddedLevels = programLevels?.filter(
    (pg) => !getLevels.map((lv) => lv.academic_program_level.id).includes(pg.id),
  );

  const instructorInfo = instructordeploymentStore.getInstructorByUserId(user?.id + '')
    .data?.data.data[0];

  let { data: instructorLevels } = enrollmentStore.getInstructorLevels(
    instructorInfo?.id + '',
  );

  const studentInfo = getStudentShipByUserId(user?.id + '' || '', !!user?.id).data?.data
    .data[0];
  const studPrograms = getIntakeProgramsByStudent(studentInfo?.id + '', !!studentInfo?.id)
    .data?.data.data;
  let studIntkProgstud = studPrograms?.find(
    (prg) => prg.intake_program.id === intakeProg,
  );
  let { data: studentLevels } = getStudentLevels(
    studIntkProgstud?.id + '',
    !!studIntkProgstud?.id,
  );

  const programData = getProgramData();
  let tabs: TabType[] = [
    {
      label: 'Program info',
      href: `${url}`,
    },
  ];

  if (user?.user_type !== UserType.STUDENT) {
    tabs.push({
      label: 'Program modules',
      href: `${url}/modules`,
      privilege: Privileges.CAN_ACCESS_INTAKE_PROGRAM_MODULES,
    });
  }

  if (user?.user_type === UserType.STUDENT) {
    if (studentLevels?.data.data && studentLevels?.data.data.length > 0) {
      tabs.push({
        label: 'Program levels',
        href: `${url}/levels/${
          studentLevels.data.data[0].academic_year_program_level.id || ''
        }`,
        privilege: Privileges.CAN_ACCESS_PROGRAM_LEVELS,
      });
    }
  }

  if (user?.user_type === UserType.INSTRUCTOR) {
    let instructorLevelsIds = instructorLevels?.data.data.map(
      (instLvl) => instLvl.academic_year_program_intake_level?.id,
    );

    const instructorProgLevels = getLevels?.filter((level) =>
      instructorLevelsIds?.includes(level.id),
    );

    // const programLevelsIds = getLevels.map((lvl) => lvl.academic_program_level.id);

    // const instrLevels = instructorLevels?.data.data.filter((level) =>
    //   programLevelsIds.includes(
    //     level.academic_year_program_intake_level?.academic_program_level.id,
    //   ),
    // );
    if (instructorProgLevels && instructorProgLevels?.length > 0) {
      tabs.push({
        label: 'Program levels',
        href: `${url}/levels/${instructorProgLevels[0]?.id || ''}`,
        privilege: Privileges.CAN_ACCESS_PROGRAM_LEVELS,
      });
    }
  }

  if (user?.user_type === UserType.ADMIN) {
    tabs.push({
      label: 'Approve students',
      href: `${url}/approve`,
      privilege: Privileges.CAN_APPROVE_STUDENT,
    });

    if (getLevels && getLevels?.length > 0) {
      tabs.push({
        label: 'Program levels',
        href: `${url}/levels/${getLevels[0]?.id || ''}`,
        privilege: Privileges.CAN_ACCESS_PROGRAM_LEVELS,
      });
    }
  }

  const handleClose = () => {
    history.goBack();
  };

  const list: Links[] = [
    { to: 'home', title: 'home' },
    { to: 'intakes', title: 'intakes' },
    { to: 'intakes/programs', title: 'Programs' },
    { to: `${url}`, title: 'details' },
  ];

  return (
    <>
      <BreadCrumb list={list} />

      <div className="pt-5">
        <Heading className="pb-5" fontWeight="semibold" fontSize="xl">
          {program?.name}
        </Heading>
        <TabNavigation
          tabs={tabs}
          headerComponent={
            user?.user_type === UserType.ADMIN &&
            getLevels.length === 0 &&
            unaddedLevels?.length !== 0 ? (
              <Permission privilege={Privileges.CAN_CREATE_PROGRAM_LEVELS}>
                <div className="text-right">
                  <Link
                    to={`/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/add-level`}>
                    <Button>Add level to program</Button>
                  </Link>
                </div>
              </Permission>
            ) : (
              <></>
            )
          }>
          <Switch>
            <Route
              exact
              path={`${path}/level/add`}
              render={() => {
                return (
                  <PopupMolecule
                    closeOnClickOutSide={false}
                    title="Add level to program"
                    open={true}
                    onClose={() => history.goBack()}>
                    <AddLevelToProgram />
                  </PopupMolecule>
                );
              }}
            />
            <Route
              exact
              path={`${path}`}
              render={() => (
                <>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    programData && (
                      <div className="flex py-9">
                        <div className="mr-24">
                          <CommonCardMolecule data={programData}>
                            <div className="flex flex-col mt-8 gap-7 pb-2">
                              <Heading color="txt-secondary" fontSize="sm">
                                Program Type
                              </Heading>
                              <Heading fontSize="sm">
                                {programData.subTitle?.replaceAll('_', ' ')}
                              </Heading>
                            </div>
                            {user?.user_type === UserType.ADMIN ? (
                              <Permission privilege={Privileges.CAN_MODIFY_PROGRAM}>
                                <div className="mt-4 flex space-x-4">
                                  <Button
                                    onClick={() =>
                                      history.push(
                                        `/dashboard/intakes/programs/${intakeId}/${id}/edit`,
                                      )
                                    }>
                                    Edit program
                                  </Button>
                                  <Button styleType="outline">Change Status</Button>
                                </div>
                              </Permission>
                            ) : null}
                          </CommonCardMolecule>
                        </div>
                        <div className="flex flex-col gap-8 z-0">
                          <UsersPreview
                            title="Students"
                            label={`Students in ${programData.title}`}
                            data={students}
                            totalUsers={students.length || 0}
                            dataLabel={''}
                            userType={user?.user_type}
                            isLoading={studLoading}
                            showSidebar={showSidebar.showStudent}
                            handleShowSidebar={() =>
                              setShowSidebar({
                                ...initialShowSidebar,
                                showStudent: !showSidebar.showStudent,
                              })
                            }
                          />
                          {user?.user_type === UserType.ADMIN ? (
                            <EnrollStudentIntakeProgram
                              showSidebar={showSidebar.enrollStudent}
                              existing={studentsProgram?.data.data || []}
                              handleShowSidebar={() =>
                                setShowSidebar({
                                  ...initialShowSidebar,
                                  enrollStudent: !showSidebar.enrollStudent,
                                })
                              }
                            />
                          ) : null}

                          <EnrollRetakingStudents
                            showSidebar={showSidebar.enrollRetaking}
                            existing={studentsProgram?.data.data || []}
                            handleShowSidebar={() =>
                              setShowSidebar({
                                ...initialShowSidebar,
                                enrollRetaking: !showSidebar.enrollRetaking,
                              })
                            }
                          />

                          <Permission
                            privilege={
                              Privileges.CAN_ACCESS_INSTRUCTORS_ON_LEVEL_PROGRAM
                            }>
                            <UsersPreview
                              title="Instructors"
                              label={`Instructors in ${programData.title}`}
                              data={instructors}
                              totalUsers={instructors.length || 0}
                              dataLabel={''}
                              userType={user?.user_type}
                              isLoading={instLoading}
                              showSidebar={showSidebar.showInstructor}
                              handleShowSidebar={() =>
                                setShowSidebar({
                                  ...initialShowSidebar,
                                  showInstructor: !showSidebar.showInstructor,
                                })
                              }
                            />
                          </Permission>
                          <Permission
                            privilege={Privileges.CAN_ENROLL_INSTRUCTORS_ON_PROGRAM}>
                            <EnrollInstructorIntakeProgram
                              showSidebar={showSidebar.enrollInstructor}
                              existing={instructorsProgram?.data.data || []}
                              handleShowSidebar={() =>
                                setShowSidebar({
                                  ...initialShowSidebar,
                                  enrollInstructor: !showSidebar.enrollInstructor,
                                })
                              }
                            />
                          </Permission>
                        </div>
                      </div>
                    )
                  )}
                </>
              )}
            />

            {/* add module popup */}
            <Route
              exact
              path={`${path}/modules/add`}
              render={() => {
                return (
                  <PopupMolecule title="New Module" open onClose={handleClose}>
                    <NewModuleForm />
                  </PopupMolecule>
                );
              }}
            />
            {/* add prerequesite popup */}
            <Route
              exact
              path={`${path}/modules/:moduleId/add-prereq`}
              render={() => {
                return (
                  <PopupMolecule
                    closeOnClickOutSide={false}
                    title="Add Prerequesite"
                    open
                    onClose={handleClose}>
                    <AddPrerequesitesForm />
                  </PopupMolecule>
                );
              }}
            />
            <Route
              exact
              path={`${path}/modules`}
              render={() => <IntakeProgramModules />}
            />
            <Route path={`${path}/levels`} render={() => <IntakeProgramLevel />} />
            <Route exact path={`${path}/approve`} render={() => <ApproveStudent />} />
          </Switch>
        </TabNavigation>
      </div>
    </>
  );
}

export default IntakeProgramDetails;
