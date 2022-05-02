import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { queryClient } from '../../../../../../plugins/react-query';
import usernextkinStore from '../../../../../../store/administration/usernextkin.store';
import { ParamType } from '../../../../../../types';
import NextOfKinDetails from './NextOfKinDetails';

export default function UpdateNextKin({ location }: { location?: any }) {
  const { id } = useParams<ParamType>();
  const { mutate } = usernextkinStore.updateUserNextKin();
  const [, setCompleteStep] = useState(0);
  const history = useHistory();

  async function finishSteps(isComplete: boolean) {
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
    queryClient.invalidateQueries(['user/id', id]);
    history.push(`/dashboard/user/${id}/profile?me=true`);
  }

  return (
    <div className="bg-main p-8 md:px-40 md:py-16 ">
      <NextOfKinDetails
        fetched_id={location?.state ? location.state.detail.person_id : ''}
        display_label="Next of kin details"
        isVertical
        nextStep={finishSteps}
        mutate={mutate}
      />
    </div>
  );
}
