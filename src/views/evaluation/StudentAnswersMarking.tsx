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

export default function StudentAnswersMarking() {
    const data: string[] = ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data8', 'data9', 'data10'];
    const { id } = useParams<ParamType>();
    const { path } = useRouteMatch();
    const [totalMarks, setTotalMarks] = useState(0);
    const [rowsOnPage, setRowsOnPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1)
    const indexOfLastRow = currentPage * rowsOnPage;
    const indexOfFirstRow = indexOfLastRow - rowsOnPage;
    const [currentRows, setCurrentRows] = useState(
        data.slice(indexOfFirstRow, indexOfLastRow),
      );
    useEffect(() => {
        setCurrentRows(data.slice(indexOfFirstRow, indexOfLastRow));
      }, [currentPage]);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const list: LinkList[] = [
        { to: '/', title: 'Instructor' },
        { to: 'evaluations', title: 'evaluations' },
        { to: '/evaluations/eval', title: 'Evaluation Details' },
        { to: 'evaluations/eval/marking', title: 'Marking' },
      ];

      const { mutate } = markingStore.finishMarking();

      function submitMarking(){
          mutate({mark: totalMarks, answer_id: '5454334-4334-3434-34343434'}, {
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
            {currentRows.map((value, index)=>{
                return(
                <StudentAnswer key={index} data={undefined} totalMarks={totalMarks} setTotalMarks={setTotalMarks}/>
                )
            })}
            <div className="flex item-center mx-auto">
            <Pagination
                rowsPerPage={rowsOnPage}
                totalRows={data.length}
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
