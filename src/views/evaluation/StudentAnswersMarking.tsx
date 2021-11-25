import '../../styles/components/Molecules/correction/marking.scss';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import StudentAnswer from '../../components/Molecules/cards/correction/StudentAnswer';
import Pagination from '../../components/Molecules/Pagination';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { markingStore } from '../../store/administration/marking.store';
import { Link as LinkList } from '../../types';
import { ParamType } from '../../types';
import { MarkingCorrection } from '../../types/services/marking.types';

export default function StudentAnswersMarking() {
  const { id } = useParams<ParamType>();
  const history = useHistory();
  const studentAnswers = markingStore.getStudentEvaluationAnswers(id).data?.data.data;
  const studentEvaluation = markingStore.getStudentEvaluationById(id).data?.data.data;
  const [totalMarks, setTotalMarks] = useState(0);
  const [correction, setCorrection] = useState<Array<MarkingCorrection>>([]);
  const [rowsOnPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRow = currentPage * rowsOnPage;
  const indexOfFirstRow = indexOfLastRow - rowsOnPage;
  const [currentRows, setCurrentRows] = useState(
    studentAnswers?.slice(indexOfFirstRow, indexOfLastRow),
  );
  useEffect(() => {
    setCurrentRows(studentAnswers?.slice(indexOfFirstRow, indexOfLastRow));
    // setCorrection([]);
    // studentAnswers?.forEach((element) => {
    //   setCorrection([
    //     ...correction,
    //     {
    //       markScored: element.mark_scored,
    //       answerId: element.answer_id,
    //       marked: element.marked,
    //     },
    //   ]);
    // });
  }, [studentAnswers, indexOfFirstRow, indexOfLastRow]);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const list: LinkList[] = [
    { to: '/', title: 'Instructor' },
    { to: 'evaluations', title: 'evaluations' },
    { to: '/evaluations/evaluation_id', title: 'Evaluation Details' },
    { to: 'evaluations/evaluation_id/marking_studentEvaluation', title: 'Marking' },
  ];

  const { mutate } = markingStore.finishMarking();
  function createCreateNewCorrection(answer_id: string, points: number, _marked: boolean){
    setCorrection([
      ...correction,
      { answerId: answer_id, markScored: points, marked: true },
    ]);
    setTotalMarks(totalMarks+ points);
    return { answerId: answer_id, markScored: points, marked: true };
  }
  function updateQuestionPoints(answer_id: string, points: number, _marked: boolean) {
    var flag: number = 0;

    correction.forEach((element) => {
      if (element.answerId == answer_id) {
        flag++;
        const newCorretion: MarkingCorrection[] = correction.map((item) => {
          if (item.answerId === answer_id) {
            const updatedItem: MarkingCorrection = {
              ...item,
              marked: true,
              markScored: points,
            };
            setTotalMarks(totalMarks - item.markScored + points);
            return updatedItem;
          }

          return item;
        });

        setCorrection(newCorretion);
      }
    });
    if (flag == 0) {
      // if(marked){

      //   const answer = studentAnswers?.find(data => data.answerId == answer_id);
      //   setCorrection([...correction,{answerId:answer_id,markScored: points, marked: true}]);
      //   setTotalMarks(totalMarks+points-(answer.mark_scored || 0));
      // }
      // else{
      setCorrection([
        ...correction,
        { answerId: answer_id, markScored: points, marked: true },
      ]);
      setTotalMarks(totalMarks + points);
      // }
    }
  }

  function submitMarking() {
    if (correction.length == (studentAnswers?.length || 0)) {
      mutate(
        { studentEvaluation: id, correction: correction },
        {
          onSuccess: () => {
            toast.success('Marking finished', { duration: 5000 });
            history.push('/dashboard/evaluations');
          },
          onError: (error) => {
            console.error(error);
            toast.error(error + '');
          },
        },
      );
    } else {
      toast.error('Some Answers are not marked yet!' + correction.length);
    }
  }
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
            <StudentAnswer
              key={studentAnswer.id}
              correction={correction}
              updateQuestionPoints={updateQuestionPoints}
              data={studentAnswer}
              totalMarks={totalMarks}
              setTotalMarks={setTotalMarks}
              createCreateNewCorrection={createCreateNewCorrection}
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
          <Button onClick={submitMarking}>Complete Marking</Button>
        </div>
      </section>
    </div>
  );
}
