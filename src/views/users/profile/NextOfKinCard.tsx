import React from 'react';

import Avatar from '../../../components/Atoms/custom/Avatar';
import Heading from '../../../components/Atoms/Text/Heading';
import ILabel from '../../../components/Atoms/Text/ILabel';

function NextOfKinCard() {
  return (
    <div className="max-w-sm py-4 px-6 bg-main rounded-md h-80 overflow-auto">
      <Heading fontWeight="semibold" fontSize="base" className="pt-6 pb-7">
        Next of Kin
      </Heading>
      <div className="flex justify-evenly h-16 w-full items-center mb-6">
        <Avatar
          src="https://static.thenounproject.com/png/2643367-200.png"
          alt="person logo"
          size="48"
        />
        <div>
          <p>
            <ILabel size="sm" weight="semibold" color="primary">
              Person 3
            </ILabel>
          </p>
          <p className="text-txt-secondary text-sm py-2">person@gmail.com</p>
        </div>
        <div>
          <p>
            <ILabel size="sm" weight="medium" color="primary">
              Elder brother
            </ILabel>
          </p>
          <p className="text-txt-primary font-semibold py-2 text-sm">0743000343</p>
        </div>
      </div>
      <div className="flex justify-evenly h-16 w-full items-center mb-6">
        <Avatar
          src="https://static.thenounproject.com/png/2643367-200.png"
          alt="person logo"
          size="48"
        />
        <div>
          <p>
            <ILabel size="sm" weight="semibold" color="primary">
              Person 3
            </ILabel>
          </p>
          <p className="text-txt-secondary text-sm py-2">person@gmail.com</p>
        </div>
        <div>
          <ILabel size="sm" weight="medium" color="primary">
            Elder brother
          </ILabel>
          <p className="text-txt-primary font-semibold py-2 text-sm">0743000343</p>
        </div>
      </div>
    </div>
  );
}

export default NextOfKinCard;
