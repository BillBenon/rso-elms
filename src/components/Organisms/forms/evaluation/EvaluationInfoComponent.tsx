import { Editor } from '@tiptap/react';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { authenticatorStore } from '../../../../store';
import { evaluationStore } from '../../../../store/evaluation.store';
import { moduleStore } from '../../../../store/modules.store';
import { subjectStore } from '../../../../store/subject.store';
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
// import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function EvaluationInfoComponent({ handleNext }: IEvaluationProps) {
  const [moduleId, setModuleId] = useState<string>('');
  const authUser = authenticatorStore.authUser().data?.data.data;
  const { data } = moduleStore.getModulesByAcademy(authUser?.academy.id.toString() || '');
  let subjects;

  ({ data: subjects } = subjectStore.getSubjectsByModule(moduleId));

  const [details, setDetails] = useState<IEvaluationCreate>({
    access_type: IAccessTypeEnum.PUBLIC,
    academy_id: authUser?.academy.id.toString() || '',
    instructor_id: authUser?.id.toString() || '',
    allow_submission_time: '',
    class_ids: '',
    id: '',
    classification: IEvaluationClassification.MODULE,
    content_format: IContentFormatEnum.DOC,
    due_on: '',
    eligible_group: IEligibleClassEnum.MULTIPLE,
    evaluation_status: IEvaluationStatus.PENDING,
    evaluation_type: IEvaluationTypeEnum.CAT,
    exam_instruction: '',
    is_consider_on_report: true,
    marking_reminder_date: '',
    maximum_file_size: '',
    name: '',
    questionaire_type: IQuestionaireTypeEnum.MULTIPLE,
    subject_academic_year_period_id: '',
    submision_type: ISubmissionTypeEnum.ONLINE_TEXT,
    time_limit: 30,
    total_mark: 10,
  });

  const { mutate } = evaluationStore.createEvaluation();

  function handleChange({ name, value }: ValueType) {
    if (name === 'module') setModuleId(value.toString());
    else setDetails((details) => ({ ...details, [name]: value }));
  }

  function handleEditorChange(editor: Editor) {
    // console.log(editor.getHTML());
    setDetails((details) => ({ ...details, exam_instruction: editor.getHTML() }));
  }

  function submitForm(e: FormEvent) {
    e.preventDefault();

    mutate(details, {
      onSuccess: (data) => {
        toast.success('Evaluation created', { duration: 5000 });
        localStorage.setItem('evaluationId', JSON.stringify(data?.data.data.id));
        handleNext();
      },
      onError: (error) => {
        console.log(error);
        toast.error(error + '');
      },
    });
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
          width="64"
          name="evaluation_type"
          placeholder="Evaluation Type"
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
          placeholder="Select module"
          handleChange={handleChange}
          options={getDropDownOptions({ inputs: data?.data.data || [] })}>
          Select module
        </DropdownMolecule>
        <DropdownMolecule
          width="64"
          name="subject_academic_year_period_id"
          placeholder="Select subject"
          handleChange={handleChange}
          options={getDropDownOptions({
            inputs: subjects?.data.data || [],
            labelName: ['title'],
          })}>
          Select subject
        </DropdownMolecule>
        <RadioMolecule
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
        <RadioMolecule
          className="pb-4"
          value={details.access_type}
          name="access_type"
          options={[
            { label: 'PUBLIC', value: IAccessTypeEnum.PUBLIC },
            { label: 'PRIVATE', value: IAccessTypeEnum.PRIVATE },
          ]}
          handleChange={handleChange}>
          Accessibility
        </RadioMolecule>
        <RadioMolecule
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
          Questionaire type
        </RadioMolecule>
        {details.questionaire_type !== IQuestionaireTypeEnum.FIELD ? (
          <>
            <DropdownMolecule
              width="64"
              name="submision_type"
              placeholder="Select submission type"
              handleChange={handleChange}
              options={[
                { label: 'File', value: ISubmissionTypeEnum.FILE },
                { label: 'Online text', value: ISubmissionTypeEnum.ONLINE_TEXT },
              ]}>
              Submission type
            </DropdownMolecule>
            {details.submision_type === ISubmissionTypeEnum.FILE && (
              <>
                <DropdownMolecule
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
          value={details.total_mark}
          handleChange={handleChange}>
          Evaluation marks
        </InputMolecule>
        {details.questionaire_type !== IQuestionaireTypeEnum.FIELD ? (
          <>
            <InputMolecule
              style={{ width: '6rem' }}
              type="text"
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
