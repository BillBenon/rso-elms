import React, { useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Badge from '../../components/Atoms/custom/Badge';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import ILabel from '../../components/Atoms/Text/ILabel';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import Departments from '../../components/Organisms/divisions/Departments';
import Faculties from '../../components/Organisms/divisions/Faculties';
import NewFaculty from '../../components/Organisms/forms/divisions/NewFaculty';

export default function Divisions() {
  const { path } = useRouteMatch();
  const history = useHistory();
  const [fetchType, setFetchType] = useState('Faculty');
  const [doRefetch, setRefetch] = useState<boolean>(false);

  const tabs = [
    {
      label: 'Faculty',
      href: '/dashboard/divisions',
    },
    {
      label: 'Department',
      href: '/dashboard/divisions/departments',
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
          {fetchType}
        </ILabel>
      </div>
      <div className="flex gap-2 items-center py-3">
        <Heading className="capitalize" fontSize="2xl" fontWeight="bold">
          divisions
        </Heading>
        <Badge
          badgetxtcolor="main"
          badgecolor="primary"
          fontWeight="normal"
          className="h-6 w-9 flex justify-center items-center">
          3{/* {divisions.length} */}
        </Badge>
      </div>

      <TabNavigation
        tabs={tabs}
        onTabChange={(event) => setFetchType(event.activeTabLabel)}>
        <Switch>
          <Route
            exact
            path={`${path}`}
            render={() => {
              return <Faculties fetchType={fetchType} doRefetch={doRefetch} />;
            }}
          />

          <Route
            exact
            path={`${path}/departments`}
            render={() => {
              return <Departments fetchType={fetchType} />;
            }}
          />

          <Route
            exact
            path={`${path}/add`}
            render={() => {
              return (
                <PopupMolecule title="New Faculty" open onClose={() => history.goBack()}>
                  <NewFaculty handleAfterCreate={() => setRefetch(true)} />
                </PopupMolecule>
              );
            }}
          />
        </Switch>
      </TabNavigation>
    </div>
  );
}
