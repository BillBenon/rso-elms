import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import useAuthenticator from '../../../../hooks/useAuthenticator';
import usePickedRole from '../../../../hooks/usePickedRole';
import { queryClient } from '../../../../plugins/react-query';
import { evaluationStore } from '../../../../store/evaluation/evaluation.store';
import instructordeploymentStore from '../../../../store/instructordeployment.store';
import { SelectData, ValueType } from '../../../../types';
import {
  IEvaluationApproval,
  IEvaluationProps,
} from '../../../../types/services/evaluation.types';
import {
  getLocalStorageData,
  removeLocalStorageData,
  setLocalStorageData,
} from '../../../../utils/getLocalStorageItem';
import Button from '../../../Atoms/custom/Button';
import Heading from '../../../Atoms/Text/Heading';
import ILabel from '../../../Atoms/Text/ILabel';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import SwitchMolecule from '../../../Molecules/input/SwitchMolecule';

export default function EvaluationSettings({
  handleGoBack,
  evaluationId,
}: IEvaluationProps) {
  const { user } = useAuthenticator();
  const picked_role = usePickedRole();

  const instructors = instructordeploymentStore.getInstructorsDeployedInAcademy(
    picked_role?.academy_id + '',
  ).data?.data.data;

  const initialState = {
    approver_ids: '',
    evaluation_id: getLocalStorageData('evaluationId') || evaluationId,
    id: '',
    reviewer_ids: '',
    marker_ids: user?.id.toString() || '',
    to_be_approved: false,
    to_be_reviewed: false,
  };

  useEffect(() => {
    setSettings({
      approver_ids: '',
      evaluation_id: getLocalStorageData('evaluationId') || evaluationId,
      id: '',
      reviewer_ids: '',
      marker_ids: user?.id.toString() || '',
      to_be_approved: false,
      to_be_reviewed: false,
    });
  }, [evaluationId, user?.id]);

  const [settings, setSettings] = useState<IEvaluationApproval>(initialState);

  function handleChange({ name, value }: ValueType) {
    setSettings({ ...settings, [name]: value.toString() });

    setLocalStorageData('evaluationSettings', { ...settings, [name]: value.toString() });
  }

  useEffect(() => {
    const cachedData: IEvaluationApproval =
      getLocalStorageData('evaluationSettings') || {};
    setSettings(cachedData || {});
  }, []);

  const { mutate } = evaluationStore.createEvaluationSettings();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    mutate(settings, {
      onSuccess: () => {
        toast.success('Settings added', { duration: 5000 });
        queryClient.invalidateQueries(['evaluationsByAcademyInstructor']);
        localStorage.removeItem('evaluationId');
        setLocalStorageData('currentStep', 0);
        removeLocalStorageData('evaluationInfo');
        removeLocalStorageData('evaluationQuestions');
        removeLocalStorageData('evaluationSettings');
        window.location.href = '/dashboard/evaluations';
      },
      onError: (error: any) => {
        toast.error(error + '');
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Heading fontSize="base" fontWeight="semibold">
        Evaluation Settings
      </Heading>

      <div className="pt-6 flex-col">
        <ILabel>Evaluation Reviewing status</ILabel>
        <SwitchMolecule
          loading={false}
          name="to_be_reviewed"
          value={settings.to_be_reviewed}
          handleChange={handleChange}>
          True
        </SwitchMolecule>
      </div>
      {settings?.to_be_reviewed && (
        <div className="pt-6">
          <DropdownMolecule
            isMulti
            width="60"
            placeholder="Reviewer"
            options={
              instructors?.map((instr) => ({
                label: `${instr.user.first_name} ${instr.user.last_name}`,
                value: instr.id,
              })) as SelectData[]
            }
            name="reviewer_ids"
            handleChange={handleChange}>
            To be reviewed by
          </DropdownMolecule>
        </div>
      )}
      <div className="pt-6 flex-col">
        <ILabel>Evaluation Approval status</ILabel>
        <SwitchMolecule
          showLabelFirst
          loading={false}
          name="to_be_approved"
          value={settings.to_be_approved}
          handleChange={handleChange}>
          True
        </SwitchMolecule>
      </div>
      {settings?.to_be_approved && (
        <div className="pt-6">
          <DropdownMolecule
            isMulti
            width="60"
            placeholder="Approver"
            options={
              instructors?.map((instr) => ({
                label: `${instr.user.first_name} ${instr.user.last_name}`,
                value: instr.id,
              })) as SelectData[]
            }
            name="approver_ids"
            handleChange={handleChange}>
            To be approved by
          </DropdownMolecule>
        </div>
      )}
      {/* <div className="pt-6 flex-col">
        <ILabel>Marking status</ILabel>
        <SwitchMolecule
          showLabelFirst
          loading={false}
          name="shuffle"
          value={false}
          handleChange={handleChange}>
          True
        </SwitchMolecule>
      </div> */}
      <div className="pt-6">
        <DropdownMolecule
          isMulti
          width="60"
          placeholder="Marker"
          options={
            instructors?.map((instr) => ({
              label: `${instr.user.first_name} ${instr.user.last_name}`,
              value: instr.id,
            })) as SelectData[]
          }
          name="marker_ids"
          handleChange={handleChange}>
          To be marked by
        </DropdownMolecule>
      </div>
      <div className="flex flex-col">
        <Button styleType="text" color="gray" className="mt-6" onClick={handleGoBack}>
          Back
        </Button>
        <div className="pt-4">
          <Button type="submit">Finish</Button>
        </div>
      </div>
      {/* <div className="flex flex-col">
        <Button styleType="text" color="gray" className="mt-6" onClick={handleGoBack}>
          Back
        </Button>
        <div className="pt-4">
          <Button type="submit">Finish</Button>
        </div>
      </div> */}
      {/* <SwitchMolecule
        loading={false}
        name="shuffle"
        value={false}
        handleChange={handleChange}>
        Evaluation Reviewing status
      </SwitchMolecule> */}
    </form>
  );
}
