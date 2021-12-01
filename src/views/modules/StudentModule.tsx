import React from 'react';

import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { authenticatorStore } from '../../store/administration';
import {
  getIntakeProgramsByStudent,
  getStudentLevels,
  getStudentShipByUserId,
} from '../../store/administration/intake-program.store';
import { PromotionStatus } from '../../types/services/intake-program.types';
import Modules from '.';

function StudentModule() {
  const authUser = authenticatorStore.authUser().data?.data.data;

  const getStudent = getStudentShipByUserId(authUser?.id + '' || '', !!authUser?.id).data
    ?.data.data[0];

  const { data: getPrograms, isLoading: progLoading } = getIntakeProgramsByStudent(
    getStudent?.id + '',
    !!getStudent?.id,
  );

  const { data: getLevels, isLoading: levelLoading } = getStudentLevels(
    getPrograms?.data.data[0].id + '',
    !!getPrograms?.data.data[0].id,
  );

  // let programs: CommonCardDataType[] = [];

  // getPrograms?.data.data.map((p) => {
  //   let prog: CommonCardDataType = {
  //     id: p.id,
  //     status: {
  //       type: advancedTypeChecker(p.intake_program.program.generic_status),
  //       text: p.intake_program.program.generic_status.toString(),
  //     },
  //     code: p.intake_program.program.code,
  //     title: p.intake_program.program.name,
  //     subTitle: p.intake_program.program.type.replaceAll('_', ' '),
  //     description: p.intake_program.program.description,
  //   };

  //   programs.push(prog);
  // });

  return (
    <>
      {progLoading || levelLoading ? (
        <Loader />
      ) : getLevels?.data.data.length == 0 ? (
        <NoDataAvailable
          icon="level"
          showButton={false}
          title={'You have not been enrolled in any level yet'}
          description="Dear student, please contact the admin so as to get enrolled as soon as possible"
        />
      ) : getLevels?.data.data[0].promotion_status === PromotionStatus.PENDING ? (
        <Modules
          level={getLevels.data.data[0].academic_year_program_level.id.toString()}
        />
      ) : (
        <NoDataAvailable
          icon="level"
          showButton={false}
          title={'You are not allowed to study in any level.'}
          description="Sorry, it looks like you currently haven't been promoted to study in any level at this academy. Please contact the admin for support."
        />
      )}
    </>
  );
}

export default StudentModule;
