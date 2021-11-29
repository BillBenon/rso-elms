import React from 'react';

import Heading from '../../components/Atoms/Text/Heading';
import { authenticatorStore } from '../../store/administration';
import { IEvaluationInfoCollected } from '../../types/services/evaluation.types';
import { UserType } from '../../types/services/user.types';
import ViewEvaluations from './ViewEvaluations';

interface IEvaluationCategoriesProps {
  subjecEvaluations: IEvaluationInfoCollected | undefined;
}

export default function EvaluationCategories({
  subjecEvaluations,
}: IEvaluationCategoriesProps) {
  const userInfo = authenticatorStore.authUser().data?.data.data.user_type;
  return (
    <div>
      {subjecEvaluations && subjecEvaluations?.undoneEvaluations.length > 0 ? (
        <div className="flex flex-col gap-4 mt-8">
          <Heading fontSize="base" fontWeight="bold">
            Undone evaluations
          </Heading>
          <ViewEvaluations
            isUndone
            subjecEvaluations={subjecEvaluations?.undoneEvaluations || []}
            linkTo={
              userInfo === UserType.STUDENT ? '/dashboard/student/evaluations/' : ''
            }
          />
        </div>
      ) : null}

      {subjecEvaluations && subjecEvaluations?.ongoingEvaluations.length > 0 ? (
        <div className="flex flex-col gap-4 mt-8">
          <Heading fontSize="base" fontWeight="bold">
            Ongoing evaluations
          </Heading>
          <ViewEvaluations
            subjecEvaluations={subjecEvaluations?.ongoingEvaluations || []}
            linkTo={
              userInfo === UserType.STUDENT ? '/dashboard/student/evaluations/' : ''
            }
          />
        </div>
      ) : null}
    </div>
  );
}
