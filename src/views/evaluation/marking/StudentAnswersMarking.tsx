import '../../../styles/components/Molecules/correction/marking.scss';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import Button from '../../../components/Atoms/custom/Button';
import Loader from '../../../components/Atoms/custom/Loader';
import BreadCrumb from '../../../components/Molecules/BreadCrumb';
import StudentAnswer from '../../../components/Molecules/cards/correction/StudentAnswer';
import TableHeader from '../../../components/Molecules/table/TableHeader';
import FinishMarking from '../../../components/Organisms/forms/evaluation/FinishMarking';
import { markingStore } from '../../../store/administration/marking.store';
import { Link as LinkList } from '../../../types';
import { ParamType } from '../../../types';
import { MarkingCorrection } from '../../../types/services/marking.types';

export default function StudentAnswersMarking() {
  const { id } = useParams<ParamType>();
  const studentAnswers = markingStore.getStudentEvaluationAnswers(id).data?.data.data;
  const { data: studentEvaluation, isLoading } =
    markingStore.getStudentEvaluationById(id);
  const [totalMarks, setTotalMarks] = useState(0);
  const [correction, setCorrection] = useState<Array<MarkingCorrection>>([]);
  // const [rowsOnPage] = useState(3);
  // const [currentPage, setCurrentPage] = useState(1);
  const [step, setStep] = useState(0);
  // const indexOfLastRow = currentPage * rowsOnPage;
  // const indexOfFirstRow = indexOfLastRow - rowsOnPage;
  // const [currentRows, setCurrentRows] = useState(
  //   studentAnswers?.slice(indexOfFirstRow, indexOfLastRow),
  // );
  // useEffect(() => {
  // setCurrentRows(studentAnswers?.slice(indexOfFirstRow, indexOfLastRow));
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
  // console.log(studentAnswers?.length);
  // }, [studentAnswers, indexOfFirstRow, indexOfLastRow]);
  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const list: LinkList[] = [
    { to: '/', title: 'Instructor' },
    { to: 'evaluations', title: 'evaluations' },
    { to: '/evaluations/evaluation_id', title: 'Evaluation Details' },
    { to: 'evaluations/evaluation_id/marking_studentEvaluation', title: 'Marking' },
  ];

  const { mutate } = markingStore.finishMarking();
  function createCreateNewCorrection(answer_id: string, points: number, marked: boolean) {
    setCorrection([
      ...correction,
      { answerId: answer_id, markScored: points, marked: marked || false },
    ]);
    setTotalMarks(totalMarks + points);
    return { answerId: answer_id, markScored: points, marked: marked || false };
  }
  function updateQuestionPoints(answer_id: string, points: number) {
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
            toast.success('Marks saved successfully', { duration: 3000 });
            setStep(1);
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
  if (step == 0)
    if (!isLoading)
      return (
        <div className={`flex flex-col gap-4`}>
          <section>
            <BreadCrumb list={list}></BreadCrumb>
          </section>
          <TableHeader
            title={studentEvaluation?.data.data.code + ' submission'}
            showBadge={false}
            showSearch={false}>
            <p className="text-gray-400">
              Marks obtained:{' '}
              <span className="text-green-300 font-semibold">{totalMarks}</span>
            </p>
          </TableHeader>
          <section className="flex flex-wrap justify-start gap-4 mt-2">
            {studentAnswers?.map((studentAnswer, index: number) => {
              return (
                <StudentAnswer
                  key={index}
                  index={index}
                  correction={correction}
                  updateQuestionPoints={updateQuestionPoints}
                  data={studentAnswer}
                  totalMarks={totalMarks}
                  setTotalMarks={setTotalMarks}
                  createCreateNewCorrection={createCreateNewCorrection}
                />
              );
            })}
            {/* <div className="flex item-center mx-auto">
              <Pagination
                rowsPerPage={rowsOnPage}
                totalElements={studentAnswers?.length || 5}
                paginate={paginate}
                currentPage={currentPage}
                totalPages={1}
              />
            </div> */}
            <div className="w-full flex justify-end">
              <Button onClick={submitMarking}>Complete Marking</Button>
            </div>
          </section>
        </div>
      );
    else return <Loader />;
  else
    return (
      <FinishMarking
        student_code={studentEvaluation?.data.data.code + ''}
        obtained_marks={totalMarks}
        student_evaluation={id}
      />
    );
}
