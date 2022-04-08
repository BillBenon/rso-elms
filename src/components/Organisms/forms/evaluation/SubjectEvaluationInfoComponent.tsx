import { Editor } from '@tiptap/react';
import moment from 'moment';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

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
  IEvaluationInfo,
  IEvaluationProps,
  IEvaluationStatus,
  IEvaluationTypeEnum,
  IMarkingType,
  IQuestionaireTypeEnum,
  ISubmissionTypeEnum,
} from '../../../../types/services/evaluation.types';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../../../utils/getLocalStorageItem';
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
import MultiselectMolecule from '../../../Molecules/input/MultiselectMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import SelectMolecule from '../../../Molecules/input/SelectMolecule';

export default function SubjectEvaluationInfoComponent({
  handleNext,
  evaluationId,
  evaluationInfo,
}: IEvaluationProps) {
  const { search } = useLocation();
  const intakePeriodId = useMemo(
    () => new URLSearchParams(search).get('prd') || '',
    [search],
  );

  const levelId = useMemo(() => new URLSearchParams(search).get('lvl') || '', [search]);
  const subjectId = useMemo(
    () => new URLSearchParams(search).get('subj') || '',
    [search],
  );

  const { user } = useAuthenticator();
  const picked_role = usePickedRole();
  const [timeDifference, setTimeDifference] = useState(0);

  const { data: studentsProgram } = intakeProgramStore.getStudentsByIntakeProgramLevel(
    levelId || '',
  );

  const [students, setStudents] = useState<SelectData[]>([]);
  useEffect(() => {
    let studentsView: SelectData[] = [];
    studentsProgram?.data.data.forEach((stud) => {
      let studentView: SelectData = {
        value: stud.intake_program_student.student.id + '',
        label: `${stud.intake_program_student.student.user.first_name} ${stud.intake_program_student.student.user.last_name}`,
      };
      studentsView.push(studentView);
    });
    setStudents(studentsView);
  }, [studentsProgram]);

  const { data: classes } = classStore.getClassByPeriod(intakePeriodId + '');
  //   const [subjectData, setSubjectData] = useState({});

  const cachedData: IEvaluationInfo = getLocalStorageData('evaluationInfo') || {};
  //uncomment this to start with data cached in local storage
  // const cachedEvaluationModuleData: IEvaluationSectionBased[] = getLocalStorageData(
  //   'evaluationModule',
  // ) || [initialState];

  //   const cachedEvaluationModuleData: IEvaluationSectionBased[] = [initialState];

  const [details, setDetails] = useState<IEvaluationCreate>({
    access_type: cachedData?.access_type || IAccessTypeEnum.PUBLIC,
    marking_type: IMarkingType.NOT_SET,
    academy_id: cachedData?.academy_id || '',
    private_attendees:
      evaluationInfo?.private_attendees?.toString() ||
      cachedData?.private_attendees?.toString() ||
      '',
    instructor_id: user?.id + '',
    intake_academic_year_period: intakePeriodId,
    allow_submission_time: cachedData?.allow_submission_time || '',
    intake_level_class_ids:
      cachedData?.intake_level_class_ids ||
      classes?.data.data.map((cl) => cl.id.toString()).join(',') ||
      '',
    id: evaluationId || '',
    classification: cachedData?.classification || IEvaluationClassification.MODULE,
    content_format: cachedData?.content_format || IContentFormatEnum.DOC,
    due_on: evaluationInfo?.due_on || cachedData?.due_on || '',
    eligible_group: cachedData?.eligible_group || IEligibleClassEnum.MULTIPLE,
    evaluation_status: cachedData?.evaluation_status || IEvaluationStatus.DRAFT,
    evaluation_type: cachedData?.evaluation_type || IEvaluationTypeEnum.CAT,
    exam_instruction: evaluationInfo?.exam_instruction || '',
    is_consider_on_report: cachedData?.is_consider_on_report || true,
    marking_reminder_date: cachedData?.marking_reminder_date || '',
    maximum_file_size: cachedData?.maximum_file_size || '',
    name: cachedData?.name || '',
    questionaire_type: cachedData?.questionaire_type || IQuestionaireTypeEnum.OPEN,
    subject_academic_year_period_id:
      cachedData?.subject_academic_year_period_id || subjectId,
    submision_type: cachedData?.submision_type || ISubmissionTypeEnum.ONLINE_TEXT,
    time_limit: cachedData?.time_limit || 10,
    total_mark: cachedData?.total_mark || 0,
    strict: true,
    intakeId: '',
    intake_program_level: '',
  });

  useEffect(() => {
    const cachedData: IEvaluationInfo = getLocalStorageData('evaluationInfo') || {};

    setDetails({
      access_type:
        evaluationInfo?.access_type || cachedData?.access_type || IAccessTypeEnum.PUBLIC,
      academy_id: picked_role?.academy_id + '' || cachedData?.academy_id || '',
      marking_type:
        evaluationInfo?.marking_type || cachedData?.marking_type || IMarkingType.NOT_SET,

      private_attendees:
        evaluationInfo?.private_attendees.toString() ||
        cachedData?.private_attendees?.toString() ||
        '',
      instructor_id: user?.id.toString() || '',
      intake_academic_year_period: intakePeriodId,
      allow_submission_time:
        evaluationInfo?.allow_submission_time || cachedData?.allow_submission_time || '',
      intake_level_class_ids:
        evaluationInfo?.intake_level_class_ids ||
        cachedData?.intake_level_class_ids ||
        classes?.data.data.map((cl) => cl.id.toString()).join(',') ||
        '',
      id: evaluationInfo?.id || cachedData?.id || '',
      classification:
        evaluationInfo?.classification ||
        cachedData?.classification ||
        IEvaluationClassification.MODULE,
      content_format:
        evaluationInfo?.content_format ||
        cachedData?.content_format ||
        IContentFormatEnum.DOC,
      due_on: evaluationInfo?.due_on || cachedData?.due_on || '',
      strict: true,
      eligible_group: IEligibleClassEnum.MULTIPLE,
      evaluation_status:
        evaluationInfo?.evaluation_status ||
        cachedData?.evaluation_status ||
        IEvaluationStatus.DRAFT,
      evaluation_type:
        evaluationInfo?.evaluation_type ||
        cachedData?.evaluation_type ||
        IEvaluationTypeEnum.CAT,
      exam_instruction:
        evaluationInfo?.exam_instruction || cachedData?.exam_instruction || '',
      is_consider_on_report:
        evaluationInfo?.is_consider_on_report ||
        cachedData?.is_consider_on_report ||
        true,
      marking_reminder_date:
        evaluationInfo?.marking_reminder_date || cachedData?.marking_reminder_date || '',
      maximum_file_size:
        evaluationInfo?.maximum_file_size || cachedData?.maximum_file_size || '',
      name: evaluationInfo?.name || cachedData?.name || '',
      questionaire_type:
        evaluationInfo?.questionaire_type ||
        cachedData?.questionaire_type ||
        IQuestionaireTypeEnum.OPEN,
      subject_academic_year_period_id: subjectId,
      submision_type:
        evaluationInfo?.submision_type ||
        cachedData?.submision_type ||
        ISubmissionTypeEnum.ONLINE_TEXT,
      time_limit: evaluationInfo?.time_limit || cachedData?.time_limit || 0,
      total_mark: evaluationInfo?.total_mark || cachedData?.total_mark || 0,
      intakeId: '',
      intake_program_level: '',
    });
  }, [
    evaluationInfo,
    intakePeriodId,
    subjectId,
    picked_role?.academy_id,
    classes?.data.data,
    user?.id,
  ]);

  useEffect(() => {
    setLocalStorageData('evaluationInfo', details);
  }, [details]);

  const { mutate } = evaluationStore.createEvaluation();
  const { mutateAsync } = evaluationStore.updateEvaluation();
  //   const { mutate: mutateSectionBased } = evaluationStore.createSectionBasedEvaluation();

  function handleChange({ name, value }: ValueType) {
    if (name === ('due_on' || 'allow_submission_time') && typeof value === 'string') {
      if (name === 'due_on') {
        setTimeDifference(
          moment(value).diff(moment(details.allow_submission_time), 'minutes'),
        );
      }

      if (timeDifference < 0) toast.error('Due time cannot be less than start time!');

      setDetails((details) => ({
        ...details,
        ['time_limit']: timeDifference,
      }));

      setDetails((details) => ({
        ...details,
        [name]: value,
      }));

      return;
    }

    //set class ids and eligible group to empty since it's private
    if (name === 'private_attendees') {
      setDetails((details) => ({
        ...details,
        eligible_group: '',
        intake_level_class_ids: '',
        private_attendees: value.toString(),
      }));

      return;
    }

    setDetails((details) => ({
      ...details,
      [name]: value.toString(),
    }));
  }

  function handleEditorChange(editor: Editor) {
    if (details)
      setDetails((details) => ({ ...details, exam_instruction: editor.getHTML() }));
  }

  function submitForm(e: FormEvent) {
    e.preventDefault();

    if (evaluationId && details.time_limit > 0) {
      mutateAsync(
        {
          ...details,
          ['due_on']: moment(details.due_on).format('YYYY-MM-DD HH:mm:ss'),
          ['allow_submission_time']: moment(details.allow_submission_time).format(
            'YYYY-MM-DD HH:mm:ss',
          ),
        },
        {
          onSuccess: () => {
            toast.success('Evaluation updated', { duration: 5000 });
            handleNext(1);
          },
          onError: (error: any) => {
            toast.error(error.response.data.message);
          },
        },
      );
    } else {
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
            //update evaluation id in evaluation module
            // const modulesClone = [...evaluationModule];

            // const newEvaluation = modulesClone.map((evalMod) => {
            //   evalMod.evaluation_id = data.data.data.id;
            //   return evalMod;
            // });

            // mutateSectionBased(newEvaluation, {
            //   onSuccess: () => {
            toast.success('Evaluation created', { duration: 5000 });
            setLocalStorageData('evaluationId', data.data.data.id); //should be removed at some point
            setLocalStorageData('currentStep', 1);
            handleNext(1);
            //   },
            //   onError: (error: any) => {
            //     toast.error(error.response.data.message);
            //   },
            // });
          },
          onError: (error: any) => {
            toast.error(error.response.data.data + '');
          },
        },
      );
    }
  }

  return (
    <div className="bg-main p-8">
      <form className="pt-6" onSubmit={submitForm}>
        <div className="border-none border-transparent"></div>
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

        {details.access_type === IAccessTypeEnum.PUBLIC && (
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
        )}

        {details.access_type === IAccessTypeEnum.PUBLIC ? (
          <MultiselectMolecule
            width="64"
            name="intake_level_class_ids"
            placeholder="Select class"
            handleChange={handleChange}
            value={
              // details.intake_level_class_ids.split(',') || []
              classes?.data.data.map((cl) => cl.id.toString()) || []
              // []
            }
            options={getDropDownOptions({
              inputs: classes?.data.data || [],
              labelName: ['class_name'],
            })}>
            Select Class(es)
          </MultiselectMolecule>
        ) : (
          <DropdownMolecule
            isMulti
            width="64"
            name="private_attendees"
            placeholder="Select students"
            handleChange={handleChange}
            options={students}>
            Select students
          </DropdownMolecule>
        )}

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
        <SelectMolecule
          value={'' + details?.marking_type}
          width="64"
          name="marking_type"
          placeholder="Evaluation Type"
          handleChange={handleChange}
          options={getDropDownStatusOptions(IMarkingType)}>
          Marking type
        </SelectMolecule>
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

        <div className="my-2">
          <div className="my-1">
            <ILabel size="sm">Evaluation instructions</ILabel>
          </div>
          <Tiptap content={details?.exam_instruction} handleChange={handleEditorChange} />
        </div>
        <InputMolecule
          style={{ width: '6rem' }}
          readonly
          type="number"
          name="total_mark"
          value={details?.total_mark}
          handleChange={handleChange}>
          Evaluation marks
        </InputMolecule>
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
          <div className="flex gap-2 items-end">
            <InputMolecule
              width="44"
              type="datetime-local"
              handleChange={handleChange}
              value={details.allow_submission_time}
              name={'allow_submission_time'}>
              Start Date
            </InputMolecule>
          </div>

          <div className="flex gap-2 items-end">
            <InputMolecule
              width="44"
              type="datetime-local"
              handleChange={handleChange}
              value={details.due_on}
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
