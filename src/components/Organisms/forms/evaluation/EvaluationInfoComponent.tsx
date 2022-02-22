import { Editor } from '@tiptap/react';
import moment from 'moment';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

import useAuthenticator from '../../../../hooks/useAuthenticator';
import { classStore } from '../../../../store/administration/class.store';
import { evaluationStore } from '../../../../store/evaluation/evaluation.store';
import instructordeploymentStore from '../../../../store/instructordeployment.store';
import { ValueType } from '../../../../types';
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
import { formatDateToIso } from '../../../../utils/date-helper';
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
import SelectMolecule from '../../../Molecules/input/SelectMolecule';

export default function EvaluationInfoComponent({
  handleNext,
  evaluationId,
  evaluationInfo,
}: IEvaluationProps) {
  const { search } = useLocation();
  const intakePeriodId = useMemo(
    () => new URLSearchParams(search).get('prd') || '',
    [search],
  );
  const subjectId = useMemo(
    () => new URLSearchParams(search).get('subj') || '',
    [search],
  );

  const { user } = useAuthenticator();
  const [timeDifference, setTimeDifference] = useState(0);

  const instructorInfo = instructordeploymentStore.getInstructorByUserId(user?.id + '')
    .data?.data.data[0];

  const { data: classes } = classStore.getClassByPeriod(intakePeriodId + '');

  const [details, setDetails] = useState<IEvaluationCreate>({
    access_type: IAccessTypeEnum.PUBLIC,
    academy_id: '',
    instructor_id: instructorInfo?.id + '',
    intake_academic_year_period: intakePeriodId,
    allow_submission_time: '',
    intake_level_class_ids: '',
    id: evaluationId || '',
    classification: IEvaluationClassification.MODULE,
    content_format: IContentFormatEnum.DOC,
    due_on: evaluationInfo?.due_on || '',
    eligible_group: IEligibleClassEnum.MULTIPLE,
    evaluation_status: IEvaluationStatus.DRAFT,
    evaluation_type: IEvaluationTypeEnum.CAT,
    exam_instruction: evaluationInfo?.exam_instruction || '',
    is_consider_on_report: true,
    marking_reminder_date: '',
    maximum_file_size: '',
    name: '',
    questionaire_type: IQuestionaireTypeEnum.OPEN,
    subject_academic_year_period_id: subjectId,
    submision_type: ISubmissionTypeEnum.ONLINE_TEXT,
    time_limit: 10,
    total_mark: 0,
    strict: true,
  });

  useEffect(() => {
    setDetails({
      access_type: evaluationInfo?.access_type || IAccessTypeEnum.PUBLIC,
      academy_id: user?.academy.id.toString() || '',
      instructor_id: instructorInfo?.id.toString() || '',
      intake_academic_year_period: intakePeriodId,
      allow_submission_time: evaluationInfo?.allow_submission_time || '',
      intake_level_class_ids: evaluationInfo?.intake_level_class_ids || '',
      id: evaluationInfo?.id || '',
      classification: evaluationInfo?.classification || IEvaluationClassification.MODULE,
      content_format: evaluationInfo?.content_format || IContentFormatEnum.DOC,
      due_on: evaluationInfo?.due_on || '',
      strict: true,
      eligible_group: IEligibleClassEnum.MULTIPLE,
      evaluation_status: evaluationInfo?.evaluation_status || IEvaluationStatus.DRAFT,
      evaluation_type: evaluationInfo?.evaluation_type || IEvaluationTypeEnum.CAT,
      exam_instruction: evaluationInfo?.exam_instruction || '',
      is_consider_on_report: evaluationInfo?.is_consider_on_report || true,
      marking_reminder_date: evaluationInfo?.marking_reminder_date || '',
      maximum_file_size: evaluationInfo?.maximum_file_size || '',
      name: evaluationInfo?.name || '',
      questionaire_type: evaluationInfo?.questionaire_type || IQuestionaireTypeEnum.OPEN,
      subject_academic_year_period_id: subjectId,
      submision_type: evaluationInfo?.submision_type || ISubmissionTypeEnum.ONLINE_TEXT,
      time_limit: evaluationInfo?.time_limit || 0,
      total_mark: evaluationInfo?.total_mark || 0,
    });
  }, [user?.academy.id, evaluationInfo, instructorInfo?.id, intakePeriodId, subjectId]);

  const { mutate } = evaluationStore.createEvaluation();
  const { mutateAsync } = evaluationStore.updateEvaluation();

  function handleChange({ name, value }: ValueType) {
    if (name === ('due_on' || 'allow_submission_time') && typeof value === 'string') {
      setTimeDifference(
        moment(value).diff(moment(details.allow_submission_time), 'minutes'),
      );
      if (timeDifference < 0) toast.error('Due time cannot be less than start time!');

      setDetails((details) => ({
        ...details,
        ['time_limit']: timeDifference,
      }));

      setDetails((details) => ({
        ...details,
        [name]: formatDateToIso(value),
      }));
    }

    console.log(value);
    if (name === 'startHours') {
      console.log(`${details.allow_submission_time} ${value} 00`);
      setDetails((details) => ({
        ...details,
        ['allow_submission_time']: `${details.allow_submission_time} ${value} 00`,
      }));
    }
    if (name === 'endHours') {
      console.log(`${details.due_on} ${value} 00`);
      setDetails((details) => ({
        ...details,
        ['due_on']: `${details.allow_submission_time} ${value} 00`,
      }));
    }
  }

  function handleEditorChange(editor: Editor) {
    if (details)
      setDetails((details) => ({ ...details, exam_instruction: editor.getHTML() }));
  }

  function submitForm(e: FormEvent) {
    e.preventDefault();

    if (evaluationId && details.time_limit > 0) {
      mutateAsync(details, {
        onSuccess: () => {
          toast.success('Evaluation updated', { duration: 5000 });
          handleNext(1);
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      });
    } else {
      mutate(details, {
        onSuccess: (data) => {
          toast.success('Evaluation created', { duration: 5000 });
          setLocalStorageData('evaluationId', data.data.data.id);
          if (details.questionaire_type === IQuestionaireTypeEnum.MANUAL) {
            setLocalStorageData('currentStep', 2);
            handleNext(2);
          } else {
            setLocalStorageData('currentStep', 1);
            handleNext(1);
          }
        },
        onError: (error: any) => {
          toast.error(error.response.data.data + '');
        },
      });
    }
  }

  return (
    <div className="bg-main p-8">
      <form className="pt-6" onSubmit={submitForm}>
        <InputMolecule
          width="80"
          name="name"
          placeholder="Evaluation Name"
          value={details?.name}
          handleChange={handleChange}>
          Evaluation Name
        </InputMolecule>
        <SelectMolecule
          value={details?.evaluation_type}
          width="64"
          name="evaluation_type"
          placeholder="Evaluation Type"
          handleChange={handleChange}
          options={getDropDownStatusOptions(IEvaluationTypeEnum)}>
          Evaluation type
        </SelectMolecule>
        <RadioMolecule
          type="block"
          defaultValue={details?.eligible_group}
          className="pb-4"
          value={details?.eligible_group}
          name="eligible_group"
          options={[
            { label: 'Multiple', value: IEligibleClassEnum.MULTIPLE },
            { label: 'Single', value: IEligibleClassEnum.SINGLE },
          ]}
          handleChange={handleChange}>
          Eligible Class
        </RadioMolecule>
        <DropdownMolecule
          isMulti={details?.eligible_group === IEligibleClassEnum.MULTIPLE}
          width="64"
          name="intake_level_class_ids"
          placeholder="Select class"
          handleChange={handleChange}
          options={getDropDownOptions({
            inputs: classes?.data.data || [],
            labelName: ['class_name'],
          })}>
          Select Class(es)
        </DropdownMolecule>{' '}
        <RadioMolecule
          defaultValue={details.questionaire_type}
          className="pb-4"
          value={details.questionaire_type}
          name="questionaire_type"
          options={[
            { label: 'Open', value: IQuestionaireTypeEnum.OPEN },
            // { label: 'Multiple choice', value: IQuestionaireTypeEnum.MULTIPLE },
            { label: 'Manual', value: IQuestionaireTypeEnum.MANUAL },
            { label: 'Field', value: IQuestionaireTypeEnum.FIELD },
          ]}
          handleChange={handleChange}>
          Questionaire type
        </RadioMolecule>
        {details?.questionaire_type !== IQuestionaireTypeEnum.FIELD ? (
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
            {details?.submision_type === ISubmissionTypeEnum.FILE && (
              <>
                <SelectMolecule
                  /*@ts-ignore */
                  value={details?.content_format}
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
                </SelectMolecule>

                <InputMolecule
                  width="24"
                  type="number"
                  name="maximum_file_size"
                  value={details?.maximum_file_size}
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
          value={details?.exam_instruction}
          handleChange={handleChange}>
          <ILabel size="sm">Evaluation instructions</ILabel>
        </TextAreaMolecule> */}
        <div className="my-2">
          <div className="my-1">
            <ILabel size="sm">Evaluation instructions</ILabel>
          </div>
          <Tiptap content={details?.exam_instruction} handleChange={handleEditorChange} />
        </div>
        <InputMolecule
          style={{ width: '6rem' }}
          type="number"
          name="total_mark"
          // min={0}
          // step=".01"
          value={details?.total_mark}
          handleChange={handleChange}>
          Evaluation marks
        </InputMolecule>
        {/* {details?.questionaire_type !== IQuestionaireTypeEnum.FIELD ? ( */}
        <>
          <InputMolecule
            style={{ width: '8rem' }}
            type="number"
            // step=".01"
            readOnly
            name="time_limit"
            // min={0}
            value={details?.time_limit}
            handleChange={handleChange}>
            Time limit (in mins)
          </InputMolecule>
          <div className="flex gap-2 self-end">
            <InputMolecule
              width="44"
              type="date"
              handleChange={handleChange}
              value={details.allow_submission_time}
              name={'allow_submission_time'}>
              Start Date
            </InputMolecule>

            <InputMolecule
              width="44"
              type="time"
              handleChange={handleChange}
              value=""
              name="startHours"
            />
          </div>

          <div className="flex gap-2 items-center">
            <InputMolecule
              width="44"
              type="date"
              handleChange={handleChange}
              value={details.due_on}
              name={'due_on'}>
              Start Date
            </InputMolecule>

            <InputMolecule
              width="44"
              type="time"
              handleChange={handleChange}
              value=""
              name="endHours"
            />
          </div>
        </>
        {/* ) : null} */}
        <DateMolecule
          handleChange={handleChange}
          startYear={new Date().getFullYear()}
          endYear={new Date().getFullYear() + 100}
          reverse={false}
          name={'marking_reminder_date'}>
          Marking reminder date
        </DateMolecule>
        <RadioMolecule
          className="pb-4"
          value={details?.is_consider_on_report.toString()}
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
