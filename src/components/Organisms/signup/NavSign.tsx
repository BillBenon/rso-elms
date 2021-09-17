import React from 'react';

import Avatar from '../../Atoms/custom/Avatar';
import Badge from '../../Atoms/custom/Badge';
import Heading from '../../Atoms/Text/Heading';

const NavSign = () => {
  return (
    <div className="flex mb-8">
      <div className="">
        <Heading fontSize="2xl" fontWeight="semibold">
          Complete Profile
        </Heading>
        <p className="text-txt-secondary text-base">
          Fill in the form credentials to complete your profile
        </p>
      </div>
      <div>
        <Badge badgecolor="secondary" badgetxtcolor="primary" className="flex">
          <Avatar src={''} alt={''} />
          Rwanda National Police
        </Badge>
      </div>
    </div>
  );
};

export default NavSign;
