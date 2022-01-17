import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import EvaluationContent from '../../components/Organisms/evaluation/EvaluationContent';
import { queryClient } from '../../plugins/react-query';
import { authenticatorStore } from '../../store/administration';
import { markingStore } from '../../store/administration/marking.store';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { ParamType } from '../../types';
import { IQuestionaireTypeEnum } from '../../types/services/evaluation.types';
import { UserType } from '../../types/services/user.types';
import ApproveEvaluation from './ApproveEvaluation';
import ManualMarking from './ManualMarking';
import ReviewEvaluation from './ReviewEvaluation';
import StudentAnswersMarking from './StudentAnswersMarking';

export default function EvaluationDetails() {
  const history = useHistory();
  const { id } = useParams<ParamType>();

  const { url, path } = useRouteMatch();

  const [submissions, setSubmissions] = useState([]);

  const { mutate } = markingStore.publishResults();
  const makeEvaluationPublic = evaluationStore.publishEvaluation();
  const authUser = authenticatorStore.authUser().data?.data.data;
  const resultPublisher = markingStore.publishResult();
  const tabs = [
    {
      label: 'Overview evaluation',
      href: `${url}`,
    },
    {
      label: 'Submissions',
      href: `${url}/submissions`,
    },
  ];

  const actions = [
    {
      name: 'Mark Answers',
      handleAction: (id: string | number | undefined) => {
        history.push({ pathname: `${url}/submissions/${id}` });
      },
    },
    {
      name: 'Publish',
      handleAction: (id: string | number | undefined) => {
        resultPublisher.mutate(
          { studentEvaluationId: id },
          {
            onSuccess: () => {
              toast.success('Result published', { duration: 3000 });
              history.push('/dashboard/evaluations');
              // history.push({ pathname: `${url}` });
            },
            onError: (error) => {
              console.error(error);
              toast.error(error + '');
            },
          },
        );
      },
    },
  ];

  const { data, isSuccess, isLoading, isError } =
    markingStore.getEvaluationStudentEvaluations(id);

  function publishEvaluationResults() {
    mutate(
      { evaluationId: id },
      {
        onSuccess: () => {
          toast.success('Results published', { duration: 3000 });
          history.push('/dashboard/evaluations');
        },
        onError: (error) => {
          console.error(error);
          toast.error(error + '');
        },
      },
    );
  }

  useEffect(() => {
    let formattedSubs: any = [];

    if (isSuccess && data?.data.data) {
      const filteredInfo = data?.data.data.map((submission: any) =>
        pick(submission, [
          'id',
          'code',
          'marking_status',
          'obtained_mark',
          'total_mark',
          'work_time',
        ]),
      );

      filteredInfo?.map((submission: any) => {
        let filteredData: any = {
          id: submission.id.toString(),
          'Student Code': submission.code,
          'Obtained Marks': submission.obtained_mark || 'N/A',
          'Total Marks': submission.total_mark,
          // 'Time Used': `${submission.work_time / 60} mins`,
          status: submission.marking_status,
        };
        formattedSubs.push(filteredData);
      });

      data?.data.data && setSubmissions(formattedSubs);
    }
  }, [data?.data.data, isSuccess]);

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
        <Route path={`${path}/submissions/:id`} component={StudentAnswersMarking} />
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
        <TabNavigation tabs={tabs}>
          <div className="pt-8">
            <Route
              exact
              path={`${path}/submissions`}
              render={() => (
                <>
                  {isLoading && <Loader />}
                  {isSuccess && submissions.length === 0 ? (
                    <NoDataAvailable
                      icon="evaluation"
                      buttonLabel="Go back"
                      title={'No submissions has been made so far!'}
                      handleClick={() => history.push(`/dashboard/evaluations/${id}`)}
                      description="And the web just isnt the same without you. Lets get you back online!"
                    />
                  ) : isSuccess && submissions.length > 0 ? (
                    evaluationInfo?.questionaire_type === IQuestionaireTypeEnum.MANUAL ? (
                      <ManualMarking evaluationId={id} />
                    ) : (
                      <div>
                        <div className="w-full flex justify-end mb-4">
                          <Button onClick={publishEvaluationResults}>
                            Publish all results
                          </Button>
                        </div>
                        <Table<any>
                          statusColumn="status"
                          data={submissions}
                          hide={['id']}
                          uniqueCol={'id'}
                          actions={actions}
                        />
                      </div>
                    )
                  ) : isError ? (
                    <NoDataAvailable
                      icon="evaluation"
                      showButton={false}
                      title={'Something went wrong'}
                      description="Something went wrong, try reloading the page or check your internet connection"
                    />
                  ) : null}
                </>
              )}
            />
          </div>

          {authUser?.user_type === UserType.INSTRUCTOR && (
            <Route
              exact
              path={`${path}`}
              render={() => (
                <EvaluationContent evaluationId={id}>
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
          )}
        </TabNavigation>
      </Switch>
    </div>
  );
}
