import React from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

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


function SubjectInstructors({
    subjectId,
  }: SubjectViewerProps) {
  const { path } = useRouteMatch();
  const {data:subjectData} = subjectStore.getSubject(subjectId);
  const { data: instructorInfos, isLoading } = enrollmentStore.getInstructorsBySubject(subjectId);

  let instrs: UserTypes[] = [];

  instructorInfos?.data.data.content.map((obj) => {
      console.log(instructorInfos?.data.data.content);
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
    } = obj.module_instructor.user;

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
                Instructors ({instructorInfos?.data.data.content.length || 0})
              </Heading>
              {authUser?.user_type === UserType.ADMIN && (
                <EnrollInstructorToSubjectAssignment module_id={subjectData?.data.data.module.id+''} subject_id={subjectId}/>
              )}
            </div>
            <>
              {isLoading ? (
                <Loader />
              ) : instructorInfos?.data.data.content.length === 0 ? (
                <NoDataAvailable
                  showButton={false}
                  icon="user"
                  title={'No instructors available'}
                  description={
                    'There are no instructors currently assigned to this module'
                  }
                  handleClick={() => <EnrollInstructorToSubjectAssignment module_id={subjectData?.data.data.module.id+''} subject_id={subjectId} />}
                />
              ) : (
                <Table<UserTypes>
                  statusColumn="status"
                  data={instrs}
                  selectorActions={[
                    { name: 'Remove instructors from module', handleAction: () => {} },
                  ]}
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
