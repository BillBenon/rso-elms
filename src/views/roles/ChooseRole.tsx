import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Heading from '../../components/Atoms/Text/Heading';
import AcademyProfileCard from '../../components/Molecules/cards/AcademyProfileCard';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import useAuthenticator from '../../hooks/useAuthenticator';
import academyStore from '../../store/administration/academy.store';
import { institutionStore } from '../../store/administration/institution.store';
import { CommonCardDataType, RoleType } from '../../types';
import { UserType } from '../../types/services/user.types';
import cookie from '../../utils/cookie';
import { advancedTypeChecker } from '../../utils/getOption';

export default function ChooseRole() {
  const { user } = useAuthenticator();
  const [user_roles, setUserRoles] = useState<CommonCardDataType[]>([]);
  const [picked_role, setPickedRole] = useState<string>();

  const institution = institutionStore.getAll();
  const academy_info = academyStore.fetchAcademies();

  const pickRole = (user_role_id: string) => {
    setPickedRole(user_role_id);
  };

  const history = useHistory();

  const redirectTo = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history],
  );

  useEffect(() => {
    picked_role && cookie.setCookie('user_role', picked_role);
    redirectTo(
      user?.user_type === UserType.INSTRUCTOR
        ? '/dashboard/inst-module'
        : user?.user_type === UserType.STUDENT
        ? '/dashboard/student'
        : '/dashboard/users',
    );
  }, [picked_role, redirectTo, user?.user_type]);

  useEffect(() => {
    let roles: CommonCardDataType[] = [];
    user?.user_roles.forEach((role) => {
      roles.push({
        code:
          role.type === RoleType.INSTITUTION
            ? institution.isLoading
              ? 'Loading...'
              : institution.data?.data.data.find(
                  (inst) => inst.id === role.institution_id,
                )?.name + ''
            : RoleType.ACADEMY
            ? academy_info.isLoading
              ? 'Loading...'
              : academy_info.data?.data.data.find((ac) => ac.id === role.academy_id)
                  ?.name + ''
            : '',
        title: role.name,
        description: role.description,
        id: role.id,
        status: {
          type: advancedTypeChecker(role.type),
          text: role.type,
        },
      });
    });

    setUserRoles(roles);
  }, [
    academy_info.data?.data.data,
    academy_info.isLoading,
    institution.data?.data.data,
    institution.isLoading,
    user?.user_roles,
  ]);

  return (
    <div className="px-48 py-14">
      <div className="pb-20">
        <AcademyProfileCard
          src="/images/rdf-logo.png"
          alt="institution logo"
          size="80"
          bgColor="none"
          txtSize="lg"
          fontWeight="semibold"
          color="primary"
          subtitle={institution.data?.data.data[0].moto}>
          {institution.data?.data.data[0].name}
        </AcademyProfileCard>
      </div>
      <div>
        <Heading fontSize="2xl" fontWeight="medium" className="py-2">
          Choose Role
        </Heading>
        <Heading
          fontSize="lg"
          color="txt-secondary"
          fontWeight="medium"
          className=" pb-8">
          Which Role would you like to use?
        </Heading>

        <div className="flex gap-6">
          {user_roles.map((user_role) => (
            <CommonCardMolecule
              data={user_role}
              key={user_role.id}
              handleClick={() => pickRole(user_role.id + '')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
