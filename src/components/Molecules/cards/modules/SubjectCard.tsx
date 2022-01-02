import React from 'react';
import { useHistory } from 'react-router-dom';

import { CommonCardDataType } from '../../../../types';
import CommonCardMolecule from '../CommonCardMolecule';

interface IProps {
  subject: CommonCardDataType;
  intakeProg?: string;
}

export default function SubjectCard({ subject, intakeProg = '' }: IProps) {
  const history = useHistory();
  return (
    <CommonCardMolecule
      data={subject}
      handleClick={() =>
        history.push({
          pathname: `/dashboard/modules/subjects/${subject.id}`,
          search: `?intkPrg=${intakeProg}`,
        })
      }>
      <p className="pt-3">
        Total subjects:
        <span className="px-1 text-primary-500">{'None'}</span>
      </p>
    </CommonCardMolecule>
  );
}
