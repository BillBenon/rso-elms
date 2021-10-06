import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Cacumber from '../../components/Molecules/Cacumber';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewLessonForm from '../../components/Organisms/forms/subjects/NewLessonForm';
import NewSubjectForm from '../../components/Organisms/forms/subjects/NewSubjectForm';
import { moduleStore } from '../../store/modules.store';
import { subjectStore } from '../../store/subject.store';
import { CommonCardDataType, Link, ParamType } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';

export default function ModuleDetails() {
  const [subjects, setSubjects] = useState<CommonCardDataType[]>([]);

  const { id } = useParams<ParamType>();
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const subjectData = subjectStore.getSubjectsByModule(id);
  const moduleData = moduleStore.getModuleById(id);

  useEffect(() => {
    if (subjectData.data?.data) {
      let loadedSubjects: CommonCardDataType[] = [];
      subjectData.data.data.data.forEach((subject) => {
        let cardData: CommonCardDataType = {
          code: subject.title,
          description: subject.content,
          title: subject.module.name || `Subject ${subject.title}`,
          status: {
            type: advancedTypeChecker(subject.generic_status),
            text: subject.generic_status.toString(),
          },
        };
        loadedSubjects.push(cardData);
      });

      setSubjects(loadedSubjects);
    }
  }, [subjectData.data]);

  function handleSearch() {}
  function handleClose() {
    history.goBack();
  }

  const list: Link[] = [
    { to: 'home', title: 'home' },
    { to: 'subjects', title: 'Faculty' },
    { to: 'subjects', title: 'Programs' },
    { to: 'modules', title: 'Modules' },
    {
      to: moduleData.data?.data.data.id + '',
      title: moduleData.data?.data.data.name + '',
    },
  ];

  return (
    <>
      <main className="px-4">
        <section>
          <Cacumber list={list} />
        </section>
        <section className="">
          <TableHeader
            totalItems={subjects.length}
            title={moduleData.data?.data.data.name + ''}
            handleSearch={handleSearch}>
            <Button onClick={() => history.push(`${url}/add-subject`)}>
              Add new Subject
            </Button>
          </TableHeader>
        </section>
        <section className="flex flex-wrap justify-start gap-4 mt-2">
          {subjects.map((subject, i) => (
            <div key={i} className="p-1 mt-3">
              <CommonCardMolecule
                data={subject}
                to={{ title: 'module', to: 'modules/id' }}
              />
            </div>
          ))}
        </section>

        <Switch>
          {/* add subject popup */}
          <Route
            exact
            path={`${path}/add-subject`}
            render={() => {
              return (
                <PopupMolecule title="New Subject" open onClose={handleClose}>
                  <NewSubjectForm />
                </PopupMolecule>
              );
            }}
          />

          {/* add lesson popup */}
          <Route
            exact
            path={`${path}/subject/:subjectId/add-lesson`}
            render={() => {
              return (
                <PopupMolecule title="Add lesson" open onClose={handleClose}>
                  <NewLessonForm />
                </PopupMolecule>
              );
            }}
          />
        </Switch>
      </main>
    </>
  );
}
