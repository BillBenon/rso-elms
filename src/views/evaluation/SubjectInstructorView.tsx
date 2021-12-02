/*@ts-ignore*/
import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import NewEvaluation from '../../components/Organisms/forms/evaluation/NewEvaluation';
import { CommonCardDataType } from '../../types';
import { IEvaluationInfo } from '../../types/services/evaluation.types';
import { advancedTypeChecker } from '../../utils/getOption';
import EvaluationContent from './EvaluationContent';

interface IEvaluationProps {
  data: IEvaluationInfo[] | undefined;
}

export default function SubjectInstructorView({ data }: IEvaluationProps) {
  const [evaluations, setEvaluations] = useState<any>([]);
  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    let formattedEvals: CommonCardDataType[] = [];
    data?.forEach((evaluation: any) => {
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
  }, [data]);

  return (
    <div>
      <Switch>
        <Route exact path={`/dashboard/evaluations/new`} component={NewEvaluation} />
        <Route path={`${path}/:id`} component={EvaluationContent} />
        <Route
          exact
          path={path}
          render={() => (
            <>
              <section className="flex flex-wrap justify-start gap-4 mt-2">
                {evaluations.length === 0 ? (
                  <NoDataAvailable
                    icon="evaluation"
                    buttonLabel="Add new evaluation"
                    title={'No evaluations available'}
                    handleClick={() => history.push(`/dashboard/evaluations/new`)}
                    description="And the web just isnt the same without you. Lets get you back online!"
                  />
                ) : evaluations.length > 0 ? (
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
                ) : null}
              </section>
            </>
          )}
        />
      </Switch>
    </div>
  );
}
