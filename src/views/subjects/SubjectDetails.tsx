import React from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import BreadCrumb from '../../components/Molecules/BreadCrumb';
import { subjectStore } from '../../store/subject.store';
import { Link } from '../../types';

interface ParamType {
  id: string;
  subjectId: string;
}

export default function SubjectDetails() {
  const { id, subjectId } = useParams<ParamType>();
  const history = useHistory();

  const subjectData = subjectStore.getSubject(subjectId);

  const list: Link[] = [
    { to: 'home', title: 'home' },
    { to: 'programs', title: 'Programs' },
    { to: 'modules', title: 'Modules' },
    { to: id, title: 'Modules details' },
    { to: '/', title: 'Subjects' },
    {
      to: subjectData.data?.data.data.id + '',
      title: subjectData.data?.data.data.title + '',
    },
  ];

  const goBack = () => {
    history.goBack();
  };

  return (
    <main className="px-4">
      <section>
        <BreadCrumb list={list} />
      </section>
      <div className="mt-11"></div>
    </main>
  );
}
