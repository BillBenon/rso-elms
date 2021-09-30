import React from 'react';
import { useParams } from 'react-router-dom';

import Heading from '../../components/Atoms/Text/Heading';
import Cacumber from '../../components/Molecules/Cacumber';
import { roleStore } from '../../store';

interface ParamType {
  id: string;
}

export default function ViewRole() {
  const { id } = useParams<ParamType>();
  const { data, isLoading, isSuccess, isError, error } = roleStore.getRole(id);
  const role = data?.data.data;
  console.log(role, isSuccess, isLoading);

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
        )}
      </section>
    </main>
  );
}
