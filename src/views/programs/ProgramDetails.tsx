import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation, { TabType } from '../../components/Molecules/tabs/TabNavigation';
import AddPrerequesitesForm from '../../components/Organisms/forms/modules/AddPrerequisiteForm';
import NewModuleForm from '../../components/Organisms/forms/modules/NewModuleForm';
import { attachementStore } from '../../store/administration/attachment.store';
// import { attachementStore } from '../../store/administration/attachment.store';
import programStore, {
  getLevelsByAcademicProgram,
} from '../../store/administration/program.store';
import { CommonCardDataType, Link as Links, ParamType, Privileges } from '../../types';
import { ProgramInfo } from '../../types/services/program.types';
import { downloadPersonalDoc } from '../../utils/file-util';
import { advancedTypeChecker } from '../../utils/getOption';
import ProgramModules from '../modules/ProgramModules';
import { IProgramData } from './AcademicPrograms';
import AddLevelToProgram from './AddLevelToProgram';
import AddProgramSyllabus from './AddProgramSyllabus';

export interface IProgramFile extends CommonCardDataType, IProgramData {
  attachment_file_name: string;
  attachment_id: string;
}

export default function ProgramDetailsMolecule() {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { id } = useParams<ParamType>();
  const program = programStore.getProgramById(id).data?.data.data;
  const programLevels = getLevelsByAcademicProgram(id).data?.data.data;
  const [fileUrl, setUrl] = useState('');
  const { mutate } = attachementStore.deleteAttachmentById();

  async function downloadProgramAttachment(data: ProgramInfo | undefined) {
    await setUrl(
      await downloadPersonalDoc(
        data?.attachment_id + '',
        'pdf',
        '/attachments/download/',
      ),
    );
    var element = document.createElement('a');
    element.setAttribute('href', fileUrl);
    element.setAttribute('download', data?.attachment_file_name + '');

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  async function deleteSyllabus(id: string) {
    mutate(id),
      {
        onSuccess() {
          toast.success('successfully deleted');
        },
        onError(error: any) {
          toast.error(error.response.data.message);
        },
      };
  }

  const getProgramData = () => {
    let programData: IProgramFile | undefined;
    if (program) {
      programData = {
        attachment_id: program.attachment_id,
        attachment_file_name: program.attachment_file_name,
        status: {
          type: advancedTypeChecker(program.generic_status),
          text: program.generic_status.toString(),
        },
        code: program.code,
        title: program.name,
        subTitle: program.type,
        description: program.description,
        department: program.department,
        total_num_modules: program.total_num_modules,
        // incharge: program.incharge && program.incharge.user.username,
      };
    }

    return programData;
  };

  const programData = getProgramData();
  const tabs: TabType[] = [
    {
      label: 'Program info',
      href: `${url}`,
    },
  ];

  tabs.push({
    label: 'Program modules',
    href: `${url}/modules`,
    privilege: Privileges.CAN_ACCESS_MODULES,
  });

  const handleClose = () => {
    history.goBack();
  };
  const list: Links[] = [
    { to: 'home', title: 'home' },
    { to: 'divisions', title: 'Faculty' },
    { to: 'programs', title: 'Programs' },
    { to: `${url}`, title: 'details' },
  ];

  return (
    <>
      <BreadCrumb list={list} />

      <div className="pt-5">
        <Heading className="pb-5" fontWeight="semibold" fontSize="xl">
          {program?.name}
        </Heading>
        <TabNavigation tabs={tabs}>
          <Switch>
            <Route
              exact
              path={`${path}/level/add`}
              render={() => {
                return (
                  <PopupMolecule
                    closeOnClickOutSide={false}
                    title="Add level to program"
                    open={true}
                    onClose={() => history.goBack()}>
                    <AddLevelToProgram />
                  </PopupMolecule>
                );
              }}
            />
            <Route
              exact
              path={`${path}`}
              render={() => (
                <div className="flex py-9">
                  <div className="mr-20">
                    {programData ? (
                      <CommonCardMolecule data={programData}>
                        <div className="flex flex-col mt-8 gap-7 pb-2">
                          <Heading color="txt-secondary" fontSize="sm">
                            Program Type
                          </Heading>
                          <Heading fontSize="sm">
                            {programData.subTitle?.replaceAll('_', ' ')}
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
                            Edit program
                          </Button>
                          <Button styleType="outline">Change Status</Button>
                        </div>
                      </CommonCardMolecule>
                    ) : (
                      <Loader />
                    )}
                  </div>

                  {/* <div className="flex flex-col gap-8 z-0"> */}
                  {/* <div className="flex gap-8">
                      <UsersPreview
                        title="Students"
                        label="Students in Cadette programs"
                        data={DummyUser}
                        totalUsers={DummyUser.length || 0}
                      />
                      <UsersPreview
                        title="Instructors"
                        label="Instructors in Cadette programs"
                        data={DummyUser}
                        totalUsers={DummyUser.length || 0}
                      />
                    </div> */}
                  {/* levels */}
                  <Permission privilege={Privileges.CAN_ACCESS_PROGRAM_LEVELS}>
                    <div className="mr-20 flex flex-col gap-7 w-60 p-6 bg-main">
                      <Heading color="txt-secondary" fontSize="base">
                        Levels
                      </Heading>
                      <div className="flex flex-col gap-8">
                        {programLevels && programLevels?.length > 0 ? (
                          programLevels.map((programLevel) => (
                            <Heading
                              key={programLevel.id}
                              color="primary"
                              fontSize="base"
                              fontWeight="semibold">
                              {programLevel.level.name}
                            </Heading>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                      <Permission privilege={Privileges.CAN_CREATE_PROGRAM_LEVELS}>
                        <div className="text-primary-500 py-2 text-sm mr-3">
                          <Link
                            to={`${url}/level/add`}
                            className="flex items-center justify-end">
                            <Icon name="add" size={12} fill="primary" />
                            Add levels
                          </Link>
                        </div>
                      </Permission>
                    </div>
                  </Permission>
                  <Permission privilege={Privileges.CAN_ACCESS_PROGRAM_LEVELS}>
                    <div className="mr-20 flex flex-col gap-7 w-60 p-6 bg-main">
                      <Heading color="txt-secondary" fontSize="base">
                        Progam Syllabus
                      </Heading>
                      <div className="flex flex-col gap-8">
                        {program?.attachment_id != undefined ? (
                          <Heading
                            key={program?.attachment_id}
                            color="primary"
                            fontSize="base"
                            fontWeight="semibold">
                            {program?.attachment_file_name}
                          </Heading>
                        ) : (
                          <></>
                        )}
                      </div>
                      <Permission privilege={Privileges.CAN_CREATE_PROGRAM_LEVELS}>
                        <div className="text-primary-500 py-2 text-sm mr-3">
                          <Button onClick={() => downloadProgramAttachment(program)}>
                            Download Syllabus
                          </Button>
                          <Button
                            onClick={() => deleteSyllabus(program?.attachment_id + '')}
                            styleType="outline">
                            Delete Syllabus
                          </Button>
                          <Link
                            to={`${url}/programSyllabus/add`}
                            className="flex items-center justify-end">
                            <Icon name="add" size={12} fill="primary" />
                            Add Program Syllabus
                          </Link>
                        </div>
                      </Permission>
                    </div>
                  </Permission>
                  {/* <Permission privilege={Privileges.CAN_ACCESS_PROGRAMS}>
                    <div className="flex flex-col gap-4 z-0 pt-6">
                      <div className="flex justify-between items-center">
                        <Heading fontSize="base" fontWeight="semibold">
                          Program Syllabus
                        </Heading>
                      </div>
                      <>
                        {isLoading ? (
                          <Loader />
                        ) : programSyllabusInfo.length === 0 ? (
                          <NoDataAvailable
                            // privilege={Privileges.CAN_CREATE_SYLLABUS}
                            icon="subject"
                            title={'No program syllabus available'}
                            description={
                              'There are no program syllabus currently added on this program'
                            }
                            handleClick={() => history.push(`${url}/add-syllabus`)}
                          />
                        ) : (
                          <div className="pt-3 w-2/5">
                            <Accordion>
                              {programSyllabusInfo.map((mat) => {
                                return (
                                  <Panel
                                    width="w-full"
                                    bgColor="main"
                                    key={mat.description}
                                    title={mat.purpose}>
                                    <div className="font-medium text-gray-600 text-sm py-4">
                                      <Tiptap
                                        editable={false}
                                        viewMenu={false}
                                        handleChange={() => {}}
                                        content={mat.description}
                                      />
                                    </div>
                                    <Button
                                      className="mt-2 mb-4 mx-20"
                                      styleType="outline"
                                      onClick={() =>
                                        history.push(`${url}/add-syllabus/add`)
                                      }>
                                      Add Program Syllabus
                                    </Button>
                                  </Panel>
                                );
                              })}
                            </Accordion>
                          </div>
                        )}
                      </>
                    </div>
                  </Permission> */}

                  {/* intakes */}
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-7 bg-main w-60 p-6">
                      <Heading color="txt-secondary" fontSize="base">
                        Intakes
                      </Heading>
                      <div className="flex flex-col gap-8">
                        <Heading color="primary" fontSize="base" fontWeight="semibold">
                          Active Intakes
                        </Heading>
                        <Heading color="primary" fontSize="base" fontWeight="semibold">
                          Passive Intakes
                        </Heading>
                      </div>
                    </div>
                  </div>
                </div>
                // </div>
              )}
            />
            {/* add syllabus */}
            <Route
              exact
              path={`${path}/programSyllabus/add`}
              render={() => {
                return (
                  <PopupMolecule
                    title="New Program Syllabus"
                    open
                    onClose={history.goBack}>
                    <AddProgramSyllabus programId={program?.id + ''} />
                  </PopupMolecule>
                );
              }}
            />
            {/* add module popup */}
            <Route
              exact
              path={`${path}/modules/add`}
              render={() => {
                return (
                  <PopupMolecule title="New Module" open onClose={handleClose}>
                    <NewModuleForm />
                  </PopupMolecule>
                );
              }}
            />
            {/* add prerequesite popup */}
            <Route
              exact
              path={`${path}/modules/:moduleId/add-prereq`}
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
            <Route path={`${path}/modules`} render={() => <ProgramModules />} />
          </Switch>
        </TabNavigation>
      </div>
    </>
  );
}
