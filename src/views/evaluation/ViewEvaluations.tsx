import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Cacumber from '../../components/Molecules/Cacumber';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { Link as LinkList } from '../../types';

export default function ViewEvaluations() {
  const { url } = useRouteMatch();
  const list: LinkList[] = [
    { to: 'home', title: 'home' },
    { to: 'evaluations', title: 'evaluations' },
  ];

  return (
    <div>
      <section>
        <Cacumber list={list}></Cacumber>
      </section>
      <TableHeader title="Evaluations" showBadge={false} showSearch={false}>
        <Link to={`${url}/new`}>
          <Button>New Evaluation</Button>
        </Link>
      </TableHeader>
    </div>
  );
}
