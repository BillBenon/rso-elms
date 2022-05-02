import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { queryClient } from '../../../../../../plugins/react-query';
import usernextkinStore from '../../../../../../store/administration/usernextkin.store';
import { ParamType } from '../../../../../../types';
import CompleteProfileHeader from '../../../../../Molecules/CompleteProfileHeader';
import NextOfKinDetails from './NextOfKinDetails';

function MoreInfo({
  showHeader = true,
  location,
}: {
  showHeader?: boolean;
  location?: any;
}) {
  const { id } = useParams<ParamType>();
  const [, setCompleteStep] = useState(0);
  const history = useHistory();

  async function finishSteps(isComplete: boolean) {
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
    if (showHeader) {
      history.push('/redirecting');
    } else {
      queryClient.invalidateQueries(['user/id', id]);
      history.push(`/dashboard/user/${id}/profile?me=true`);
    }
  }

  const { mutate } = usernextkinStore.createUserNextKin();

  return (
    <div className="bg-main p-8 md:px-40 md:py-16 ">
      {showHeader && (
        <CompleteProfileHeader
          title={'Add your Next of Kin'}
          details={'Fill in the form with all your next of kin information'}
        />
      )}
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

export default MoreInfo;
