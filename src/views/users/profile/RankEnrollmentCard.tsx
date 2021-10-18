import React from 'react';

import Heading from '../../../components/Atoms/Text/Heading';

function RankEnrollmentCard() {
  return (
    <div className="max-w-sm py-4 px-6 bg-main rounded-md h-80 overflow-auto">
      <Heading fontWeight="semibold" fontSize="base" className="pt-6 pb-7">
        Rank Enrollment
      </Heading>
      <div className="flex flex-col gap-3 w-full pb-9">
        <div className="flex flex-col text-sm">
          <p className="text-txt-secondary">Current rank</p>
          <p className="text-txt-primary pt-2">Officer Cadette</p>
        </div>
        <div className="flex text-sm">
          <p className="text-txt-secondary">Got rank from: </p>
          <p className="text-txt-primary px-2">Gako Academy</p>
        </div>
        <div className="flex text-sm">
          <p className="text-txt-secondary">On: </p>
          <p className="text-txt-primary px-2">23 / Jan / 2015 </p>
          <p className="text-txt-secondary pr-1">To: </p>
          <p className="text-txt-primary px-2">Now</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full pb-9">
        <div className="flex flex-col text-sm">
          <p className="text-txt-secondary">Latest rank</p>
          <p className="text-txt-primary pt-2">Captain</p>
        </div>
        <div className="flex text-sm">
          <p className="text-txt-secondary">Got rank from: </p>
          <p className="text-txt-primary px-2">Gako Academy</p>
        </div>
        <div className="flex text-sm">
          <p className="text-txt-secondary">On: </p>
          <p className="text-txt-primary px-2">23 / Jan / 2015 </p>
          <p className="text-txt-secondary pr-1">To: </p>
          <p className="text-txt-primary px-2">Now</p>
        </div>
      </div>
    </div>
  );
}

export default RankEnrollmentCard;
