import { Editor } from '@tiptap/react';
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
import Tiptap from '../../components/Molecules/editor/Tiptap';
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
  const { mutateAsync: deletePrivilege } = roleStore.removeProvilege();
  const content = `<h2>Hi there,</h2><p>this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p><ul><li><p> That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:</p><pre><code class="language-css">body {
    display: none;
  }</code></pre><p>I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.</p><blockquote><p>Wow, that’s amazing. Good work, boy! 👏 <br>— Mom</p></blockquote>`;

  function removePrivilege(rolePrivilege: RolePrivilege) {
    deletePrivilege(rolePrivilege.id.toString(), {
      onSuccess: () => {
        console.log('succeded');
        queryClient.setQueryData(['privilegesByRole/id', role?.id + ''], (old) => {
          const oldest = old as AxiosResponse<Response<RolePrivilege[]>>;
          oldest.data.data = oldest.data.data.filter(
            (roleP) => roleP.id != rolePrivilege.id,
          );
          return oldest;
        });
      },
    });
  }

  useEffect(() => {
    setRole(data?.data.data);
  }, [data]);

  useEffect(() => {
    setPrivilegesByRole(rolesPrivileges.data?.data.data);
  }, [rolesPrivileges.data?.data.data]);

  function submited() {
    console.log('submited');
    queryClient.invalidateQueries(['privilegesByRole/id', id]);
  }

  function handleEditorChange(_editor: Editor) {}

  return (
    <main>
      <section>
        <BreadCrumb
          list={[
            { title: 'Roles', to: '/dashboard/roles' },
            { title: 'View Role', to: `/dashboard/role/${id}/view` },
          ]}
        />
      </section>
      <section className="py-7">
        <Heading fontWeight="semibold" fontSize="2xl">
          View Role
        </Heading>
        <div>{isLoading && 'loading..'}</div>
        <div>{isError && error?.message} </div>

        <article>
          <Tiptap
            content={content}
            editable={false}
            viewMenu={false}
            handleChange={handleEditorChange}
          />
        </article>
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
                  privilegesByRole?.length <= 0 && (
                    <p className="px-6 py-2 text-txt-secondary">
                      This role has no privileges try adding one
                    </p>
                  )}
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
              <PopupMolecule title="Add Privilege" open={true} onClose={history.goBack}>
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
