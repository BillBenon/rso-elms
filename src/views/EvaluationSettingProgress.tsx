import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../components/Atoms/custom/Loader';
import NoDataAvailable from '../components/Molecules/cards/NoDataAvailable';
import Table from '../components/Molecules/table/Table';
import { instructorDeployment } from '../services/administration/InstructorDeployment.service';
import { subjectService } from '../services/administration/subject.service';
import { evaluationStore } from '../store/evaluation/evaluation.store';
import { ParamType } from '../types';
import { IEvaluationStatus } from '../types/services/evaluation.types';

type ProggresSettingsProps = {
  subject: string;
  id: string;
  section: string;
  instructor: string;
  status: IEvaluationStatus;
};

export default function EvaluationSettingProgress() {
  const { id } = useParams<ParamType>();
  const [isLoading, setIsloading] = useState(false);
  const [progress, setProgress] = useState<ProggresSettingsProps[]>([]);
  const { data: evaluationInfo } = evaluationStore.getEvaluationById(id).data?.data || {};

  useEffect(() => {
    let filteredInfo: ProggresSettingsProps[] = [];

    async function get() {
      if (evaluationInfo?.evaluation_module_subjects) {
        //   alert('we fetched');
        for (let [index, subj] of evaluationInfo.evaluation_module_subjects.entries()) {
          // request one
          const subjectData = await subjectService.getSubject(
            subj.subject_academic_year_period.toString(),
          );

          let temp = {
            id: '',
            subject: '',
            section: '',
            instructor: '',
            status: IEvaluationStatus.ACCEPTED,
          };
          temp.subject = subjectData.data.data.title;
          temp.section = `section ${index + 1}`;
          temp.status = subj.questionaire_setting_status;
          temp.id = subj.id;

          //request two
          const instructors = await instructorDeployment.getInstructorById(
            subj.instructor_subject_assignment,
          );
          temp.instructor = `${instructors.data.data.user.first_name} ${instructors.data.data.user.last_name}`;
          filteredInfo.push(temp);
        }

        setProgress(filteredInfo);
        setIsloading(false);
      }
    }
    get();
    setIsloading(false);
  }, [evaluationInfo?.evaluation_module_subjects]);

  return (
    <div>
      {progress.length > 0 ? (
        <Table<ProggresSettingsProps>
          handleSelect={() => {}}
          statusColumn="status"
          data={progress}
          uniqueCol={'id'}
          hide={['id']}
        />
      ) : isLoading ? (
        <Loader />
      ) : (
        <NoDataAvailable
          title={'No data available'}
          description={'Try creating sections on this evaluation'}
          showButton={false}
        />
      )}
    </div>
  );
}
