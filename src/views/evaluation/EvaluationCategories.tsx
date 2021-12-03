import React from 'react';

import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { IEvaluationInfoCollected } from '../../types/services/evaluation.types';
import StudentViewEvaluations from './StudentViewEvaluations';

interface IEvaluationCategoriesProps {
  subjecEvaluations: IEvaluationInfoCollected | undefined;
  loading: boolean;
}

export default function EvaluationCategories({
  subjecEvaluations,
  loading = false,
}: IEvaluationCategoriesProps) {
  console.log(subjecEvaluations);

  return (
    <div>
      {loading && <Loader />}
      {subjecEvaluations?.undone_evaluations &&
      subjecEvaluations?.undone_evaluations.length > 0 ? (
        <div className="flex flex-col gap-4 mt-8">
          <Heading fontSize="base" fontWeight="bold">
            Undone evaluations
          </Heading>

          <StudentViewEvaluations
            isUndone
            subjecEvaluations={subjecEvaluations?.undone_evaluations || []}
          />
        </div>
      ) : null}

      {subjecEvaluations?.ongoing_evaluations &&
      subjecEvaluations?.ongoing_evaluations.length > 0 ? (
        <div className="flex flex-col gap-4 mt-8">
          <Heading fontSize="base" fontWeight="bold">
            Ongoing evaluations
          </Heading>
          <StudentViewEvaluations
            subjecEvaluations={subjecEvaluations?.ongoing_evaluations || []}
          />
        </div>
      ) : null}

      {subjecEvaluations?.finished_evaluations &&
      subjecEvaluations?.finished_evaluations.length > 0 ? (
        <div className="flex flex-col gap-4 mt-8">
          <Heading fontSize="base" fontWeight="bold">
            Completed evaluations
          </Heading>
          <StudentViewEvaluations
            isCompleted
            subjecEvaluations={subjecEvaluations?.finished_evaluations || []}
          />
        </div>
      ) : null}

      {!loading &&
        typeof subjecEvaluations?.finished_evaluations.length &&
        typeof subjecEvaluations?.ongoing_evaluations.length &&
        typeof subjecEvaluations?.undone_evaluations.length === 'undefined' && (
          <NoDataAvailable
            icon="evaluation"
            showButton={false}
            title={'No evaluations available'}
            description="And the web just isnt the same without you. Lets get you back online!"
          />
        )}
    </div>
  );
}
