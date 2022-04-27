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
    maximum_file_size: 0,
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

  // Update classes
  // useEffect(() => {
  //   if (classes?.data.data) {
  //     setDetails({
  //       ...details,
  //       intake_level_class_ids: classes?.data.data
  //         .map((cl) => cl.id.toString())
  //         .join(','),
  //     });
  //   }
  // }, [classes]);

  const { data: studentsProgram } = intakeProgramStore.getStudentsByIntakeProgramLevel(
    details?.intake_program_level + '',
    details?.intake_program_level.length != 0,
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

  // useEffect(() => {
  //   setDetails({
  //     access_type:
  //       evaluationInfo?.access_type || cachedData?.access_type || IAccessTypeEnum.PUBLIC,
  //     academy_id: picked_role?.academy_id + '' || cachedData?.academy_id || '',
  //     marking_type:
  //       evaluationInfo?.marking_type || cachedData?.marking_type || IMarkingType.NOT_SET,
  //     private_attendees:
  //       evaluationInfo?.private_attendees.toString() ||
  //       cachedData?.private_attendees?.toString() ||
  //       '',
  //     instructor_id: user?.id.toString() || '',
  //     intake_academic_year_period: intakePeriodId,
  //     allow_submission_time:
  //       evaluationInfo?.allow_submission_time || cachedData?.allow_submission_time || '',
  //     intake_level_class_ids:
  //       evaluationInfo?.intake_level_class_ids ||
  //       cachedData?.intake_level_class_ids ||
  //       classes?.data.data.map((cl) => cl.id.toString()).join(',') ||
  //       '',
  //     id: evaluationInfo?.id || cachedData?.id || '',
  //     classification:
  //       evaluationInfo?.classification ||
  //       cachedData?.classification ||
  //       IEvaluationClassification.MODULE,
  //     content_format:
  //       evaluationInfo?.content_format ||
  //       cachedData?.content_format ||
  //       IContentFormatEnum.DOC,
  //     due_on: evaluationInfo?.due_on || cachedData?.due_on || '',
  //     strict: true,
  //     eligible_group: IEligibleClassEnum.MULTIPLE,
  //     evaluation_status:
  //       evaluationInfo?.evaluation_status ||
  //       cachedData?.evaluation_status ||
  //       IEvaluationStatus.DRAFT,
  //     evaluation_type:
  //       evaluationInfo?.evaluation_type ||
  //       cachedData?.evaluation_type ||
  //       IEvaluationTypeEnum.CAT,
  //     exam_instruction:
  //       evaluationInfo?.exam_instruction || cachedData?.exam_instruction || '',
  //     is_consider_on_report:
  //       evaluationInfo?.is_consider_on_report ||
  //       cachedData?.is_consider_on_report ||
  //       true,
  //     marking_reminder_date:
  //       evaluationInfo?.marking_reminder_date || cachedData?.marking_reminder_date || '',
  //     maximum_file_size:
  //       evaluationInfo?.maximum_file_size || cachedData?.maximum_file_size || '',
  //     name: evaluationInfo?.name || cachedData?.name || '',
  //     questionaire_type:
  //       evaluationInfo?.questionaire_type ||
  //       cachedData?.questionaire_type ||
  //       IQuestionaireTypeEnum.OPEN,
  //     subject_academic_year_period_id: subjectId,
  //     submision_type:
  //       evaluationInfo?.submision_type ||
  //       cachedData?.submision_type ||
  //       ISubmissionTypeEnum.ONLINE_TEXT,
  //     time_limit: evaluationInfo?.time_limit || cachedData?.time_limit || 0,
  //     total_mark: evaluationInfo?.total_mark || cachedData?.total_mark || 0,
  //   });
  // }, [
  //   // evaluationInfo,
  //   intakePeriodId,
  //   subjectId,
  //   picked_role?.academy_id,
  //   classes?.data.data,
  // ]);

  const { mutate, isLoading: createEvaluationLoader } =
    evaluationStore.createEvaluation();

  function handleChange({ name, value }: ValueType) {
    if (name === 'time_limit' || name === 'total_mark') {
      setDetails((details) => ({
        ...details,
        [name]: parseFloat(value.toString()) || 0,
      }));
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

    // if (details.time_limit > 0) {
    //   mutateAsync(
    //     {
    //       ...details,
    //       ['due_on']: moment(details.due_on).format('YYYY-MM-DD HH:mm:ss'),
    //       ['allow_submission_time']: moment(details.allow_submission_time).format(
    //         'YYYY-MM-DD HH:mm:ss',
    //       ),
    //     },
    //     {
    //       onSuccess: () => {
    //         toast.success('Evaluation updated', { duration: 5000 });
    //       },
    //       onError: (error: any) => {
    //         toast.error(error.response.data.message);
    //       },
    //     },
    //   );
    // } else {
    //   mutate(
    //     {
    //       ...details,
    //       ['due_on']: moment(details.due_on).format('YYYY-MM-DD HH:mm:ss'),
    //       ['allow_submission_time']: moment(details.allow_submission_time).format(
    //         'YYYY-MM-DD HH:mm:ss',
    //       ),
    //     },
    //     {
    //       onSuccess: (data) => {
    //update evaluation id in evaluation module

    // },
    // onError: (error: any) => {
    //   toast.error(error.response.data.data + '');
    // },
    // },
    // );
    // }
  }

  return (
    <>
      <Heading fontWeight="semibold" fontSize="2xl" color="primary" className="pb-4">
        New evaluation
      </Heading>
      <div className="bg-main p-8 w-2/3">
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
              Select Class(es)
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
