import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import ActionableList from '../../components/Molecules/ActionableList';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import PopupMolecule from '../../components/Molecules/Popup';
import AddPrivileges from '../../components/Organisms/forms/roles/AddPrivileges';
import { queryClient } from '../../plugins/react-query';
import { roleStore } from '../../store';
import { ParamType, Response, RolePrivilege, RoleRes } from '../../types';

export default function ViewRole() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const { id } = useParams<ParamType>();
  const [role, setRole] = useState<RoleRes>();
  const [privilegesByRole, setPrivilegesByRole] = useState<RolePrivilege[]>();
  const { data, isLoading, isSuccess, isError, error } = roleStore.getRole(id);
  const rolesPrivileges = roleStore.getPrivilegesByRole(id);
  const { mutate: deletePrivilege } = roleStore.removeProvilege();

  // Todo: add privileges on role

  function removePrivilege(rolePrivilege: RolePrivilege) {
    deletePrivilege(rolePrivilege.id + ''),
      {
        onSuccess: () => {
          queryClient.setQueryData(['privilegesByRole/id', role?.id + ''], (old) => {
            const oldest = old as AxiosResponse<Response<RolePrivilege[]>>;
            oldest.data.data = oldest.data.data.filter(
              (roleP) => roleP.id != rolePrivilege.id,
            );
            return oldest;
          });
        },
      };
  }

  useEffect(() => {
    setRole(data?.data.data);
  }, [data]);

  useEffect(() => {
    setPrivilegesByRole(rolesPrivileges.data?.data.data);
  }, [rolesPrivileges.data?.data.data]);

  function submited() {}
  return (
    <main>
      <section>
        <BreadCrumb list={[{ title: 'Roles', to: 'roles' }]} />
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
                <Link to={`${url}/addPrivileges`}>
                  <Button styleType="text">
                    <span className="flex items-center">
                      <Icon size={13} name="add" />
                      <span className="pl-1">add privilege</span>
                    </span>
                  </Button>
                </Link>
              </div>
              <div>
                {rolesPrivileges.isError && rolesPrivileges.error.message}
                {rolesPrivileges.isSuccess &&
                  privilegesByRole &&
                  privilegesByRole?.length <= 0 &&
                  'This role has no privileges try adding one'}
                {rolesPrivileges.isSuccess && (
                  <ul>
                    {privilegesByRole?.map((rolePrivileg) => (
                      <li key={rolePrivileg.id}>
                        <ActionableList handleClick={() => removePrivilege(rolePrivileg)}>
                          {rolePrivileg.privilege.name}
                        </ActionableList>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </section>

      <Switch>
        {/* add previleges role */}
        <Route
          exact
          path={`${url}/addPrivileges`}
          render={() => {
            return (
              <PopupMolecule title="New Role" open={true} onClose={history.goBack}>
                <AddPrivileges
                  roleName={role?.name || ''}
                  roleId={role?.id + '' || ''}
                  onSubmit={submited}
                />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}
