import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';
import { useLocation } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import SearchMolecule from '../../components/Molecules/input/SearchMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
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
  const location = useLocation();

  const subjectData = subjectStore.getSubjectsByModule(id);
  const moduleData = moduleStore.getModuleById(id);

  useEffect(() => {
    if (location.pathname === path) {
      subjectData.refetch();
    }
  }, [location]);

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
          <BreadCrumb list={list} />
        </section>
        <div className="mt-11 pb-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex gap-2 items-center">
              <Heading className="capitalize" fontSize="2xl" fontWeight="bold">
                {moduleData.data?.data.data.name} module
              </Heading>
            </div>
            <div className="flex flex-wrap justify-start items-center">
              <SearchMolecule handleChange={handleSearch} />
              <button className="border p-0 rounded-md mx-2">
                <Icon name="filter" />
              </button>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => history.push(`${url}/add-subject`)}>
                Add new Subject
              </Button>
            </div>
          </div>
        </div>
        {subjects.length < 1 && subjectData.isSuccess ? (
          <NoDataAvailable
            title={'No subjects registered'}
            description={
              'The history object is mutable. Therefore it is recommended to access the location from the render props of <Route>, not from'
            }
            handleClick={() => history.push(`${url}/add-subject`)}
          />
        ) : (
          <section className="flex flex-wrap justify-start gap-4 mt-2">
            {subjects.map((subject, i) => (
              <div key={i} className="p-1 mt-3">
                <CommonCardMolecule data={subject} />
              </div>
            ))}
          </section>
        )}
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
            path={`${path}/subjects/:subjectId/add-lesson`}
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
