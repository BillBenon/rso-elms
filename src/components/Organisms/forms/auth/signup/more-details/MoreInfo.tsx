import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import CompleteProfileHeader from '../../../../../Molecules/CompleteProfileHeader';
import NextOfKinDetails from './NextOfKinDetails';

function MoreInfo(props: any) {
  // eslint-disable-next-line no-empty-pattern
  // const [nextKinInfo, setNextKinInfo] = useState({

  // });
  const [, setCompleteStep] = useState(0);
  const history = useHistory();

  async function finishSteps(isComplete: boolean) {
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
    history.push('/redirecting');
  }

  return (
    <div className="bg-main  ">
      <CompleteProfileHeader
        title={'Add your Next of Kin'}
        details={'Fill in the form with all your next of kin information'}
      />
      <div className=" md:px-40 md:py-3">
        <NextOfKinDetails
          fetched_id={props.location.state ? props.location.state.detail.person_id : ''}
          display_label="Next of kin details"
          isVertical
          nextStep={finishSteps}
        />
      </div>
    </div>
  );
}

export default MoreInfo;
