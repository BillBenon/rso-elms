import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';

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
import { authenticatorStore } from '../../store/administration';
import enrollmentStore from '../../store/administration/enrollment.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import programStore from '../../store/administration/program.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { Link as Links } from '../../types';
import { StudentApproval } from '../../types/services/enrollment.types';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import { UserType, UserView } from '../../types/services/user.types';
import { advancedTypeChecker } from '../../utils/getOption';
import { IProgramData } from '../programs/AcademicPrograms';
import AddLevelToProgram from '../programs/AddLevelToProgram';
import ApproveStudent from '../users/ApproveStudent';
import EnrollInstructorIntakeProgram from './EnrollInstructorIntakeProgram';
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
    intakeProgramStore.getInstructorsByIntakeProgram(id, intakeId);

  const authUser = authenticatorStore.authUser().data?.data.data;

  const [students, setStudents] = useState<UserView[]>([]);
  const [instructors, setInstructors] = useState<UserView[]>([]);

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
    instructorsProgram?.data.data.map((inst) =>
      setInstructors([
        ...instructors,
        {
          id: inst.id,
          first_name: inst.instructor.user.first_name,
          last_name: inst.instructor.user.last_name,
          image_url: inst.instructor.user.image_url,
        },
      ]),
    );
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

  const getLevels =
    intakeProgramStore.getLevelsByIntakeProgram(intakeProg).data?.data.data || [];

  const instructorInfo = instructordeploymentStore.getInstructorByUserId(
    authUser?.id + '',
  ).data?.data.data;

  const programData = getProgramData();
  let tabs: TabType[] = [
    {
      label: 'Program info',
      href: `${url}`,
    },
    {
      label: 'Program modules',
      href: `${url}/modules`,
    },
  ];

  if (authUser?.user_type === UserType.INSTRUCTOR) {
    let { data: instructorLevels } = enrollmentStore.getInstructorLevels(
      instructorInfo?.id + '',
    );

    const programLevelsIds = getLevels.map((lvl) => lvl.academic_program_level.id);

    const instrLevels = instructorLevels?.data.data.filter((level) =>
      programLevelsIds.includes(
        level.academic_year_program_intake_level?.academic_program_level.id,
      ),
    );

    if (instrLevels && instrLevels?.length > 0) {
      tabs.push({
        label: 'Program levels',
        href: `${url}/levels/${instrLevels[0]?.id || ''}`,
      });
    }
  }

  if (authUser?.user_type === UserType.ADMIN) {
    tabs.push({
      label: 'Approve students',
      href: `${url}/approve`,
    });

    if (getLevels && getLevels?.length > 0) {
      tabs.push({
        label: 'Program levels',
        href: `${url}/levels/${getLevels[0]?.id || ''}`,
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
        <TabNavigation tabs={tabs}>
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
                            {authUser?.user_type === UserType.ADMIN ? (
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
                            ) : null}
                          </CommonCardMolecule>
                        </div>
                        <div className="flex flex-col gap-8 z-0">
                          <UsersPreview
                            title="Students"
                            label="Students in Cadette programs"
                            data={students}
                            totalUsers={students.length || 0}
                            dataLabel={''}
                            userType={authUser?.user_type}
                            isLoading={studLoading}>
                            {authUser?.user_type === UserType.ADMIN ? (
                              <EnrollStudentIntakeProgram />
                            ) : null}
                          </UsersPreview>

                          <UsersPreview
                            title="Instructors"
                            label="Instructors in Cadette programs"
                            data={instructors}
                            totalUsers={instructors.length || 0}
                            dataLabel={''}
                            userType={authUser?.user_type}
                            isLoading={instLoading}>
                            {authUser?.user_type === UserType.ADMIN ? (
                              <EnrollInstructorIntakeProgram />
                            ) : null}
                          </UsersPreview>
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
