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
import Heading from '../../components/Atoms/Text/Heading';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewTimeTable from '../../components/Organisms/calendar/schedule/NewTimeTable';
import { classStore } from '../../store/administration/class.store';
import { ParamType } from '../../types';

let timetable = [
  {
    day: 'Monday',
    date: new Date(),
    activities: [
      {
        start: '8am',
        end: '10am',
        activity: 'Mathematics',
        venue: 'Auditorium',
        officer: 'Manzi Gustave',
      },
      {
        start: '8am',
        end: '10am',
        activity: 'Mathematics',
        venue: 'Auditorium',
        officer: 'Manzi Gustave',
      },
      {
        start: '8am',
        end: '10am',
        activity: 'Mathematics',
        venue: 'Auditorium',
        officer: 'Manzi Gustave',
      },
      {
        start: '8am',
        end: '10am',
        activity: 'Mathematics',
        venue: 'Auditorium',
        officer: 'Manzi Gustave',
      },
      {
        start: '8am',
        end: '10am',
        activity: 'Mathematics',
        venue: 'Auditorium',
        officer: 'Manzi Gustave',
      },
      {
        start: '8am',
        end: '10am',
        activity: 'Mathematics',
        venue: 'Auditorium',
        officer: 'Manzi Gustave',
      },
    ],
  },
];

timetable.push(timetable[0]);
timetable.push(timetable[0]);
timetable.push(timetable[0]);
timetable.push(timetable[0]);

export default function TimeTable() {
  const { id } = useParams<ParamType>();
  const history = useHistory();
  const { url } = useRouteMatch();

  const classInfo = classStore.getClassById(id).data?.data.data;

  const handleClose = () => {
    history.goBack();
  };

  return (
    <div>
      <TableHeader
        showBadge={false}
        showSearch={false}
        title={`${classInfo?.academic_year_program_intake_level.academic_program_level.program.name} - ${classInfo?.academic_year_program_intake_level.academic_program_level.level.name} - ${classInfo?.class_name}`}>
        <Link to={`${url}/new-schedule`}>
          <Button>New timetable</Button>
        </Link>
      </TableHeader>
      <div className="bg-primary-500 py-4  px-8 text-sm text-white rounded grid grid-cols-5">
        <p className="px-2">DAYS</p>
        <p className="px-2">TIME</p>
        <p className="px-2">ACTIVITY</p>
        <p className="px-2">VENUE</p>
        <p className="px-2">RESOURCES</p>
      </div>
      {timetable.map((tt, index) => (
        <div
          key={index}
          className="py-6 px-8 text-sm rounded grid grid-cols-5 border-2 border-primary-500 my-4 gap-3">
          <div>
            <Heading fontWeight="semibold" fontSize="sm">
              {tt.day}
            </Heading>
            <p className="py-2 text-sm font-medium">{tt.date.toLocaleDateString()}</p>
          </div>
          <div>
            {tt.activities.map((act, index) => (
              <p
                key={index}
                className="py-2 text-sm font-medium uppercase cursor-pointer hover:bg-lightgreen px-2 hover:text-primary-600">
                {act.start} - {act.end}
              </p>
            ))}
          </div>
          <div>
            {tt.activities.map((act, index) => (
              <p
                key={index}
                className="py-2 text-sm font-medium cursor-pointer hover:bg-lightgreen px-2 hover:text-primary-600">
                {act.activity}
              </p>
            ))}
          </div>
          <div>
            {tt.activities.map((act, index) => (
              <p
                key={index}
                className="py-2 text-sm font-medium cursor-pointer hover:bg-lightgreen px-2 hover:text-primary-600">
                {act.venue}
              </p>
            ))}
          </div>
          <div>
            {tt.activities.map((act, index) => (
              <p
                key={index}
                className="py-2 text-sm font-medium cursor-pointer hover:bg-lightgreen px-2 hover:text-primary-600">
                {act.officer}
              </p>
            ))}
          </div>
        </div>
      ))}
      <Switch>
        <Route
          exact
          path={`/dashboard/schedule/timetable/:id/new-schedule`}
          render={() => (
            <PopupMolecule title="Create timetable" open onClose={handleClose}>
              <NewTimeTable />
            </PopupMolecule>
          )}
        />
      </Switch>
    </div>
  );
}
