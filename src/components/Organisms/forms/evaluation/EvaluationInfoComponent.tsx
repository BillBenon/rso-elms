import React, { useState } from 'react';
import DatePicker, { DayRange } from 'react-modern-calendar-datepicker';

import { moduleStore } from '../../../../store/modules.store';
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
import Icon from '../../../Atoms/custom/Icon';
import ILabel from '../../../Atoms/Text/ILabel';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function EvaluationInfoComponent({ handleNext }: IEvaluationProps) {
  const { data } = moduleStore.getAllModules();
  const [dayRange, setDayRange] = React.useState<DayRange>({
    from: null,
    to: null,
  });

  const [details, setDetails] = useState<IEvaluationCreate>({
    access_type: IAccessTypeEnum.PUBLIC,
    allow_submission_time: '',
    class_ids: '',
    id: '',
    classification: IEvaluationClassification.MODULAR,
    content_format: IContentFormatEnum.DOC,
    due_on: dayRange.to + '' || null,
    eligible_group: IEligibleClassEnum.MULTIPLE_CLASSES,
    evaluation_status: IEvaluationStatus.PENDING,
    evaluation_type: IEvaluationTypeEnum.CAT,
    exam_instruction: '',
    is_consider_on_report: true,
    marking_reminder_date: '',
    maximum_file_size: 0,
    name: '',
    questionaire_type: IQuestionaireTypeEnum.MULTIPLE,
    subject_academic_year_period_id: 0,
    submision_type: ISubmissionTypeEnum.ONLINE_TEXT,
    time_limit: 0,
    total_mark: 0,
  });

  function handleChange({ name, value }: ValueType) {
    setDetails((details) => ({ ...details, [name]: value }));
  }

  const renderCustomInput = ({ ref }: any) => (
    <div className="flex flex-col gap-2 pb-2">
      <ILabel className="capitalize" size="sm" weight="medium">
        Due on
      </ILabel>
      <div className="rounded-lg border-2 border-bcolor w-auto md:w-40 flex items-center">
        <input ref={ref} className="w-28 outline-none bg-transparent" readOnly />
        <Icon name="calendar" />
      </div>
    </div>
  );

  return (
    <div>
      <form
        className="pt-6"
        onSubmit={(e) => {
          e.preventDefault();
          // handleNext();
        }}>
        <InputMolecule
          width="80"
          name="evaluation_name"
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

        <RadioMolecule
          className="pb-4"
          value={details.classification}
          name="classification"
          options={[
            { label: 'MODULAR', value: IEvaluationClassification.MODULAR },
            { label: 'SUBJECT', value: IEvaluationClassification.SUBJECT },
          ]}
          handleChange={handleChange}>
          Evaluation classification
        </RadioMolecule>

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
          isMulti
          options={[]}>
          Select subject
        </DropdownMolecule>

        <RadioMolecule
          className="pb-4"
          value={details.eligible_group}
          name="eligible_group"
          options={[
            { label: 'MULTIPLE CLASSES', value: IEligibleClassEnum.MULTIPLE_CLASSES },
            { label: 'SINGLE CLASS', value: IEligibleClassEnum.SINGLE_CLASS },
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
          name="evaluation_status"
          options={[
            { label: 'Open', value: IQuestionaireTypeEnum.OPEN },
            { label: 'Multiple choice', value: IQuestionaireTypeEnum.MULTIPLE },
            { label: 'Both', value: IQuestionaireTypeEnum.HYBRID },
            { label: 'Field', value: IQuestionaireTypeEnum.FIELD },
          ]}
          handleChange={handleChange}>
          Questionaire type
        </RadioMolecule>

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
          width="28"
          type="number"
          name="maximum_file_size"
          value={details.maximum_file_size}
          handleChange={handleChange}>
          Maximum file size (Mbs)
        </InputMolecule>

        {/* <SwitchMolecule
          loading={false}
          name="shuffle"
          value={false}
          handleChange={handleChange}>
          Shuffle evaluation questions
        </SwitchMolecule> */}

        <TextAreaMolecule
          name={'exam_instruction'}
          value={details.exam_instruction}
          handleChange={handleChange}>
          Evaluation instructions
        </TextAreaMolecule>

        <InputMolecule
          width="28"
          name="total_mark"
          value={details.total_mark}
          handleChange={handleChange}>
          Evaluation marks
        </InputMolecule>

        <InputMolecule
          // className="p-2"
          width="16"
          name="time_limit"
          value={details.time_limit}
          placeholder="00"
          handleChange={handleChange}>
          Time limit (In mins)
        </InputMolecule>

        <DatePicker
          value={dayRange}
          onChange={setDayRange}
          colorPrimary="#1C2CA3"
          colorPrimaryLight="#4F5FD6" // and this
          calendarPopperPosition="bottom"
          inputClassName="absolute"
          inputPlaceholder="Select a day"
          renderInput={renderCustomInput} // render a custom input
          shouldHighlightWeekends
        />

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
          <Button type="submit" onClick={handleNext}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
