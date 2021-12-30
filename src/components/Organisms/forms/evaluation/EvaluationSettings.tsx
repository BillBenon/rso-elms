import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { queryClient } from '../../../../plugins/react-query';
import { authenticatorStore } from '../../../../store/administration';
import usersStore from '../../../../store/administration/users.store';
import { evaluationStore } from '../../../../store/evaluation/evaluation.store';
import { ValueType } from '../../../../types';
import {
  IEvaluationApproval,
  IEvaluationApprovalStatus,
  IEvaluationProps,
} from '../../../../types/services/evaluation.types';
import { UserType } from '../../../../types/services/user.types';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../../../utils/getLocalStorageItem';
import { getDropDownOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import Heading from '../../../Atoms/Text/Heading';
import ILabel from '../../../Atoms/Text/ILabel';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import SwitchMolecule from '../../../Molecules/input/SwitchMolecule';

export default function EvaluationSettings({
  handleGoBack,
  evaluationId,
}: IEvaluationProps) {
  const authUser = authenticatorStore.authUser().data?.data.data;

  const { data: inCharge } = usersStore.getUsersByAcademyAndUserType(
    authUser?.academy.id.toString() || '',
    UserType.INSTRUCTOR,
    { page: 0, pageSize: 1000, sortyBy: 'username' },
  );

  const instructors = inCharge?.data.data.content;

  const [settings, setSettings] = useState<IEvaluationApproval>({
    approver: '',
    evaluation: evaluationId || getLocalStorageData('evaluationId'),
    evaluation_approval_status: IEvaluationApprovalStatus.DRAFT,
    id: '',
    preparer: authUser?.id.toString() || '',
    reviewer: '',
    marker: authUser?.id.toString() || '',
    to_be_approved: false,
    to_be_reviewed: false,
  });

  function handleChange({ name, value }: ValueType) {
    setSettings((settings) => ({ ...settings, [name]: value }));
  }

  const { mutate } = evaluationStore.createEvaluationSettings();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    mutate(settings, {
      onSuccess: () => {
        toast.success('Settings added', { duration: 5000 });
        queryClient.invalidateQueries(['evaluationsByAcademyInstructor']);
        localStorage.removeItem('evaluationId');
        setLocalStorageData('currentStep', 0);
        // history.push('/dashboard/evaluations');
        window.location.href = '/dashboard/evaluations';
      },
      onError: (error) => {
        console.log(error);
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
      // <div className="pt-6">
      //   <DropdownMolecule
      //     width="60"
      //     placeholder="marker"
      //     options={getDropDownOptions({
      //       inputs: instructors || [],
      //       labelName: ['first_name', 'last_name'],
      //     })}
      //     name="marker"
      //     handleChange={handleChange}>
      //     To be marked by
      //   </DropdownMolecule>
      // </div>
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
