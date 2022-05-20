import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import useAuthenticator from '../../hooks/useAuthenticator';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { CommonCardDataType, Privileges } from '../../types';
import { IEvaluationOwnership } from '../../types/services/evaluation.types';
import cookie from '../../utils/cookie';
import { advancedTypeChecker } from '../../utils/getOption';

interface InstructorSubjectViewerProps {
  subjectId: string;
}

export default function SubjectInstructorView({
  subjectId,
}: InstructorSubjectViewerProps) {
  const [evaluations, setEvaluations] = useState<any>([]);
  const history = useHistory();
  const { path } = useRouteMatch();

  const { user } = useAuthenticator();

  const user_role_cookie = cookie.getCookie('user_role') || '';
  const user_role = user?.user_roles?.find((role) => role.id + '' === user_role_cookie);
  const user_privileges = user_role?.role_privileges?.map((role) => role.name);
  const hasPrivilege = (privilege: Privileges) => user_privileges?.includes(privilege);

  const { data, isSuccess, isLoading, isError } = hasPrivilege(
    Privileges.CAN_MANAGE_EVALUATIONS,
  )
    ? evaluationStore.getEvaluationsByCategory(
        IEvaluationOwnership.CREATED_BY_ME,
        user?.id.toString() || '',
      )
    : evaluationStore.getEvaluationsBySubject(subjectId);

  useEffect(() => {
    let formattedEvals: CommonCardDataType[] = [];
    data?.data.data.forEach((evaluation) => {
      let formattedEvaluations = {
        id: evaluation.id,
        title: evaluation.name,
        code: evaluation.evaluation_type,
        description: `${evaluation.total_mark} marks`,
        status: {
          type: advancedTypeChecker(evaluation.evaluation_status),
          text: evaluation.evaluation_status,
        },
      };
      formattedEvals.push(formattedEvaluations);
    });
    setEvaluations(formattedEvals);
  }, [data?.data.data]);

  return (
    <div>
      <Switch>
        <Route
          exact
          path={path}
          render={() => (
            <>
              <section className="flex flex-wrap justify-start gap-4 mt-2">
                {isLoading && evaluations.length === 0 && <Loader />}

                {isSuccess && evaluations.length === 0 ? (
                  <div className="w-full">
                    <NoDataAvailable
                      icon="evaluation"
                      showButton={false}
                      title={'No evaluations available'}
                      description="Consider adding some evaluations to see them here!"
                    />
                  </div>
                ) : isSuccess && evaluations.length > 0 ? (
                  evaluations?.map((info: CommonCardDataType, index: number) => (
                    <div key={index}>
                      <CommonCardMolecule className="cursor-pointer" data={info}>
                        <div className="flex justify-between">
                          <Permission privilege={Privileges.CAN_ACCESS_EVALUATIONS}>
                            <Button
                              styleType="text"
                              onClick={() =>
                                history.push(
                                  `/dashboard/evaluations/details/${info.id}/overview`,
                                )
                              }>
                              View
                            </Button>
                          </Permission>
                        </div>
                      </CommonCardMolecule>
                    </div>
                  ))
                ) : isError ? (
                  <NoDataAvailable
                    icon="evaluation"
                    showButton={false}
                    title={'Something went wrong'}
                    description="Try refreshing the page or login again!"
                  />
                ) : null}
              </section>
            </>
          )}
        />
      </Switch>
    </div>
  );
}
