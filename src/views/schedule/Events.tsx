import React, { useEffect } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Permission from '../../components/Atoms/auth/Permission';
import Badge from '../../components/Atoms/custom/Badge';
import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewEvent from '../../components/Organisms/schedule/event/NewEvent';
import useAuthenticator from '../../hooks/useAuthenticator';
import { getAllEvents } from '../../store/timetable/event.store';
import { Privileges } from '../../types';
import { UserType } from '../../types/services/user.types';

export default function Events() {
  const { user } = useAuthenticator();
  const { data, isLoading, refetch } = getAllEvents(
    user?.academy?.id.toString() || '',
    false,
  );
  const events = data?.data.data;

  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    user && refetch();
  }, [refetch, user]);

  const handleClose = () => {
    history.goBack();
  };

  return (
    <Permission privilege={Privileges.CAN_ACCESS_EVENTS}>
      <TableHeader totalItems={0} title={'Events'} showBadge={false}>
        {user?.user_type != UserType.STUDENT && (
          <Link to={`/dashboard/schedule/events/new`}>
            <Button>New Event</Button>
          </Link>
        )}
      </TableHeader>
      {isLoading ? (
        <Loader />
      ) : events?.length === 0 ? (
        <NoDataAvailable
          title={'No events registered'}
          description={
            'No venues registered so far. Please register one with button below'
          }
          buttonLabel="New event"
          privilege={Privileges.CAN_CREATE_EVENT}
          handleClick={() => history.push(`${path}/new`)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events?.map((event) => (
            <div
              key={event.id}
              className="bg-main rounded-md py-5 px-6 border-2 border-transparent hover:border-primary-500 cursor-pointer">
              <div className="flex justify-between">
                <Badge badgecolor={'info'}>
                  <span className="text-primary-500">{event.event_category}</span>
                </Badge>
                <Heading color="primary" fontWeight="bold" fontSize="sm">
                  #{event.code}
                </Heading>
              </div>
              <div className="pt-6">
                <Heading fontSize="base" fontWeight="bold">
                  {event.name}
                </Heading>
                <p className="py-2 text-sm text-txt-secondary font-medium">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Switch>
        <Route
          exact
          path={`${path}/new`}
          render={() => (
            <PopupMolecule title="New Event" open onClose={handleClose}>
              <NewEvent />
            </PopupMolecule>
          )}
        />
      </Switch>
    </Permission>
  );
}
