import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React, { useEffect, useState } from 'react';

import { moduleStore } from '../../../../store/modules.store';
import { CommonCardDataType } from '../../../../types';
import {
  IEvaluationClassification,
  IEvaluationCreate,
  IEvaluationProps,
  IEvaluationTypeEnum,
  IQuestionaireTypeEnum,
  ISubmissionTypeEnum,
} from '../../../../types/services/evaluation.types';
import {
  getDropDownOptions,
  getDropDownStatusOptions,
} from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import SwitchMolecule from '../../../Molecules/input/SwitchMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function EvaluationInfoComponent({
  values,
  handleChange,
  handleNext,
}: IEvaluationProps) {
  const { data } = moduleStore.getAllModules();
  const [details, setDetails] = useState<IEvaluationCreate>({
    access_type: '',
    allow_submission_time: '',
    classification: IEvaluationClassification.MODULAR,
    content_format: '',
    due_on: '',
    eligible_group: '',
    evaluation_status: '',
    evaluation_type: IEvaluationTypeEnum.CAT,
    exam_instruction: '',
    id: 0,
    intake_level_class_id: 0,
    is_consider_on_report: true,
    marking_reminder_date: '',
    maximum_file_size: 0,
    name: '',
    questionaire_type: IQuestionaireTypeEnum.MULTIPLE,
    subject_academic_year_period_id: 0,
    submision_type: ISubmissionTypeEnum.ONLINE_TEXT,
    time_limit: '',
    total_mark: 0,
  });

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
          handleChange={() => {}}>
          Evaluation Name
        </InputMolecule>
        <DropdownMolecule
          width="64"
          name="evaluation_type"
          placeholder="Evaluation Type"
          handleChange={() => {}}
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
          handleChange={() => {}}>
          Evaluation classification
        </RadioMolecule>

        <DropdownMolecule
          width="64"
          name="programs"
          placeholder="Select module"
          handleChange={() => {}}
          options={getDropDownOptions({ inputs: data?.data.data || [] })}>
          Select module
        </DropdownMolecule>

        <DropdownMolecule
          width="64"
          name="programs"
          placeholder="Select subject"
          handleChange={() => {}}
          isMulti
          options={[]}>
          Select subject
        </DropdownMolecule>

        <RadioMolecule
          className="pb-4"
          value=""
          name="status"
          options={[
            { label: 'public', value: '' },
            { label: 'private', value: '' },
          ]}
          handleChange={() => {}}>
          Eligible Class
        </RadioMolecule>

        <RadioMolecule
          className="pb-4"
          value=""
          name="status"
          options={[
            { label: 'public', value: '' },
            { label: 'private', value: '' },
          ]}
          handleChange={() => {}}>
          Accessibility
        </RadioMolecule>

        <RadioMolecule
          className="pb-4"
          value=""
          name="status"
          options={[
            { label: 'open', value: '' },
            { label: 'multiple choice', value: '' },
          ]}
          handleChange={() => {}}>
          Questionaire type
        </RadioMolecule>

        <SwitchMolecule
          loading={false}
          name="shuffle"
          value={false}
          handleChange={() => {}}>
          True
        </SwitchMolecule>

        <TextAreaMolecule name={'description'} value="" handleChange={() => {}}>
          Evaluation instructions
        </TextAreaMolecule>

        <InputMolecule width="28" name="evaluation_name" value="" handleChange={() => {}}>
          Evaluation marks
        </InputMolecule>

        <div className="relative">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Custom input"
              value={''}
              className="shit"
              onChange={() => {}}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <div className="flex items-center">
                  <InputMolecule
                    ref={inputRef}
                    // {...inputProps}
                    width="32"
                    name="evaluation_name"
                    value=""
                    handleChange={() => {}}>
                    Due on
                  </InputMolecule>
                  {InputProps?.endAdornment}
                </div>
              )}
            />
          </LocalizationProvider>
        </div>

        <InputMolecule
          // className="p-2"
          width="16"
          name="evaluation_name"
          value=""
          placeholder="00"
          handleChange={() => {}}>
          Time limit (In mins)
        </InputMolecule>

        <RadioMolecule
          className="pb-4"
          value=""
          name="status"
          options={[
            { label: 'Yes', value: '' },
            { label: 'No', value: '' },
          ]}
          handleChange={() => {}}>
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
