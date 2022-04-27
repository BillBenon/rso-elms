import { Editor } from '@tiptap/react';
import moment from 'moment';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import useAuthenticator from '../../../../hooks/useAuthenticator';
import usePickedRole from '../../../../hooks/usePickedRole';
import { enrollmentService } from '../../../../services/administration/enrollments.service';
import { subjectService } from '../../../../services/administration/subject.service';
import { classStore } from '../../../../store/administration/class.store';
import enrollmentStore from '../../../../store/administration/enrollment.store';
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
  IEvaluationMode,
  IEvaluationSectionBased,
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

export default function EvaluationInfoComponent() {
  const picked_role = usePickedRole();
  const history = useHistory();

  const { search } = useLocation();
  const { t } = useTranslation();

  const evaluationId = new URLSearchParams(search).get('evaluation') || '';

  const evaluationInfo = evaluationStore.getEvaluationById(evaluationId).data?.data.data;

  const { user } = useAuthenticator();

  const [programId, setProgramId] = useState('');

  const templates = evaluationStore.getTemplates(user?.academy.id + '').data?.data.data;

  const [details, setDetails] = useState<IEvaluationCreate>({
    access_type: evaluationInfo?.access_type || IAccessTypeEnum.PUBLIC,
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
    subject_academic_year_period_id: '',
    questionaire_type: IQuestionaireTypeEnum.DEFAULT,
    exam_instruction: '',
    name: '',
    submision_type: ISubmissionTypeEnum.ONLINE_TEXT,
    time_limit: 10,
    total_mark: 0,
    strict: true,
    intakeId: '',
    intake_academic_year_period: '',
    intake_program_level: '',
    setting_type: IEvaluationSettingType.SECTION_BASED,
    evaluation_mode: IEvaluationMode.INDOOR,
  });

  useEffect(() => {
    if (picked_role?.academy_id) {
      setDetails((prevDetails) => {
        return {
          ...prevDetails,
          academy_id: picked_role?.academy_id + '',
        };
      });
    }
  }, [picked_role]);

  const { data: classes } = classStore.getClassByPeriod(
    details?.intake_academic_year_period + '',
    details?.intake_academic_year_period?.length != 0,
  );

  // Update classes
  useEffect(() => {
    if (classes?.data.data) {
      setDetails((prevState) => {
        return {
          ...prevState,
          intake_level_class_ids: classes?.data.data
            .map((cl) => cl.id.toString())
            .join(','),
        };
      });
    }
  }, [classes]);

  const markers =
    usersStore.getUsersByAcademy(user?.academy.id.toString() || '').data?.data.data
      .content || [];

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

  const modules = moduleStore.getModulesByProgram(programId, programId.length != 0);

  const [subjectData, setSubjectData] = useState({});
  const [instructorData, setInstructorData] = useState<IInstructorData>({});

  const cachedEvaluationModuleData: IEvaluationSectionBased[] = [initialState];

  const [evaluationModule, setEvaluationModule] = useState<IEvaluationSectionBased[]>(
    [cachedEvaluationModuleData].flat(),
  );

  const { mutate, isLoading: createEvaluationLoader } =
    evaluationStore.createEvaluation();
  const { mutate: mutateSectionBased, isLoading: sectionBasedLoader } =
    evaluationStore.createSectionBasedEvaluation();

  function handleChange({ name, value }: ValueType) {
    if (name === 'intake_program_level') {
      const intakeProgramLevel = levels?.data.data.find((level) => {
        return level.id === Number(value);
      });
      setProgramId(intakeProgramLevel?.intake_program.program.id + '');
    }

    if (name === 'time_limit') {
      setDetails((details) => ({
        ...details,
        time_limit: parseInt(value.toString()) || 0,
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

    if (name === 'section_total_marks') {
      evaluationModuleInfo[index] = {
        ...evaluationModuleInfo[index],
        section_total_marks: parseFloat(value.toString()) || 0,
      };
    } else {
      evaluationModuleInfo[index] = { ...evaluationModuleInfo[index], [name]: value };
    }

    setEvaluationModule(evaluationModuleInfo);

    if (name === 'intake_program_level_module') {
      getSubjectsByModule(value.toString());
      return;
    }

    if (name === 'subject_academic_year_period') {
      getInstructorsBySubject(value.toString());
      return;
    }
  }

  useEffect(() => {
    if (evaluationModule.length > 0) {
      let total_mark = 0;
      // add all marks on evaluation module
      evaluationModule.forEach((module) => {
        total_mark += Number(module.section_total_marks);
      });

      setDetails((details) => ({
        ...details,
        total_mark,
      }));
    }
  }, [evaluationModule]);

  const authUserId = user?.id;

  const instructorInfo = instructordeploymentStore.getInstructorByUserId(authUserId + '')
    .data?.data.data[0];

  const { data: intakes } = enrollmentStore.getInstructorIntakePrograms(
    instructorInfo?.id + '',
  );

  const { data: levels, isLoading: levelsLoading } =
    intakeProgramStore.getLevelsByIntakeProgram(
      details?.intakeId || '',
      details?.intakeId?.length === 36,
    );

  const { data: periods, isLoading: periodsLoading } =
    intakeProgramStore.getPeriodsByLevel(
      Number(details?.intake_program_level),
      details?.intake_program_level.length !== 0,
    );

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
          const modulesClone = [...evaluationModule];
          const newEvaluation = modulesClone.map((evalMod) => {
            evalMod.evaluation_id = data.data.data.id;
            return evalMod;
          });
          mutateSectionBased(newEvaluation, {
            onSuccess: () => {
              toast.success('Evaluation created successfully');
              history.push(`/dashboard/evaluations/${data.data.data.id}/settings`);
            },
            onError: (error: any) => {
              toast.error(error.response.data.message);
            },
          });
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      },
    );
  }

  return (
    <div className="bg-main p-8">
      <Heading color="primary" fontWeight="bold">
        {evaluationId ? (
          <span className="font-bold">Edit Evaluation</span>
        ) : (
          <span>Create evaluation</span>
        )}
      </Heading>

      <form className="pt-6" onSubmit={submitForm}>
        <div className="border-none border-transparent"></div>

        <SelectMolecule
          value={details?.intakeId}
          width="64 py-4"
          name="intakeId"
          placeholder="Intake"
          handleChange={handleChange}
          options={
            intakes?.data.data.map((item) => {
              return {
                label: item.intake_program.intake.title,
                value: item.intake_program.id + '',
              };
            }) || []
          }>
          Select intake
        </SelectMolecule>

        <SelectMolecule
          value={details?.intake_program_level + ''}
          width="64 py-4"
          name="intake_program_level"
          placeholder={t('Program') + ' level'}
          handleChange={handleChange}
          loading={levelsLoading}
          options={
            levels?.data.data.map((item) => {
              return {
                label: item.academic_program_level.level.name,
                value: item.id + '',
              };
            }) || []
          }>
          Select level
        </SelectMolecule>

        <SelectMolecule
          value={details?.intake_academic_year_period + ''}
          width="64 py-4"
          name="intake_academic_year_period"
          placeholder="Academic year"
          loading={periodsLoading}
          handleChange={handleChange}
          options={
            periods?.data.data.map((item) => {
              return {
                label: item.academic_period.name,
                value: item.id,
              };
            }) || []
          }>
          Select academic year period
        </SelectMolecule>

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
          options={getDropDownStatusOptions(IEvaluationTypeEnum, [
            IEvaluationTypeEnum.DS_ASSESSMENT,
          ])}>
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

        <SelectMolecule
          value={'' + details?.marking_type}
          width="64"
          name="marking_type"
          placeholder="Evaluation Type"
          handleChange={handleChange}
          options={getDropDownStatusOptions(IMarkingType)}>
          Marking type
        </SelectMolecule>

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
                  placeholder="select setter"
                  handleChange={(e: ValueType) => handleModuleChange(index, e)}
                  options={
                    (
                      instructorData[evalMod.subject_academic_year_period.toString()] ||
                      []
                    ).map((instr) => ({
                      label: `${instr.user.first_name} ${instr.user.last_name}`,
                      value: instr.user.id,
                    })) as SelectData[]
                  }>
                  Select Setter
                </SelectMolecule>

                {details.marking_type === IMarkingType.PER_SECTION && (
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
                )}

                <InputMolecule
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
            // { label: 'Manual', value: IQuestionaireTypeEnum.MANUAL },
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
              placeholder="Select submission type"
              handleChange={handleChange}
              options={[
                { label: 'File', value: ISubmissionTypeEnum.FILE },
                { label: 'Online text', value: ISubmissionTypeEnum.ONLINE_TEXT },
              ]}>
              Submission type
            </DropdownMolecule>
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
          type="number"
          name="total_mark"
          readOnly
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
          <Button type="submit" disabled={createEvaluationLoader || sectionBasedLoader}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
