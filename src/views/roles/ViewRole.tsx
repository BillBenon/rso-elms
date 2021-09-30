import React from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import ActionableList from '../../components/Molecules/ActionableList';
import Cacumber from '../../components/Molecules/Cacumber';
import { roleStore } from '../../store';

interface ParamType {
  id: string;
}

export default function ViewRole() {
  const { id } = useParams<ParamType>();
  const { data, isLoading, isSuccess, isError, error } = roleStore.getRole(id);
  const rolesPrivileges = roleStore.getPrivilegesByRole(id);
  const role = data?.data.data;
  console.log(role, isSuccess, isLoading);
  console.log(rolesPrivileges);

  return (
    <main>
      <section>
        <Cacumber list={[{ title: 'Roles', to: 'roles' }]} />
      </section>
      <section className="py-7">
        <Heading fontWeight="semibold" fontSize="2xl">
          View Role
        </Heading>

        <div>{isLoading && 'loading..'}</div>
        <div>{isError && error?.message} </div>

        {isSuccess && role && (
          <>
            <div>
              <div className="pt-3">
                <Heading fontSize="lg" color="txt-secondary">
                  Role name
                </Heading>
                <p className="pt-2">{role.name}</p>
              </div>
              <div className="pt-3">
                <Heading fontSize="lg" color="txt-secondary">
                  Role description
                </Heading>
                <p className="pt-2"> {role.name} </p>
              </div>
            </div>
            <div className="width28 mt-10 bg-main py-2 rounded-lg">
              <div className="flex items-center justify-between pl-6">
                <Heading fontWeight="semibold">Privileges</Heading>
                <Button styleType="text">
                  <span className="flex items-center">
                    <Icon size={13} name="add" />
                    <span className="pl-1">add privilege</span>
                  </span>
                </Button>
              </div>
              <div>
                <ul>
                  <li>
                    <ActionableList handleClick={() => alert('handle remove')}>
                      CAN_CREATE_USER
                    </ActionableList>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
