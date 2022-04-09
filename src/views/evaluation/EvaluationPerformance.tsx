import React from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import { getEvaluationPerformance } from '../../store/evaluation/school-report.store';
import { ParamType } from '../../types';
import { IPerformanceTable } from '../../types/services/report.types';
import { calculateGrade } from '../../utils/school-report';

export default function EvaluationPerformance() {
  const { id } = useParams<ParamType>();
  const { data, isLoading } = getEvaluationPerformance(id);

  const formattedData: IPerformanceTable[] = [];

  data?.data.data.map((record) => {
    let total = {
      obtained: 0,
      max: 0,
    };

    let processed: IPerformanceTable = {
      reg_number: record.student.reg_number,
      id: record.student.admin_id,
    };

    record.questionPoints?.forEach((question) => {
      total.max += question.questionTotal;
      total.obtained += question.obtainedTotal;

      processed[`${question.question} /${question.questionTotal}`] =
        question.obtainedTotal.toString();
    });

    processed[`total /${total.max}`] = total.obtained;
    processed['grade'] = calculateGrade(total.obtained, total.max);
    formattedData.push(processed);
  });

  console.log(formattedData);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : data?.data.data.length === 0 ? (
        <NoDataAvailable
          title={'Nothing to show here'}
          description={'There are no submissions available for this evaluation'}
        />
      ) : (
        <Table data={formattedData} hide={['id']} />
      )}
    </div>
  );
}
