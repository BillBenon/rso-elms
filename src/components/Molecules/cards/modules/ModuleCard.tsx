import React, { useEffect, useState } from 'react';
import { Link as BrowserLink, useHistory } from 'react-router-dom';

import useAuthenticator from '../../../../hooks/useAuthenticator';
import { CommonCardDataType, Privileges } from '../../../../types';
import { UserType } from '../../../../types/services/user.types';
import Permission from '../../../Atoms/auth/Permission';
import Button from '../../../Atoms/custom/Button';
import Heading from '../../../Atoms/Text/Heading';
import Tooltip from '../../Tooltip';
import CommonCardMolecule from '../CommonCardMolecule';

interface IProps {
  course: CommonCardDataType;
  showMenus?: boolean;
  intakeProg?: string;
}

export default function ModuleCard({
  course,
  showMenus = true,
  intakeProg = '',
}: IProps) {
  const { user } = useAuthenticator();

  const history = useHistory();
  const [privileges, setPrivileges] = useState<string[]>();

  useEffect(() => {
    const _privileges = user?.user_roles
      ?.filter((role) => role.id === 1)[0]
      .role_privileges?.map((privilege) => privilege.name);
    if (_privileges) setPrivileges(_privileges);
  }, [user]);
  return (
    <div className="p-2 mt-3">
      <Tooltip
        open
        trigger={
          <CommonCardMolecule
            data={course}
            handleClick={
              () =>
                privileges?.includes(Privileges.CAN_ACCESS_SUBJECTS)
                  ? history.push({
                      pathname: `/dashboard/modules/${course.id}/subjects`,
                      search: `?showMenus=${showMenus}&intkPrg=${intakeProg}`,
                    })
                  : !showMenus
                  ? privileges?.includes(Privileges.CAN_ACCESS_MODULE_MATERIALS)
                    ? history.push({
                        pathname: `/dashboard/modules/${course.id}/materials`,
                        search: `?showMenus=${showMenus}&intkPrg=${intakeProg}`,
                      })
                    : // : privileges?.includes(Privileges.CAN_ACCESS_PREREQUISITES)
                      // ?
                      history.push({
                        pathname: `/dashboard/modules/${course.id}/prereqs`,
                        search: `?showMenus=${showMenus}&intkPrg=${intakeProg}`,
                      })
                  : // : {}
                    // privileges?.includes(Privileges.CAN_ACCESS_PREREQUISITES)
                    // ?
                    history.push({
                      pathname: `/dashboard/modules/${course.id}/prereqs`,
                      search: `?showMenus=${showMenus}&intkPrg=${intakeProg}`,
                    })
              // : privileges?.includes(Privileges.CAN_ACCESS_EVALUATIONS)
              // ? history.push({
              //     pathname: `/dashboard/modules/${course.id}/evaluations`,
              //     search: `?showMenus=${showMenus}&intkPrg=${intakeProg}`,
              //   })
              // : privileges?.includes(Privileges.CAN_ACCESS_PERFORMANCES)
              // ?
              // history.push({
              //   pathname: `/dashboard/modules/${course.id}/performances`,
              //   search: `?showMenus=${showMenus}&intkPrg=${intakeProg}`,
              // })
              // : {}
            }>
            <p className="pt-3">
              Total subjects:
              <span className="px-1 text-primary-500">{'None'}</span>
            </p>
          </CommonCardMolecule>
        }>
        <div className="w-96 p-4">
          <Heading fontWeight="semibold">{course.title}</Heading>
          <p className="pt-4 pb-2 text-txt-secondary text-sm mt-4">
            {course.description}
          </p>
          {user?.user_type === UserType.STUDENT ? (
            <BrowserLink
              className="outline-none"
              to={`/dashboard/modules/${course.id}/subjects`}>
              <Button styleType="outline">Start module</Button>
            </BrowserLink>
          ) : user?.user_type === UserType.ADMIN ? (
            <div className="py-2 flex justify-around gap-2">
              <Permission privilege={Privileges.CAN_CREATE_SUBJECTS}>
                <BrowserLink
                  className="outline-none"
                  to={`/dashboard/modules/${course.id}/add-subject`}>
                  <Button>Add subject</Button>
                </BrowserLink>
              </Permission>
              <Permission
                privilege={
                  showMenus
                    ? Privileges.CAN_MODIFY_INTAKE_PROGRAM_MODULES
                    : Privileges.CAN_MODIFY_MODULES
                }>
                <BrowserLink
                  className="outline-none"
                  to={`/dashboard/modules/${course.id}/edit`}>
                  <Button styleType="outline">Edit</Button>
                </BrowserLink>
              </Permission>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Tooltip>
    </div>
  );
}
