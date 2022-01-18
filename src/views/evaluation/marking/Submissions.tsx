import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

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
import { StudentEvaluationInfo } from '../../../types/services/marking.types';
import { Student } from '../../../types/services/user.types';
import ManualMarking from './ManualMarking';
export default function Submissions() {
  const history = useHistory();
  const { id } = useParams<ParamType>();
  const resultPublisher = markingStore.publishResult();
  const [submissions, setSubmissions] = useState([]);
  const { url } = useRouteMatch();

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

  const actions = [
    {
      name: 'Mark Answers',
      handleAction: (id: string | number | undefined | IEvaluationInfo | Student) => {
        history.push({ pathname: `${url}/${id}` });
      },
    },
    {
      name: 'Publish',
      handleAction: (id: string | number | undefined | IEvaluationInfo | Student) => {
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

      {isSuccess &&
      submissions.length === 0 &&
      evaluation?.questionaire_type !==
        (IQuestionaireTypeEnum.MANUAL || IQuestionaireTypeEnum.FIELD) ? (
        <NoDataAvailable
          icon="evaluation"
          buttonLabel="Go back"
          title={'No submissions has been made so far!'}
          handleClick={() => history.push(`/dashboard/evaluations/${evaluation?.id}`)}
          description="And the web just isnt the same without you. Lets get you back online!"
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
    </div>
  );
}
