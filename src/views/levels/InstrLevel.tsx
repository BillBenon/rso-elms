import React from 'react';

import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import enrollmentStore from '../../store/administration/enrollment.store';
import intakeProgramStore from '../../store/administration/intake-program.store';

function InstructorLevel({
  levelId,
  intakeProg,
}: {
  levelId: string;
  intakeProg: string;
}) {
  const levels =
    enrollmentStore.getInstructorEnrollmentLevelByLevelId(levelId).data?.data.data || [];
  const intakelevel =
    intakeProgramStore.getLevelsByIntakeProgram(intakeProg).data?.data.data;

  const levs = intakelevel?.filter(
    (level) =>
      level.academic_program_level.id ===
      levels.find(
        (lev) => lev.academic_year_program_level.academic_program_level.id === level.academic_program_level.id,
      )?.academic_year_program_level.academic_program_level.id,
  );

  return (
    <main>
      <div className="flex flex-col gap-2">
        {levs && levs.length > 0 ? (
          <>
            {levs.map((level) => (
              // to={`/dashboard/instructor/${intakeProg}/${level?.academic_program_level.id}`}>
              // <Link key={level.id} to={`${url}/${level?.academic_program_level.id}`}>
              // </Link>
              <div className="flex items-center" key={level.id}>
                <Icon name="chevron-right" />
                <Heading fontSize="sm" fontWeight="semibold">
                  {level.academic_program_level.level.name}
                </Heading>
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
function InstrLevel({ intakeProg }: { intakeProg: string }) {
  const { data } = intakeProgramStore.getLevelsByIntakeProgram(intakeProg);
  const levels = data?.data.data || [];

  return (
    <>
      {levels.length === 0 ? (
        <Heading color="txt-secondary" fontSize="sm">
          There are no levels in this intake
        </Heading>
      ) : (
        <>
          <Heading color="txt-secondary" fontSize="sm" className="pt-2">
            Levels assigned to you
          </Heading>
          {levels.map((level) => (
            <InstructorLevel
              key={level.id}
              levelId={level.academic_program_level.id + ''}
              intakeProg={intakeProg}
            />
          ))}
        </>
      )}
    </>
  );
}

export default InstrLevel;
