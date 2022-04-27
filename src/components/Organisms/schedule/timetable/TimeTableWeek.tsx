import React, { useRef, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import instructordeploymentStore from '../../../../store/instructordeployment.store';
import { Privileges } from '../../../../types';
import {
  ITimeTableWeekInfo,
  TimetableStatus,
} from '../../../../types/services/schedule.types';
import { groupTimeTableByDay } from '../../../../utils/calendar';
import { formatDateToYyMmDd, getWeekBorderDays } from '../../../../utils/date-helper';
import Permission from '../../../Atoms/auth/Permission';
import Button from '../../../Atoms/custom/Button';
import Icon from '../../../Atoms/custom/Icon';
import PopupMolecule from '../../../Molecules/Popup';
import EditTimeTable from './EditTimeTable';
import NewTimeTable from './NewTimeTable';

interface IProps {
  week: ITimeTableWeekInfo;
}

export default function TimeTableWeek({ week }: IProps) {
  const { url, path } = useRouteMatch();
  const history = useHistory();

  const [isPrinting, setisPrinting] = useState(false);
  const groupedActivities = groupTimeTableByDay(week.activities || []);

  const instructors = instructordeploymentStore.getInstructors().data?.data.data;
  const monday = new Date(getWeekBorderDays().monday);

  const timetableRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => timetableRef.current,
    documentTitle: `${week.week_name}-timetable`,
    onBeforeGetContent: () => setisPrinting(true),
    onAfterPrint: () => setisPrinting(false),
    copyStyles: true,
  });

  const handleClose = () => {
    history.goBack();
  };

  return (
    <div>
      <div className="py-4 flex gap-4 justify-end">
        {week.status === TimetableStatus.PROVISIONAL && (
          <Button
            type="button"
            styleType="outline"
            onClick={handlePrint}
            disabled={isPrinting}>
            Confirm
          </Button>
        )}
        <Button
          type="button"
          styleType="text"
          className="bg-gray-300 text-black px-10"
          onClick={handlePrint}
          isLoading={isPrinting}>
          Download
        </Button>
        <Permission privilege={Privileges.CAN_CREATE_TIMETABLE}>
          <Link to={`${url}/new-activity?week=${week.id}`}>
            <Button type="button">Add Activity</Button>
          </Link>
        </Permission>
      </div>
      <div className="tt print:px-10 print:py-8 print:bg-main" ref={timetableRef}>
        <div className="bg-primary-500 py-4 uppercase px-8 text-sm text-center print:text-xs text-white grid grid-cols-11">
          <p className="px-2 text-left">days</p>
          <p className="px-2">time</p>
          <p className="px-2 col-span-3">subject detail</p>
          <p className="px-2">code</p>
          <p className="px-2">pds</p>
          <p className="px-2">moi</p>
          <p className="px-2">location</p>
          <p className="px-2 col-span-2">ds/lecturer</p>
        </div>
        {Object.keys(groupedActivities).map((day, i) => {
          monday.setDate(monday.getDate() + i);
          return (
            <div
              key={day}
              className={`py-6 px-8 text-sm print:text-xs rounded grid grid-cols-11 border-2 ${
                week.status == TimetableStatus.PROVISIONAL
                  ? 'bg-yellow-50'
                  : 'bg-blue-100 border-primary-500'
              }   my-4 gap-3`}>
              <div>
                <h2 className="font-semibold text-sm print:text-xs"> {day}</h2>
                <p className=" print:hidden">
                  {formatDateToYyMmDd(monday.toDateString())}
                </p>
              </div>
              <div className="col-span-10">
                {groupedActivities[day].map((activity) => {
                  let instructor = instructors?.find(
                    (inst) => inst.user.id == activity.in_charge.admin_id,
                  );
                  return (
                    <div
                      key={activity.id}
                      className="timetable-item relative col-span-4 grid grid-cols-10 gap-3 cursor-pointer hover:bg-lightgreen px-2 hover:text-primary-600">
                      <p className=" uppercase">
                        {activity.start_hour.substring(0, 5)} -
                        {' ' + activity.end_hour.substring(0, 5)}
                      </p>
                      <p className="col-span-3">
                        {activity.course_module?.name || activity.event.name}
                      </p>
                      <p className="uppercase">{activity.course_code}</p>
                      <p className="">{activity.periods}</p>
                      <p className="">{activity.method_of_instruction}</p>
                      <p className="">{activity.venue.name}</p>
                      <p className=" col-span-2">
                        {`${instructor?.user.first_name} ${instructor?.user.last_name}`}
                      </p>
                      <Permission privilege={Privileges.CAN_MODIFY_TIMETABLE}>
                        <div className="actions hidden absolute top-0 right-0 -mt-2">
                          <Link to={`${url}/item/${activity.id}/edit`}>
                            <Icon name={'edit'} stroke="primary" />
                          </Link>
                        </div>
                      </Permission>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* timetable actions */}
      <Switch>
        <Route
          exact
          path={`${path}/new-activity`}
          render={() => (
            <PopupMolecule title="Add timetable activity" open onClose={handleClose}>
              <NewTimeTable />
            </PopupMolecule>
          )}
        />
        <Route
          exact
          path={`${path}/item/:itemId/edit`}
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
