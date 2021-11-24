import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { classStore } from '../../store/administration/class.store';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import intakeProgramStore from '../../store/administration/intake-program.store';

interface ParamType {
  id: string;
  intakeProgramId: string;
}

export default function ProgramLevelClasses() {
  const { intakeProgramId } = useParams<ParamType>();

  const levelsInfo =
    intakeProgramStore.getLevelsByIntakeProgram(intakeProgramId).data?.data.data || [];

  let programInfo = levelsInfo[0]?.intake_program.program || undefined;
  const classes = classStore.getAllClasses().data?.data.data || [];

  return (
    <div>
      <TableHeader showBadge={false} title={programInfo?.name}>
        <Link to={`/dashboard/schedule/calendar/${programInfo?.id}`}>
          <Button styleType="outline">Program calendar</Button>
        </Link>
      </TableHeader>
      {/* @ts-ignore */}
      <Tabs>
        {levelsInfo?.map((lvl) => (
          <Tab
            key={lvl.id}
            className="py-3"
            label={lvl.academic_program_level.level.name}>
            <>
              <Link
                to={`/dashboard/schedule/calendar/${programInfo?.id}?in_level_id=${lvl.id}`}>
                <span className="text-primary-500 font-medium block text-right">
                  View calendar for this level
                </span>
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
                {classes?.map((cl) => (
                  <div
                    key={cl.id}
                    className="bg-main rounded-md p-4 border-1 border-transparent hover:border-primary-500 cursor-pointer">
                    <Heading fontSize="sm" color="txt-secondary" fontWeight="semibold">
                      {cl.class_group_type}
                    </Heading>
                    <Heading className="pt-6" fontSize="sm" fontWeight="bold">
                      {cl.class_name}
                    </Heading>
                    <div className="py-2 mt-3">
                      <Link
                        className="outline-none"
                        to={`/dashboard/schedule/calendar/${programInfo?.id}?class_id=${cl.id}`}>
                        <span className="text-primary-500 font-medium">
                          View Calendar
                        </span>
                      </Link>
                    </div>
                    <div className="">
                      <Link
                        className="outline-none"
                        to={`/dashboard/schedule/timetable/${cl.id}`}>
                        <span className="text-primary-500 font-medium">
                          View Time table
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
