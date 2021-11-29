import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewEvaluation from '../../components/Organisms/forms/evaluation/NewEvaluation';
import { authenticatorStore } from '../../store/administration';
import { evaluationStore } from '../../store/administration/evaluation.store';
import { CommonCardDataType, Link as LinkList } from '../../types';
import { IStudentEvaluationStart } from '../../types/services/evaluation.types';
import { setLocalStorageData } from '../../utils/getLocalStorageItem';
import { advancedTypeChecker } from '../../utils/getOption';
import EvaluationContent from './EvaluationContent';

interface IEvaluationProps {
  subjectId: string;
  linkTo: string;
}

export default function StudentViewEvaluations({ subjectId, linkTo }: IEvaluationProps) {
  const [evaluations, setEvaluations] = useState<any>([]);
  const [confirm, showConfirmation] = useState(false);
  const [finished, setFinished] = useState<any>([]);
  const [ongoing, setOngoing] = useState<any>([]);
  const history = useHistory();
  const { path } = useRouteMatch();
  const authUser = authenticatorStore.authUser().data?.data.data;
  const { data, isSuccess, isLoading, isError } = evaluationStore.getEvaluationsByStudent(subjectId);

  //function that moves user to next page according to his type
  function goToNext(id: string) {
    linkTo
      ? history.push({
          pathname: linkTo,
          search: `?evaluation=${id}`,
        })
      : history.push(`${path}/${id}`);
  }

  const { mutateAsync, isLoading: loading } = evaluationStore.studentEvaluationStart();

  function generateStudentCode(id: string) {
    const studentEvaluationStart: IStudentEvaluationStart = {
      attachment: '',
      evaluation_id: id,
      student_id: authUser?.id.toString() || '',
    };

    goToNext(studentEvaluationStart.evaluation_id);
    mutateAsync(studentEvaluationStart, {
      onSuccess: (studentInfo) => {
        setLocalStorageData('studentEvaluationId', studentInfo.data.data.id);
        toast.success('Generated evaluation code', { duration: 5000 });
        goToNext(studentEvaluationStart.evaluation_id);
      },
      onError: () => {
        toast.error("The evaluation isn't already started!");
      },
    });
  }

  useEffect(() => {
    setLocalStorageData('currentStep', 0);
    let formattedEvals: CommonCardDataType[] = [];
    let formattedSubs: CommonCardDataType[] = [];
    data?.data.data?.undoneEvaluations.map((evaluation) => {
      let formattedEvaluations = {
        id: evaluation.id,
        title: evaluation.name,
        code: evaluation.evaluation_type,
        description: `${evaluation.total_mark} marks`,
        status: {
          type: advancedTypeChecker(evaluation.evaluation_status),
          text: evaluation.evaluation_status,
        },
      };
      formattedEvals.push(formattedEvaluations);
    });
    setEvaluations(formattedEvals);

    const studentEvaluations = data?.data.data.ongoingEvaluations;

    studentEvaluations?.map((submission: any) => {
        let filteredData: CommonCardDataType = {
          id: submission.id.toString(),
          title: submission.evaluation.name,
          code: submission.evaluation.evaluation_type,
          description: `${submission.totalMark} marks`,
          status: {
            type: advancedTypeChecker(submission.submissionStatus),
            text: submission.submissionStatus,
          },
        };
        formattedSubs.push(filteredData);
      });

      studentEvaluations && setOngoing(formattedSubs);

      const studentFinished = data?.data.data.finishedEvaluations;

      studentFinished?.map((submission: any) => {
          let filteredData: CommonCardDataType = {
            id: submission.id.toString(),
            title: submission.evaluation.name,
            code: submission.markingStatus,
            description: `Got ${submission.obtained}/${submission.totalMark} marks`,
            status: {
              type: advancedTypeChecker(submission.submissionStatus),
              text: submission.submissionStatus,
            },
          };
          formattedSubs.push(filteredData);
        });
  
        studentEvaluations && setOngoing(formattedSubs);
  }, [data?.data.data]);

  return (
    <div>
      <Switch>
        <Route exact path={`${path}/new`} component={NewEvaluation} />
        <Route path={`${path}/:id`} component={EvaluationContent} />
        <Route
          exact
          path={path}
          render={() => (
            <>
              <section className="flex flex-wrap justify-start gap-4 mt-2">
                {isLoading && evaluations.length === 0 && <Loader />}

                {isSuccess && evaluations.length === 0 ? (
                  <NoDataAvailable
                    icon="evaluation"
                    buttonLabel="Add new evaluation"
                    title={'No evaluations available'}
                    handleClick={() => history.push(`${path}`)}
                    description="And the web just isnt the same without you. Lets get you back online!"
                  />
                ) : isSuccess && evaluations.length > 0 ? (
                  <div className="flex flex-col">
                  <div className="mb-4">
                  <Heading fontWeight="semibold"> Undone Evaluations </Heading>
                  <div className="flex gap-4 flex-wrap">
                  {evaluations?.map((info: CommonCardDataType, index: number) => (
                    <div key={index}>
                      {linkTo ? (
                        <PopupMolecule
                          closeOnClickOutSide={false}
                          open={confirm}
                          title="Do you want to continue?"
                          onClose={() => showConfirmation(false)}>
                          <div className="">
                            <Heading fontWeight="semibold">{info.title}</Heading>
                            <p className="course-card-description leading-5 pb-6 w-96 text-txt-secondary text-sm mt-4">
                              You are about to attempt this {info.title} test. Are you
                              sure you want to do it now ? This action is irreversible.
                            </p>

                            <div className="flex justify-starg">
                              <Button
                                disabled={loading}
                                onClick={() =>
                                  generateStudentCode(info.id?.toString() || '')
                                }>
                                <span className="font-semibold">Start Evaluation</span>
                              </Button>
                            </div>
                          </div>
                        </PopupMolecule>
                      ) : null}
                      <CommonCardMolecule
                        className="cursor-pointer"
                        handleClick={() =>
                          linkTo
                            ? showConfirmation(true)
                            : goToNext(info.id?.toString() || '')
                        }
                        data={info}
                      />
                    </div>
                  )
                  )}
                  </div>
                  </div>

                  <div className="mb-6">
                  <Heading fontWeight="semibold"> Ongoing Evaluations </Heading>
                  <div className="flex gap-4 flex-wrap">
                  {ongoing?.map((info: CommonCardDataType, index: number) => (
                    <div key={index}>
                      {linkTo ? (
                        <PopupMolecule
                          closeOnClickOutSide={false}
                          open={confirm}
                          title="Do you want to continue?"
                          onClose={() => showConfirmation(false)}>
                          <div className="">
                            <Heading fontWeight="semibold">{info.title}</Heading>
                            <p className="course-card-description leading-5 pb-6 w-96 text-txt-secondary text-sm mt-4">
                              You are about to attempt this {info.title} test. Are you
                              sure you want to do it now ? This action is irreversible.
                            </p>

                            <div className="flex justify-starg">
                              <Button
                                disabled={loading}
                                onClick={() =>
                                  generateStudentCode(info.id?.toString() || '')
                                }>
                                <span className="font-semibold">Start Evaluation</span>
                              </Button>
                            </div>
                          </div>
                        </PopupMolecule>
                      ) : null}
                      <CommonCardMolecule
                        className="cursor-pointer"
                        handleClick={() =>
                          linkTo
                            ? showConfirmation(true)
                            : goToNext(info.id?.toString() || '')
                        }
                        data={info}
                      />
                    </div>
                    
                  )
                  )}
                  </div>
                  </div>

                  <div className="mb-6">
                  <Heading fontWeight="semibold"> Completed Evaluations </Heading>
                  <div className="flex gap-4 flex-wrap">
                  {finished?.map((info: CommonCardDataType, index: number) => (
                    <div key={index}>
                      {linkTo ? (
                        <PopupMolecule
                          closeOnClickOutSide={false}
                          open={confirm}
                          title="Do you want to continue?"
                          onClose={() => showConfirmation(false)}>
                          <div className="">
                            <Heading fontWeight="semibold">{info.title}</Heading>
                            <p className="course-card-description leading-5 pb-6 w-96 text-txt-secondary text-sm mt-4">
                              You are about to attempt this {info.title} test. Are you
                              sure you want to do it now ? This action is irreversible.
                            </p>

                            <div className="flex justify-starg">
                              <Button
                                disabled={loading}
                                onClick={() =>
                                  generateStudentCode(info.id?.toString() || '')
                                }>
                                <span className="font-semibold">Start Evaluation</span>
                              </Button>
                            </div>
                          </div>
                        </PopupMolecule>
                      ) : null}
                      <CommonCardMolecule
                        className="cursor-pointer"
                        handleClick={() =>
                          linkTo
                            ? showConfirmation(true)
                            : goToNext(info.id?.toString() || '')
                        }
                        data={info}
                      />
                    </div>
                    
                  )
                  )}
                  </div>
                  </div>
                  </div>
                ) : isError ? (
                  <NoDataAvailable
                    icon="evaluation"
                    buttonLabel="Go back"
                    title={'No evaluations available'}
                    handleClick={() => history.push(`${path}/new`)}
                    description="And the web just isnt the same without you. Lets get you back online!"
                  />
                ) : null}
              </section>
            </>
          )}
        />
      </Switch>
    </div>
  );
}
