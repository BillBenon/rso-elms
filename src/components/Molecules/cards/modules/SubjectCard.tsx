import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import useAuthenticator from '../../../../hooks/useAuthenticator';
import { CommonCardDataType, Privileges } from '../../../../types';
import CommonCardMolecule from '../CommonCardMolecule';

interface IProps {
  subject: CommonCardDataType;
  intakeProg?: string;
}

export default function SubjectCard({ subject, intakeProg = '' }: IProps) {
  const history = useHistory();
  const { user } = useAuthenticator();
  const [privileges, setPrivileges] = useState<string[]>();

  useEffect(() => {
    const _privileges = user?.user_roles
      ?.filter((role) => role.id === 1)[0]
      .role_privileges?.map((privilege) => privilege.name);
    if (_privileges) setPrivileges(_privileges);
  }, [user]);

  return (
    <CommonCardMolecule
      data={subject}
      handleClick={() =>
        privileges?.includes(Privileges.CAN_ACCESS_LESSON)
          ? history.push({
              pathname: `/dashboard/modules/subjects/${subject.id}`,
              search: `?intkPrg=${intakeProg}`,
            })
          : privileges?.includes(Privileges.CAN_ACCESS_EVALUATIONS)
          ? history.push({
              pathname: `/dashboard/modules/subjects/${subject.id}/evaluations`,
              search: `?intkPrg=${intakeProg}`,
            })
          : history.push({
              pathname: `/dashboard/modules/subjects/${subject.id}/instructors`,
              search: `?intkPrg=${intakeProg}`,
            })
      }>
      {/* <p className="pt-3">
        Total subjects:
        <span className="px-1 text-primary-500">{'None'}</span>
      </p> */}
    </CommonCardMolecule>
  );
}
