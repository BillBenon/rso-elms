import React from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import { authenticatorStore } from '../../store/administration';
import enrollmentStore from '../../store/administration/enrollment.store';
import { subjectStore } from '../../store/administration/subject.store';
import { UserType, UserTypes } from '../../types/services/user.types';
import EnrollInstructorToSubjectAssignment from './EnrollInstructorToSubjectAssignment';
interface SubjectViewerProps {
  subjectId: string;
}

function SubjectInstructors({ subjectId }: SubjectViewerProps) {
  const { search } = useLocation();
  const intakeProg = new URLSearchParams(search).get('intkPrg') || '';
  const { path } = useRouteMatch();
  const { data: subjectData } = subjectStore.getSubject(subjectId);
  const { data: instructorInfos, isLoading } =
    enrollmentStore.getInstructorsBySubject(subjectId);

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

  const authUser = authenticatorStore.authUser().data?.data.data;

  return (
    <Switch>
      <Route
        exact
        path={`${path}`}
        render={() => (
          <div className="flex flex-col gap-4 z-0 pt-6">
            <div className="flex justify-between items-center">
              <Heading fontSize="base" fontWeight="semibold">
                Instructors ({0})
              </Heading>
              {intakeProg && authUser?.user_type === UserType.ADMIN && (
                <EnrollInstructorToSubjectAssignment
                  module_id={subjectData?.data.data.module.id + ''}
                  subject_id={subjectId}
                  intakeProg={intakeProg}
                  subInstructors={instructorInfos?.data.data || []}
                />
              )}
            </div>
            <>
              {isLoading ? (
                <Loader />
              ) : instructorInfos?.data.data.length === 0 ? (
                <NoDataAvailable
                  showButton={intakeProg !== '' && authUser?.user_type === UserType.ADMIN}
                  icon="user"
                  title={'No instructors available'}
                  description={
                    'There are no instructors currently assigned to this subject'
                  }
                  handleClick={() => (
                    <EnrollInstructorToSubjectAssignment
                      subInstructors={instructorInfos?.data.data || []}
                      module_id={subjectData?.data.data.module.id + ''}
                      subject_id={subjectId}
                      intakeProg={intakeProg}
                    />
                  )}
                />
              ) : (
                <Table<UserTypes>
                  statusColumn="status"
                  data={instrs}
                  selectorActions={
                    authUser?.user_type === UserType.ADMIN
                      ? [
                          {
                            name: 'Remove instructors from subject',
                            handleAction: () => {},
                          },
                        ]
                      : []
                  }
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

export default SubjectInstructors;
