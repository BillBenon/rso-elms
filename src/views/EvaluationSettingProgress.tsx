import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../components/Atoms/custom/Loader';
import NoDataAvailable from '../components/Molecules/cards/NoDataAvailable';
import Table from '../components/Molecules/table/Table';
import { subjectService } from '../services/administration/subject.service';
import { userService } from '../services/administration/user.service';
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
  const { data: evaluationInfo, isLoading: evaluationLoading } =
    evaluationStore.getEvaluationById(id);

  useEffect(() => {
    let filteredInfo: ProggresSettingsProps[] = [];

    async function get() {
      setIsloading(true);
      if (evaluationInfo?.data.data.evaluation_module_subjects) {
        //   alert('we fetched');
        for (let [
          index,
          subj,
        ] of evaluationInfo.data.data.evaluation_module_subjects.entries()) {
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
          const user = await userService.getUserByid(subj.instructor_subject_assignment);
          temp.instructor = `${user.data?.data.person?.current_rank?.name || ''} ${
            user.data?.data.first_name
          } ${user.data?.data.last_name}`;
          filteredInfo.push(temp);
        }

        setProgress(filteredInfo);
        setIsloading(false);
      }
    }
    get();
  }, [evaluationInfo?.data.data.evaluation_module_subjects]);

  return (
    <div>
      {evaluationLoading || isLoading ? (
        <Loader />
      ) : (
        <>
          {progress.length > 0 ? (
            <Table<ProggresSettingsProps>
              handleSelect={() => {}}
              statusColumn="status"
              data={progress}
              uniqueCol={'id'}
              hide={['id']}
            />
          ) : (
            <NoDataAvailable
              title={'No data available'}
              description={'Try creating sections on this evaluation'}
              showButton={false}
            />
          )}
        </>
      )}
    </div>
  );
}
