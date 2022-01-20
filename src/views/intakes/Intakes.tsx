import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import Tooltip from '../../components/Molecules/Tooltip';
import NewIntake from '../../components/Organisms/intake/NewIntake';
import UpdateIntake from '../../components/Organisms/intake/UpdateIntake';
import useAuthenticator from '../../hooks/useAuthenticator';
import enrollmentStore from '../../store/administration/enrollment.store';
import { getIntakesByAcademy } from '../../store/administration/intake.store';
import {
  getIntakeProgramsByStudent,
  getStudentShipByUserId,
} from '../../store/administration/intake-program.store';
import registrationControlStore from '../../store/administration/registrationControl.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { CommonCardDataType, Link as LinkType, ValueType } from '../../types';
import { StudentApproval } from '../../types/services/enrollment.types';
import { InstructorProgram } from '../../types/services/instructor.types';
import { ExtendedIntakeInfo } from '../../types/services/intake.types';
import { StudentIntakeProgram } from '../../types/services/intake-program.types';
import { UserType } from '../../types/services/user.types';
import { advancedTypeChecker } from '../../utils/getOption';
import IntakePrograms from '../intake-program/IntakePrograms';
import LevelPerformance from '../performance/LevelPerformance';

const list: LinkType[] = [
  { to: 'home', title: 'Institution Admin' },
  { to: 'faculty', title: 'Faculty' },
  { to: 'programs', title: 'Programs' },
  { to: 'intakes', title: 'Intakes' },
];

interface IntakeCardType extends CommonCardDataType {
  registrationControlId: string;
}

export default function Intakes() {
  const [intakes, setIntakes] = useState<IntakeCardType[]>([]);
  const { user } = useAuthenticator();

  const history = useHistory();
  const { url, path } = useRouteMatch();
  const { search } = useLocation();
  const registrationControlId = new URLSearchParams(search).get('regId');

  const {
    data: regControl,
    refetch,
    isLoading: regLoading,
    isSuccess: regSuccess,
  } = registrationControlStore.fetchRegControlById(registrationControlId!, false);

  if (registrationControlId && !regSuccess && !regLoading) refetch();

  const authUserId = user?.id;
  const instructorInfo = instructordeploymentStore.getInstructorByUserId(authUserId + '')
    .data?.data.data[0];

  const studentInfo =
    getStudentShipByUserId(
      authUserId + '',
      !!authUserId && user?.user_type === UserType.STUDENT,
    ).data?.data.data || [];

  const {
    isSuccess,
    isError,
    data,
    isLoading,
    refetch: refetchIntakes,
  } = user?.user_type === UserType.STUDENT
    ? getIntakeProgramsByStudent(
        studentInfo[0]?.id.toString() || '',
        !!studentInfo[0]?.id,
      )
    : user?.user_type === UserType.INSTRUCTOR
    ? enrollmentStore.getInstructorIntakePrograms(instructorInfo?.id + '')
    : getIntakesByAcademy(
        registrationControlId || user?.academy.id.toString()!,
        !!registrationControlId,
        true,
      );

  useEffect(() => {
    if (isSuccess && data?.data) {
      let loadedIntakes: IntakeCardType[] = [];
      data?.data.data.forEach((intk) => {
        if (user?.user_type === UserType.STUDENT) {
          let intake = intk as StudentIntakeProgram;
          if (intake && intake.enrolment_status === StudentApproval.APPROVED) {
            let prog: IntakeCardType = {
              id: intake.intake_program.intake.id,
              status: {
                type: advancedTypeChecker(intake.intake_program.intake.intake_status),
                text: intake.intake_program.intake.intake_status.toString(),
              },
              code: intake.intake_program.intake.code,
              title: intake.intake_program.intake.title,
              description: intake.intake_program.intake.description,
              registrationControlId:
                intake.intake_program.intake.registration_control?.id + '',
            };
            if (!loadedIntakes.find((pg) => pg.id === prog.id)?.id) {
              loadedIntakes.push(prog);
            }
          }
        } else if (user?.user_type === UserType.INSTRUCTOR) {
          let intake = intk as InstructorProgram;
          let prog: IntakeCardType = {
            id: intake.intake_program.intake.id,
            status: {
              type: advancedTypeChecker(intake.intake_program.intake.intake_status),
              text: intake.intake_program.intake.intake_status.toString(),
            },
            code: intake.intake_program.intake.code,
            title: intake.intake_program.intake.title,
            description: intake.intake_program.intake.description,
            registrationControlId:
              intake.intake_program.intake.registration_control?.id + '',
          };
          if (!loadedIntakes.find((pg) => pg.id === prog.id)?.id) {
            loadedIntakes.push(prog);
          }
        } else {
          let intake = intk as ExtendedIntakeInfo;
          let cardData: IntakeCardType = {
            id: intake.id,
            code: intake.code.toUpperCase(),
            description: intake.description,
            title: intake.title || `------`,
            status: {
              type: advancedTypeChecker(intake.intake_status),
              text: intake.intake_status.toString(),
            },
            registrationControlId: intake.registration_control.id + '',
          };
          loadedIntakes.push(cardData);
        }
      });

      setIntakes(loadedIntakes);
    } else if (isError) toast.error('error occurred when loading intakes');
  }, [user?.user_type, data, isError, isSuccess]);

  function handleSearch(_e: ValueType) {}
  function handleClose() {
    history.goBack();
  }

  function regControlName() {
    return `${moment(regControl?.data.data.expected_start_date).format(
      'MMM D YYYY',
    )} - ${moment(regControl?.data.data.expected_end_date).format('MMM D YYYY')}`;
  }

  function intakeCreated() {
    refetchIntakes();
    history.goBack();
  }

  return (
    <Switch>
      <Route
        path={`${path}/programs/:intakeId`}
        render={() => {
          return <IntakePrograms />;
        }}
      />
      <Route
        path={`${path}/peformance/:levelId`}
        render={() => {
          return <LevelPerformance />;
        }}
      />
      <Route
        path={`${path}`}
        render={() => {
          return (
            <div>
              <BreadCrumb list={list} />
              <TableHeader
                title={`${registrationControlId ? regControlName() : 'Intakes'}`}
                totalItems={
                  registrationControlId
                    ? `${intakes.length} intakes`
                    : `${intakes.length}`
                }
                handleSearch={handleSearch}>
                {registrationControlId && (
                  <Link to={`${url}/${registrationControlId}/add-intake`}>
                    <Button>Add Intake</Button>
                  </Link>
                )}
              </TableHeader>

              <section className="flex flex-wrap justify-start gap-4 mt-2">
                {intakes.map((intake, index) => (
                  <div key={intake.code + Math.random() * 10} className="p-1 mt-3">
                    <Tooltip
                      key={intake.code + Math.random() * 10}
                      trigger={
                        <div className="p-1 mt-3">
                          <CommonCardMolecule
                            data={intake}
                            handleClick={() =>
                              history.push(`${url}/programs/${intake.id}`)
                            }
                          />
                        </div>
                      }
                      open>
                      <div className="w-96">
                        <div className="flex flex-col gap-6">
                          <div className="flex flex-col gap-2">
                            <Heading color="txt-secondary" fontSize="sm">
                              Total Students Enroled
                            </Heading>
                            <Heading fontSize="sm" fontWeight="semibold">
                              {
                                //@ts-ignore
                                data?.data.data[index].total_num_students || 0
                              }
                            </Heading>
                          </div>
                        </div>

                        <div>
                          <Link
                            className="outline-none"
                            to={`${url}/programs/${intake.id}`}>
                            <Button styleType="text">View programs</Button>
                          </Link>
                        </div>
                        <div className="mt-4 space-x-4">
                          <Link
                            to={`${url}/${intake.id}/edit/${intake.registrationControlId}`}>
                            <Button>Edit Intake</Button>
                          </Link>
                          <Button styleType="outline">Change Status</Button>
                        </div>
                      </div>
                    </Tooltip>
                  </div>
                ))}

                {isLoading ? (
                  <Loader />
                ) : (
                  intakes.length <= 0 && (
                    <NoDataAvailable
                      fill={false}
                      icon="academy"
                      buttonLabel={
                        registrationControlId
                          ? 'Add Intake '
                          : 'Go to registration control'
                      }
                      title={
                        registrationControlId
                          ? 'No intake available in this reg Control'
                          : 'No intake available'
                      }
                      showButton={user?.user_type === UserType.ADMIN}
                      handleClick={() => {
                        if (registrationControlId)
                          history.push(`${url}/${registrationControlId}/add-intake`);
                        else history.push('/dashboard/registration-control');
                      }}
                      description={`${
                        user?.user_type === UserType.STUDENT
                          ? 'You have not been approved to any intake yet!'
                          : user?.user_type === UserType.INSTRUCTOR
                          ? 'You have not been enrolled to teach any intake yet!'
                          : "There haven't been any intakes added yet! try adding some from the button below."
                      }`}
                    />
                  )
                )}
              </section>

              <Switch>
                {/* add intake to reg control */}
                <Route
                  exact
                  path={`${path}/:id/add-intake`}
                  render={() => {
                    return (
                      <PopupMolecule
                        closeOnClickOutSide={false}
                        title="New intake"
                        open
                        onClose={handleClose}>
                        <NewIntake handleSuccess={intakeCreated} />
                      </PopupMolecule>
                    );
                  }}
                />
                <Route
                  exact
                  path={`${path}/:id/edit/:regid`}
                  render={() => {
                    return (
                      <PopupMolecule
                        closeOnClickOutSide={false}
                        title="Update intake"
                        open
                        onClose={handleClose}>
                        <UpdateIntake handleSuccess={handleClose} />
                      </PopupMolecule>
                    );
                  }}
                />
              </Switch>
            </div>
          );
        }}
      />
    </Switch>
  );
}
