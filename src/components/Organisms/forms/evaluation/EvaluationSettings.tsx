import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';
import useAuthenticator from '../../../../hooks/useAuthenticator';
import usePickedRole from '../../../../hooks/usePickedRole';
import { evaluationStore } from '../../../../store/evaluation/evaluation.store';
import instructordeploymentStore from '../../../../store/instructordeployment.store';
import { SelectData, ValueType } from '../../../../types';
import {
  IEvaluationApproval,
  IMarkingType,
} from '../../../../types/services/evaluation.types';
import Button from '../../../Atoms/custom/Button';
import Heading from '../../../Atoms/Text/Heading';
import ILabel from '../../../Atoms/Text/ILabel';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import SwitchMolecule from '../../../Molecules/input/SwitchMolecule';

export default function EvaluationSettings() {
  const { user } = useAuthenticator();
  const picked_role = usePickedRole();
  const history = useHistory();

  const { evaluationId } = useParams<{ evaluationId: string }>();

  const instructors = instructordeploymentStore.getInstructorsDeployedInAcademy(
    picked_role?.academy_id + '',
  ).data?.data.data;

  const { data: evaluationInfo } =
    evaluationStore.getEvaluationById(evaluationId + '').data?.data || {};

  const initialState: IEvaluationApproval = {
    approver_ids: '',
    evaluation_id: evaluationId + '',
    id: '',
    reviewer_ids: '',
    marker_ids: undefined,
    to_be_approved: false,
    to_be_reviewed: false,
  };

  useEffect(() => {
    setSettings({
      approver_ids: '',
      evaluation_id: evaluationId + '',
      id: '',
      reviewer_ids: '',
      marker_ids: undefined,
      to_be_approved: false,
      to_be_reviewed: false,
    });
  }, [evaluationId, user?.id]);

  const [settings, setSettings] = useState<IEvaluationApproval>(initialState);

  function handleChange({ name, value }: ValueType) {
    if (name == 'to_be_approved' && value == 'false') {
      setSettings({ ...settings, approver_ids: '' });
      return;
    } else if (name == 'to_be_reviewed' && value == 'false') {
      setSettings({ ...settings, reviewer_ids: '' });
      return;
    }

    setSettings({ ...settings, [name]: value });
  }

  const { mutate, isLoading } = evaluationStore.createEvaluationSettings();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setSettings({
      ...settings,
      evaluation_id: evaluationId + '',
    });

    // Should remove marker_id property if marking type is set to section
    // otherwise it will parse marker_ids from array to string for api compatibility

    if (evaluationInfo?.marking_type === IMarkingType.PER_SECTION) {
      Object.keys(settings).forEach(
        (key) =>
          settings[key as keyof IEvaluationApproval] == null &&
          delete settings[key as keyof IEvaluationApproval],
      );
    } else {
      settings.marker_ids = settings.marker_ids?.toString();
      settings.approver_ids = settings.approver_ids?.toString();
      settings.reviewer_ids = settings.reviewer_ids?.toString();
    }

    mutate(settings, {
      onSuccess: () => {
        toast.success('Settings added', { duration: 5000 });
        // To make sure that the evaluations are updated on the page
        window.location.href = '/dashboard/evaluations';
      },
      onError: (error: any) => {
        toast.error(error.response.data.message, { duration: 5000 });
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
      {Boolean(settings?.to_be_reviewed) && (
        <div className="pt-6">
          <DropdownMolecule
            isMulti
            width="60"
            placeholder="Reviewer"
            options={
              instructors?.map((instr) => ({
                label: `${instr.user.first_name} ${instr.user.last_name}`,
                value: instr.user.id,
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
      {/*
      TODO: when show form when it's been toggled only
      */}
      {Boolean(settings?.to_be_approved) && (
        <div className="pt-6">
          <DropdownMolecule
            isMulti
            width="60"
            placeholder="Approver"
            options={
              instructors?.map((instr) => ({
                label: `${instr.user.first_name} ${instr.user.last_name}`,
                value: instr.user.id,
              })) as SelectData[]
            }
            name="approver_ids"
            handleChange={handleChange}>
            To be approved by
          </DropdownMolecule>
        </div>
      )}

      {evaluationInfo?.marking_type !== IMarkingType.PER_SECTION && (
        <div className="pt-6">
          <DropdownMolecule
            isMulti
            width="60"
            placeholder="Marker"
            options={
              instructors?.map((instr) => ({
                label: `${instr.user.first_name} ${instr.user.last_name}`,
                value: instr.user.id,
              })) as SelectData[]
            }
            name="marker_ids"
            handleChange={handleChange}>
            To be marked by
          </DropdownMolecule>
        </div>
      )}
      <div className="flex flex-col">
        {/* <Button styleType="text" color="gray" className="mt-6" onClick={handleGoBack}>
          Back
        </Button> */}
        <div className="pt-4">
          <Button type="submit" disabled={isLoading}>
            Finish
          </Button>
        </div>
      </div>
    </form>
  );
}
