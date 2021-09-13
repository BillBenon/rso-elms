import React from 'react';

import Avatar from '../../Atoms/custom/Avatar';
import Badge from '../../Atoms/custom/Badge';
import Heading from '../../Atoms/Text/Heading';

const SignupHeader = () => {
  return (
    <div className="flex justify-between mb-5">
      <div>
        <Heading fontSize="2xl" fontWeight="semibold">
          Complete Profile
        </Heading>
        <p className="text-txt-secondary text-base">
          Fill in the form credentials to complete your profile
        </p>
      </div>
      <div>
        <Badge
          badgecolor="secondary"
          badgetxtcolor="primary"
          className="flex"
          roundWidth="lg">
          <Avatar src="public\icons\police-logo.svg" alt="academy logo" size="39" />
          <span>Rwanda National Police</span>
        </Badge>
      </div>
    </div>
  );
};

export default SignupHeader;
