/*@ts-ignore*/
import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import NewEvaluation from '../../components/Organisms/forms/evaluation/NewEvaluation';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { CommonCardDataType } from '../../types';
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

  const { data, isSuccess, isLoading, isError } =
    evaluationStore.getEvaluationsBySubject(subjectId);

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
        <Route exact path={`/dashboard/evaluations/new`} component={NewEvaluation} />
        <Route
          exact
          path={path}
          render={() => (
            <>
              <section className="flex flex-wrap justify-start gap-4 mt-2">
                {isLoading && evaluations.length === 0 && <Loader />}

                {isSuccess && evaluations.length === 0 ? (
                  <NoDataAvailable
                    icon="evaluation"
                    buttonLabel="Add new evaluation"
                    title={'No evaluations available'}
                    handleClick={() => history.push(`${path}/new`)}
                    description="And the web just isnt the same without you. Lets get you back online!"
                  />
                ) : isSuccess && evaluations.length > 0 ? (
                  evaluations?.map((info: CommonCardDataType, index: number) => (
                    <div key={index}>
                      <CommonCardMolecule
                        className="cursor-pointer"
                        data={info}
                        handleClick={() =>
                          history.push(`/dashboard/evaluations/${info.id}`)
                        }
                      />
                    </div>
                  ))
                ) : isError ? (
                  <NoDataAvailable
                    icon="evaluation"
                    buttonLabel="Create Evaluation"
                    title={'No evaluations available'}
                    handleClick={() => history.push(`/dashboard/evaluations/new`)}
                    description="And the web just isnt the same without you. Lets get you back online!"
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
