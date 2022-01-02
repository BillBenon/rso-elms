import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import NewEvaluation from '../../components/Organisms/forms/evaluation/NewEvaluation';
import { authenticatorStore } from '../../store/administration';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { CommonCardDataType, Link as LinkList } from '../../types';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../utils/getLocalStorageItem';
import { advancedTypeChecker } from '../../utils/getOption';
import EvaluationContent from './EvaluationContent';

export default function InstructorViewEvaluations() {
  const [evaluations, setEvaluations] = useState<any>([]);
  const history = useHistory();
  const { path } = useRouteMatch();
  const authUser = authenticatorStore.authUser().data?.data.data;
  const { data, isSuccess, isLoading, isError } = evaluationStore.getEvaluations(
    authUser?.academy.id.toString() || '',
    authUser?.id.toString() || '',
  );

  const list: LinkList[] = [
    { to: '/', title: 'home' },
    { to: 'evaluations', title: 'evaluations' },
  ];

  useEffect(() => {
    if (!getLocalStorageData('currentStep')) {
      setLocalStorageData('currentStep', 0);
    }

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
        <Route exact path={`${path}/new`} component={NewEvaluation} />
        <Route path={`${path}/:id`} component={EvaluationContent} />
        <Route
          exact
          path={path}
          render={() => (
            <>
              {path === '/dashboard/evaluations' ? (
                <>
                  <section>
                    <BreadCrumb list={list}></BreadCrumb>
                  </section>
                </>
              ) : null}

              <section className="flex flex-wrap justify-start gap-4 mt-2">
                {isLoading && evaluations.length === 0 && <Loader />}

                {isSuccess && evaluations.length === 0 ? (
                  <NoDataAvailable
                    icon="evaluation"
                    showButton={false}
                    title={'No evaluations available'}
                    description="Consider adding some evaluation to see them here!"
                  />
                ) : isSuccess && evaluations.length > 0 ? (
                  evaluations?.map((info: CommonCardDataType, index: number) => (
                    <div key={index}>
                      <CommonCardMolecule
                        className="cursor-pointer"
                        data={info}
                        handleClick={() => history.push(`${path}/${info.id}`)}
                      />
                    </div>
                  ))
                ) : isError ? (
                  <NoDataAvailable
                    icon="evaluation"
                    showButton={false}
                    title={'No evaluations available'}
                    description="Consider adding some evaluation to see them here!"
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
