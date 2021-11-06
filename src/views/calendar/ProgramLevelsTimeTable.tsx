import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import AddCard from '../../components/Molecules/cards/AddCard';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { levelStore } from '../../store/level.store';
import programStore from '../../store/program.store';
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
      {levelsInfo?.map((lvl) => (
        <div key={lvl.id} className="py-3">
          <Heading fontSize="xl" fontWeight="bold">
            {lvl.level.name}
          </Heading>
          <div className="flex flex-wrap justify-start pt-5">
            <AddCard title={'No classes here'} onClick={() => {}} />
          </div>
        </div>
      ))}
    </div>
  );
}
