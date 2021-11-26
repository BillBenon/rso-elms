import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';

import Loader from '../../components/Atoms/custom/Loader';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { authenticatorStore } from '../../store/administration';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { CommonCardDataType } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';
import StudentLevel from '../levels/StudentLevel';

function StudentDashboard() {
  const { url, path } = useRouteMatch();
  const history = useHistory();

  const authUser = authenticatorStore.authUser().data?.data.data;

  const getStudent = intakeProgramStore.getStudentShipByUserId(authUser?.id + '' || '')
    .data?.data.data[0];

  const { data: getPrograms, isLoading } = intakeProgramStore.getIntakeProgramsByStudent(
    getStudent?.id + '',
  );

  let programs: CommonCardDataType[] = [];

  getPrograms?.data.data.map((p) => {
    let prog: CommonCardDataType = {
      id: p.id,
      status: {
        type: advancedTypeChecker(p.intake_program.program.generic_status),
        text: p.intake_program.program.generic_status.toString(),
      },
      code: p.intake_program.program.code,
      title: p.intake_program.program.name,
      subTitle: p.intake_program.program.type.replaceAll('_', ' '),
      description: p.intake_program.program.description,
    };

    programs.push(prog);
  });

  return (
    <Switch>
      <Route
        exact
        path={`${path}`}
        render={() => (
          <>
            <section>
              <TableHeader
                showSearch={false}
                showBadge={false}
                title="Enrolled program"
                totalItems={programs.length || 0}
              />
            </section>
            <div className="mt-4 flex gap-4 flex-wrap">
              {programs.length === 0 && isLoading ? (
                <Loader />
              ) : (
                programs.map((program) => (
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

      <Route exact path={`${path}/:id`} render={() => <StudentLevel />} />
    </Switch>
  );
}

export default StudentDashboard;
