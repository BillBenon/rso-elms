import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import SkeletonLoader from '../../components/Atoms/custom/SkeletonLoader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import { classStore } from '../../store/administration/class.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { Privileges } from '../../types';

interface ParamType {
  id: string;
  intakeProgramId: string;
}

export default function PrograsmLevelClasses() {
  const { intakeProgramId } = useParams<ParamType>();

  const { data: levels, isLoading: levelsLoading } =
    intakeProgramStore.getLevelsByIntakeProgram(intakeProgramId); //.data?.data.data || [];

  let programInfo = levels?.data.data[0]?.intake_program.program || undefined;
  const { data, isLoading } = classStore.getAllClasses();
  const { t } = useTranslation();

  function filterClassByLevel(levelId: string | number) {
    return (data?.data.data || [])?.filter(
      (lass) => lass.academic_year_program_intake_level.id === levelId,
    );
  }

  return (
    <div>
      <TableHeader
        showBadge={false}
        title={programInfo?.name || t('Program') + ' levels'}>
        <Permission privilege={Privileges.CAN_ACCESS_CALENDER}>
          <Link to={`/dashboard/schedule/calendar/${programInfo?.id}`}>
            <Button styleType="outline">{t('Program')} calendar</Button>
          </Link>
        </Permission>
      </TableHeader>
      {levelsLoading ? (
        <Loader />
      ) : levels?.data.data.length === 0 ? (
        <NoDataAvailable
          title={'No intake levels available'}
          description="There are no levels available yet! you can add the from the button below"
          showButton={false}
        />
      ) : (
        <Tabs>
          {(levels?.data.data || [])?.map((lvl) => (
            <Tab
              key={lvl.id}
              className="py-3"
              label={lvl.academic_program_level.level.name}>
              <div>
                <Permission privilege={Privileges.CAN_ACCESS_CALENDER}>
                  <Link to={`/dashboard/schedule/timetable/${lvl.id}`}>
                    <span className="text-primary-500 font-medium block text-right">
                      View timetable for this level
                    </span>
                  </Link>
                </Permission>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
                  {isLoading ? (
                    [1, 2].map((i) => <SkeletonLoader height={200} key={i} />)
                  ) : filterClassByLevel(lvl.id).length === 0 ? (
                    <div className="col-span-4">
                      <NoDataAvailable
                        title={'No classes registered here.'}
                        description={'No classes registered in this intake level.'}
                        showButton={false}
                      />
                    </div>
                  ) : (
                    filterClassByLevel(lvl.id).map((cl) => (
                      <div
                        key={cl.id}
                        className="bg-main rounded-md p-4 border-1 border-transparent hover:border-primary-500 cursor-pointer">
                        <Heading
                          fontSize="sm"
                          color="txt-secondary"
                          fontWeight="semibold">
                          {cl.class_group_type}
                        </Heading>
                        <Heading className="pt-6" fontSize="sm" fontWeight="bold">
                          {cl.class_name}
                        </Heading>

                        <div className="py-2 mt-3">
                          <Permission privilege={Privileges.CAN_ACCESS_CALENDER}>
                            <Link
                              className="outline-none"
                              to={`/dashboard/schedule/calendar/${programInfo?.id}?class_id=${cl.id}`}>
                              <span className="text-primary-500 text-sm font-medium">
                                View Calendar
                              </span>
                            </Link>
                          </Permission>
                        </div>
                        {/* <div className="">
                          <Permission privilege={Privileges.CAN_ACCESS_TIMETABLE}>
                            <Link
                              className="outline-none"
                              to={`/dashboard/schedule/timetable/${cl.id}`}>
                              <span className="text-primary-500 text-sm font-medium">
                                View Time table
                              </span>
                            </Link>
                          </Permission>
                        </div> */}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Tab>
          ))}
        </Tabs>
      )}
    </div>
  );
}
