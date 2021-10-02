import React from 'react';

import { CommonCardDataType } from '../../types';
import Badge from '../Atoms/custom/Badge';
import Heading from '../Atoms/Text/Heading';

function CardHeadMolecule({ code, status, title, description }: CommonCardDataType) {
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading fontWeight="semibold">{code}</Heading>
        {status && <Badge badgecolor={status.type}>{status.text}</Badge>}
      </div>
      <div className="mt-6">
        <Heading fontWeight="semibold">{title}</Heading>
        <p id="course-card-description" className="text-txt-secondary text-sm mt-4">
          {description}
        </p>
      </div>
    </>
  );
}

export default CardHeadMolecule;
