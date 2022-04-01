import React from 'react';
import toast from 'react-hot-toast';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import EvaluationContent from '../../components/Organisms/evaluation/EvaluationContent';
import AddEvaluationQuestions from '../../components/Organisms/forms/evaluation/AddEvaluationQuestions';
import { queryClient } from '../../plugins/react-query';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { ParamType } from '../../types';
import ApproveEvaluation from './ApproveEvaluation';
import Submissions from './marking/Submissions';
import ReviewEvaluation from './ReviewEvaluation';
import SectionBasedEvaluation from './SectionBasedEvaluation';
import Unbeguns from './Unbeguns';

export default function EvaluationDetails() {
  const { id } = useParams<ParamType>();

  const { url, path } = useRouteMatch();
  const makeEvaluationPublic = evaluationStore.publishEvaluation();
  const tabs = [
    {
      label: 'Overview evaluation',
      href: `${url}`,
    },
    {
      label: 'Submissions',
      href: `${url}/submissions`,
    },
    // {
    //   label: 'Ongoing',
    //   href: `${url}/ongoing-submissions`,
    // },
    {
      label: 'Defiance/To start',
      href: `${url}/unbeguns`,
    },
  ];

  const { data: evaluationInfo } = evaluationStore.getEvaluationById(id).data?.data || {};

  const publishEvaluation = (status: string) => {
    makeEvaluationPublic.mutate(
      { evaluationId: id, status: status },
      {
        onSuccess: () => {
          toast.success('Availability status updated', { duration: 3000 });
          queryClient.invalidateQueries(['evaluation']);
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      },
    );
  };

  return (
    <div className="block pr-24 pb-8 w-11/12">
      <Switch>
        <Route
          exact
          path={`${path}/review`}
          render={() => <ReviewEvaluation evaluationId={id} />}
        />
        <Route
          exact
          path={`${path}/approve`}
          render={() => <ApproveEvaluation evaluationId={id} />}
        />
        <Route exact path={`${path}/section`} render={() => <SectionBasedEvaluation />} />{' '}
        <Route
          exact
          path={`${path}/section/:id/add-questions`}
          render={() => (
            <AddEvaluationQuestions
              handleGoBack={() => {}}
              handleNext={() => {}}
              evaluationId={id}
            />
          )}
        />
        <TabNavigation tabs={tabs}>
          <div className="pt-8">
            <Route path={`${path}/submissions`} render={() => <Submissions />} />
          </div>

          <div className="pt-8">
            <Route exact path={`${path}/unbeguns`} render={() => <Unbeguns />} />
          </div>

          <Route
            exact
            path={`${path}`}
            render={() => (
              <EvaluationContent evaluationId={id} actionType="">
                <div className="flex gap-4">
                  {/* <Button
                      styleType="outline"
                      onClick={() =>
                        history.push({
                          pathname: `/dashboard/evaluations/new`,
                          search: `?evaluation=${id}`,
                        })
                      }>
                      Edit evaluation
                    </Button> */}

                  <Button
                    disabled={evaluationInfo?.evaluation_status !== 'APPROVED'}
                    onClick={() => publishEvaluation('PUBLIC')}>
                    Publish evaluation
                  </Button>

                  {/* {evaluationInfo?.available === 'HIDDEN' ? (
                    <Button
                      disabled={evaluationInfo?.evaluation_status !== 'APPROVED'}
                      onClick={() => publishEvaluation('PUBLIC')}>
                      Publish evaluation
                    </Button>
                  ) : (
                    <Button
                      disabled={evaluationInfo?.evaluation_status !== 'APPROVED'}
                      onClick={() => publishEvaluation('HIDDEN')}>
                      Unpublish evaluation
                    </Button>
                  )} */}
                </div>
              </EvaluationContent>
            )}
          />
        </TabNavigation>
      </Switch>
    </div>
  );
}
