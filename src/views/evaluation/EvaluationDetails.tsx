import React from 'react';
import toast from 'react-hot-toast';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import Button from '../../components/Atoms/custom/Button';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import EvaluationContent from '../../components/Organisms/evaluation/EvaluationContent';
import AddEvaluationQuestions from '../../components/Organisms/forms/evaluation/AddEvaluationQuestions';
import { queryClient } from '../../plugins/react-query';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { ParamType } from '../../types';
import EvaluationSettingProgress from '../EvaluationSettingProgress';
import ApproveEvaluation from './ApproveEvaluation';
import Submissions from './marking/Submissions';
import ReviewEvaluation from './ReviewEvaluation';
import SectionBasedEvaluation from './SectionBasedEvaluation';
import Unbeguns from './Unbeguns';

export default function EvaluationDetails() {
  const { id } = useParams<ParamType>();
  const history = useHistory();

  const { url, path } = useRouteMatch();

  const makeEvaluationPublic = evaluationStore.publishEvaluation();
  const tabs = [
    {
      label: 'Overview evaluation',
      href: `${url}/overview`,
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
      label: 'Not attempted',
      href: `${url}/unbeguns`,
    },
    {
      label: 'Evaluation sections',
      href: `${url}/sections`,
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
          path={`${path}/review`}
          render={() => <ReviewEvaluation evaluationId={id} />}
        />
        <Route
          path={`${path}/approve`}
          render={() => <ApproveEvaluation evaluationId={id} />}
        />
        <Route
          exact
          path={`${path}/section/:id/add-questions`}
          render={() => (
            <AddEvaluationQuestions
              handleGoBack={() => history.push('/dashboard/evaluations')}
              handleNext={() => {}}
              evaluationId={id}
            />
          )}
        />
        <Route path={`${path}/section`} render={() => <SectionBasedEvaluation />} />{' '}
        <TabNavigation tabs={tabs}>
          <div className="pt-8">
            <Route exact path={`${path}/unbeguns`} render={() => <Unbeguns />} />
          </div>{' '}
          <div className="pt-8">
            <Route
              exact
              path={`${path}/sections`}
              render={() => <EvaluationSettingProgress />}
            />
          </div>
          <Route
            path={`${path}/overview`}
            render={() => (
              <EvaluationContent
                showActions={true}
                showSetQuestions={false}
                evaluationId={id}
                actionType="">
                <div className="flex gap-4">
                  <Button
                    disabled={evaluationInfo?.evaluation_status !== 'APPROVED'}
                    onClick={() => publishEvaluation('PUBLIC')}>
                    Publish evaluation
                  </Button>
                </div>
              </EvaluationContent>
            )}
          />
          <div className="pt-8">
            <Route path={`${path}/submissions`} render={() => <Submissions />} />
          </div>
        </TabNavigation>
      </Switch>
    </div>
  );
}
