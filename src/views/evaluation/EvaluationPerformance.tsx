import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import { intakeProgramService } from '../../services/administration/IntakeProgram.service';
import { getEvaluationPerformance } from '../../store/evaluation/school-report.store';
import { ParamType } from '../../types';
import { IPerformanceTable } from '../../types/services/report.types';
import { calculateGrade } from '../../utils/school-report';

export default function EvaluationPerformance() {
  const { id } = useParams<ParamType>();
  const { data, isLoading } = getEvaluationPerformance(id);

  const [formattedData, setFormattedData] = useState<IPerformanceTable[]>([]);

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data.data]);

  async function fetchData() {
    let formattedData: IPerformanceTable[] = [];

    new Promise((resolve) => {
      data?.data.data.forEach(async (record, index, array) => {
        let total = {
          obtained: 0,
          max: 0,
        };
        const student = await intakeProgramService.getStudentById(
          record.student.admin_id,
        );

        let processed: IPerformanceTable = {
          rank: student.data.data.user.person.current_rank?.name || '',
          first_name: student.data.data.user.first_name,
          last_name: student.data.data.user.last_name,
          // reg_number: record.data.data.reg_number,
          id: record.student.admin_id,
        };

        record.questionPoints?.forEach((question) => {
          total.max += question.questionTotal;
          total.obtained += question.obtainedTotal;

          const questionHtml = question.question;
          const div = document.createElement('div');
          div.innerHTML = questionHtml;
          const questionText = div.textContent || div.innerText;

          processed[`${questionText} /${question.questionTotal}`] =
            question.obtainedTotal.toString();
        });

        processed[`total /${total.max}`] = total.obtained;
        processed['grade'] = calculateGrade(total.obtained, total.max);

        formattedData.push(processed);
        if (index === array.length - 1) resolve(formattedData);
      });
    }).then(() => setFormattedData([...formattedData]));

    // setFormattedData(formattedData);
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : formattedData.length === 0 ? (
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
