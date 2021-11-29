import '../../styles/components/Molecules/correction/marking.scss';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import StudentAnswer from '../../components/Molecules/cards/correction/StudentAnswer';
import Pagination from '../../components/Molecules/Pagination';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { markingStore } from '../../store/administration/marking.store';
import { Link as LinkList } from '../../types';
import { ParamType } from '../../types';
import { MarkingCorrection } from '../../types/services/marking.types';
import FinishMarking from '../../components/Organisms/forms/evaluation/FinishMarking';
import AnswerReview from '../../components/Molecules/cards/correction/AnswerReview';

export default function StudentAnswersMarking() {
  const { id } = useParams<ParamType>();
  const studentAnswers = markingStore.getStudentEvaluationAnswers(id).data?.data.data;
  const studentEvaluation = markingStore.getStudentEvaluationById(id).data?.data.data;
  const [totalMarks, setTotalMarks] = useState(0);
  const [rowsOnPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [step, setStep] = useState(0);
  const indexOfLastRow = currentPage * rowsOnPage;
  const indexOfFirstRow = indexOfLastRow - rowsOnPage;
  const [currentRows, setCurrentRows] = useState(
    studentAnswers?.slice(indexOfFirstRow, indexOfLastRow),
  );
  useEffect(() => {
    setCurrentRows(studentAnswers?.slice(indexOfFirstRow, indexOfLastRow));
  }, [studentAnswers, indexOfFirstRow, indexOfLastRow]);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const list: LinkList[] = [
    { to: '/', title: 'Instructor' },
    { to: 'evaluations', title: 'evaluations' },
    { to: '/evaluations/evaluation_id', title: 'Evaluation Details' },
    { to: 'evaluations/evaluation_id/marking_studentEvaluation', title: 'Marking' },
  ];

  
  return (
    <div className={`flex flex-col gap-4`}>
      <section>
        <BreadCrumb list={list}></BreadCrumb>
      </section>
      <TableHeader
        title={studentEvaluation?.code + ' submission'}
        showBadge={false}
        showSearch={false}>
        <p className="text-gray-400">
          Marks obtained:{' '}
          <span className="text-green-300 font-semibold">{totalMarks}</span>
        </p>
      </TableHeader>
      <section className="flex flex-wrap justify-start gap-4 mt-2">
        {currentRows?.map((studentAnswer) => {
          return (
            <AnswerReview
              key={studentAnswer.id}
              data={studentAnswer}
            />
          );
        })}
        <div className="flex item-center mx-auto">
          <Pagination
            rowsPerPage={rowsOnPage}
            totalRows={studentAnswers?.length || 0}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button onClick={()=>{}}>Finish Review</Button>
        </div>
      </section>
    </div>
  )
}
