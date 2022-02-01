import '../../styles/components/Molecules/timetable/timetable.scss';

import React, { useRef, useState } from 'react';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import EditTimeTable from '../../components/Organisms/schedule/timetable/EditTimeTable';
import NewTimeTable from '../../components/Organisms/schedule/timetable/NewTimeTable';
import useAuthenticator from '../../hooks/useAuthenticator';
import { classStore } from '../../store/administration/class.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { timetableStore } from '../../store/timetable/timetable.store';
import { ParamType, Privileges } from '../../types';
import { UserType } from '../../types/services/user.types';
import { groupTimeTableByDay } from '../../utils/calendar';
import { formatDateToYyMmDd, getWeekBorderDays } from '../../utils/date-helper';

export default function ClassTimeTable() {
  const { id } = useParams<ParamType>();
  const history = useHistory();
  const { url } = useRouteMatch();

  const [isPrinting, setisPrinting] = useState(false);

  const { user } = useAuthenticator();
  const classInfo = classStore.getClassById(id).data?.data.data;

  const handleClose = () => {
    history.goBack();
  };

  const groupedTimeTable = groupTimeTableByDay(
    timetableStore.getClassTimetableByIntakeLevelClass(id).data?.data.data || [],
  );

  const instructors = instructordeploymentStore.getInstructors().data?.data.data;
  const monday = new Date(getWeekBorderDays().monday);

  const timetableRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => timetableRef.current,
    documentTitle: `${classInfo?.class_name}-timetable`,
    onBeforeGetContent: () => setisPrinting(true),
    onAfterPrint: () => setisPrinting(false),
    copyStyles: true,
  });

  return (
    <div>
      <TableHeader
        showBadge={false}
        showSearch={false}
        title={`${classInfo?.academic_year_program_intake_level.academic_program_level.program.name} - ${classInfo?.academic_year_program_intake_level.academic_program_level.level.name} - ${classInfo?.class_name}`}>
        <div className="flex gap-3">
          <Button
            type="button"
            styleType="outline"
            onClick={handlePrint}
            disabled={isPrinting}>
            Print Timetable
          </Button>

          <Permission privilege={Privileges.CAN_CREATE_TIMETABLE}>
            <Link to={`${url}/new-schedule`}>
              <Button type="button">New timetable</Button>
            </Link>
          </Permission>
        </div>
      </TableHeader>
      <div className="tt print:px-10 print:py-8 print:bg-main" ref={timetableRef}>
        <div className="bg-primary-500 py-4  px-8 text-sm print:text-xs text-white rounded grid grid-cols-5">
          <p className="px-2">DAYS</p>
          <p className="px-2">TIME</p>
          <p className="px-2">ACTIVITY</p>
          <p className="px-2">VENUE</p>
          <p className="px-2">RESOURCES</p>
        </div>
        {Object.keys(groupedTimeTable).map((day, i) => {
          monday.setDate(monday.getDate() + i);
          return (
            <div
              key={day}
              className="py-6 px-8 text-sm print:text-xs rounded grid grid-cols-5 border-2 border-primary-500 my-4 gap-3">
              <div>
                <h2 className="font-semibold text-sm print:text-xs"> {day}</h2>
                <p className="py-2 text-sm print:text-xs font-medium print:hidden">
                  {formatDateToYyMmDd(monday.toDateString())}
                </p>
              </div>
              <div className="col-span-4">
                {groupedTimeTable[day].map((activity) => {
                  let instructor = instructors?.find(
                    (inst) => inst.id == activity.instructor.id,
                  );
                  return (
                    <div
                      key={activity.id}
                      className="timetable-item relative col-span-4 grid grid-cols-4 gap-3 cursor-pointer hover:bg-lightgreen px-2 hover:text-primary-600">
                      <p className="py-2 text-sm print:text-xs font-medium uppercase">
                        {activity.start_hour.substring(0, 5)} -
                        {' ' + activity.end_hour.substring(0, 5)}
                      </p>
                      <p className="py-2 text-sm print:text-xs font-medium">
                        {activity.course_module.name}
                      </p>
                      <p className="py-2 text-sm print:text-xs font-medium">
                        {activity.venue.name}
                      </p>
                      <p className="py-2 text-sm print:text-xs font-medium">
                        {`${instructor?.user.first_name} ${instructor?.user.last_name}`}
                      </p>
                      {user?.user_type == UserType.ADMIN && (
                        <div className="actions hidden absolute top-0 right-0 -mt-2">
                          <Link to={`${url}/item/${activity.id}/edit`}>
                            <Icon name={'edit'} stroke="primary" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
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
        <Route
          exact
          path={`/dashboard/schedule/timetable/:classId/item/:itemId/edit`}
          render={() => (
            <PopupMolecule title="Update timetable" open onClose={handleClose}>
              <EditTimeTable />
            </PopupMolecule>
          )}
        />
      </Switch>
    </div>
  );
}
