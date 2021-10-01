import React from 'react';
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
import Cacumber from '../../components/Molecules/Cacumber';
import PopupMolecule from '../../components/Molecules/Popup';
import AddPrivileges from '../../components/Organisms/forms/roles/AddPrivileges';
import { roleStore } from '../../store';

interface ParamType {
  id: string;
}

export default function ViewRole() {
  const { path } = useRouteMatch();
  const history = useHistory();
  const { id } = useParams<ParamType>();
  const { data, isLoading, isSuccess, isError, error } = roleStore.getRole(id);
  const rolesPrivileges = roleStore.getPrivilegesByRole(id);
  const role = data?.data.data;
  const privilegesByRoles = rolesPrivileges.data?.data.data;

  console.log(rolesPrivileges, 'amazing');

  // TODO: display priviles
  // Todo: add privileges on role

  function submited() {}
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
                <Link to={`${path}/addPrivileges`}>
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
                  privilegesByRoles &&
                  privilegesByRoles?.length <= 0 &&
                  'This role has no privileges try adding one'}
                {rolesPrivileges.isSuccess && (
                  <ul>
                    {privilegesByRoles?.map((rolePrivileg) => (
                      <li key={rolePrivileg.id}>
                        <ActionableList
                          handleClick={() =>
                            alert('handle remove privilege' + rolePrivileg.privilege.id)
                          }>
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
          path={`${path}/addPrivileges`}
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
