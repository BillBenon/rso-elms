import React from 'react';
import { Switch, Route, useHistory, useRouteMatch, Link } from 'react-router-dom';
import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewVenue from '../../components/Organisms/calendar/NewVenue';
import { venueStore } from '../../store/timetable/venue.store';

export default function Venues() {
  const history = useHistory();
  const { path } = useRouteMatch();

  const handleClose = () => {
    history.goBack();
  };
  const venues = venueStore.getAllVenues().data?.data.data;
  console.log(venues);

  return (
    <div>
      <TableHeader totalItems={0} title={'Venues'} showBadge={false}>
        <Link to={`${path}/venue/new`}>
          <Button>New venue</Button>
        </Link>
      </TableHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {venues?.map((event) => (
          <div
            key={event.id}
            className="bg-main rounded-md p-4 border-1 border-transparent hover:border-primary-500 cursor-pointer">
            <Heading fontSize="sm" color="txt-secondary" fontWeight="semibold">
              {event.venue_type}
            </Heading>
            <Heading className="pt-6" fontSize="sm" fontWeight="bold">
              {event.name}
            </Heading>
          </div>
        ))}
      </div>
      <Switch>
        <Route
          exact
          path={`${path}/venue/new`}
          render={() => (
            <PopupMolecule title="New Event" open onClose={handleClose}>
              <NewVenue />
            </PopupMolecule>
          )}
        />
      </Switch>
    </div>
  );
}
