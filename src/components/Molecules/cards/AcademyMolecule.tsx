import '../../../styles/components/molecules/cards/AcademyMolecule.scss';

import React from 'react';

import Avatar from '../../Atoms/custom/Avatar';
import Heading from '../../Atoms/Text/Heading';

export default function AcademyMolecule() {
  return (
    <div id="academy-molecule">
      <Avatar
        src="https://www.mod.gov.rw/fileadmin/_processed_/9/c/csm_RDF_LOGO_0fa751f824.jpg"
        alt="org avatar"
      />
      <div>
        <Heading>RMA Gako</Heading>
        <p className="text-txt-secondary">
          Rwanda Military Academy To train and educate cadets.
        </p>
      </div>
    </div>
  );
}
