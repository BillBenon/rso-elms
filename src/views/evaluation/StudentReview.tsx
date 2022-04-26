import '../../styles/components/Molecules/correction/marking.scss';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import AnswerReview from '../../components/Molecules/cards/correction/AnswerReview';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { markingStore } from '../../store/administration/marking.store';
import { Link as LinkList } from '../../types';
import { ParamType } from '../../types';

export default function StudentReview() {
  const { id } = useParams<ParamType>();
  const { t } = useTranslation();
  const studentAnswers = markingStore.getStudentEvaluationAnswers(id).data?.data.data;
  const {
    data: studentEvaluation,
    isLoading,
    isSuccess,
  } = markingStore.getStudentEvaluationById(id);
  // const [rowsOnPage] = useState(4);
  // const [currentPage, setCurrentPage] = useState(1);
  // const indexOfLastRow = currentPage * rowsOnPage;
  // const indexOfFirstRow = indexOfLastRow - rowsOnPage;
  // const [currentRows, setCurrentRows] = useState(
  //   studentAnswers?.slice(indexOfFirstRow, indexOfLastRow),
  // );
  const history = useHistory();
  function goBack(): void {
    history.push(`/dashboard/student`);
  }
  // useEffect(() => {
  //   setCurrentRows(studentAnswers?.slice(indexOfFirstRow, indexOfLastRow));
  // }, [studentAnswers, indexOfFirstRow, indexOfLastRow]);

  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const list: LinkList[] = [
    { to: '/', title: t('Instructor') },
    { to: 'evaluations', title: 'evaluations' },
    { to: '/evaluations/evaluation_id', title: 'Evaluation Details' },
    { to: 'evaluations/evaluation_id/marking_studentEvaluation', title: 'Marking' },
  ];

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && studentEvaluation?.data.data.marking_status == 'PUBLISHED' ? (
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
              <span className="text-green-300 font-semibold">
                {studentEvaluation?.data.data.obtained_mark}
              </span>
            </p>
          </TableHeader>
          <section className="flex flex-wrap justify-start gap-4 mt-2">
            {studentAnswers?.map((studentAnswer, index: number) => {
              return (
                <AnswerReview index={index} key={studentAnswer.id} data={studentAnswer} />
              );
            })}
            <div className="bg-main flex flex-col gap-4 p-4 w-full rounded">
              <Heading fontWeight="semibold" fontSize="base">
                {t('Instructor')}&apos;s remarks
              </Heading>
              <p className="text-md">-&gt;{' ' + studentEvaluation.data.data.remark}</p>
            </div>
            {/* <div className="flex item-center mx-auto">
              <Pagination
                rowsPerPage={rowsOnPage}
                totalElements={studentAnswers?.length || 0}
                paginate={paginate}
                currentPage={currentPage}
                totalPages={1}
              />
            </div> */}
            <div className="w-full flex justify-end">
              <Button onClick={goBack}>Finish Review</Button>
            </div>
          </section>
        </div>
      ) : isSuccess && studentEvaluation?.data.data.marking_status != 'PUBLISHED' ? (
        <div>
          <Heading>Your answers has not yet been published</Heading>
        </div>
      ) : null}
    </>
  );
}
