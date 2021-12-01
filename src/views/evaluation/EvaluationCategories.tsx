import React from 'react';

import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { IEvaluationInfoCollected } from '../../types/services/evaluation.types';
import StudentViewEvaluations from './StudentViewEvaluations';

interface IEvaluationCategoriesProps {
  subjecEvaluations: IEvaluationInfoCollected | undefined;
}

export default function EvaluationCategories({
  subjecEvaluations,
}: IEvaluationCategoriesProps) {
  return (
    <div>
      {subjecEvaluations && subjecEvaluations?.undoneEvaluations.length > 0 ? (
        <div className="flex flex-col gap-4 mt-8">
          <Heading fontSize="base" fontWeight="bold">
            Undone evaluations
          </Heading>

          <StudentViewEvaluations
            usePopup
            isUndone
            subjecEvaluations={subjecEvaluations?.undoneEvaluations || []}
          />
        </div>
      ) : null}

      {subjecEvaluations && subjecEvaluations?.ongoingEvaluations.length > 0 ? (
        <div className="flex flex-col gap-4 mt-8">
          <Heading fontSize="base" fontWeight="bold">
            Ongoing evaluations
          </Heading>
          <StudentViewEvaluations
            usePopup
            isOngoing
            subjecEvaluations={subjecEvaluations?.ongoingEvaluations || []}
          />
        </div>
      ) : null}

      {subjecEvaluations && subjecEvaluations?.finishedEvaluations.length > 0 ? (
        <div className="flex flex-col gap-4 mt-8">
          <Heading fontSize="base" fontWeight="bold">
            Completed evaluations
          </Heading>
          <StudentViewEvaluations
            isCompleted={true}
            subjecEvaluations={subjecEvaluations?.finishedEvaluations || []}
          />
        </div>
      ) : null}

      {typeof subjecEvaluations?.finishedEvaluations &&
        typeof subjecEvaluations?.ongoingEvaluations &&
        typeof subjecEvaluations?.undoneEvaluations === 'undefined' && (
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
