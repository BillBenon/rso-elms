import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import SearchMolecule from '../../components/Molecules/input/SearchMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import UpdateModuleForm from '../../components/Organisms/forms/modules/UpdateModuleForm';
import NewSubjectForm from '../../components/Organisms/forms/subjects/NewSubjectForm';
import { authenticatorStore } from '../../store/administration';
import { moduleStore } from '../../store/administration/modules.store';
import { subjectStore } from '../../store/administration/subject.store';
import { CommonCardDataType, Link, ParamType } from '../../types';
import { UserType } from '../../types/services/user.types';
import { advancedTypeChecker } from '../../utils/getOption';
import ModuleMaterials from '../module-material/ModuleMaterials';

export default function ModuleDetails() {
  const [subjects, setSubjects] = useState<CommonCardDataType[]>([]);

  const { id } = useParams<ParamType>();
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const subjectData = subjectStore.getSubjectsByModule(id);
  const moduleData = moduleStore.getModuleById(id);
  const authUser = authenticatorStore.authUser().data?.data.data;

  const tabs = [
    {
      label: 'Subjects',
      href: `${url}/subject`,
    },
    {
      label: 'Materials',
      href: `${url}/materials`,
    },

    {
      label: 'Preriquisites',
      href: `${url}/prereqs`,
    },
    {
      label: 'Syllabus',
      href: `${url}/syllabus`,
    },
    {
      label: 'Evaluation',
      href: `${url}/evaluation`,
    },
    {
      label: 'Performance',
      href: `${url}/performance`,
    },
  ];

  useEffect(() => {
    if (subjectData.data?.data) {
      let loadedSubjects: CommonCardDataType[] = [];
      subjectData.data.data.data.forEach((subject) => {
        let cardData: CommonCardDataType = {
          id: subject.id,
          code: subject.module.name || `Subject ${subject.title}`,
          description: subject.content,
          title: subject.title,
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

            {authUser?.user_type === UserType.ADMIN && (
              <div className="flex gap-3">
                <Button onClick={() => history.push(`${url}/add-subject`)}>
                  Add new Subject
                </Button>
              </div>
            )}
          </div>
        </div>
        <TabNavigation tabs={tabs}>
          <Switch>
            <Route
              exact
              path={`${path}/subject`}
              render={() => (
                <>
                  {subjectData.isLoading ? (
                    <Loader />
                  ) : subjects.length === 0 && subjectData.isSuccess ? (
                    <NoDataAvailable
                      showButton={authUser?.user_type === UserType.ADMIN}
                      icon="subject"
                      title={'No subjects registered'}
                      description={'There are no subjects available yet'}
                      handleClick={() => history.push(`${url}/add-subject`)}
                    />
                  ) : (
                    <section className="flex flex-wrap justify-start gap-4 mt-2">
                      {subjects.map((subject, i) => (
                        <div key={i} className="p-1 mt-3">
                          <CommonCardMolecule
                            to={{
                              title: 'Subject details',
                              to: `/dashboard/modules/subjects/${subject.id}`,
                            }}
                            data={subject}
                          />
                        </div>
                      ))}
                    </section>
                  )}
                </>
              )}
            />
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
            {/* update module popup */}
            <Route
              exact
              path={`${path}/edit`}
              render={() => {
                return (
                  <PopupMolecule title="Edit Module" open onClose={handleClose}>
                    <UpdateModuleForm />
                  </PopupMolecule>
                );
              }}
            />
            {/* update module popup */}
            <Route
              path={`${path}/materials`}
              render={() => {
                return <ModuleMaterials />;
              }}
            />
          </Switch>
        </TabNavigation>
      </main>
    </>
  );
}
