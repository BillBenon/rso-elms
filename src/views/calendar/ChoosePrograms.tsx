import React from 'react';
import {
  Link as BrowserLink,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import NewEvent from '../../components/Organisms/calendar/NewEvent';
import NewVenue from '../../components/Organisms/calendar/NewVenue';
import programStore from '../../store/administration/program.store';
import { CommonCardDataType, Link } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';
import CalendarView from './Calendar';
import ProgramLevelsTimeTable from './ProgramLevelsTimeTable';

const list: Link[] = [
  { to: 'home', title: 'home' },
  { to: 'academy', title: 'Academy' },
  { to: `calendar`, title: 'Schedule' },
];

export default function ChoosePrograms() {
  const { data, isLoading } = programStore.fetchPrograms();
  const history = useHistory();
  const { path } = useRouteMatch();

  const tabs = [
    {
      label: 'Program timetable',
      href: `${path}`,
    },
    {
      label: 'Instructors timetable',
      href: `${path}/instructors`,
    },
  ];
  let programs: CommonCardDataType[] = [];

  data?.data.data.map((p) => {
    let prog: CommonCardDataType = {
      id: p.id,
      status: {
        type: advancedTypeChecker(p.generic_status),
        text: p.generic_status.toString(),
      },
      code: p.code,
      title: p.name,
      subTitle: p.type.replaceAll('_', ' '),
      description: p.description,
    };

    programs.push(prog);
  });

  const handleClose = () => {
    history.goBack();
  };

  return (
    <div>
      <BreadCrumb list={list} />

      <Switch>
        <Route exact path={`${path}/p/:id`} component={ProgramLevelsTimeTable} />
        <Route path={`${path}/p/:id/calendar`} component={CalendarView} />
        <Route
          path={`${path}`}
          render={() => (
            <>
              <TableHeader totalItems={`${programs.length} programs`} title={'Timetable'}>
                <div className="flex gap-4">
                  <BrowserLink to={`${path}/event/new`}>
                    <Button>Add event</Button>
                  </BrowserLink>
                  <BrowserLink to={`${path}/venue/new`}>
                    <Button styleType="outline">Add Venue</Button>
                  </BrowserLink>
                </div>
              </TableHeader>
              <TabNavigation tabs={tabs}>
                <div className="flex gap-4 flex-wrap">
                  {programs.length === 0 && isLoading ? (
                    <Loader />
                  ) : (
                    programs.map((program) => (
                      <CommonCardMolecule
                        key={program.id}
                        data={program}
                        handleClick={() =>
                          history.push(`/dashboard/schedule/p/${program.id}`)
                        }
                      />
                    ))
                  )}
                </div>
                <Route
                  exact
                  path={`${path}/event/new`}
                  render={() => (
                    <PopupMolecule title="New Event" open onClose={handleClose}>
                      <NewEvent />
                    </PopupMolecule>
                  )}
                />
                <Route
                  exact
                  path={`${path}/venue/new`}
                  render={() => (
                    <PopupMolecule title="New Venue" open onClose={handleClose}>
                      <NewVenue />
                    </PopupMolecule>
                  )}
                />
              </TabNavigation>
            </>
          )}
        />
      </Switch>
    </div>
  );
}
