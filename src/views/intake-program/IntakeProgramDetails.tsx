import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

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
import intakeProgramStore from '../../store/administration/intake-program.store';
import programStore from '../../store/administration/program.store';
import { Link as Links } from '../../types';
import { StudentApproval } from '../../types/services/enrollment.types';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import { UserView } from '../../types/services/user.types';
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

  const programData = getProgramData();
  const tabs: TabType[] = [
    {
      label: 'Program info',
      href: `${url}`,
    },
    {
      label: 'Program modules',
      href: `${url}/modules`,
    },
    {
      label: 'Program levels',
      href: `${url}/levels/${getLevels[0]?.id || ''}`,
    },
    {
      label: 'Approve students',
      href: `${url}/approve`,
    },
  ];

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
            <div className="flex justify-end">
              <Link
                to={`/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/add-level`}>
                <Button>Add Level</Button>
              </Link>
            </div>
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
                          </CommonCardMolecule>
                        </div>
                        <div className="flex flex-col gap-8 z-0">
                          <UsersPreview
                            title="Students"
                            label="Students in Cadette programs"
                            data={students}
                            totalUsers={students.length || 0}
                            dataLabel={''}
                            isLoading={studLoading}>
                            <EnrollStudentIntakeProgram />
                          </UsersPreview>

                          <UsersPreview
                            title="Instructors"
                            label="Instructors in Cadette programs"
                            data={instructors}
                            totalUsers={instructors.length || 0}
                            dataLabel={''}
                            isLoading={instLoading}>
                            <EnrollInstructorIntakeProgram />
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
