import { Editor } from '@tiptap/react';
import moment from 'moment';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import useAuthenticator from '../../../../hooks/useAuthenticator';
import usePickedRole from '../../../../hooks/usePickedRole';
import { classStore } from '../../../../store/administration/class.store';
import intakeProgramStore from '../../../../store/administration/intake-program.store';
import { evaluationStore } from '../../../../store/evaluation/evaluation.store';
import { SelectData, ValueType } from '../../../../types';
import {
  IAccessTypeEnum,
  IContentFormatEnum,
  IEligibleClassEnum,
  IEvaluationClassification,
  IEvaluationCreate,
  IEvaluationMode,
  IEvaluationSettingType,
  IEvaluationStatus,
  IEvaluationTypeEnum,
  IMarkingType,
  IQuestionaireTypeEnum,
  ISubmissionTypeEnum,
} from '../../../../types/services/evaluation.types';
import {
  getDropDownOptions,
  getDropDownStatusOptions,
} from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import Heading from '../../../Atoms/Text/Heading';
import ILabel from '../../../Atoms/Text/ILabel';
import Tiptap from '../../../Molecules/editor/Tiptap';
import DateMolecule from '../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import MultiselectMolecule from '../../../Molecules/input/MultiselectMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import SelectMolecule from '../../../Molecules/input/SelectMolecule';

export default function SubjectEvaluationInfoComponent() {
  const picked_role = usePickedRole();
  const history = useHistory();
  const { t } = useTranslation();

  const { user } = useAuthenticator();

  const templates = evaluationStore.getTemplates(user?.academy.id + '').data?.data.data;

  const { search } = useLocation();

  const subject_id = new URLSearchParams(search).get('subj') || '';
  const intake_period_id = new URLSearchParams(search).get('prd') || '';

  const [details, setDetails] = useState<IEvaluationCreate>({
    access_type: IAccessTypeEnum.PUBLIC,
    academy_id: picked_role?.academy_id + '',
    private_attendees: '',
    instructor_id: user?.id + '',
    allow_submission_time: '',
    intake_level_class_ids: '',
    id: '',
    classification: IEvaluationClassification.MODULE,
    content_format: IContentFormatEnum.DOC,
    due_on: '',
    eligible_group: IEligibleClassEnum.MULTIPLE,
    evaluation_status: IEvaluationStatus.DRAFT,
    evaluation_type: IEvaluationTypeEnum.CAT,
    marking_type: IMarkingType.NOT_SET,
    is_consider_on_report: true,
    marking_reminder_date: '',
    maximum_file_size: 128,
    subject_academic_year_period_id: subject_id,
    questionaire_type: IQuestionaireTypeEnum.DEFAULT,
    exam_instruction: '',
    name: '',
    submision_type: ISubmissionTypeEnum.ONLINE_TEXT,
    time_limit: 10,
    total_mark: 0,
    strict: true,
    intakeId: '',
    intake_academic_year_period: intake_period_id,
    intake_program_level: '',
    setting_type: IEvaluationSettingType.SUBJECT_BASED,
    evaluation_mode: IEvaluationMode.INDOOR,
  });

  useEffect(() => {
    if (picked_role?.academy_id) {
      setDetails((prevState) => {
        return {
          ...prevState,
          academy_id: picked_role?.academy_id + '',
        };
      });
    }
  }, [picked_role]);

  const { data: classes } = classStore.getClassByPeriod(intake_period_id);

  const { data: studentsProgram } = intakeProgramStore.getStudentsByIntakeProgramLevel(
    details?.intake_program_level + '',
    details?.intake_program_level.length != 0,
  );

  const [students, setStudents] = useState<SelectData[]>([]);

  useEffect(() => {
    let studentsView: SelectData[] = [];

    const rankedStudents =
      studentsProgram?.data.data.filter(
        (stud) => stud.intake_program_student.student.user.person?.current_rank,
      ) || [];
    const unrankedStudents =
      studentsProgram?.data.data.filter(
        (inst) => inst !== rankedStudents.find((ranked) => ranked.id === inst.id),
      ) || [];

    rankedStudents.sort(function (a, b) {
      if (
        a.intake_program_student.student.user.person &&
        b.intake_program_student.student.user.person
      ) {
        return (
          a.intake_program_student.student.user.person.current_rank?.priority -
          b.intake_program_student.student.user.person.current_rank?.priority
        );
      } else {
        return 0;
      }
    });
    const finalStudents = rankedStudents.concat(unrankedStudents);

    finalStudents.forEach((stud) => {
      let studentView: SelectData = {
        value: stud.intake_program_student.student.id + '',
        label: `${
          stud.intake_program_student.student.user.person?.current_rank?.name || ''
        }  ${stud.intake_program_student.student.user.first_name} ${
          stud.intake_program_student.student.user.last_name
        }`,
      };
      studentsView.push(studentView);
    });
    setStudents(studentsView);
  }, [studentsProgram]);

  const { mutate, isLoading: createEvaluationLoader } =
    evaluationStore.createEvaluation();

  function handleChange({ name, value }: ValueType) {
    if (name === 'time_limit' || name === 'total_mark') {
      setDetails((details) => ({
        ...details,
        [name]: parseFloat(value.toString()) || 0,
      }));
    } else if (name === 'submision_type' && value === ISubmissionTypeEnum.FILE) {
      setDetails((details) => ({
        ...details,
        [name]: value,
      }));

      setDetails((details) => ({
        ...details,
        strict: false,
      }));

      return;
    } else {
      setDetails((details) => ({
        ...details,
        [name]: value.toString(),
      }));
    }
  }

  function handleEditorChange(editor: Editor) {
    if (details)
      setDetails((details) => ({ ...details, exam_instruction: editor.getHTML() }));
  }

  function submitForm(e: FormEvent) {
    e.preventDefault();

    mutate(
      {
        ...details,
        ['due_on']: moment(details.due_on).format('YYYY-MM-DD HH:mm:ss'),
        ['allow_submission_time']: moment(details.allow_submission_time).format(
          'YYYY-MM-DD HH:mm:ss',
        ),
      },
      {
        onSuccess: (data) => {
          toast.success('Evaluation created successfully!');
          if (data.data.data.questionaire_type === IQuestionaireTypeEnum.MANUAL) {
            history.push(`/dashboard/evaluations/${data.data.data.id}/settings`);
          } else {
            history.push(`/dashboard/evaluations/${data.data.data.id}/addquestions`);
          }
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      },
    );
  }

  return (
    <>
      <Heading fontWeight="semibold" fontSize="2xl" color="primary" className="pb-4">
        New evaluation
      </Heading>
      <div className="bg-main p-8 w-2/3">
        <form className="pt-6" onSubmit={submitForm}>
          <SelectMolecule
            value={details?.name}
            placeholder="Evaluation Name"
            name="name"
            handleChange={handleChange}
            options={
              templates?.map((item) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              }) || []
            }>
            Evaluation Name
          </SelectMolecule>

          <SelectMolecule
            value={details?.evaluation_type}
            width="64"
            name="evaluation_type"
            placeholder="Evaluation Type"
            handleChange={handleChange}
            options={getDropDownStatusOptions(IEvaluationTypeEnum)}>
            Evaluation type
          </SelectMolecule>

          <SelectMolecule
            value={details.evaluation_mode}
            name="evaluation_mode"
            width="64"
            handleChange={handleChange}
            options={getDropDownStatusOptions(IEvaluationMode)}>
            Evaluation mode
          </SelectMolecule>

          <RadioMolecule
            defaultValue={details?.access_type}
            className="pb-4"
            value={details?.access_type}
            name="access_type"
            options={[
              { label: 'PUBLIC', value: IAccessTypeEnum.PUBLIC },
              { label: 'PRIVATE', value: IAccessTypeEnum.PRIVATE },
            ]}
            handleChange={handleChange}>
            Accessibility
          </RadioMolecule>
          {/* {details.access_type === IAccessTypeEnum.PUBLIC && (
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
        )} */}
          {details && details.access_type === IAccessTypeEnum.PUBLIC ? (
            <MultiselectMolecule
              width="64"
              name="intake_level_class_ids"
              placeholder={'Select ' + t('Class')}
              handleChange={handleChange}
              value={
                details.intake_level_class_ids.split(',') || []
                // classes?.data.data.map((cl) => cl.id.toString()) || []
                // []
              }
              options={getDropDownOptions({
                inputs: classes?.data.data || [],
                labelName: ['class_name'],
              })}>
              Select {t('Class')}
            </MultiselectMolecule>
          ) : details?.access_type === IAccessTypeEnum.PRIVATE ? (
            <DropdownMolecule
              isMulti
              width="64"
              name="private_attendees"
              placeholder="Select students"
              handleChange={handleChange}
              options={students}>
              Select students
            </DropdownMolecule>
          ) : null}
          <RadioMolecule
            className="pb-4"
            name="questionaire_type"
            value={details.questionaire_type}
            options={[
              { label: 'Default', value: IQuestionaireTypeEnum.DEFAULT },
              { label: 'Manual', value: IQuestionaireTypeEnum.MANUAL },
              { label: 'Field', value: IQuestionaireTypeEnum.FIELD },
              { label: 'Hybrid', value: IQuestionaireTypeEnum.HYBRID },
            ]}
            handleChange={handleChange}>
            Questionaire type
          </RadioMolecule>
          {details?.questionaire_type !== IQuestionaireTypeEnum.FIELD ? (
            <>
              <DropdownMolecule
                width="64"
                name="submision_type"
                value={details.submision_type}
                placeholder="Select submission type"
                handleChange={handleChange}
                options={[
                  { label: 'File', value: ISubmissionTypeEnum.FILE },
                  { label: 'Online text', value: ISubmissionTypeEnum.ONLINE_TEXT },
                ]}>
                Submission type
              </DropdownMolecule>
            </>
          ) : null}
          <div className="my-2">
            <div className="my-1">
              <ILabel size="sm">Evaluation instructions</ILabel>
            </div>
            <Tiptap
              content={details?.exam_instruction ?? ''}
              handleChange={handleEditorChange}
            />
          </div>
          <InputMolecule
            style={{ width: '6rem' }}
            name="total_mark"
            value={details?.total_mark}
            handleChange={handleChange}>
            Evaluation marks
          </InputMolecule>
          <>
            <InputMolecule
              style={{ width: '8rem' }}
              name="time_limit"
              value={details?.time_limit}
              handleChange={handleChange}>
              Time limit (in mins)
            </InputMolecule>
            <div className="flex gap-2 items-end">
              <InputMolecule
                width="44"
                type="datetime-local"
                handleChange={handleChange}
                value={details?.allow_submission_time}
                name={'allow_submission_time'}>
                Start Date
              </InputMolecule>
            </div>

            <div className="flex gap-2 items-end">
              <InputMolecule
                width="44"
                type="datetime-local"
                handleChange={handleChange}
                value={details?.due_on}
                name={'due_on'}>
                End Date
              </InputMolecule>
            </div>
          </>
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
            name="strict"
            value={details?.strict + ''}
            options={[
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' },
            ]}
            handleChange={handleChange}>
            strict
          </RadioMolecule>
          <RadioMolecule
            className="pb-4"
            name="is_consider_on_report"
            value={details?.is_consider_on_report + ''}
            options={[
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' },
            ]}
            handleChange={handleChange}>
            Consider on report
          </RadioMolecule>
          <div className="pt-3">
            <Button type="submit" disabled={createEvaluationLoader}>
              Next
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
