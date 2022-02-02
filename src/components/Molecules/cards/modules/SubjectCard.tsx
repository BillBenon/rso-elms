import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { CommonCardDataType, Privileges, RoleResWithPrevilages } from '../../../../types';
import cookie from '../../../../utils/cookie';
import CommonCardMolecule from '../CommonCardMolecule';

interface IProps {
  subject: CommonCardDataType;
  intakeProg?: string;
}

export default function SubjectCard({ subject, intakeProg = '' }: IProps) {
  const history = useHistory();
  const [privileges, setPrivileges] = useState<string[]>();

  const picked_role_cookie = cookie.getCookie('user_role');
  const picked_role: RoleResWithPrevilages | undefined = picked_role_cookie
    ? JSON.parse(picked_role_cookie)
    : undefined;

  useEffect(() => {
    const _privileges = picked_role?.role_privileges?.map((privilege) => privilege.name);
    if (_privileges) setPrivileges(_privileges);
  }, [picked_role?.role_privileges]);

  return (
    <CommonCardMolecule
      data={subject}
      handleClick={
        () =>
          // privileges?.includes(Privileges.CAN_ACCESS_LESSON)
          //   ?
          history.push({
            pathname: `/dashboard/modules/subjects/${subject.id}`,
            search: `?intkPrg=${intakeProg}`,
          })
        // : privileges?.includes(Privileges.CAN_ACCESS_EVALUATIONS)
        // ? history.push({
        //     pathname: `/dashboard/modules/subjects/${subject.id}/evaluations`,
        //     search: `?intkPrg=${intakeProg}`,
        //   })
        // : history.push({
        //     pathname: `/dashboard/modules/subjects/${subject.id}/instructors`,
        //     search: `?intkPrg=${intakeProg}`,
        //   })
      }>
      {/* <p className="pt-3">
        Total subjects:
        <span className="px-1 text-primary-500">{'None'}</span>
      </p> */}
    </CommonCardMolecule>
  );
}
