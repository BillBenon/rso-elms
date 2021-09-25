/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { CommonCardDataType } from '../../../../../types';
import Heading from '../../../../Atoms/Text/Heading';
import CommonCardMolecule from '../../../../Molecules/cards/CommonCardMolecule';

type IProps = {
  handleClick: () => void;
};

function SignInWithRegControl({ handleClick }: IProps) {
  const data: CommonCardDataType[] = [
    {
      status: { type: 'success', text: 'Active' },
      code: 'RMA Gako',
      title: 'A short description of registration control',
      description: '02 Sep 2021 - 02 Nov 2021',
    },
    {
      status: { type: 'success', text: 'Active' },
      code: 'RMA Nyakinama',
      title: 'A short desctiption of a registration control',
      description: '17 Aug 2021 - 10 Sep 2021',
    },
    {
      status: { type: 'error', text: 'Inactive' },
      code: 'CTC Gabiro',
      title: 'A short desctiption of a registration control',
      description: '17 Aug 2021 - 10 Sep 2021',
    },
  ];
  return (
    <div className="h-screen overflow-auto flex flex-col justify-center items-center">
      <div className="lg:pt-36">
        <Heading
          color="primary"
          fontSize="2xl"
          className=" self-start"
          fontWeight="semibold">
          Open registrations
        </Heading>
        {data.map((course) => (
          <div key={course.code} className="py-4" onClick={handleClick}>
            <CommonCardMolecule
              className="border-4 border-transparent hover:border-primary-500 "
              data={course}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SignInWithRegControl;
