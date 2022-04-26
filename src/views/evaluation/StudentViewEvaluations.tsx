import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import NewEvaluation from '../../components/Organisms/forms/evaluation/NewEvaluation';
import { usePrivilege } from '../../hooks/usePrivilege';
import { CommonCardDataType, Privileges } from '../../types';
import {
  IEvaluationInfo,
  IEvaluationInfoSingleEvaluation,
} from '../../types/services/evaluation.types';
import { advancedTypeChecker } from '../../utils/getOption';
import EvaluationDetails from './EvaluationDetails';

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
  const { path } = useRouteMatch();
  const { t } = useTranslation();

  const isAllowedToAnswer = usePrivilege(Privileges.CAN_ANSWER_EVALUATION);

  useEffect(() => {
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
  }, [isUndone, subjecEvaluations]);

  function handleClick(id = '', studEvaluation = '') {
    if (isCompleted) {
      history.push(
        `/dashboard/evaluations/completed/student-evaluation/${studEvaluation}/review`,
      );
    } else if (isOngoing) {
      history.push({
        pathname: `/dashboard/evaluations/attempt/${id}`,
        search: `?studentEval=${studEvaluation}?evaluation=${id}`,
      });
    } else {
      if (isAllowedToAnswer) {
        history.push(`/dashboard/evaluations/attempt/${id}`);
      } else {
        toast.error("You don't have rights to answer evaluation");
      }
    }
  }

  return (
    <div>
      <Switch>
        <Route exact path={`${path}/new`} component={NewEvaluation} />

        <Route path={`${path}/details/:id`} component={EvaluationDetails} />
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
                    description={
                      'There seems to be no evaluations added to this module yet. Please wait for' +
                      t('Instructor') +
                      " to add them or contact the administrators if you think there's a mistake!"
                    }
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
