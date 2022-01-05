import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import SelectMolecule from '../../components/Molecules/input/SelectMolecule';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { authenticatorStore } from '../../store/administration';
import enrollmentStore from '../../store/administration/enrollment.store';
import { getStudentShipByUserId } from '../../store/administration/intake-program.store';
import { ValueType } from '../../types';
import { StudentEnrollmentLevel } from '../../types/services/enrollment.types';
import { getDropDownOptions } from '../../utils/getOption';
import Modules from '.';

interface IStudentModuleState {
  levelId: number;
  level: StudentEnrollmentLevel | undefined;
}

function StudentModule() {
  const [selectedLevel, setSelectedLevel] = useState<IStudentModuleState>({
    levelId: 0,
    level: undefined,
  });
  const { url } = useRouteMatch();
  const list = [
    { to: '/dashboard/student', title: 'Dashboard' },
    { to: `${url}`, title: 'module' },
  ];
  const authUser = authenticatorStore.authUser().data?.data.data;

  const { data: student, isLoading: studLoad } = getStudentShipByUserId(
    authUser?.id + '' || '',
    !!authUser?.id,
  );

  const { data: levels, isLoading: levelLoading } =
    enrollmentStore.getAllStudentEnrollments({
      page: 0,
      pageSize: 100000000,
      sortyBy: 'createdOn',
    });

  const studentLevels =
    levels?.data.data.content.filter(
      (lv) => lv.intake_program_student.student.id === student?.data.data[0]?.id,
    ) || [];

  function handleChange(e: ValueType) {
    setSelectedLevel({
      ...selectedLevel,
      [e.name]: e.value,
      level: studentLevels.find((lv) => lv.id === e.value),
    });
  }

  return (
    <>
      <section>
        <BreadCrumb list={list}></BreadCrumb>
      </section>
      <TableHeader showSearch={false} showBadge={false} title="Enrolled Modules" />

      {studLoad || levelLoading ? (
        <Loader />
      ) : studentLevels.length == 0 ? (
        <NoDataAvailable
          icon="level"
          showButton={false}
          title={'You have not been enrolled in any level yet'}
          description="Dear student, please contact the admin so as to get enrolled as soon as possible"
        />
      ) : (
        <>
          <SelectMolecule
            handleChange={handleChange}
            name={'levelId'}
            placeholder="Select Level"
            value={selectedLevel.levelId + ''}
            options={getDropDownOptions({
              inputs: studentLevels,
              //@ts-ignore
              getOptionLabel: (lv: StudentEnrollmentLevel) =>
                lv.academic_year_program_level.academic_program_level.level.id,
            })}
          />
          <Heading>
            {
              selectedLevel.level?.academic_year_program_level.academic_program_level
                .level.name
            }
          </Heading>
          <Modules
            level={selectedLevel.level?.academic_year_program_level.academic_program_level.id.toString()}
            key={selectedLevel.level?.id}
          />
        </>
      )}
    </>
  );
}

export default StudentModule;
