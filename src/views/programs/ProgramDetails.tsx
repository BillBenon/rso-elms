import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
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
import { queryClient } from '../../plugins/react-query';
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
  const { t } = useTranslation();

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

  console.log(program);

  function deleteSyllabus(id: string) {
    mutate(id, {
      onSuccess() {
        toast.success('successfully deleted');
        queryClient.invalidateQueries(['programs/id', id]);
      },
      onError(error: any) {
        toast.error(error.response.data.message);
      },
    });
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
      label: t('Program') + ' information',
      href: `${url}`,
    },
  ];

  tabs.push({
    label: t('Program') + ' modules',
    href: `${url}/modules`,
    privilege: Privileges.CAN_ACCESS_MODULES,
  });

  const handleClose = () => {
    history.goBack();
  };
  const list: Links[] = [
    { to: 'home', title: 'home' },
    { to: 'divisions', title: t('Faculty') },
    { to: 'programs', title: t('Program') },
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
                    title={'Add level to ' + t('Program')}
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
                            {t('Program')} Type
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
                            Edit {t('Program')}
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
                    <div className="flex  flex-col gap-8">
                      <div className="mr-20 rounded border-2 border-[#e9ecef] flex flex-col gap-7 w-60 p-6 bg-main">
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
                          <div className="text-primary-500 py-2 text-sm flex justify-end">
                            <Link
                              to={`${url}/level/add`}
                              className="flex bg-secondary px-2 rounded-sm hover:bg-tertiary items-center justify-end">
                              <Icon name="add" size={12} fill="primary" />
                              Add levels
                            </Link>
                          </div>
                        </Permission>
                      </div>
                    </div>
                  </Permission>

                  <div className="flex flex-col gap-8">
                    <Permission privilege={Privileges.CAN_ACCESS_PROGRAM_LEVELS}>
                      <div className="mr-20 rounded border-2 border-[#e9ecef] flex flex-col gap-7 w-354 p-6 bg-main">
                        <Heading color="txt-secondary" fontSize="base">
                          {t('Program')} Syllabus
                        </Heading>
                        <div className="flex flex-col gap-4">
                          {program?.attachment_id == null ? (
                            <Permission privilege={Privileges.CAN_CREATE_PROGRAM_LEVELS}>
                              <div className="text-primary-500 py-2 text-sm mr-3 flex space-x-4">
                                <Link
                                  to={`${url}/programSyllabus/add`}
                                  className="bg-secondary px-2 rounded-sm hover:bg-tertiary flex items-center justify-end">
                                  <Icon name="add" size={12} fill="primary" />
                                  Add {t('Program')} Syllabus
                                </Link>
                              </div>
                            </Permission>
                          ) : (
                            <>
                              <Heading
                                key={program?.attachment_id}
                                color="txt-primary"
                                fontSize="base"
                                fontWeight="semibold">
                                {program?.name + ' Syllabus'}
                              </Heading>
                              <Permission
                                privilege={Privileges.CAN_CREATE_PROGRAM_LEVELS}>
                                <div className="text-primary-500 py-1 text-sm mr-3 flex space-x-4">
                                  <Link
                                    to={`${url}/programSyllabus/add`}
                                    className="flex items-center justify-end">
                                    <Icon name="add" size={12} fill="primary" />
                                    Add new {t('Program')} Syllabus
                                  </Link>
                                </div>
                                <div className="flex space-x-4">
                                  <Button
                                    onClick={() => downloadProgramAttachment(program)}>
                                    Download
                                  </Button>
                                  <Button
                                    onClick={() => deleteSyllabus(program.id + '')}
                                    styleType="outline">
                                    Delete
                                  </Button>
                                </div>
                              </Permission>
                            </>
                          )}
                        </div>
                      </div>
                    </Permission>

                    {/* intakes */}
                    {/* <div className="flex flex-col gap-8"> */}
                    <div className="rounded border-2 border-[#e9ecef] flex flex-col gap-7 bg-main w-60 p-6">
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
                    title={'New ' + t('Program') + ' Syllabus'}
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
