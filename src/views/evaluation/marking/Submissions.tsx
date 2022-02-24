import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Button from '../../../components/Atoms/custom/Button';
import Loader from '../../../components/Atoms/custom/Loader';
import Heading from '../../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../../components/Molecules/cards/NoDataAvailable';
import Table from '../../../components/Molecules/table/Table';
import { markingStore } from '../../../store/administration/marking.store';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import { ParamType } from '../../../types';
import {
  IEvaluationInfo,
  IQuestionaireTypeEnum,
} from '../../../types/services/evaluation.types';
import {
  EvaluationStudent,
  StudentEvaluationInfo,
} from '../../../types/services/marking.types';
import FieldMarkedStudent from './FieldMarkedStudent';
import FieldMarking from './FieldMarking';
import FieldStudentMarking from './FieldStudentMarking';
import ManualMarking from './ManualMarking';
import StudentAnswersMarking from './StudentAnswersMarking';
export default function Submissions() {
  const history = useHistory();
  const { id } = useParams<ParamType>();
  const resultPublisher = markingStore.publishResult();
  const [submissions, setSubmissions] = useState([]);
  const { url, path } = useRouteMatch();

  const { mutate } = markingStore.publishResults();
  const { data: evaluation } = evaluationStore.getEvaluationById(id).data?.data || {};
  const { data, isSuccess, isLoading, isError } =
    markingStore.getEvaluationStudentEvaluations(evaluation?.id + '');
  function publishEvaluationResults() {
    mutate(
      { evaluationId: evaluation?.id + '' },
      {
        onSuccess: () => {
          toast.success('Results published', { duration: 3000 });
          history.push('/dashboard/evaluations');
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      },
    );
  }

  function secondsToHms(d: number) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ' hr, ' : ' hrs, ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' min, ' : ' mins, ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? ' sec' : ' secs') : '';
    return hDisplay + mDisplay + sDisplay;
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
          'Time Used': `${secondsToHms(submission.work_time)}`,
          status: submission.marking_status,
        };
        formattedSubs.push(filteredData);
      });

      data?.data.data && setSubmissions(formattedSubs);
    }
  }, [data?.data.data, isSuccess]);

  const actions = [
    {
      name: 'Mark Answers',
      handleAction: (
        _data?: string | number | EvaluationStudent | IEvaluationInfo | undefined,
      ) => {
        history.push({ pathname: `${url}/${_data}` });
      },
    },
    {
      name: 'Publish',
      handleAction: () => {
        resultPublisher.mutate(
          { studentEvaluationId: id + '' },
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
  return (
    <div>
      <Switch>
        <Route
          exact
          path={`${path}/field/:studentId/mark`}
          component={FieldStudentMarking}
        />
        <Route
          exact
          path={`${path}/field/marked/:studentEvaluationId`}
          component={FieldMarkedStudent}
        />
        <Route exact path={`${path}/:id`} component={StudentAnswersMarking} />
        {isLoading && <Loader />}
        {evaluation?.questionaire_type === IQuestionaireTypeEnum.MANUAL && (
          <>
            <Heading fontWeight="semibold" className="pt-7">
              {evaluation.name}
            </Heading>
            <div className="w-full flex justify-end mb-4">
              <Button onClick={publishEvaluationResults}>Publish all results</Button>
            </div>
            <ManualMarking evaluationId={evaluation.id} />
          </>
        )}

        {evaluation?.questionaire_type === IQuestionaireTypeEnum.FIELD && (
          <FieldMarking evaluationId={evaluation.id} />
        )}

        {isSuccess &&
        submissions.length === 0 &&
        evaluation?.questionaire_type !==
          (IQuestionaireTypeEnum.MANUAL || IQuestionaireTypeEnum.FIELD) ? (
          <NoDataAvailable
            icon="evaluation"
            buttonLabel="Go back"
            title={'No submissions has been made so far!'}
            handleClick={() => history.push(`/dashboard/evaluations/${evaluation?.id}`)}
            description="It looks like there is any student who have submitted so far."
          />
        ) : isSuccess &&
          submissions.length > 0 &&
          evaluation?.questionaire_type !==
            (IQuestionaireTypeEnum.MANUAL || IQuestionaireTypeEnum.FIELD) ? (
          <div>
            <div className="w-full flex justify-end mb-4">
              <Button onClick={publishEvaluationResults}>Publish all results</Button>
            </div>
            <Table<StudentEvaluationInfo>
              statusColumn="status"
              data={submissions}
              hide={['id']}
              uniqueCol={'id'}
              actions={actions}
            />
          </div>
        ) : isError ? (
          <NoDataAvailable
            icon="evaluation"
            showButton={false}
            title={'Something went wrong'}
            description="Something went wrong, try reloading the page or check your internet connection"
          />
        ) : null}
      </Switch>
    </div>
  );
}
