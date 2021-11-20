import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { authenticatorStore } from '../../../../store/administration';
import usersStore from '../../../../store/administration/users.store';
import { evaluationStore } from '../../../../store/administration/evaluation.store';
import { ValueType } from '../../../../types';
import {
  IEvaluationApproval,
  IEvaluationApprovalStatus,
  IEvaluationProps,
} from '../../../../types/services/evaluation.types';
import { UserType } from '../../../../types/services/user.types';
import { getDropDownOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import Input from '../../../Atoms/Input/Input';
import Heading from '../../../Atoms/Text/Heading';
import ILabel from '../../../Atoms/Text/ILabel';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import SwitchMolecule from '../../../Molecules/input/SwitchMolecule';

export default function EvaluationSettings({ handleGoBack }: IEvaluationProps) {
  const history = useHistory();
  const authUser = authenticatorStore.authUser().data?.data.data;
  const { data: inCharge } = usersStore.getUsersByAcademy(
    authUser?.academy.id.toString() || '',
  );

  const instructors = inCharge?.data.data.filter(
    (user) => user.user_type === UserType.INSTRUCTOR,
  );

  const [settings, setSettings] = useState<IEvaluationApproval>({
    approver: '',
    evaluation: JSON.parse(localStorage.getItem('evaluationId') || '{}'),
    evaluation_approval_status: IEvaluationApprovalStatus.REVIEWING,
    id: '',
    preparer: authUser?.id.toString() || '',
    reviewer: '',
    to_be_approved: false,
    to_be_reviewed: false,
  });

  const statuses = [
    {
      label: IEvaluationApprovalStatus.REVIEWING,
      value: IEvaluationApprovalStatus.REVIEWING,
    },
    {
      label: IEvaluationApprovalStatus.DRAFT,
      value: IEvaluationApprovalStatus.DRAFT,
    },
    {
      label: IEvaluationApprovalStatus.APPROVING,
      value: IEvaluationApprovalStatus.APPROVING,
    },
    {
      label: IEvaluationApprovalStatus.RETURNED,
      value: IEvaluationApprovalStatus.RETURNED,
    },
    {
      label: 'REVIEWED TO APPROVE',
      value: IEvaluationApprovalStatus.REVIEWED_TO_APPROVE,
    },
  ];

  function handleChange({ name, value }: ValueType) {
    setSettings((settings) => ({ ...settings, [name]: value }));
  }

  const { mutate } = evaluationStore.createEvaluationSettings();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    mutate(settings, {
      onSuccess: () => {
        toast.success('Settings added', { duration: 5000 });
        localStorage.removeItem('evaluationId');
        history.push('/dashboard/evaluations');
      },
      onError: (error) => {
        console.log(error);
        toast.error(error + '');
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Heading fontSize="base" fontWeight="medium">
        Evaluation Settings
      </Heading>
      <div className="flex gap-6 items-center mt-12">
        <Heading fontSize="sm" fontWeight="medium">
          Prepared by
        </Heading>
        <Input
          readonly
          style={{ width: '15rem' }}
          name="preparer"
          value=""
          placeholder={`${authUser?.first_name} ${authUser?.last_name}`}
        />
      </div>
      <div className="pt-6 flex-col">
        {/* <ILabel>Shuffle evaluation questions</ILabel>
        <SwitchMolecule
          loading={false}
          name="shuffle"
          value={false}
          handleChange={handleChange}>
          True
        </SwitchMolecule> */}
      </div>{' '}
      <div className="pt-6 flex-col">
        <DropdownMolecule
          width="60"
          placeholder="Reviewer"
          options={statuses}
          name="evaluation_approval_status"
          handleChange={handleChange}>
          Evaluation Reviewing status
        </DropdownMolecule>
        {/* <ILabel>Evaluation Reviewing status</ILabel> */}
        <SwitchMolecule
          loading={false}
          name="to_be_reviewed"
          value={settings.to_be_reviewed}
          handleChange={handleChange}>
          True
        </SwitchMolecule>
      </div>
      {settings.to_be_reviewed && (
        <div className="pt-6">
          <DropdownMolecule
            width="60"
            placeholder="Reviewer"
            options={getDropDownOptions({
              inputs: instructors || [],
              labelName: ['first_name', 'last_name'],
            })}
            name="reviewer"
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
      {settings.to_be_approved && (
        <div className="pt-6">
          <DropdownMolecule
            width="60"
            placeholder="Approver"
            options={getDropDownOptions({
              inputs: instructors || [],
              labelName: ['first_name', 'last_name'],
            })}
            name="approver"
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
          width="60"
          placeholder="marker"
          options={getDropDownOptions({
            inputs: instructors || [],
            labelName: ['first_name', 'last_name'],
          })}
          name="approver"
          handleChange={handleChange}>
          To be marked by
        </DropdownMolecule>
      </div>
      {/* <div className="flex flex-col"> */}
      <Button styleType="text" color="gray" className="mt-6" onClick={handleGoBack}>
        Back
      </Button>
      <div className="pt-4">
        <Button type="submit">Finish</Button>
      </div>
      {/* </div> */}
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
