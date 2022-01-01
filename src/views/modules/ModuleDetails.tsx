import React, { useEffect, useState } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import UsersPreview from '../../components/Molecules/cards/UsersPreview';
import SearchMolecule from '../../components/Molecules/input/SearchMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation, { TabType } from '../../components/Molecules/tabs/TabNavigation';
import UpdateModuleForm from '../../components/Organisms/forms/modules/UpdateModuleForm';
import NewSubjectForm from '../../components/Organisms/forms/subjects/NewSubjectForm';
import { authenticatorStore } from '../../store/administration';
import enrollmentStore from '../../store/administration/enrollment.store';
import { moduleStore } from '../../store/administration/modules.store';
import { subjectStore } from '../../store/administration/subject.store';
import { CommonCardDataType, Link, ParamType } from '../../types';
import { UserType } from '../../types/services/user.types';
import { advancedTypeChecker } from '../../utils/getOption';
import ModuleEvaluations from '../evaluation/ModuleEvaluations';
import ModuleMaterials from '../module-material/ModuleMaterials';
import { IProgramData } from '../programs/AcademicPrograms';
import InstructorsOnModule from '../users/InstructorsOnModule';

export default function ModuleDetails() {
  const [subjects, setSubjects] = useState<CommonCardDataType[]>([]);
  const [route, setCurrentPage] = useState('SUBJECTS');

  const { id } = useParams<ParamType>();
  const { path, url } = useRouteMatch();
  const { search } = useLocation();
  const showMenu = new URLSearchParams(search).get('showMenus');
  const intakeProg = new URLSearchParams(search).get('intkPrg') || '';
  const history = useHistory();
  const subjectData = subjectStore.getSubjectsByModule(id);
  let moduleData: IProgramData | undefined;
  const module = moduleStore.getModuleById(id).data?.data.data;
  const authUser = authenticatorStore.authUser().data?.data.data;
  const { data: assignedInstructors } = enrollmentStore.getInstructorsonModule(id);

  let tabs: TabType[] = [
    // {
    //   label: 'Module Info',
    //   href: `${url}`,
    // },
    {
      label: 'Subjects',
      href: `${url}/subjects?showMenus=${showMenu}&intkPrg=${intakeProg}`,
    },
    {
      label: 'Materials',
      href: `${url}/materials?showMenus=${showMenu}&intkPrg=${intakeProg}`,
    },
    {
      label: 'Preriquisites',
      href: `${url}/prereqs?showMenus=${showMenu}&intkPrg=${intakeProg}`,
    },
  ];

  if (showMenu && showMenu == 'true') {
    tabs.push(
      {
        label: 'Instructors',
        href: `${url}/instructors?showMenus=${showMenu}&intkPrg=${intakeProg}`,
      },
      {
        label: 'Syllabus',
        href: `${url}/syllabus?showMenus=${showMenu}&intkPrg=${intakeProg}`,
      },
      {
        label: 'Evaluation',
        href: `${url}/evaluations?showMenus=${showMenu}&intkPrg=${intakeProg}`,
      },
      {
        label: 'Performance',
        href: `${url}/performances?showMenus=${showMenu}&intkPrg=${intakeProg}`,
      },
    );
  }

  var lastUrl: string = location.href;

  if (module) {
    moduleData = {
      status: {
        type: advancedTypeChecker(module.generic_status),
        text: module.generic_status.toString(),
      },
      code: module.code,
      title: module.name,
      subTitle: module.program.type,
      description: module.description,
      department: module.program.department,
      total_num_modules: module.total_num_subjects,
      // incharge: program.incharge && program.incharge.user.username,
    };
  }

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
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        if (lastUrl.endsWith('subjects')) {
          setCurrentPage('SUBJECTS');
        } else if (lastUrl.endsWith('materials')) {
          setCurrentPage('MATERIALS');
        } else if (lastUrl.endsWith('prereqs')) {
          setCurrentPage('PREREQS');
        } else if (lastUrl.endsWith('syllabus')) {
          setCurrentPage('SYLLABUS');
        } else if (lastUrl.endsWith('evaluations')) {
          setCurrentPage('EVALUATIONS');
        } else {
          setCurrentPage('');
        }
      }
    }).observe(document, { subtree: true, childList: true });
  }, [subjectData.data?.data.data]);

  // function onUrlChange() {
  //   alert('new-loc' + location.href);
  // }

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
      to: moduleData?.id + '',
      title: moduleData?.title + '',
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
                {moduleData?.title} module
              </Heading>
            </div>
            <div className="flex flex-wrap justify-start items-center">
              <SearchMolecule handleChange={handleSearch} />
              <button className="border p-0 rounded-md mx-2">
                <Icon name="filter" />
              </button>
            </div>

            {authUser?.user_type === UserType.ADMIN && (
              <>
                {route == 'SUBJECTS' ? (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        history.push(`${url}/subjects/add-subject`);
                      }}>
                      Add new Subject
                    </Button>
                  </div>
                ) : route == 'SYLLABUS' ? (
                  <div className="flex gap-3">
                    <Button onClick={() => history.push(`${url}/syllabus/add-syllabus`)}>
                      Add new Syllabus
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
            {authUser?.user_type === UserType.INSTRUCTOR && route == 'EVALUATIONS' && (
              <>
                <div className="flex gap-3">
                  <Button onClick={() => history.push(`/evaluation/new`)}>
                    Add new Evaluation
                  </Button>
                </div>
              </>
            )}
            {authUser?.user_type === UserType.INSTRUCTOR && route == 'MATERIALS' && (
              <div className="flex gap-3">
                <Button onClick={() => history.push(`${url}/materials/add-material`)}>
                  Add new Material
                </Button>
              </div>
            )}
          </div>
        </div>
        <TabNavigation tabs={tabs}>
          <Switch>
            <Route
              exact
              path={`${path}`}
              render={() => (
                <div className="flex py-9">
                  <div className="mr-24">
                    {module && (
                      <CommonCardMolecule data={moduleData}>
                        <div className="flex flex-col mt-8 gap-7 pb-2">
                          <Heading color="txt-secondary" fontSize="sm">
                            Module Type
                          </Heading>
                          <Heading fontSize="sm">
                            {moduleData?.subTitle?.replaceAll('_', ' ')}
                          </Heading>
                          {/* 
                          <div className="flex items-center gap-2">
                            <Avatar
                              size="24"
                              alt="user1 profile"
                              className=" rounded-full  border-2 border-main transform hover:scale-125"
                              src="https://randomuser.me/api/portraits/men/1.jpg"
                            />
                            <Heading fontSize="sm">{programData.incharge}</Heading>
                          </div> */}
                        </div>
                        <div className="mt-4 flex space-x-4">
                          <Button onClick={() => history.push(`${url}/edit`)}>
                            Edit Module
                          </Button>
                          <Button styleType="outline">Change Status</Button>
                        </div>
                      </CommonCardMolecule>
                    )}
                  </div>

                  <div className="flex flex-col gap-8 z-0">
                    <div className="flex gap-8">
                      {/* levels */}
                      <div className="flex flex-col gap-8 z-0">
                        <UsersPreview
                          title="Instructors"
                          label="Instructors in intake program"
                          data={[]}
                          totalUsers={assignedInstructors?.data.data.length || 0}
                          dataLabel={''}
                          isLoading={false}></UsersPreview>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
            <Route
              exact
              path={`${path}/subjects`}
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

            <Route path={`${path}/evaluations`} render={() => <ModuleEvaluations />} />
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
            <Route
              path={`${path}/materials`}
              render={() => {
                return <ModuleMaterials />;
              }}
            />
            <Route
              path={`${path}/instructors`}
              render={() => {
                return <InstructorsOnModule />;
              }}
            />
          </Switch>
        </TabNavigation>
      </main>
    </>
  );
}
