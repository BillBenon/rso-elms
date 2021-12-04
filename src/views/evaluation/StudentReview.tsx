import '../../styles/components/Molecules/correction/marking.scss';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import AnswerReview from '../../components/Molecules/cards/correction/AnswerReview';
import Pagination from '../../components/Molecules/Pagination';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { markingStore } from '../../store/administration/marking.store';
import { Link as LinkList } from '../../types';
import { ParamType } from '../../types';

export default function StudentReview() {
  const { id } = useParams<ParamType>();
  const studentAnswers = markingStore.getStudentEvaluationAnswers(id).data?.data.data;
  const studentEvaluation = markingStore.getStudentEvaluationById(id).data?.data.data;
  const [rowsOnPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRow = currentPage * rowsOnPage;
  const indexOfFirstRow = indexOfLastRow - rowsOnPage;
  const [currentRows, setCurrentRows] = useState(
    studentAnswers?.slice(indexOfFirstRow, indexOfLastRow),
  );
  const history = useHistory();
  function goBack(): void {
    history.push(`/dashboard/student`);
  }
  useEffect(() => {
    setCurrentRows(studentAnswers?.slice(indexOfFirstRow, indexOfLastRow));
    if (studentEvaluation?.markingStatus) {
      if (studentEvaluation?.markingStatus == 'TO_MARK') {
        toast.error('Your answers are yet to be marked by Instructor');
      } else if (studentEvaluation?.markingStatus == 'MARKING') {
        toast.error('Your answers are in marking process.');
      } else if (studentEvaluation?.markingStatus == 'MARKED') {
        toast.error('Your results has not yet been published.');
      } else if (studentEvaluation?.markingStatus == 'PUBLISHED') {
        toast.success('Results has been published, you are now viewing the results.');
      }
      if (studentEvaluation?.markingStatus != 'PUBLISHED') {
        history.goBack();
      }
    }
  }, [studentAnswers, indexOfFirstRow, indexOfLastRow]);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const list: LinkList[] = [
    { to: '/', title: 'Instructor' },
    { to: 'evaluations', title: 'evaluations' },
    { to: '/evaluations/evaluation_id', title: 'Evaluation Details' },
    { to: 'evaluations/evaluation_id/marking_studentEvaluation', title: 'Marking' },
  ];

  return (
    <>
      {studentEvaluation.markingStatus == 'PUBLISHED' ? (
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
              <span className="text-green-300 font-semibold">
                {studentEvaluation?.obtainedMark}
              </span>
            </p>
          </TableHeader>
          <section className="flex flex-wrap justify-start gap-4 mt-2">
            {currentRows?.map((studentAnswer) => {
              return <AnswerReview key={studentAnswer.id} data={studentAnswer} />;
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
              <Button onClick={goBack}>Finish Review</Button>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <Heading>Your answers has not yet been published</Heading>
        </div>
      )}
    </>
  );
}
