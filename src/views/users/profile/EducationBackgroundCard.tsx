import React from 'react';

import Heading from '../../../components/Atoms/Text/Heading';
import ILabel from '../../../components/Atoms/Text/ILabel';

function EducationBackgroundCard() {
  return (
    <div className="max-w-sm py-4 px-6 bg-main rounded-md h-96 overflow-auto">
      <Heading fontWeight="semibold" fontSize="base" className="pt-6 pb-7">
        Education Background
      </Heading>
      <div className="flex flex-col gap-3 w-full pb-9">
        <p>
          <ILabel size="sm" weight="medium" color="primary">
            School name
          </ILabel>
        </p>
        <div className="flex text-sm">
          <p className="text-txt-secondary pr-2">Level: </p>
          <p className="text-txt-primary px-2">University</p>
        </div>
        <div className="flex text-sm">
          <p className="text-txt-secondary pr-1">Combination: </p>
          <p className="text-txt-primary px-2">Civil Engineering</p>
        </div>
        <div className="flex text-sm">
          <p className="text-txt-secondary pr-2">From: </p>
          <p className="text-txt-primary px-2">23 / Jan / 2015 </p>
          <p className="text-txt-secondary pr-1">To: </p>
          <p className="text-txt-primary px-2">Now</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <p>
          <ILabel size="sm" weight="medium" color="primary">
            School name
          </ILabel>
        </p>
        <div className="flex text-sm">
          <p className="text-txt-secondary pr-2">Level: </p>
          <p className="text-txt-primary px-2">University</p>
        </div>
        <div className="flex text-sm">
          <p className="text-txt-secondary pr-1">Combination: </p>
          <p className="text-txt-primary px-2">Civil Engineering</p>
        </div>
        <div className="flex text-sm">
          <p className="text-txt-secondary pr-2">From: </p>
          <p className="text-txt-primary px-2">23 / Jan / 2015 </p>
          <p className="text-txt-secondary pr-1">To: </p>
          <p className="text-txt-primary px-2">Now</p>
        </div>
      </div>
    </div>
  );
}

export default EducationBackgroundCard;
