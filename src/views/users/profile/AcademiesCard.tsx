import React from 'react';

import Avatar from '../../../components/Atoms/custom/Avatar';
import Heading from '../../../components/Atoms/Text/Heading';
import ILabel from '../../../components/Atoms/Text/ILabel';

function AcademiesCard() {
  return (
    <div className="max-w-sm py-4 px-6 bg-main rounded-md h-80 overflow-auto">
      <Heading fontWeight="semibold" fontSize="base" className="pt-6 pb-7">
        Academies
      </Heading>
      <div className="flex gap-3 h-16 w-full items-center mb-6">
        <Avatar
          src="https://upload.wikimedia.org/wikipedia/commons/5/54/Rwanda_National_Police.png"
          alt="academy logo"
          size="48"
        />
        <div>
          <p>
            <ILabel size="sm" weight="medium" color="primary">
              Academy name
            </ILabel>
          </p>
          <div className="flex py-2 text-sm">
            <p className="text-txt-secondary pr-2">From: </p>
            <p className="text-txt-primary px-2">23 / Jan / 2015 </p>
            <p className="text-txt-secondary pr-1">To </p>
            <p className="text-txt-primary px-2">Now</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 h-16 w-full items-center mb-6">
        <Avatar
          src="https://upload.wikimedia.org/wikipedia/commons/5/54/Rwanda_National_Police.png"
          alt="academy logo"
          size="48"
        />
        <div>
          <p>
            <ILabel size="sm" weight="medium" color="primary">
              Academy name
            </ILabel>
          </p>
          <div className="flex py-2 text-sm">
            <p className="text-txt-secondary pr-2">From: </p>
            <p className="text-txt-primary px-2">23 / Jan / 2015 </p>
            <p className="text-txt-secondary pr-1">To </p>
            <p className="text-txt-primary px-2">Now</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 h-16 w-full items-center mb-6">
        <Avatar
          src="https://upload.wikimedia.org/wikipedia/commons/5/54/Rwanda_National_Police.png"
          alt="academy logo"
          size="48"
        />
        <div>
          <p>
            <ILabel size="sm" weight="medium" color="primary">
              Academy name
            </ILabel>
          </p>
          <div className="flex py-2 text-sm">
            <p className="text-txt-secondary pr-2">From: </p>
            <p className="text-txt-primary px-2">23 / Jan / 2015 </p>
            <p className="text-txt-secondary pr-1">To </p>
            <p className="text-txt-primary px-2">Now</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademiesCard;
