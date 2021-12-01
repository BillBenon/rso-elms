/*@ts-ignore*/
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import ConfirmationOrganism from '../../components/Organisms/ConfirmationOrganism';
import NewEvaluation from '../../components/Organisms/forms/evaluation/NewEvaluation';
import { authenticatorStore } from '../../store/administration';
import { evaluationStore } from '../../store/administration/evaluation.store';
import { CommonCardDataType } from '../../types';
import {
  IEvaluationInfo,
  IEvaluationInfoSingleEvaluation,
  IStudentEvaluationStart,
} from '../../types/services/evaluation.types';
import { setLocalStorageData } from '../../utils/getLocalStorageItem';
import { advancedTypeChecker } from '../../utils/getOption';
import EvaluationContent from './EvaluationContent';

interface IEvaluationProps {
  subjecEvaluations: IEvaluationInfoSingleEvaluation[] | IEvaluationInfo[];
  isUndone?: boolean;
  isOngoing?: boolean;
  usePopup?: boolean;
  isCompleted?: boolean;
  linkTo?: string;
}

export default function StudentViewEvaluations({
  subjecEvaluations = [],
  linkTo = '',
  usePopup = false,
  isOngoing = false,
  isUndone = false,
  isCompleted = false,
}: IEvaluationProps) {
  const [evaluations, setEvaluations] = useState<any>([]);
  const [confirm, showConfirmation] = useState(false);
  const history = useHistory();
  const { path } = useRouteMatch();
  const authUser = authenticatorStore.authUser().data?.data.data;

  //function that moves a student to next page after generating student code
  function goToNext(id: string) {
    if (linkTo) {
      history.push(linkTo);
    } else {
      history.push(`/dashboard/evaluations/student-evaluation/${id}`);
    }
  }

  const { mutateAsync, isLoading: loading } = evaluationStore.studentEvaluationStart();

  function checkEvaluationType(id: any) {
    if (isCompleted == true) {
      console.log(path);
      history.push(`/dashboard/evaluations/completed/student-evaluation/${id}/review`);
    } else {
      usePopup && showConfirmation(true);
    }
  }

  function generateStudentCode(id = '', studentEval: string) {
    const studentEvaluationStart: IStudentEvaluationStart = {
      attachment: '',
      evaluation_id: id,
      student_id: authUser?.id.toString() || '',
    };

    if (isOngoing) {
      setLocalStorageData('studentEvaluationId', studentEval);
      goToNext(studentEvaluationStart.evaluation_id);
    } else if (isCompleted) {
      history.push(`/dashboard/evaluations/completed/student-evaluation/${id}/review`);
    } else {
      mutateAsync(studentEvaluationStart, {
        onSuccess: (studentInfo) => {
          setLocalStorageData('studentEvaluationId', studentInfo.data.data.id);
          toast.success('Generated evaluation code', { duration: 5000 });
          goToNext(studentEvaluationStart.evaluation_id);
        },
        onError: () => {
          toast.error("The evaluation isn't already started!");
        },
      });
    }
  }

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

  return (
    <div>
      <Switch>
        <Route exact path={`${path}/new`} component={NewEvaluation} />
        <Route path={`${path}/:id`} component={EvaluationContent} />
        {/* <Route path={`${path}/completed/:id`} component={StudentReview} /> */}
        <Route
          exact
          path={path}
          render={() => (
            <>
              <section className="grid grid-cols-2 mt-2 gap-10 w-full">
                {evaluations.length > 0 ? (
                  evaluations?.map((info: any, index: number) => (
                    <div key={index} className="w-full">
                      <ConfirmationOrganism
                        loading={loading}
                        open={confirm}
                        onProceed={() =>
                          generateStudentCode(
                            info.id?.toString(),
                            /*@ts-ignore*/
                            info.studentEvaluationId,
                          )
                        }
                        title={info.title}
                        id={info.id || ''}
                        onConfirmationClose={() => showConfirmation(false)}
                      />

                      <CommonCardMolecule
                        handleClick={() => checkEvaluationType(info.studentEvaluationId)}
                        data={info}
                      />
                    </div>
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
