import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
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
import { queryClient } from '../../plugins/react-query';
import { attachementStore } from '../../store/administration/attachment.store';
import enrollmentStore from '../../store/administration/enrollment.store';
import intakeProgramStore, {
  getIntakeProgramsByStudent,
  getStudentLevels,
  getStudentShipByUserId,
} from '../../store/administration/intake-program.store';
import { getLevelsByAcademicProgram } from '../../store/administration/program.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { Link as Links, Privileges } from '../../types';
import { StudentApproval } from '../../types/services/enrollment.types';
import { IntakeProgram } from '../../types/services/intake.types';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';
import { downloadPersonalDoc } from '../../utils/file-util';
import { advancedTypeChecker } from '../../utils/getOption';
import { IProgramData } from '../programs/AcademicPrograms';
import AddLevelToProgram from '../programs/AddLevelToProgram';
import AddProgramLeader from '../programs/AddProgramLeader';
import AddProgramSyllabus from '../programs/AddProgramSyllabus';
import ApproveStudent from '../users/ApproveStudent';
import EnrollInstructorIntakeProgram from './EnrollInstructorIntakeProgram';
import EnrollRetakingStudents from './EnrollRetakingStudents';
import EnrollStudentIntakeProgram from './EnrollStudentIntakeProgram';
import IntakeProgramLevel from './IntakeProgramLevel';
import IntakeProgramModules from './IntakeProgramModules';

function IntakeProgramDetails() {
  const history = useHistory();
  const { t } = useTranslation();
  const { path, url } = useRouteMatch();
  const { id, intakeId, intakeProg } = useParams<IntakeProgParam>();

  const [fileUrl, setUrl] = useState('');

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

  const { data: intakeProgram, isLoading } =
    intakeProgramStore.getIntakeProgramId(intakeProg);

  const program = intakeProgram?.data.data.program;
  const { mutate } = attachementStore.deleteAttachmentById();

  async function downloadProgramAttachment(data: IntakeProgram | undefined) {
    await setUrl(
      await downloadPersonalDoc(
        data?.attachment_id + '',
        'pdf',
        '/attachments/download/',
      ),
    );
    var element = document.createElement('a');
    element.setAttribute('href', fileUrl);
    element.setAttribute('download', data?.attachment_file_name + '');

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

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

  const handleClose = () => {
    history.goBack();
  };

  function deleteSyllabus(id: string) {
    mutate(id, {
      onSuccess() {
        toast.success('successfully deleted');
        queryClient.invalidateQueries(['intake-program/id', id]);
      },
      onError(error: any) {
        toast.error(error.response.data.message);
      },
    });
  }

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
      label: t('Program') + ' information',
      href: `${url}`,
    },
  ];

  tabs.push({
    label: t('Program') + ' modules',
    href: `${url}/modules`,
    privilege: Privileges.CAN_ACCESS_INTAKE_PROGRAM_MODULES,
  });

  if (studentLevels?.data.data && studentLevels?.data.data.length > 0) {
    tabs.push({
      label: 'Student ' + t('Program') + ' levels',
      href: `${url}/levels/learn/${
        studentLevels.data.data[0].academic_year_program_level.id || ''
      }`,
      privilege: Privileges.CAN_LEARN_IN_INTAKE_PROGRAM_LEVELS,
    });
  }

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
      label: t('Instructor') + t('Program') + ' levels',
      href: `${url}/levels/teach/${instructorProgLevels[0]?.id || ''}`,
      privilege: Privileges.CAN_TEACH_IN_INTAKE_PROGRAM_LEVELS,
    });
  }
  if (getLevels && getLevels?.length > 0) {
    tabs.push({
      label: 'Manage ' + t('Program') + ' levels',
      href: `${url}/levels/manage/${getLevels[0]?.id || ''}`,
      privilege: Privileges.CAN_ACCESS_INTAKE_PROGRAM_LEVELS,
    });
  }

  tabs.push({
    label: 'Approve students',
    href: `${url}/approve`,
    privilege: Privileges.CAN_APPROVE_STUDENT,
  });

  const list: Links[] = [
    { to: 'home', title: 'home' },
    { to: 'intakes', title: 'intakes' },
    { to: 'intakes/programs', title: t('Program') },
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
            getLevels.length === 0 && unaddedLevels?.length !== 0 ? (
              <Permission privilege={Privileges.CAN_CREATE_PROGRAM_LEVELS}>
                <div className="text-right">
                  <Link
                    to={`/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/add-level`}>
                    <Button>Add level to {t('Program')}</Button>
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
                    title={'Add level to ' + t('Program')}
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
                      <div className="flex gap-8 py-9">
                        <div className="mr-24">
                          <CommonCardMolecule data={programData}>
                            <div className="flex flex-col mt-8 gap-7 pb-2">
                              <Heading color="txt-secondary" fontSize="sm">
                                {t('Program')} Type
                              </Heading>
                              <Heading fontSize="sm">
                                {programData.subTitle?.replaceAll('_', ' ')}
                              </Heading>
                            </div>

                            <Permission privilege={Privileges.CAN_MODIFY_PROGRAM}>
                              <div className="mt-4 flex space-x-4">
                                <Button
                                  onClick={() =>
                                    history.push(
                                      `/dashboard/intakes/programs/${intakeId}/${id}/edit`,
                                    )
                                  }>
                                  Edit {t('Program')}
                                </Button>
                                {/* <Button styleType="outline">Change Status</Button> */}
                              </div>
                            </Permission>
                          </CommonCardMolecule>
                        </div>
                        <div className="flex flex-col gap-8 z-0">
                          <UsersPreview
                            title="Students"
                            label={`Students in ${programData.title}`}
                            data={students}
                            totalUsers={students.length || 0}
                            dataLabel={''}
                            isLoading={studLoading}
                            showSidebar={showSidebar.showStudent}
                            handleShowSidebar={() =>
                              setShowSidebar({
                                ...initialShowSidebar,
                                showStudent: !showSidebar.showStudent,
                              })
                            }
                          />
                          <Permission
                            privilege={Privileges.CAN_ENROLL_STUDENTS_ON_PROGRAM}>
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
                          </Permission>

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
                              title={t('Instructor')}
                              label={t('Instructor') + ` in ${programData.title}`}
                              data={instructors}
                              totalUsers={instructors.length || 0}
                              dataLabel={''}
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
                        <div className="flex flex-col gap-8">
                          <Permission
                            privilege={Privileges.CAN_ACCESS_PROGRAMS_IN_INTAKE}>
                            <div className="rounded border-2 border-[#e9ecef] flex flex-col p-6 bg-main">
                              <Heading color="txt-secondary" fontSize="base">
                                Leaders
                              </Heading>
                              <div className="flex gap-2 items-center">
                                <Heading
                                  color="txt-primary"
                                  fontSize="sm"
                                  fontWeight="semibold">
                                  Instructor in charge
                                </Heading>
                                {intakeProgram?.data.data.incharge_instructor ? (
                                  <Heading
                                    color="txt-primary"
                                    fontSize="sm"
                                    fontWeight="semibold">
                                    {intakeProgram.data.data.incharge_instructor}
                                  </Heading>
                                ) : (
                                  <Permission
                                    privilege={Privileges.CAN_CREATE_PROGRAMS_IN_INTAKE}>
                                    <div className="text-primary-500 py-2 text-sm mr-3 flex space-x-4">
                                      <Link
                                        to={`${url}/leader/add?type=instructor`}
                                        className="bg-secondary px-2 rounded-sm hover:bg-tertiary flex items-center justify-end">
                                        <Icon name="add" size={12} fill="primary" />
                                        Add instructor incharge
                                      </Link>
                                    </div>
                                  </Permission>
                                )}
                              </div>
                              <div className="flex gap-2 items-center">
                                <Heading
                                  color="txt-primary"
                                  fontSize="sm"
                                  fontWeight="semibold">
                                  Student in charge
                                </Heading>
                                {intakeProgram?.data.data.student_in_lead ? (
                                  <Heading
                                    color="txt-primary"
                                    fontSize="sm"
                                    fontWeight="semibold">
                                    {intakeProgram?.data.data.student_in_lead}
                                  </Heading>
                                ) : (
                                  <Permission
                                    privilege={Privileges.CAN_CREATE_PROGRAMS_IN_INTAKE}>
                                    <div className="text-primary-500 py-2 text-sm mr-3 flex space-x-4">
                                      <Link
                                        to={`${url}/leader/add?type=student`}
                                        className="bg-secondary px-2 rounded-sm hover:bg-tertiary flex items-center justify-end">
                                        <Icon name="add" size={12} fill="primary" />
                                        Add student incharge
                                      </Link>
                                    </div>
                                  </Permission>
                                )}
                              </div>
                            </div>
                            <div className="mr-20 rounded border-2 border-[#e9ecef] flex flex-col gap-7 p-6 bg-main">
                              <Heading color="txt-secondary" fontSize="base">
                                Program Syllabus
                              </Heading>
                              <div className="flex flex-col gap-4">
                                {intakeProgram?.data.data?.attachment_id == null ? (
                                  <Permission
                                    privilege={Privileges.CAN_CREATE_PROGRAMS_IN_INTAKE}>
                                    <div className="text-primary-500 py-2 text-sm mr-3 flex space-x-4">
                                      <Link
                                        to={`${url}/programSyllabus/add`}
                                        className="bg-secondary px-2 rounded-sm hover:bg-tertiary flex items-center justify-end">
                                        <Icon name="add" size={12} fill="primary" />
                                        Add Program Syllabus
                                      </Link>
                                    </div>
                                  </Permission>
                                ) : (
                                  <>
                                    <Heading
                                      key={intakeProgram?.data.data?.attachment_id}
                                      color="txt-primary"
                                      fontSize="base"
                                      fontWeight="semibold">
                                      {program?.name + ' Syllabus'}
                                    </Heading>
                                    <Permission
                                      privilege={Privileges.CAN_CREATE_PROGRAM_LEVELS}>
                                      <div className="text-primary-500 py-1 text-sm mr-3 flex space-x-4">
                                        <Link
                                          to={`${url}/programSyllabus/add`}
                                          className="flex items-center justify-end">
                                          <Icon name="add" size={12} fill="primary" />
                                          Add new Program Syllabus
                                        </Link>
                                      </div>
                                      <div className="flex space-x-4">
                                        <Button
                                          onClick={() =>
                                            downloadProgramAttachment(
                                              intakeProgram.data.data,
                                            )
                                          }>
                                          Download
                                        </Button>
                                        <Button
                                          onClick={() => deleteSyllabus(intakeProg)}
                                          styleType="outline">
                                          Delete
                                        </Button>
                                      </div>
                                    </Permission>
                                  </>
                                )}
                              </div>
                            </div>
                          </Permission>
                        </div>
                      </div>
                    )
                  )}
                </>
              )}
            />
            {/* add intake program leader */}
            <Route
              exact
              path={`${path}/leader/add`}
              render={() => {
                return (
                  <PopupMolecule
                    title="New Program Syllabus"
                    open
                    onClose={history.goBack}>
                    <AddProgramLeader
                      intakeProg={intakeProg}
                      intakeProgram={intakeProgram?.data.data}
                    />
                  </PopupMolecule>
                );
              }}
            />
            {/* add syllabus */}
            <Route
              exact
              path={`${path}/programSyllabus/add`}
              render={() => {
                return (
                  <PopupMolecule
                    title="New Program Syllabus"
                    open
                    onClose={history.goBack}>
                    <AddProgramSyllabus programId={intakeProg} />
                  </PopupMolecule>
                );
              }}
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
            <Route
              path={`${path}/levels/learn`}
              render={() => <IntakeProgramLevel action="learn" />}
            />
            <Route
              path={`${path}/levels/manage`}
              render={() => <IntakeProgramLevel action="manage" />}
            />
            <Route
              path={`${path}/levels/teach`}
              render={() => <IntakeProgramLevel action="teach" />}
            />
            <Route exact path={`${path}/approve`} render={() => <ApproveStudent />} />
          </Switch>
        </TabNavigation>
      </div>
    </>
  );
}

export default IntakeProgramDetails;
