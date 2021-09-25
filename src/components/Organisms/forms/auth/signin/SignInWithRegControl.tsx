/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { SigninPropTypes } from '../../../../../types';
import Heading from '../../../../Atoms/Text/Heading';
import CommonCardMolecule from '../../../../Molecules/cards/CommonCardMolecule';

type IProps = {
  handleClick: (_program: SigninPropTypes) => void;
  data: SigninPropTypes[];
};

function SignInWithRegControl({ data, handleClick }: IProps) {
  return (
    <div className="py-20 flex flex-col justify-center items-center">
      <div>
        <Heading color="primary" fontSize="2xl" fontWeight="semibold">
          Open registrations
        </Heading>
      </div>
      {data.map((program) => (
        <div key={program.code} className="py-4" onClick={() => handleClick(program)}>
          <CommonCardMolecule
            className="cursor-pointer border-4 border-transparent transition-all hover:border-primary-500 "
            data={program}
          />
        </div>
      ))}
    </div>
  );
}

export default SignInWithRegControl;
