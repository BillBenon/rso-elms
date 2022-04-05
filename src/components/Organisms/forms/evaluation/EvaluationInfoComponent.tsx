import { Editor } from '@tiptap/react';
import moment from 'moment';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import useAuthenticator from '../../../../hooks/useAuthenticator';
import usePickedRole from '../../../../hooks/usePickedRole';
import { enrollmentService } from '../../../../services/administration/enrollments.service';
import { subjectService } from '../../../../services/administration/subject.service';
import { classStore } from '../../../../store/administration/class.store';
import intakeProgramStore from '../../../../store/administration/intake-program.store';
import { moduleStore } from '../../../../store/administration/modules.store';
import usersStore from '../../../../store/administration/users.store';
import { evaluationStore } from '../../../../store/evaluation/evaluation.store';
import instructordeploymentStore from '../../../../store/instructordeployment.store';
import { SelectData, ValueType } from '../../../../types';
import { ModuleInstructors } from '../../../../types/services/enrollment.types';
import {
  IAccessTypeEnum,
  IContentFormatEnum,
  IEligibleClassEnum,
  IEvaluationClassification,
  IEvaluationCreate,
  IEvaluationInfo,
  IEvaluationProps,
  IEvaluationSectionBased,
  IEvaluationStatus,
  IEvaluationTypeEnum,
  IQuestionaireTypeEnum,
  ISubmissionTypeEnum
} from '../../../../types/services/evaluation.types';
import {
  getLocalStorageData,
  setLocalStorageData
} from '../../../../utils/getLocalStorageItem';
import {
  getDropDownOptions,
  getDropDownStatusOptions
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


const initialState: IEvaluationSectionBased = {
  evaluation_id: '',
  marker_id: '',
  instructor_subject_assignment: '',
  intake_program_level_module: '',
  questionaire_setting_status: IEvaluationStatus.PENDING,
  section_total_marks: 0,
  subject_academic_year_period: '',
  id: '',
};

type IInstructorData = { [key: string]: ModuleInstructors[] };

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
  const programId = useMemo(() => new URLSearchParams(search).get('prg') || '', [search]);

  const levelId = useMemo(() => new URLSearchParams(search).get('lvl') || '', [search]);
  const subjectId = useMemo(
    () => new URLSearchParams(search).get('subj') || '',
    [search],
  );

  const { user } = useAuthenticator();
  const picked_role = usePickedRole();
  const [timeDifference, setTimeDifference] = useState(0);

  const instructorInfo = instructordeploymentStore.getInstructorByUserId(user?.id + '')
    .data?.data.data[0];

  const markers =
    usersStore.getUsersByAcademy(user?.academy.id.toString() || '').data?.data.data
      .content || [];

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
  const modules = moduleStore.getModulesByProgram(programId);
  const [subjectData, setSubjectData] = useState({});
  const [instructorData, setInstructorData] = useState<IInstructorData>({});

  const cachedData: IEvaluationInfo = getLocalStorageData('evaluationInfo') || {};
  //uncomment this to start with data cached in local storage
  // const cachedEvaluationModuleData: IEvaluationSectionBased[] = getLocalStorageData(
  //   'evaluationModule',
  // ) || [initialState];

  const cachedEvaluationModuleData: IEvaluationSectionBased[] = [initialState];

  const [evaluationModule, setEvaluationModule] = useState<IEvaluationSectionBased[]>(
    [cachedEvaluationModuleData].flat(),
  );

  const [details, setDetails] = useState<IEvaluationCreate>({
    access_type: cachedData?.access_type || IAccessTypeEnum.PUBLIC,
    academy_id: cachedData?.academy_id || '',
    private_attendees:
      evaluationInfo?.private_attendees?.toString() ||
      cachedData?.private_attendees?.toString() ||
      '',
    instructor_id: instructorInfo?.id + '',
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
  });

  useEffect(() => {
    const cachedData: IEvaluationInfo = getLocalStorageData('evaluationInfo') || {};

    setDetails({
      access_type:
        evaluationInfo?.access_type || cachedData?.access_type || IAccessTypeEnum.PUBLIC,
      academy_id: picked_role?.academy_id + '' || cachedData?.academy_id || '',
      private_attendees:
        evaluationInfo?.private_attendees.toString() ||
        cachedData?.private_attendees?.toString() ||
        '',
      instructor_id: instructorInfo?.id.toString() || '',
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
    });
  }, [
    evaluationInfo,
    instructorInfo?.id,
    intakePeriodId,
    subjectId,
    picked_role?.academy_id,
    classes?.data.data,
  ]);

  useEffect(() => {
    setLocalStorageData('evaluationInfo', details);
  }, [details]);

  const { mutate } = evaluationStore.createEvaluation();
  const { mutateAsync } = evaluationStore.updateEvaluation();
  const { mutate: mutateSectionBased } = evaluationStore.createSectionBasedEvaluation();

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

  async function getSubjectsByModule(module: string) {
    try {
      const objkeys = Object.keys(subjectData);

      if (objkeys.length === 0) {
        const subjects =
          (await subjectService.getSubjectsByModule(module)).data.data || [];

        setSubjectData({ ...subjectData, [module]: subjects });
      } else {
        for (let currKey of objkeys) {
          if (currKey !== module) {
            const subjects =
              (await subjectService.getSubjectsByModule(module)).data.data || [];

            setSubjectData({ ...subjectData, [module]: subjects });
          }
        }
      }
    } catch (error) {
      return;
    }
  }

  async function getInstructorsBySubject(subject: string) {
    try {
      const objkeys = Object.keys(instructorData);

      if (objkeys.length === 0) {
        const instructors =
          (await enrollmentService.getInstructorsBySubjectId(subject)).data.data || [];

        setInstructorData({ ...instructorData, [subject]: instructors });
      } else {
        for (let currKey of objkeys) {
          if (currKey !== subject) {
            const instructors =
              (await enrollmentService.getInstructorsBySubjectId(subject)).data.data ||
              [];

            setInstructorData({ ...instructorData, [subject]: instructors });
          }
        }
      }
    } catch (error) {
      return;
    }
  }

  function handleModuleChange(index: number, { name, value }: ValueType) {
    let evaluationModuleInfo = [...evaluationModule];
    evaluationModuleInfo[index] = { ...evaluationModuleInfo[index], [name]: value };
    setEvaluationModule(evaluationModuleInfo);
    setLocalStorageData('evaluationModule', evaluationModuleInfo);

    if (name === 'intake_program_level_module') {
      getSubjectsByModule(value.toString());

      return;
    }

    if (name === 'subject_academic_year_period') {
      getInstructorsBySubject(value.toString());

      return;
    }

    if (name === 'section_total_marks') {
      // FIXME: on evaluation marks change, it will update the total marks of the evaluation 
      setDetails((details) => ({
        ...details,
        total_marks: details.total_mark + parseInt(value.toString()),
      }));
      return;
    }
  }

  function handleAddModule() {
    let newModule = initialState;
    let modulesClone = [...evaluationModule];
    modulesClone.push(newModule);

    setEvaluationModule(modulesClone);
  }

  function handleRemoveModule(index: number) {
    let evaluationModulesClone = [...evaluationModule];

    if (evaluationModulesClone.length === 1) {
      toast.error('You must add at least one module');

      return;
    }

    evaluationModulesClone.splice(index, 1);
    setEvaluationModule(evaluationModulesClone);
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
            const modulesClone = [...evaluationModule];

            const newEvaluation = modulesClone.map((evalMod) => {
              evalMod.evaluation_id = data.data.data.id;
              return evalMod;
            });

            mutateSectionBased(newEvaluation, {
              onSuccess: () => {
                toast.success('Evaluation created', { duration: 5000 });
                setLocalStorageData('evaluationId', data.data.data.id); //should be removed at some point
                if (
                  details.questionaire_type === IQuestionaireTypeEnum.MANUAL ||
                  details.evaluation_type === IEvaluationTypeEnum.SECTION_BASED
                ) {
                  setLocalStorageData('currentStep', 2);
                  handleNext(2);
                } else {
                  setLocalStorageData('currentStep', 1);
                  handleNext(1);
                }
              },
              onError: (error: any) => {
                toast.error(error.response.data.message);
              },
            });
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

        {IEvaluationTypeEnum.SECTION_BASED === details.evaluation_type && (
          <div className="flex flex-col gap pt-[2.3rem]">
            {evaluationModule.map((evalMod, index) => (
              <div
                className="flex flex-col gap-4 pb-10"
                key={`${evalMod.instructor_subject_assignment} ${index}`}>
                <div className="flex gap-6">
                  <SelectMolecule
                    width="36"
                    value={evalMod?.intake_program_level_module}
                    name="intake_program_level_module"
                    placeholder="select module"
                    loading={modules.isLoading}
                    handleChange={(e: ValueType) => handleModuleChange(index, e)}
                    options={getDropDownOptions({
                      inputs: modules.data?.data.data || [],
                    })}>
                    Select module
                  </SelectMolecule>

                  <SelectMolecule
                    width="36"
                    value={evalMod?.subject_academic_year_period?.toString() || ''}
                    name="subject_academic_year_period"
                    loading={false}
                    placeholder="select subject"
                    handleChange={(e: ValueType) => handleModuleChange(index, e)}
                    options={getDropDownOptions({
                      //@ts-ignore
                      inputs: subjectData[evalMod.intake_program_level_module] || [],
                      labelName: ['title'],
                    })}>
                    Select subject
                  </SelectMolecule>
                </div>

                <div className="flex gap-6 items-center">
                  <SelectMolecule
                    className="pb-3"
                    width="36"
                    value={evalMod?.instructor_subject_assignment}
                    name="instructor_subject_assignment"
                    placeholder="select instructor"
                    handleChange={(e: ValueType) => handleModuleChange(index, e)}
                    options={
                      (
                        instructorData[evalMod.subject_academic_year_period.toString()] ||
                        []
                      ).map((instr: any) => ({
                        label: `${instr.user.first_name} ${instr.user.last_name}`,
                        value: instr.id,
                      })) as SelectData[]
                    }>
                    Select Instructor
                  </SelectMolecule>

                  <SelectMolecule
                    className="pb-3"
                    width="36"
                    value={evalMod?.marker_id}
                    name="marker_id"
                    placeholder="select instructor"
                    handleChange={(e: ValueType) => handleModuleChange(index, e)}
                    options={getDropDownOptions({
                      inputs: markers,
                      labelName: ['first_name', 'last_name'],
                    })}>
                    Select marker
                  </SelectMolecule>

                  <InputMolecule
                    type="number"
                    value={evalMod?.section_total_marks}
                    handleChange={(e: ValueType) => handleModuleChange(index, e)}
                    name="section_total_marks"
                    style={{ width: '5.5rem' }}>
                    Total marks
                  </InputMolecule>
                </div>

                <div>
                  <Button styleType="outline" onClick={() => handleRemoveModule(index)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            <div className="pt-10 pb-[1rem]">
              <Button styleType="outline" onClick={handleAddModule}>
                Add module
              </Button>
            </div>
          </div>
        )}

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
