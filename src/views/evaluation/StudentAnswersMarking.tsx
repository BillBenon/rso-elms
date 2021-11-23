import '../../styles/components/Molecules/correction/marking.scss'
import React, { useState,useEffect } from 'react';
import toast from 'react-hot-toast';
import { Route, useParams, Link, useRouteMatch, Switch } from 'react-router-dom';
import { CommonCardDataType, Link as LinkList } from '../../types';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import { ParamType } from '../../types';
import Button from '../../components/Atoms/custom/Button';
import TableHeader from '../../components/Molecules/table/TableHeader';
import Icon from '../../components/Atoms/custom/Icon';
import StudentAnswer from '../../components/Molecules/cards/correction/StudentAnswer';
import Pagination from '../../components/Molecules/Pagination';
import { markingStore } from '../../store/administration/marking.store';


export interface MarkingCorrection{
  marked: boolean,
  mark_scored: number,
  answer_id: string
}

export default function StudentAnswersMarking() {
    const { id } = useParams<ParamType>();
    const { path } = useRouteMatch();
    const studentAnswers = markingStore.getStudentEvaluationAnswers(id).data?.data.data;
    const [totalMarks, setTotalMarks] = useState(0);
    const [correction, setCorrection] = useState<Array<MarkingCorrection>>([]);
    const [rowsOnPage, setRowsOnPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1)
    const indexOfLastRow = currentPage * rowsOnPage;
    const indexOfFirstRow = indexOfLastRow - rowsOnPage;
    const [currentRows, setCurrentRows] = useState(
        studentAnswers?.slice(indexOfFirstRow, indexOfLastRow),
      );
    useEffect(() => {
        setCurrentRows(studentAnswers?.slice(indexOfFirstRow, indexOfLastRow));
      }, [currentPage]);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const list: LinkList[] = [
        { to: '/', title: 'Instructor' },
        { to: 'evaluations', title: 'evaluations' },
        { to: '/evaluations/evaluation_id', title: 'Evaluation Details' },
        { to: 'evaluations/evaluation_id/marking_studentEvaluation', title: 'Marking' },
      ];

      const { mutate } = markingStore.finishMarking();

      function updateQuestionPoints(answer_id: string, points: number){

        var flag: number = 0;

        correction.forEach(element => {
          
          if(element.answer_id == answer_id){
            flag++;
            const newCorretion:MarkingCorrection[] = correction.map((item) => {
              if (item.answer_id === answer_id) {
                const updatedItem:MarkingCorrection = {
                  ...item,
                  marked: true,
                  mark_scored: points,
                };
                setTotalMarks(totalMarks-item.mark_scored+points);
                return updatedItem;
              }
        
              return item;
            });
        
            setCorrection(newCorretion);
          }
        })
        if(flag == 0){
          setCorrection([...correction,{answer_id:answer_id,mark_scored: points, marked: true}]);
          setTotalMarks(totalMarks+points)
        }
        else{
        
      }
      }

      function submitMarking(){
          mutate({mark: totalMarks, answer_id: 'e'}, {
            onSuccess: () => {
              toast.success('Marking finished', { duration: 5000 });
            },
            onError: (error) => {
              console.error(error);
              toast.error(error + '');
            },
          });
          
      }
  return (
    <div className={`flex flex-col gap-4`}>
        <section>
                <BreadCrumb list={list}></BreadCrumb>
        </section>
        <TableHeader title="049423 submission" showBadge={false} showSearch={false}>
            <p className="text-gray-400">Marks obtained: <span className="text-green-300 font-semibold">{totalMarks}</span></p>
        </TableHeader>
        <section className="flex flex-wrap justify-start gap-4 mt-2">
            {currentRows?.map((studentAnswer)=>{
                return(
                <StudentAnswer key={studentAnswer.id}  correction={correction} updateQuestionPoints={updateQuestionPoints} data={studentAnswer} totalMarks={totalMarks} setTotalMarks={setTotalMarks}/>
                )
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
