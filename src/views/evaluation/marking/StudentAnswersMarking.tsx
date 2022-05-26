import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../../components/Atoms/custom/Button';
import Loader from '../../../components/Atoms/custom/Loader';
import Heading from '../../../components/Atoms/Text/Heading';
import BreadCrumb from '../../../components/Molecules/BreadCrumb';
import StudentAnswer from '../../../components/Molecules/cards/correction/StudentAnswer';
import NoDataAvailable from '../../../components/Molecules/cards/NoDataAvailable';
import SelectMolecule from '../../../components/Molecules/input/SelectMolecule';
import TableHeader from '../../../components/Molecules/table/TableHeader';
import FinishMarking from '../../../components/Organisms/forms/evaluation/FinishMarking';
import { markingStore } from '../../../store/administration/marking.store';
import { Link as LinkList, SelectData, ValueType } from '../../../types';
import { ParamType } from '../../../types';
import { IMarkingType } from '../../../types/services/evaluation.types';
import {
  MarkingCorrection,
  StudentMarkingAnswer,
} from '../../../types/services/marking.types';

export default function StudentAnswersMarking() {
  const { id } = useParams<ParamType>();
  const [evaluationId, setEvaluationId] = useState<string>('');
  const { mutate } = markingStore.finishMarking();
  const history = useHistory();
  const { t } = useTranslation();

  const studentAnswers = markingStore.getStudentEvaluationAnswers(id).data?.data.data;
  const { data: studentEvaluation, isLoading } =
    markingStore.getStudentEvaluationById(id);
  const { data, isLoading: markingModulesLoader } =
    markingStore.getEvaluationMarkingModules(evaluationId, evaluationId.length == 36);
  const [totalMarks, setTotalMarks] = useState(0);
  const [correction, setCorrection] = useState<Array<MarkingCorrection>>([]);
  const [markingModules, setMarkingModules] = useState<SelectData[]>([]);
  const [currentModule, setCurrentModule] = useState<string>('');
  const [step, setStep] = useState<number>(0);
  const [answersLength, setAnswersLength] = useState<number>(0);

  useEffect(() => {
    setEvaluationId(studentEvaluation?.data.data.evaluation.id + '');
  }, [studentEvaluation]);

  useEffect(() => {
    if (currentModule != '' || markingModules.length >= 0)
      setAnswersLength(studentAnswers?.filter(answersFilter).length || 0);
    else setAnswersLength(studentAnswers?.length || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentModule, studentAnswers]);

  useEffect(() => {
    let selectedModules: SelectData[] = [];
    data?.data.data.forEach((element) => {
      selectedModules.push({
        value: element.id,
        label: element.module_subject.title,
      });
    });

    setMarkingModules(selectedModules);
  }, [data]);

  function handleMarkingModuleChange(e: ValueType) {
    setCurrentModule(e.value.toString());
  }

  // const [rowsOnPage] = useState(3);
  // const [currentPage, setCurrentPage] = useState(1);
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
    { to: '/', title: t('Instructor') },
    { to: 'evaluations', title: 'evaluations' },
    { to: `/evaluations/${evaluationId}`, title: 'Evaluation Details' },
    { to: `/evaluations/${evaluationId}/submissions`, title: 'Marking' },
  ];

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

  const answersFilter = (studentAnswer: StudentMarkingAnswer) => {
    if (studentAnswer.evaluation_question.evaluation_module_subject != null)
      return (
        currentModule ===
        studentAnswer.evaluation_question.evaluation_module_subject.id + ''
      );
    else return true;
  };

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
    if (!isLoading && !markingModulesLoader)
      if (
        markingModules?.length > 0 &&
        studentEvaluation?.data.data.evaluation.marking_type === IMarkingType.PER_SECTION
      )
        return (
          <div className={`flex flex-col gap-4`}>
            <section>
              <BreadCrumb list={list}></BreadCrumb>
            </section>
            <div>
              <Heading fontWeight="medium" fontSize="sm">
                Select section
              </Heading>
              <SelectMolecule
                width="80"
                className=""
                value={currentModule}
                handleChange={handleMarkingModuleChange}
                name={'type'}
                placeholder="marking section"
                options={markingModules}
              />
            </div>
            {answersLength > 0 && (
              <TableHeader
                title={studentEvaluation?.data.data.code + ' submission'}
                showBadge={false}
                showSearch={false}>
                <p className="text-gray-400">
                  Marks obtained:{' '}
                  <span className="text-green-300 font-semibold">{totalMarks}</span>
                </p>
              </TableHeader>
            )}

            <section className="flex flex-wrap justify-start gap-4 mt-2">
              {studentAnswers
                ?.filter(answersFilter)
                .map((studentAnswer, index: number) => {
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
              {answersLength > 0 && (
                <div className="w-full flex justify-end">
                  <Button onClick={submitMarking}>Complete Marking</Button>
                </div>
              )}

              {!currentModule && (
                <NoDataAvailable
                  title={'Select a module to mark'}
                  showButton={false}
                  description={"You haven't selected an module to mark"}
                />
              )}
              {answersLength == 0 && (
                <div className="w-full flex justify-end">
                  <Button
                    onClick={() => {
                      history.goBack();
                    }}>
                    Go back
                  </Button>
                </div>
              )}
            </section>
          </div>
        );
      else if (
        studentEvaluation?.data.data.evaluation.marking_type !== IMarkingType.PER_SECTION
      )
        return (
          <div className={`flex flex-col gap-4`}>
            <section>
              <BreadCrumb list={list}></BreadCrumb>
            </section>

            {answersLength > 0 && (
              <TableHeader
                title={studentEvaluation?.data.data.code + ' submission'}
                showBadge={false}
                showSearch={false}>
                <p className="text-gray-400">
                  Marks obtained:{' '}
                  <span className="text-green-300 font-semibold">{totalMarks}</span>
                </p>
              </TableHeader>
            )}

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
              {answersLength > 0 && (
                <div className="w-full flex justify-end">
                  <Button onClick={submitMarking}>Complete Marking</Button>
                </div>
              )}
              {answersLength == 0 && (
                <div className="w-full flex justify-end">
                  <Button
                    onClick={() => {
                      history.goBack();
                    }}>
                    Go back
                  </Button>
                </div>
              )}
            </section>
          </div>
        );
      else
        return (
          <div className="w-full flex justify-center items-center">
            <NoDataAvailable
              title={'No marking modules'}
              description={"You don't have any marking module for this evaluation"}
            />
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
