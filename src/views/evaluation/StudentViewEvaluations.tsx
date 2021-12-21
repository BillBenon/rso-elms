import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import ConfirmationOrganism from '../../components/Organisms/ConfirmationOrganism';
import NewEvaluation from '../../components/Organisms/forms/evaluation/NewEvaluation';
import { CommonCardDataType } from '../../types';
import {
  IEvaluationInfo,
  IEvaluationInfoSingleEvaluation,
} from '../../types/services/evaluation.types';
import { setLocalStorageData } from '../../utils/getLocalStorageItem';
import { advancedTypeChecker } from '../../utils/getOption';
import EvaluationContent from './EvaluationContent';

interface IEvaluationProps {
  subjecEvaluations: IEvaluationInfoSingleEvaluation[] | IEvaluationInfo[];
  isCompleted?: boolean;
  isOngoing?: boolean;
  isUndone?: boolean;
  linkTo?: string;
}

export default function StudentViewEvaluations({
  subjecEvaluations = [],
  isCompleted = false,
  isOngoing = false,
  isUndone = false,
}: IEvaluationProps) {
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const history = useHistory();
  const { path, url } = useRouteMatch();

  useEffect(() => {
    setLocalStorageData('currentStep', 0);

    function isSubjectEvaludations(
      ev: IEvaluationInfo[] | IEvaluationInfoSingleEvaluation[],
    ) {
      return typeof (ev[0] as IEvaluationInfoSingleEvaluation).evaluation === 'undefined';
    }

    if (subjecEvaluations.length > 0) {
      if (!isSubjectEvaludations(subjecEvaluations)) {
        if (subjecEvaluations.length > 0 && !isUndone) {
          let formattedEvals: CommonCardDataType[] = [];

          (subjecEvaluations as IEvaluationInfoSingleEvaluation[]).forEach(
            (singleEvaluation) => {
              let formattedEvaluations = {
                studentEvaluationId: singleEvaluation.id,
                id: singleEvaluation.evaluation.id,
                title: singleEvaluation.evaluation.name,
                code: singleEvaluation.code,
                description: `${singleEvaluation.evaluation.total_mark} marks`,
                status: {
                  type: advancedTypeChecker(
                    singleEvaluation.evaluation.evaluation_status,
                  ),
                  text: singleEvaluation.evaluation.evaluation_status,
                },
              };
              formattedEvals.push(formattedEvaluations);
            },
          );
          setEvaluations(formattedEvals);
        }
      } else {
        if (isUndone || subjecEvaluations.length === 0) {
          let formattedEvals: CommonCardDataType[] = [];

          if (isSubjectEvaludations(subjecEvaluations)) {
            (subjecEvaluations as IEvaluationInfo[]).forEach((evaluation) => {
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
          }
          setEvaluations(formattedEvals);
        }
      }
    }
  }, [subjecEvaluations]);

  function handleClick(id = '', studEvaluation = '') {
    if (isCompleted) {
      history.push(
        `/dashboard/evaluations/completed/student-evaluation/${studEvaluation}/review`,
      );
    } else if (isOngoing) {
      history.push({
        pathname: `${url}/attempt/${id}`,
        search: `?studentEval=${studEvaluation}`,
      });
    } else {
      history.push(`${url}/attempt/${id}`);
    }
  }

  return (
    <div>
      <Switch>
        <Route exact path={`${path}/new`} component={NewEvaluation} />
        <Route
          exact
          path={`${path}/attempt/:id`}
          render={() => (
            <ConfirmationOrganism onConfirmationClose={() => history.goBack()} />
          )}
        />

        <Route path={`${path}/:id`} component={EvaluationContent} />
        <Route
          path={path}
          render={() => (
            <>
              <section className="grid grid-cols-2 mt-2 gap-10 w-full">
                {evaluations.length > 0 ? (
                  evaluations?.map((info: CommonCardDataType) => (
                    <CommonCardMolecule
                      key={info.id}
                      handleClick={() =>
                        handleClick(
                          info.id + '',
                          //@ts-ignore
                          info.studentEvaluationId,
                        )
                      }
                      data={info}
                    />
                  ))
                ) : (
                  <NoDataAvailable
                    icon="evaluation"
                    showButton={false}
                    title={'No evaluations available'}
                    description="And the web just isnt the same without you. Lets get you back online!"
                  />
                )}
              </section>
            </>
          )}
        />
      </Switch>
    </div>
  );
}