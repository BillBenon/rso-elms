import React from 'react';
import { Link as BrowserLink, useHistory } from 'react-router-dom';

import { authenticatorStore } from '../../../../store/administration';
import { CommonCardDataType } from '../../../../types';
import { UserType } from '../../../../types/services/user.types';
import Button from '../../../Atoms/custom/Button';
import Heading from '../../../Atoms/Text/Heading';
import Tooltip from '../../Tooltip';
import CommonCardMolecule from '../CommonCardMolecule';

interface IProps {
   subject: CommonCardDataType;
  intakeProg?: string;
}

export default function SubjectCard({
  subject,
  intakeProg = '',
}: IProps) {
  const authUser = authenticatorStore.authUser().data?.data.data;

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
