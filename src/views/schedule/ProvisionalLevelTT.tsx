import React from 'react';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import NewWeek from '../../components/Organisms/schedule/timetable/NewWeek';
import TimeTableWeek from '../../components/Organisms/schedule/timetable/TimeTableWeek';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { timetableStore } from '../../store/timetable/timetable.store';
import { ParamType, Privileges } from '../../types';

export default function ProvisionalLevelTT() {
  const { id } = useParams<ParamType>();
  const history = useHistory();

  const levelInfo = intakeProgramStore.getIntakeLevelById(id).data?.data.data;
  const { path, url } = useRouteMatch();

  const handleClose = () => {
    history.goBack();
  };

  const { data, isLoading } = timetableStore.getWeeksByIntakeLevel(id);
  const weeks = data?.data.data;

  return (
    <div>
      <TableHeader
        showBadge={false}
        showSearch={false}
        title={`${levelInfo?.academic_program_level.program.name} - ${levelInfo?.academic_program_level.level.name}`}>
        <div className="flex gap-3">
          <Link to={`${url}/new-week`}>
            <Button type="button">New week</Button>
          </Link>
        </div>
      </TableHeader>
      {isLoading ? (
        <Loader />
      ) : weeks?.length === 0 ? (
        <NoDataAvailable
          title={'No weeks registered'}
          description={
            'No weeks registered so far. Please register one with button below'
          }
          buttonLabel="New week"
          handleClick={() => history.push(`${url}/new-week`)}
          privilege={Privileges.CAN_CREATE_VENUE}
        />
      ) : (
        // @ts-ignore
        <Tabs>
          {weeks?.map((week) => (
            <Tab label={week.week_name} key={week.id}>
              <TimeTableWeek week={week} />
            </Tab>
          ))}
        </Tabs>
      )}
      <Switch>
        <Route
          exact
          path={`${path}/new-week`}
          render={() => (
            <PopupMolecule title="New timetable week" open onClose={handleClose}>
              <NewWeek />
            </PopupMolecule>
          )}
        />
      </Switch>
    </div>
  );
}
