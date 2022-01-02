import { Editor } from '@tiptap/react';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

import useInstructorModules from '../../../../hooks/getInstructorModules';
import { authenticatorStore } from '../../../../store/administration';
import { classStore } from '../../../../store/administration/class.store';
import enrollmentStore from '../../../../store/administration/enrollment.store';
import { subjectStore } from '../../../../store/administration/subject.store';
import { evaluationStore } from '../../../../store/evaluation/evaluation.store';
import instructordeploymentStore from '../../../../store/instructordeployment.store';
import { CommonCardDataType, SelectData, ValueType } from '../../../../types';
import { EnrollInstructorLevelInfo } from '../../../../types/services/enrollment.types';
import {
  IAccessTypeEnum,
  IContentFormatEnum,
  IEligibleClassEnum,
  IEvaluationClassification,
  IEvaluationCreate,
  IEvaluationProps,
  IEvaluationStatus,
  IEvaluationTypeEnum,
  IQuestionaireTypeEnum,
  ISubmissionTypeEnum,
} from '../../../../types/services/evaluation.types';
import { setLocalStorageData } from '../../../../utils/getLocalStorageItem';
import {
  getDropDownOptions,
  getDropDownStatusOptions,
} from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import ILabel from '../../../Atoms/Text/ILabel';
import Tiptap from '../../../Molecules/editor/Tiptap';
import DateMolecule from '../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';

export default function EvaluationInfoComponent({
  handleNext,
  evaluationId,
  evaluationInfo,
}: IEvaluationProps) {
  const [moduleId, setModuleId] = useState('');
  const { search } = useLocation();
  const progId = new URLSearchParams(search).get('prog');
  const intakePeriodId = new URLSearchParams(search).get('prd');
  // const [period, setPeriod] = useState('');

  const authUser = authenticatorStore.authUser().data?.data.data;

  const instructorInfo = instructordeploymentStore.getInstructorByUserId(
    authUser?.id + '',
  ).data?.data.data;

  const instrucotrModules = useInstructorModules(progId + '', instructorInfo?.id + '');

  let selectedModule = instrucotrModules?.find((mod) => mod.id === moduleId)?.id;

  const { data: subjects, isLoading: subjLoading } = subjectStore.getSubjectsByModule(
    selectedModule + '',
  );
  const { data: levels } = enrollmentStore.getInstructorLevels(instructorInfo?.id + '');

  const { data: classes } = classStore.getClassByPeriod(intakePeriodId + '');

  const [details, setDetails] = useState<IEvaluationCreate>({
    access_type: evaluationInfo?.access_type || IAccessTypeEnum.PUBLIC,
    academy_id: authUser?.academy.id.toString() || '',
    instructor_id: authUser?.id.toString() || '',
    adm_intake_level_class_id: evaluationInfo?.adm_intake_level_class_id || '',
    intake_academic_year_period: evaluationInfo?.intake_academic_year_period || '',
    allow_submission_time: evaluationInfo?.allow_submission_time || '',
    class_ids: evaluationInfo?.class_ids || '',
    id: evaluationInfo?.id || '',
    classification: evaluationInfo?.classification || IEvaluationClassification.MODULE,
    content_format: evaluationInfo?.content_format || IContentFormatEnum.DOC,
    due_on: '',
    eligible_group: IEligibleClassEnum.MULTIPLE,
    evaluation_status: evaluationInfo?.evaluation_status || IEvaluationStatus.PENDING,
    evaluation_type: evaluationInfo?.evaluation_type || IEvaluationTypeEnum.CAT,
    exam_instruction: evaluationInfo?.exam_instruction || '',
    is_consider_on_report: evaluationInfo?.is_consider_on_report || true,
    marking_reminder_date: evaluationInfo?.marking_reminder_date || '',
    maximum_file_size: evaluationInfo?.maximum_file_size || '',
    name: evaluationInfo?.name || '',
    questionaire_type: evaluationInfo?.questionaire_type || IQuestionaireTypeEnum.OPEN,
    subject_academic_year_period_id: evaluationInfo?.subject_id || '',
    submision_type: evaluationInfo?.submision_type || ISubmissionTypeEnum.ONLINE_TEXT,
    time_limit: evaluationInfo?.time_limit || 10,
    total_mark: evaluationInfo?.total_mark || 0,
  });

  const { data: classStudent, isLoading } = classStore.getStudentsByClass(
    details.adm_intake_level_class_id,
  );

  useEffect(() => {
    const classIds = details.class_ids.split(',');

    if (classIds.length <= 1) {
      const period =
        classes?.data.data.find((periodId) => periodId.id == details.class_ids)
          ?.intake_academic_year_period_id + '';

      setDetails((details) => ({
        ...details,
        ['intake_academic_year_period']: period,
      }));
    }

    console.log(details.intake_academic_year_period);
  }, [classes?.data.data, details.class_ids]);

  const { mutate } = evaluationStore.createEvaluation();
  const { mutateAsync } = evaluationStore.updateEvaluation();

  function handleChange({ name, value }: ValueType) {
    if (name === 'module') setModuleId(value + '');
    else if (name === 'class_ids')
      setDetails((details) => ({ ...details, class_ids: value.toString() }));
    else setDetails((details) => ({ ...details, [name]: value }));
  }

  function handleEditorChange(editor: Editor) {
    setDetails((details) => ({ ...details, exam_instruction: editor.getHTML() }));
  }

  function submitForm(e: FormEvent) {
    e.preventDefault();

    if (evaluationId) {
      mutateAsync(details, {
        onSuccess: () => {
          toast.success('Evaluation updated', { duration: 5000 });
          handleNext();
        },
        onError: (error: any) => {
          toast.error(error.response.data.data.message);
        },
      });
    } else {
      mutate(details, {
        onSuccess: (data) => {
          toast.success('Evaluation created', { duration: 5000 });
          setLocalStorageData('evaluationId', data.data.data.id);
          setLocalStorageData('currentStep', 1);
          handleNext();
        },
        onError: (error: any) => {
          toast.error(error.response.data.data + '');
        },
      });
    }
  }

  return (
    <div>
      <form className="pt-6" onSubmit={submitForm}>
        <InputMolecule
          width="80"
          name="name"
          placeholder="Evaluation Name"
          value={details.name}
          handleChange={handleChange}>
          Evaluation Name
        </InputMolecule>
        <DropdownMolecule
          /*@ts-ignore */
          // defaultValue={details.evaluation_type}
          width="64"
          name="evaluation_type"
          placeholder={details.evaluation_type || 'Evaluation Type'}
          handleChange={handleChange}
          options={getDropDownStatusOptions(IEvaluationTypeEnum)}>
          Evaluation type
        </DropdownMolecule>
        {/* <RadioMolecule
          className="pb-4"
          value={details.classification}
          name="classification"
          options={[
            { label: 'MODULE', value: IEvaluationClassification.MODULE },
            { label: 'SUBJECT', value: IEvaluationClassification.SUBJECT },
          ]}
          handleChange={handleChange}>
          Evaluation classification
        </RadioMolecule> */}
        <DropdownMolecule
          width="64"
          name="module"
          placeholder={'Select module'}
          handleChange={handleChange}
          options={getDropDownOptions({
            inputs: instrucotrModules || [],
            //@ts-ignore
            getOptionLabel: (mod: CommonCardDataType) => mod.title,
          })}>
          Select module
        </DropdownMolecule>
        <DropdownMolecule
          width="64"
          name="subject_academic_year_period_id"
          placeholder={subjLoading ? 'Loading' : 'Select subject'}
          handleChange={handleChange}
          options={getDropDownOptions({
            inputs: subjects?.data.data || [],
            labelName: ['title'],
          })}>
          Select subject
        </DropdownMolecule>

        <DropdownMolecule
          width="64"
          name="levelId"
          placeholder="Select level"
          handleChange={handleChange}
          options={getDropDownOptions({
            inputs: levels?.data.data || [],
            //@ts-ignore
            getOptionLabel: (lev: EnrollInstructorLevelInfo) =>
              lev.academic_year_program_intake_level.academic_program_level.level.name ||
              '',
          })}>
          Select Level
        </DropdownMolecule>

        <RadioMolecule
          defaultValue={details.eligible_group}
          className="pb-4"
          value={details.eligible_group}
          name="eligible_group"
          options={[
            { label: 'MULTIPLE CLASSES', value: IEligibleClassEnum.MULTIPLE },
            { label: 'SINGLE CLASS', value: IEligibleClassEnum.SINGLE },
          ]}
          handleChange={handleChange}>
          Eligible Class
        </RadioMolecule>

        <DropdownMolecule
          isMulti={details.eligible_group === IEligibleClassEnum.MULTIPLE}
          width="64"
          name="class_ids"
          placeholder="Select class"
          handleChange={handleChange}
          options={getDropDownOptions({
            inputs: classes?.data.data || [],
            labelName: ['class_name'],
          })}>
          Select Class(es)
        </DropdownMolecule>
        {/* <RadioMolecule
          defaultValue={details.access_type}
          className="pb-4"
          value={details.access_type}
          name="access_type"
          options={[
            { label: 'PUBLIC', value: IAccessTypeEnum.PUBLIC },
            { label: 'PRIVATE', value: IAccessTypeEnum.PRIVATE },
          ]}
          handleChange={handleChange}>
          Accessibility
        </RadioMolecule> */}
        <RadioMolecule
          defaultValue={details.questionaire_type}
          className="pb-4"
          value={details.questionaire_type}
          name="questionaire_type"
          options={[
            { label: 'Open', value: IQuestionaireTypeEnum.OPEN },
            { label: 'Multiple choice', value: IQuestionaireTypeEnum.MULTIPLE },
            { label: 'Both', value: IQuestionaireTypeEnum.HYBRID },
            { label: 'Field', value: IQuestionaireTypeEnum.FIELD },
          ]}
          handleChange={handleChange}>
          {details.access_type === IAccessTypeEnum.PRIVATE && (
            <DropdownMolecule
              isMulti
              width="64"
              name="private"
              placeholder={isLoading ? 'Loading students' : 'Select private'}
              handleChange={handleChange}
              options={
                classStudent?.data.data.map((h) => ({
                  value: h.student.id,
                  label: `${h.student.user.first_name} ${h.student.user.last_name}`,
                })) as SelectData[]
              }>
              Select Attendee
            </DropdownMolecule>
          )}
          Questionaire type
        </RadioMolecule>
        {details.questionaire_type !== IQuestionaireTypeEnum.FIELD ? (
          <>
            {/* <DropdownMolecule
              width="64"
              name="submision_type"
              placeholder="Select submission type"
              handleChange={handleChange}
              options={[
                { label: 'File', value: ISubmissionTypeEnum.FILE },
                { label: 'Online text', value: ISubmissionTypeEnum.ONLINE_TEXT },
              ]}>
              Submission type
            </DropdownMolecule> */}
            {details.submision_type === ISubmissionTypeEnum.FILE && (
              <>
                <DropdownMolecule
                  /*@ts-ignore */
                  defaultValue={details.content_format}
                  width="64"
                  name="submision_type"
                  placeholder="Select submission type"
                  handleChange={handleChange}
                  options={[
                    { label: 'DOC', value: IContentFormatEnum.DOC },
                    { label: 'MP4', value: IContentFormatEnum.MP4 },
                    { label: 'PDF', value: IContentFormatEnum.PDF },
                    { label: 'PNG', value: IContentFormatEnum.PNG },
                  ]}>
                  Content format
                </DropdownMolecule>

                <InputMolecule
                  width="24"
                  type="number"
                  name="maximum_file_size"
                  value={details.maximum_file_size}
                  handleChange={handleChange}>
                  Maximum file size (Mbs)
                </InputMolecule>
              </>
            )}
          </>
        ) : null}
        {/* <SwitchMolecule
          loading={false}
          name="shuffle"
          value={false}
          handleChange={handleChange}>
          Shuffle evaluation questions
        </SwitchMolecule> */}
        {/* <TextAreaMolecule
          name={'exam_instruction'}
          value={details.exam_instruction}
          handleChange={handleChange}>
          <ILabel size="sm">Evaluation instructions</ILabel>
        </TextAreaMolecule> */}
        <div className="my-2">
          <div className="my-1">
            <ILabel size="sm">Evaluation instructions</ILabel>
          </div>
          <Tiptap content={details.exam_instruction} handleChange={handleEditorChange} />
        </div>
        <InputMolecule
          style={{ width: '6rem' }}
          type="number"
          name="total_mark"
          // step=".01"
          value={details.total_mark}
          handleChange={handleChange}>
          Evaluation marks
        </InputMolecule>
        {details.questionaire_type !== IQuestionaireTypeEnum.FIELD ? (
          <>
            <InputMolecule
              style={{ width: '6rem' }}
              type="number"
              // step=".01"
              name="time_limit"
              value={details.time_limit}
              handleChange={handleChange}>
              Time limit (in mins)
            </InputMolecule>
            <DateMolecule
              startYear={new Date().getFullYear()}
              endYear={new Date().getFullYear() + 100}
              padding={3}
              reverse={false}
              showTime
              breakToNextLine
              handleChange={handleChange}
              name={'allow_submission_time'}>
              Start Date
            </DateMolecule>
            <DateMolecule
              handleChange={handleChange}
              startYear={new Date().getFullYear()}
              endYear={new Date().getFullYear() + 100}
              padding={3}
              showTime
              breakToNextLine
              reverse={false}
              name={'due_on'}>
              Due on
            </DateMolecule>{' '}
          </>
        ) : null}
        <DateMolecule
          handleChange={handleChange}
          startYear={new Date().getFullYear()}
          endYear={new Date().getFullYear() + 100}
          padding={3}
          reverse={false}
          name={'marking_reminder_date'}>
          Marking reminder date
        </DateMolecule>
        <RadioMolecule
          className="pb-4"
          value={details.is_consider_on_report.toString()}
          name="status"
          options={[
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' },
          ]}
          handleChange={handleChange}>
          Consider on report
        </RadioMolecule>
        <div className="pt-3">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}
