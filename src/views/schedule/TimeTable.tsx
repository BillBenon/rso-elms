import React from 'react';
import { useParams } from 'react-router-dom';
import Heading from '../../components/Atoms/Text/Heading';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { ParamType } from '../../types';

let timetable = [
  {
    day: 'Monday',
    date: new Date(),
    activities: [
      {
        start: '8am',
        end: '10am',
        activity: 'Official opening',
        venue: 'Auditorium',
        officer: 'Manzi Gustave',
      },
      {
        start: '8am',
        end: '10am',
        activity: 'Official opening',
        venue: 'Auditorium',
        officer: 'Manzi Gustave',
      },
      {
        start: '8am',
        end: '10am',
        activity: 'Official opening',
        venue: 'Auditorium',
        officer: 'Manzi Gustave',
      },
      {
        start: '8am',
        end: '10am',
        activity: 'Official opening',
        venue: 'Auditorium',
        officer: 'Manzi Gustave',
      },
      {
        start: '8am',
        end: '10am',
        activity: 'Official opening',
        venue: 'Auditorium',
        officer: 'Manzi Gustave',
      },
      {
        start: '8am',
        end: '10am',
        activity: 'Official opening',
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

  return (
    <div>
      <TableHeader showBadge={false} title={`Class A timetable`} />
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
    </div>
  );
}
