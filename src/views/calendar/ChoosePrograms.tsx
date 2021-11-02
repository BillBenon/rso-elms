import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import TableHeader from '../../components/Molecules/table/TableHeader';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import programStore from '../../store/program.store';
import { CommonCardDataType } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';

export default function ChoosePrograms() {
  const { data, isLoading } = programStore.fetchPrograms();
  const history = useHistory();
  const { url } = useRouteMatch();

  const tabs = [
    {
      label: 'Program timetable',
      href: `${url}`,
    },
    {
      label: 'Instructors timetable',
      href: `${url}/instructors`,
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

  return (
    <div>
      <TableHeader totalItems={`${programs.length} programs`} title={'TimeTable'}>
        <div className="flex gap-4">
          <Button>Add event</Button>
          <Button styleType="outline">Add Venue</Button>
        </div>
      </TableHeader>
      <TabNavigation tabs={tabs}>
        <Switch>
          <Route
            exact
            path={`${url}`}
            render={() => (
              <div className="flex gap-4 flex-wrap">
                {programs.length === 0 && isLoading ? (
                  <Loader />
                ) : (
                  programs.map((program) => (
                    <CommonCardMolecule
                      key={program.id}
                      data={program}
                      handleClick={() =>
                        history.push(`/dashboard/calendar/p/${program.id}`)
                      }
                    />
                  ))
                )}
              </div>
            )}
          />
          <Route exact path={`${url}/admins`} render={() => <h2>Comming soon...</h2>} />
        </Switch>
      </TabNavigation>
    </div>
  );
}
