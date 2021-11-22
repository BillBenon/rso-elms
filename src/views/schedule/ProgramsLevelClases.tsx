import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import SkeletonLoader from '../../components/Atoms/custom/SkeletonLoader';
import Heading from '../../components/Atoms/Text/Heading';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import Tooltip from '../../components/Molecules/Tooltip';
import { classStore } from '../../store/administration/class.store';
import { levelStore } from '../../store/administration/level.store';
import programStore from '../../store/administration/program.store';
import { ParamType } from '../../types';

export default function ProgramLevelClasses() {
  const { id } = useParams<ParamType>();

  const programInfo = programStore.getProgramById(id).data?.data.data;
  const levelsInfo = levelStore.getLevelsByProgram(id).data?.data.data || [];

  return (
    <div>
      <TableHeader showBadge={false} title={`${programInfo?.name}`}>
        <Link to={`/dashboard/schedule/calendar/${id}`}>
          <Button styleType="outline">Program calendar</Button>
        </Link>
      </TableHeader>
      {/* @ts-ignore */}
      <Tabs>
        {levelsInfo?.map((lvl) => (
          <Tab key={lvl.id} className="py-3" label={lvl.level.name}>
            <>
              <Link to={`/dashboard/schedule/calendar/${id}?in_level_id=${lvl.id}`}>
                <span className="text-primary-500 font-medium block text-right">
                  View calendar for this level
                </span>
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Tooltip
                    key={i}
                    trigger={
                      <div className="rounded bg-main py-5 px-6">
                        <Heading fontWeight="bold">Class {i}</Heading>
                      </div>
                    }
                    open>
                    <div className="w-96">
                      <Link
                        className="outline-none"
                        to={`/dashboard/schedule/calendar/${programInfo?.id}?class_id=${i}`}>
                        <Button styleType="text">View Calendar</Button>
                      </Link>
                      <div className="">
                        <Link
                          className="outline-none"
                          to={`/dashboard/schedule/timetable/${i}`}>
                          <Button styleType="text">View TimeTable</Button>
                        </Link>
                      </div>
                    </div>
                  </Tooltip>
                ))}
              </div>
            </>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
