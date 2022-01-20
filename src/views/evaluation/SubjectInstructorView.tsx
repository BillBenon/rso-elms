import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { authenticatorStore } from '../../store/administration';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { CommonCardDataType } from '../../types';
import { IEvaluationOwnership } from '../../types/services/evaluation.types';
import { UserType } from '../../types/services/user.types';
import { setLocalStorageData } from '../../utils/getLocalStorageItem';
import { advancedTypeChecker } from '../../utils/getOption';

interface InstructorSubjectViewerProps {
  subjectId: string;
}

export default function SubjectInstructorView({
  subjectId,
}: InstructorSubjectViewerProps) {
  const [evaluations, setEvaluations] = useState<any>([]);
  const history = useHistory();
  const { search } = useLocation();
  const { path } = useRouteMatch();

  const authUser = authenticatorStore.authUser().data?.data.data;

  const instructorInfo = instructordeploymentStore.getInstructorByUserId(
    authUser?.id + '',
  ).data?.data.data[0];

  const intakeProg = new URLSearchParams(search).get('intkPrg') || '';
  const progId = new URLSearchParams(search).get('prog') || '';
  const level = new URLSearchParams(search).get('lvl') || '';
  const period = new URLSearchParams(search).get('prd') || '';

  const { data, isSuccess, isLoading, isError } =
    authUser?.user_type === UserType.INSTRUCTOR
      ? evaluationStore.getEvaluationsByCategory(
          IEvaluationOwnership.CREATED_BY_ME,
          instructorInfo?.id.toString() || '',
        )
      : evaluationStore.getEvaluationsBySubject(subjectId);

  function goToEditEvaluation(info: CommonCardDataType) {
    setLocalStorageData('currentStep', 0);
    history.push({
      pathname: `/dashboard/evaluations/new`,
      search: `?subj=${subjectId}&evaluation=${info.id}&intkPrg=${intakeProg}&prog=${progId}&lvl=${level}&prd=${period}`,
    });
  }

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
                          <Button
                            styleType="text"
                            onClick={() => goToEditEvaluation(info)}>
                            Edit
                          </Button>
                          <Button
                            styleType="text"
                            onClick={() =>
                              history.push(`/dashboard/evaluations/${info.id}`)
                            }>
                            View
                          </Button>
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
