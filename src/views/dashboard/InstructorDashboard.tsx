import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { authenticatorStore } from '../../store/administration';
import enrollmentStore from '../../store/administration/enrollment.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { CommonCardDataType } from '../../types';
import { Instructor } from '../../types/services/instructor.types';
import { advancedTypeChecker } from '../../utils/getOption';
import ProgramIntakes from '../intakes/ProgramIntakes';

function InstructorDashboard() {
  const { url, path } = useRouteMatch();
  const history = useHistory();

  const authUser = authenticatorStore.authUser().data?.data.data;

  const instructorInfo = instructordeploymentStore.getInstructorByUserId(
    authUser?.id + '',
  ).data?.data.data;

  const [instructor, setinstructor] = useState<Instructor>();

  useEffect(() => setinstructor(instructorInfo), [instructorInfo]);
  const list = [
    { to: '/dashboard/instructor', title: 'Dashboard' },
    { to: `${url}`, title: 'Program' },
  ];

  // const { data: instructorLevel } = enrollmentStore.getInstructorLevels(
  //   instructor?.id + '',
  // );

  // const {
  //   data: ongoingInstructorModules,
  //   isLoading: ongoingLoading,
  //   isSuccess: ongoingSuccess,
  //   isError: ongoingError,
  // } = intakeProgramStore.getModulesByInstructorAndStatus(
  //   instructor?.id + '',
  //   IntakeModuleStatus.ONGOING,
  // );

  // const [ongoingModules, setOngoingModules] = useState<CommonCardDataType[]>([]);

  // useEffect(() => {
  //   if (ongoingSuccess && ongoingInstructorModules?.data) {
  //     let newModules: CommonCardDataType[] = [];
  //     ongoingInstructorModules?.data.data.forEach((mod) => {
  //       newModules.push({
  //         status: {
  //           type: advancedTypeChecker(mod.generic_status),
  //           text: mod.generic_status.toString(),
  //         },
  //         code: mod.code,
  //         title: mod.name,
  //         description: mod.description,
  //         id: mod.id,
  //       });
  //     });
  //     setOngoingModules(newModules);
  //   } else if (ongoingError) toast.error('error occurred when loading modules');
  // }, [ongoingInstructorModules?.data.data]);

  // const {
  //   data: completedInstructorModules,
  //   isLoading: completedLoading,
  //   isSuccess: completedSucess,
  //   isError: completedError,
  // } = intakeProgramStore.getModulesByInstructorAndStatus(
  //   instructor?.id + '',
  //   IntakeModuleStatus.COMPLETED,
  // );

  // const [completedModules, setCompletedModules] = useState<CommonCardDataType[]>([]);

  // useEffect(() => {
  //   if (completedSucess && completedInstructorModules?.data) {
  //     let newModules: CommonCardDataType[] = [];
  //     completedInstructorModules?.data.data.forEach((mod) => {
  //       newModules.push({
  //         status: {
  //           type: advancedTypeChecker(mod.generic_status),
  //           text: mod.generic_status.toString(),
  //         },
  //         code: mod.code,
  //         title: mod.name,
  //         description: mod.description,
  //         id: mod.id,
  //       });
  //     });
  //     setCompletedModules(newModules);
  //   } else if (completedError) toast.error('error occurred when loading modules');
  // }, [completedInstructorModules?.data.data]);

  const { data, isLoading } = enrollmentStore.getInstructorPrograms(instructor?.id + '');

  let instr_programs: CommonCardDataType[] = [];

  data?.data.data.map((p) => {
    let prog: CommonCardDataType = {
      id: p.intake_program.program.id,
      status: {
        type: advancedTypeChecker(p.intake_program.program.generic_status),
        text: p.intake_program.program.generic_status.toString(),
      },
      code: p.intake_program.program.code,
      title: p.intake_program.program.name,
      subTitle: p.intake_program.program.type.replaceAll('_', ' '),
      description: p.intake_program.program.description,
    };

    instr_programs.push(prog);
  });

  return (
    <Switch>
      <Route
        exact
        path={`${path}`}
        render={() => (
          <>
            <section>
              <BreadCrumb list={list}></BreadCrumb>
            </section>

            <section>
              <TableHeader
                showBadge
                totalItems={instr_programs.length}
                title="Programs"
              />
            </section>
            <div className="mt-4 flex gap-4 flex-wrap">
              {instr_programs.length === 0 && isLoading ? (
                <Loader />
              ) : (
                instr_programs.map((program) => (
                  <CommonCardMolecule
                    className="cursor-pointer"
                    key={program.id}
                    data={program}
                    handleClick={() => history.push(`${url}/${program.id}`)}
                  />
                ))
              )}
            </div>
          </>
        )}
      />
      <Route path={`${path}/:id`} render={() => <ProgramIntakes />} />
    </Switch>
  );
}
export default InstructorDashboard;
