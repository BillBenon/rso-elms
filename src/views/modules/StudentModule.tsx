import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import SelectMolecule from '../../components/Molecules/input/SelectMolecule';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { authenticatorStore } from '../../store/administration';
import enrollmentStore from '../../store/administration/enrollment.store';
import { getStudentShipByUserId } from '../../store/administration/intake-program.store';
import { ValueType } from '../../types';
import { getDropDownOptions } from '../../utils/getOption';
import Modules from '.';

function StudentModule() {
  const [selectedLevel, setSelectedLevel] = useState('');
  const { search } = useLocation();
  const forceReload = new URLSearchParams(search).get('forceReload') || '';
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

  const studentLevelToDisplay = studentLevels.map(
    (lv) => lv.academic_year_program_level.academic_program_level.level,
  );

  function handleChange(e: ValueType) {
    setSelectedLevel(e.value + '');
  }

  useEffect(() => {
    if (forceReload === 'true') {
      toast.error(
        'The exam was auto submitted because you tried to exit full screen or changed tab',
        { duration: 30000 },
      );

      setTimeout(() => {
        window.location.href = '/dashboard/student';
      }, 30000);
    }
  }, [forceReload]);

  useEffect(() => {
    setSelectedLevel(
      studentLevelToDisplay.length > 0 ? studentLevelToDisplay[0].id + '' : '',
    );
  }, [levels, studentLevelToDisplay]);

  return (
    <>
      <section>
        <BreadCrumb list={list} />
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
            className="px-6"
            handleChange={handleChange}
            name={'levelId'}
            placeholder="Select Level"
            value={selectedLevel}
            options={getDropDownOptions({
              inputs: studentLevelToDisplay,
              labelName: ['name'],
            })}
          />
          <Modules level={selectedLevel} key={selectedLevel} />
        </>
      )}
    </>
  );
}

export default StudentModule;
