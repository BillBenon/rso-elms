import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import SkeletonLoader from '../../components/Atoms/custom/SkeletonLoader';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import { levelStore } from '../../store/administration/level.store';
import programStore from '../../store/administration/program.store';
import { ParamType } from '../../types';

export default function ProgramLevelsTimeTable() {
  const { id } = useParams<ParamType>();
  const { url } = useRouteMatch();

  const programInfo = programStore.getProgramById(id).data?.data.data;
  const levelsInfo = levelStore.getLevelsByProgram(id).data?.data.data;

  return (
    <div>
      <TableHeader showBadge={false} title={`${programInfo?.name}`}>
        <Link to={`${url}/calendar`}>
          <Button styleType="outline">Program calendar</Button>
        </Link>
      </TableHeader>
      {/* @ts-ignore */}
      <Tabs>
        {levelsInfo?.map((lvl) => (
          <Tab key={lvl.id} className="py-3" label={lvl.level.name}>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 pt-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-3">
                  <SkeletonLoader height={200} />
                </div>
              ))}
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
