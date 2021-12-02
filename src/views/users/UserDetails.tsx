import React from 'react';
import { useParams } from 'react-router';

import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import usersStore from '../../store/administration/users.store';
import { ParamType } from '../../types';
import ProfileOverview from './profile/ProfileOverview';

export default function UserDetails() {
  const { id } = useParams<ParamType>();
  const { data: user } = usersStore.getUserById(id);

  return (
    <>
      {user?.data.data ? (
        <>
          <Heading className="py-3" fontWeight="bold" fontSize="2xl">
            {user?.data.data.first_name + ' ' + user?.data.data.last_name} Profile
          </Heading>
          <Tabs>
            <Tab label="Overview" className="pt-8">
              <ProfileOverview user={user?.data.data} />
            </Tab>
            <Tab label="Performance" className="pt-8">
              <NoDataAvailable
                icon="academy"
                fill={false}
                showButton={false}
                title={'User have no performance yet'}
                description={
                  'This user does not currently have any performance to display'
                }
              />
            </Tab>
            <Tab label="Log" className="pt-8">
              <NoDataAvailable
                icon="academy"
                fill={false}
                showButton={false}
                title={'User have no logs yet'}
                description={"This user's logs are not currently being recorded"}
              />
            </Tab>
          </Tabs>
        </>
      ) : (
        <NoDataAvailable
          icon="user"
          title={'User not available'}
          description={'Sorry this user is currently not available in the system'}
        />
      )}
    </>
  );
}
