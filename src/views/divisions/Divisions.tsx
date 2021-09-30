import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Badge from '../../components/Atoms/custom/Badge';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import ILabel from '../../components/Atoms/Text/ILabel';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';

export default function Divisions() {
  const { path } = useRouteMatch();
  const [userType, setUserType] = useState('Students');

  const tabs = [
    {
      label: 'Students',
      href: '/dashboard/users',
    },
    {
      label: 'Instructors',
      href: '/dashboard/users/instructors',
    },
    {
      label: 'Admins',
      href: '/dashboard/users/admins',
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-start items-center pt-1">
        <ILabel size="sm" color="gray" weight="medium">
          Institution Admin
        </ILabel>
        <Icon name="chevron-right" />

        <ILabel size="sm" color="gray" weight="medium">
          Users
        </ILabel>
        <Icon name="chevron-right" fill="gray" />
        <ILabel size="sm" color="primary" weight="medium">
          {userType}
        </ILabel>
      </div>
      <div className="flex gap-2 items-center py-3">
        <Heading className="capitalize" fontSize="2xl" fontWeight="bold">
          users
        </Heading>
        <Badge
          badgetxtcolor="main"
          badgecolor="primary"
          fontWeight="normal"
          className="h-6 w-9 flex justify-center items-center">
              3
          {/* {divisions.length} */}
        </Badge>
      </div>

      <TabNavigation
        tabs={tabs}
        onTabChange={(event) => setUserType(event.activeTabLabel)}>
        <Switch>
          <Route exact path={`${path}`} render={() =>} />
          <Route
            exact
            path={`${path}/instructors`}
            render={() => <Instructors instructors={instructors} />}
          />

        </Switch>
      </TabNavigation>
    </div>
  );
}
