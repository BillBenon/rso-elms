import '../../styles/components/Molecules/correction/marking.scss'
import React, { useState } from 'react';
import { Route, useParams, Link, useRouteMatch, Switch } from 'react-router-dom';
import { CommonCardDataType, Link as LinkList } from '../../types';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import { ParamType } from '../../types';
import Button from '../../components/Atoms/custom/Button';
import TableHeader from '../../components/Molecules/table/TableHeader';
import Icon from '../../components/Atoms/custom/Icon';
import StudentAnswer from '../../components/Molecules/cards/correction/StudentAnswer';

export default function StudentAnswersMarking() {
    const { id } = useParams<ParamType>();
    const { path } = useRouteMatch();
    const [markScored, setMarkScored] = useState(-1);
    const list: LinkList[] = [
        { to: '/', title: 'Instructor' },
        { to: 'evaluations', title: 'evaluations' },
        { to: '/evaluations/eval', title: 'Evaluation Details' },
        { to: 'evaluations/eval/marking', title: 'Marking' },
      ];
  return (
    <div className={`flex flex-col gap-4`}>
        <section>
                <BreadCrumb list={list}></BreadCrumb>
        </section>
        <TableHeader title="049423 submission" showBadge={false} showSearch={false}>
            <p className="text-gray-400">Marks obtained: <span className="text-green-300 font-semibold">19</span></p>
        </TableHeader>
        <section className="flex flex-wrap justify-start gap-4 mt-2">
            <StudentAnswer></StudentAnswer>
            <StudentAnswer></StudentAnswer>
            <StudentAnswer></StudentAnswer>
            <StudentAnswer></StudentAnswer>
        </section>
    </div>
  );
}
