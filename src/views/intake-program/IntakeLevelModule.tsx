import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import AddCard from '../../components/Molecules/cards/AddCard';
import ModuleCard from '../../components/Molecules/cards/modules/ModuleCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import TableHeader from '../../components/Molecules/table/TableHeader';
import useAuthenticator from '../../hooks/useAuthenticator';
import enrollmentStore from '../../store/administration/enrollment.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { CommonCardDataType } from '../../types';
import { IntakeLevelParam } from '../../types/services/intake-program.types';
import { UserType } from '../../types/services/user.types';
import { advancedTypeChecker } from '../../utils/getOption';
import EnrollInstructorToLevel from './EnrollInstructorToLevel';
import EnrollStudent from './EnrollStudent';
import LevelInstrctors from './LevelInstructors';
import LevelStudents from './LevelStudents';

function IntakeLevelModule() {
  const history = useHistory();
  const { id, intakeId, intakeProg, level } = useParams<IntakeLevelParam>();

  const [levelModules, setlevelModules] = useState<CommonCardDataType[]>([]);

  const { data: instructorProgramLevel, isLoading: instructorsLoading } =
    enrollmentStore.getInstructorsInProgramLevel(level);
  const { data: levelModuleStore, isLoading } = intakeProgramStore.getModulesByLevel(
    parseInt(level),
  );

  const initialShowSidebar = {
    showStudent: false,
    showInstructor: false,
    enrollStudent: false,
    enrollInstructor: false,
  };
  const [showSidebar, setShowSidebar] = useState(initialShowSidebar);

  useEffect(() => {
    let newModule: CommonCardDataType[] = [];
    levelModuleStore?.data.data.forEach((mod) => {
      newModule.push({
        status: {
          type: advancedTypeChecker(mod.generic_status),
          text: mod.generic_status.toString(),
        },
        id: mod.module.id,
        code: mod.module.code,
        title: mod.module.name,
        description: mod.module.description,
        subTitle: `total subject: ${mod.module.total_num_subjects || 'None'}`,
      });
    });

    setlevelModules(newModule);
  }, [levelModuleStore?.data.data]);

  const { data: periods, isLoading: prdLoading } = intakeProgramStore.getPeriodsByLevel(
    parseInt(level),
  );

  // const { data: classes } = classStore.getClassByPeriod(periods?.data.data[0].id + '');
  const { user } = useAuthenticator();

  return (
    <>
      <TableHeader usePadding={false} showBadge={false} showSearch={false}>
        {/* <Button styleType="outline">Enrolled Students</Button>
        <Button styleType="outline">Enrolled Instructors</Button> */}
        {/* <div className='py-2.5 border px-4 rounded-lg border-primary-500 text-primary-500 font-semibold text-sm'>Enrolled Students</div>
        <div className='py-2.5 border px-4 rounded-lg border-primary-500 text-primary-500 font-semibold text-sm'>Enrolled Instructors</div> */}
        {user?.user_type === UserType.ADMIN && (
          <>
            <LevelInstrctors
              isLoading={instructorsLoading}
              instructorsData={instructorProgramLevel?.data.data || []}
              showSidebar={showSidebar.showInstructor}
              handleShowSidebar={() =>
                setShowSidebar({
                  ...initialShowSidebar,
                  showInstructor: !showSidebar.showInstructor,
                })
              }
            />
            <EnrollInstructorToLevel
              existing={instructorProgramLevel?.data.data || []}
              showSidebar={showSidebar.enrollInstructor}
              handleShowSidebar={() =>
                setShowSidebar({
                  ...initialShowSidebar,
                  enrollInstructor: !showSidebar.enrollInstructor,
                })
              }
            />
            <LevelStudents
              showSidebar={showSidebar.showStudent}
              handleShowSidebar={() =>
                setShowSidebar({
                  ...initialShowSidebar,
                  showStudent: !showSidebar.showStudent,
                })
              }
            />
            <EnrollStudent
              showSidebar={showSidebar.enrollStudent}
              handleShowSidebar={() =>
                setShowSidebar({
                  ...initialShowSidebar,
                  enrollStudent: !showSidebar.enrollStudent,
                })
              }
            />
          </>
        )}
        {prdLoading ? (
          <></>
        ) : periods?.data.data.length === 0 ? (
          user?.user_type === UserType.ADMIN && (
            <Button
              styleType="outline"
              onClick={() =>
                history.push(
                  `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/add-period`,
                )
              }>
              Add period
            </Button>
          )
        ) : (
          <Button
            styleType="outline"
            onClick={() =>
              history.push(
                `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/view-period/${periods?.data.data[0].id}/view-class`,
              )
            }>
            View periods
          </Button>
        )}
      </TableHeader>
      <section className="mt-4 flex flex-wrap justify-start gap-4">
        {isLoading ? (
          <Loader />
        ) : levelModules.length <= 0 ? (
          <NoDataAvailable
            showButton={user?.user_type === UserType.ADMIN}
            buttonLabel="Add new modules"
            title={'No modules available in this level'}
            handleClick={() =>
              history.push(
                `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/${level}/add-module`,
              )
            }
            description="This level has not received any planned modules to take. you can add one from the button below."
          />
        ) : (
          <>
            {user?.user_type === UserType.ADMIN && (
              <AddCard
                title={'Add new module'}
                onClick={() =>
                  history.push(
                    `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/${level}/add-module`,
                  )
                }
              />
            )}
            {levelModules &&
              levelModules.map((module, index) => (
                <ModuleCard
                  showMenus={true}
                  course={module}
                  key={index}
                  intakeProg={''}
                />
              ))}
          </>
        )}
      </section>
    </>
  );
}

export default IntakeLevelModule;
