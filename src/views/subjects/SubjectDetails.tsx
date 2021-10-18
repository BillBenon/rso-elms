import React from 'react';
import {
  Link as BrowserLink,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Panel from '../../components/Atoms/custom/Panel';
import Heading from '../../components/Atoms/Text/Heading';
import Accordion from '../../components/Molecules/Accordion';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import PopupMolecule from '../../components/Molecules/Popup';
import NewLessonForm from '../../components/Organisms/forms/subjects/NewLessonForm';
import { lessonStore } from '../../store/lesson.store';
import { subjectStore } from '../../store/subject.store';
import { Link } from '../../types';

interface ParamType {
  id: string;
  subjectId: string;
}

export default function SubjectDetails() {
  const { id, subjectId } = useParams<ParamType>();
  const { url } = useRouteMatch();
  const history = useHistory();

  const subjectData = subjectStore.getSubject(subjectId);
  const lessons = lessonStore.getLessonsBySubject(subjectId).data?.data.data || [];

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
      <div className="md:flex pt-4 md:pt-11">
        <div className="w-44">
          <button className="outline-none" onClick={goBack}>
            <Icon name={'back-arrow'} bgColor="gray" />
          </button>
        </div>
        <div className="pt-4 md:pt-0">
          <Heading fontSize="2xl" fontWeight="semibold">
            {subjectData.data?.data.data.title}
          </Heading>
          <Heading fontSize="base" color="gray" className="py-4" fontWeight="medium">
            {'7 lessons'}
          </Heading>
          <p className="w-10/12 text-base">{subjectData.data?.data.data.content}</p>
          <div className="py-6">
            <div className="flex justify-between">
              <Heading
                fontWeight="semibold"
                color="primary"
                fontSize="base"
                className="underline">
                Lessons ({lessons.length})
              </Heading>
              <BrowserLink to={`${url}/add-lesson`}>
                <Button>New lesson</Button>
              </BrowserLink>
            </div>
            <Heading fontSize="base" className="mb-6" fontWeight="semibold">
              Ongoing Lessons
            </Heading>

            <Accordion>
              <Panel bgColor="primary" title={'Lesson 1'}>
                <h2>Welcome</h2>
              </Panel>
              <Panel title={'Lesson 2'}>
                <h2>Lesson 2</h2>
              </Panel>
            </Accordion>
          </div>
        </div>
      </div>
      <Switch>
        {/* add lesson popup */}
        <Route
          exact
          path={`${url}/add-lesson`}
          render={() => {
            return (
              <PopupMolecule title="Add lesson" open onClose={goBack}>
                <NewLessonForm />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}
