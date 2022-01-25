import React, { useEffect, useState } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router';

import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import SearchMolecule from '../../components/Molecules/input/SearchMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation, { TabType } from '../../components/Molecules/tabs/TabNavigation';
import AddPrerequesitesForm from '../../components/Organisms/forms/modules/AddPrerequisiteForm';
import UpdateModuleForm from '../../components/Organisms/forms/modules/UpdateModuleForm';
import NewSubjectForm from '../../components/Organisms/forms/subjects/NewSubjectForm';
import useAuthenticator from '../../hooks/useAuthenticator';
import { moduleStore } from '../../store/administration/modules.store';
import { Link, ParamType, Privileges } from '../../types';
import { UserType } from '../../types/services/user.types';
import { advancedTypeChecker } from '../../utils/getOption';
import ModuleEvaluations from '../evaluation/ModuleEvaluations';
import ModuleMaterials from '../module-material/ModuleMaterials';
import { IProgramData } from '../programs/AcademicPrograms';
import Subjects from '../subjects/Subjects';
import InstructorsOnModule from '../users/InstructorsOnModule';
import Prerequisites from './paths/Prerequisites';

export default function ModuleDetails() {
  const [route, setCurrentPage] = useState('SUBJECTS');

  const { id } = useParams<ParamType>();
  const { path, url } = useRouteMatch();
  const { search } = useLocation();
  const showMenu = new URLSearchParams(search).get('showMenus');
  const intakeProg = new URLSearchParams(search).get('intkPrg') || '';
  const history = useHistory();
  let moduleData: IProgramData | undefined;
  const module = moduleStore.getModuleById(id).data?.data.data;
  const { user } = useAuthenticator();

  let tabs: TabType[] = [];
  // {
  //   label: 'Module Info',
  //   href: `${url}`,
  // },
  tabs.push({
    label: 'Subjects',
    href: `${url}/subjects?showMenus=${showMenu}&intkPrg=${intakeProg}`,
    privilege: Privileges.CAN_ACCESS_SUBJECTS,
  });
  tabs.push({
    label: 'Prerequisites',
    href: `${url}/prereqs?showMenus=${showMenu}&intkPrg=${intakeProg}`,
  });

  if (!showMenu || showMenu == 'false') {
    tabs.push({
      label: 'Materials',
      href: `${url}/materials?showMenus=${showMenu}&intkPrg=${intakeProg}`,
      privilege: Privileges.CAN_ACCESS_MODULE_MATERIALS,
    });
  }

  if (showMenu && showMenu == 'true') {
    tabs.push({
      label: 'Instructors',
      href: `${url}/instructors?showMenus=${showMenu}&intkPrg=${intakeProg}`,
    });

    tabs.push({
      label: 'Materials',
      href: `${url}/materials?showMenus=${showMenu}&intkPrg=${intakeProg}`,
      privilege: Privileges.CAN_ACCESS_MODULE_MATERIALS,
    });

    // {
    //   label: 'Syllabus',
    //   href: `${url}/syllabus?showMenus=${showMenu}&intkPrg=${intakeProg}`,
    // },
    tabs.push(
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
    var lastUrl: string = location.href;
    new MutationObserver(() => {
      const loc = location.href.split('?')[0];
      if (loc !== lastUrl) {
        lastUrl = loc;
        if (lastUrl.endsWith('subjects')) {
          setCurrentPage('SUBJECTS');
        } else if (lastUrl.endsWith('materials')) {
          setCurrentPage('MATERIALS');
        } else if (lastUrl.endsWith('prereqs')) {
          setCurrentPage('PREREQS');
        }
        // else if (lastUrl.endsWith('syllabus')) {
        //   setCurrentPage('SYLLABUS');
        // }
        else if (lastUrl.endsWith('evaluations')) {
          setCurrentPage('EVALUATIONS');
        } else if (lastUrl.endsWith(id)) {
          setCurrentPage('SUBJECTS');
        } else {
          setCurrentPage('');
        }
      }
    }).observe(document, { subtree: true, childList: true });
  }, [id]);

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

            {user?.user_type === UserType.ADMIN && (
              <>
                {route == 'SUBJECTS' ? (
                  <Permission privilege={Privileges.CAN_CREATE_SUBJECTS}>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => {
                          history.push(`/dashboard/modules/${id}/add-subject`);
                        }}>
                        Add new subject
                      </Button>
                    </div>
                  </Permission>
                ) : (
                  //  : route == 'SYLLABUS' ? (
                  //   <div className="flex gap-3">
                  //     <Button onClick={() => history.push(`${url}/syllabus/add-syllabus`)}>
                  //       Add new Syllabus
                  //     </Button>
                  //   </div>
                  // )
                  <></>
                )}
              </>
            )}
            {user?.user_type === UserType.ADMIN && route == 'PREREQS' && (
              <div className="flex gap-3">
                <Button
                  onClick={() =>
                    history.push(
                      `${url}/${id}/add-prereq?showMenus=${showMenu}&intkPrg=${intakeProg}`,
                    )
                  }>
                  Add prerequisites
                </Button>
              </div>
            )}
            {user?.user_type === UserType.INSTRUCTOR && route == 'MATERIALS' && (
              <Permission privilege={Privileges.CAN_CREATE_MODULE_MATERIALS}>
                <div className="flex gap-3">
                  <Button onClick={() => history.push(`${url}/materials/add-material`)}>
                    Add new Material
                  </Button>
                </div>
              </Permission>
            )}
          </div>
        </div>
        <TabNavigation tabs={tabs}>
          <Switch>
            <Route exact path={`${path}/subjects`} render={() => <Subjects />} />

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
              path={`${path}/prereqs`}
              render={() => {
                return <Prerequisites />;
              }}
            />
            {/* add prerequesite popup */}
            <Route
              exact
              path={`${path}/:moduleId/add-prereq`}
              render={() => {
                return (
                  <PopupMolecule
                    closeOnClickOutSide={false}
                    title="Add Prerequesite"
                    open
                    onClose={handleClose}>
                    <AddPrerequesitesForm />
                  </PopupMolecule>
                );
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
