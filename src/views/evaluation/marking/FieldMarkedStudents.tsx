import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../../components/Atoms/custom/Button';
import Loader from '../../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../../components/Molecules/cards/NoDataAvailable';
import Table from '../../../components/Molecules/table/Table';
import { markingStore } from '../../../store/administration/marking.store';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import { ParamType } from '../../../types';
import { IEvaluationInfo } from '../../../types/services/evaluation.types';
import {
  EvaluationStudent,
  StudentEvaluationInfo,
} from '../../../types/services/marking.types';
export default function Submissions() {
  const history = useHistory();
  const { id } = useParams<ParamType>();
  const [submissions, setSubmissions] = useState([]);

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
        console.log(submission.total_mark);
        let filteredData: any = {
          id: submission.id.toString(),
          'Student Code': submission.code,
          'Obtained Marks': submission.obtained_mark || 'N/A',
          'Total Marks': submission.total_mark,
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
        _data?: string | number | IEvaluationInfo | EvaluationStudent | undefined,
      ) => {
        history.push({
          pathname: `/dashboard/evaluations/${id}/submissions/field/marked/${_data}`,
        });
      },
    },
  ];
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : isSuccess && submissions.length === 0 ? (
        <NoDataAvailable
          icon="evaluation"
          buttonLabel="Go back"
          title={'No submissions has been made so far!'}
          handleClick={() => history.push(`/dashboard/evaluations/${evaluation?.id}`)}
          description="And the web just isnt the same without you. Lets get you back online!"
        />
      ) : isSuccess && submissions.length > 0 ? (
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
