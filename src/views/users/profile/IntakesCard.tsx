import React from 'react';

import Heading from '../../../components/Atoms/Text/Heading';
import CardHeadMolecule from '../../../components/Molecules/CardHeadMolecule';

function IntakesCard() {
  return (
    <div className="max-w-sm py-4 px-6 bg-main rounded-md h-80 overflow-auto">
      <Heading fontWeight="semibold" fontSize="base" className="pt-6 pb-7">
        Intakes
      </Heading>
      <div className="pb-8">
        <CardHeadMolecule
          title=""
          hasTopMargin={false}
          fontSize="sm"
          color="primary"
          code={'Intake-2020'}
          status={{ type: 'warning', text: 'Ongoing' }}
          description={"Master's program"}
        />
      </div>
      <div className="pb-8">
        <CardHeadMolecule
          title=""
          hasTopMargin={false}
          fontSize="sm"
          color="primary"
          code={'Intake-2004'}
          status={{ type: 'success', text: 'Completed' }}
          description={"Master's program"}
        />
      </div>
    </div>
  );
}

export default IntakesCard;
