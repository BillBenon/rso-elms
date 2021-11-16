import React from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import Students from '../../components/Organisms/user/Students';
import { classStore } from '../../store/administration/class.store';
import usersStore from '../../store/administration/users.store';
import { IntakeLevelParam } from '../../types/services/intake-program.types';
import { UserType, UserTypes } from '../../types/services/user.types';

function Classes() {
  const history = useHistory();
  const { data, isSuccess } = usersStore.fetchUsers();
  const { url } = useRouteMatch();
  const { level: levelId } = useParams<IntakeLevelParam>();

  let users: UserTypes[] = [];

  if (isSuccess && data?.data.data) {
    data?.data.data.map((obj) => {
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
      } = obj;

      let user: UserTypes = {
        id: id.toString(),
        username: username,
        'full name': first_name + ' ' + last_name,
        email: email,
        NID: person && person.nid,
        academy: academy && academy.name,
        status: generic_status,
        user_type: user_type,
      };

      users.push(user);
    });
  }

  const students = users.filter((user) => user.user_type == UserType.STUDENT);

  const { data: classes } = classStore.getClassByLevel(levelId);
  const classGroups = classes?.data.data || [];

  return (
    <>
      <TableHeader usePadding={false} showBadge={false} showSearch={false}>
        <Button styleType="outline">Add class</Button>
        <Button styleType="outline">Add students</Button>
      </TableHeader>
      {classGroups.length <= 0 ? (
        <NoDataAvailable
          buttonLabel="Add new class"
          title={'No classes available in this level'}
          handleClick={() => history.push(`${url}/modules/add`)}
          description="There are no classes added yet, click on the below button to add some!"
        />
      ) : (
        <Tabs>
          {classGroups.map((cl) => (
            <Tab key={cl.id} label={cl.class_name}>
              <Students students={students} showTableHeader={false} />
            </Tab>
          ))}
        </Tabs>
      )}
    </>
  );
}

export default Classes;
