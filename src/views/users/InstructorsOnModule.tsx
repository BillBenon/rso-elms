import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

import Permission from '../../components/Atoms/auth/Permission';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import enrollmentStore from '../../store/administration/enrollment.store';
import { ParamType, Privileges } from '../../types';
import { UserTypes } from '../../types/services/user.types';
import EnrollInstructorToModuleComponent from '../modules/EnrollInstructorToModuleComponent';

function InstructorsOnModule() {
  const { id } = useParams<ParamType>();
  const { path } = useRouteMatch();
  const { t } = useTranslation();
  const { data: instructorInfos, isLoading } = enrollmentStore.getInstructorsByModule(id);

  let instrs: UserTypes[] = [];

  instructorInfos?.data.data.map((obj) => {
    let {
      id,
      username,
      first_name,
      last_name,
      email,
      person,
      academy,
      generic_status,
      user_type,
    } = obj.user;

    let user: UserTypes = {
      id: id,
      username: username,
      'full name': first_name + ' ' + last_name,
      email: email,
      'ID Card': person && person.nid,
      academy: academy && academy.name,
      status: generic_status,
      user_type: user_type,
    };

    instrs.push(user);
  });

  return (
    <Switch>
      <Route
        exact
        path={`${path}`}
        render={() => (
          <div className="flex flex-col gap-4 z-0 pt-6">
            <div className="flex justify-between items-center">
              <Heading fontSize="base" fontWeight="semibold">
                {t('Instructor')} ({instructorInfos?.data.data.length || 0})
              </Heading>
              <Permission privilege={Privileges.CAN_ENROLL_INSTRUCTORS_ON_MODULE}>
                <EnrollInstructorToModuleComponent
                  existing={instructorInfos?.data.data || []}
                />
              </Permission>
            </div>
            <>
              {isLoading ? (
                <Loader />
              ) : instructorInfos?.data.data.length === 0 ? (
                <NoDataAvailable
                  showButton={false}
                  icon="user"
                  title={'No ' + t('Instructor') + ' available'}
                  description={
                    'There are no ' +
                    t('Instructor') +
                    ' currently assigned to this module'
                  }
                  privilege={Privileges.CAN_ENROLL_INSTRUCTORS_ON_MODULE}
                  handleClick={() => (
                    <EnrollInstructorToModuleComponent
                      existing={instructorInfos?.data.data || []}
                    />
                  )}
                />
              ) : (
                <Table<UserTypes>
                  statusColumn="status"
                  data={instrs}
                  selectorActions={[]}
                  hide={['id', 'user_type']}
                  uniqueCol="id"
                />
              )}
            </>
          </div>
        )}
      />
    </Switch>
  );
}

export default InstructorsOnModule;
