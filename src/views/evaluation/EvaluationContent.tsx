import moment from 'moment';
import React from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

import Heading from '../../components/Atoms/Text/Heading';
import Table from '../../components/Molecules/table/Table';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import { evaluationStore } from '../../store/administration/evaluation.store';
import { ParamType } from '../../types';
import ContentSpan from './ContentSpan';
import MultipleChoiceAnswer from './MultipleChoiceAnswer';
import StudentAnswersMarking from './StudentAnswersMarking';

export default function EvaluationContent() {
  const { id } = useParams<ParamType>();
  const { url, path } = useRouteMatch();
  const evaluationQuestions = evaluationStore.getEvaluationQuestions(id).data?.data.data;

  const tabs = [
    {
      label: 'Overview evaluation',
      href: `${url}`,
    },
    {
      label: 'Submissions',
      href: `${url}/submissions`,
    },
  ];

  const data2 = [
    {
      id: 1,
      'Student code': '034909',
      status: 'active',
      score: '25',
      code: 'Exam',
      'time used': '24:50',
    },
    {
      id: 2,
      'Student code': '034909',
      status: 'pending',
      score: '25',
      code: 'Exam',
      'time used': '32:00',
    },
    {
      id: 3,
      'Student code': '034909',
      status: 'inactive',
      score: '25',
      code: 'Exam',
      'time used': '20:11',
    },
  ];

  const { data: evaluationInfo } = evaluationStore.getEvaluationById(id).data?.data || {};

  return (
    <div className="block pr-24 pb-8 w-11/12">
      <Switch>
        <Route path={`${path}/submissions/:id`} component={StudentAnswersMarking} />
        <TabNavigation tabs={tabs}>
          <div className="pt-8">
            <Route
              exact
              path={`${path}/submissions`}
              render={() => (
                <Table<any>
                  statusColumn="status"
                  data={data2}
                  hide={['id']}
                  uniqueCol={'id'}
                  // actions={actions
                />
              )}
            />
          </div>

          <Route
            exact
            path={`${path}`}
            render={() => (
              <>
                <Heading fontWeight="semibold" className="pt-8">
                  Evaluation information
                </Heading>
                <div className="bg-main px-7 mt-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-3 pt-5">
                  <div>
                    {/* first column */}
                    <div className="flex flex-col gap-4">
                      <ContentSpan title="Evaluation name">
                        {evaluationInfo?.name}
                      </ContentSpan>

                      {/* <ContentSpan
                      title="Total number of questions"
                      subTitle={evaluationInfo?.number_of_questions}
                    /> */}

                      <div className="flex flex-col gap-4">
                        <Heading color="txt-secondary" fontSize="base">
                          Eligible Class
                        </Heading>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-9">
                            <div>class A</div>
                            <div>class B</div>
                          </div>

                          <div className="flex gap-9">
                            <div>class A</div>
                            <div>class B</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* second column */}
                  <div className="flex flex-col gap-4">
                    <ContentSpan
                      title="Evaluation type"
                      subTitle={evaluationInfo?.evaluation_type}
                    />

                    <ContentSpan
                      title="Time Limit"
                      subTitle={moment
                        .utc()
                        .startOf('year')
                        .add({ minutes: evaluationInfo?.time_limit })
                        .format('H [h ]mm[ mins]')}
                    />
                  </div>

                  {/* tjird column */}
                  <div className="flex flex-col gap-4">
                    <ContentSpan
                      title="Due on"
                      subTitle={moment(evaluationInfo?.due_on).format('MM/DD/YYYY')}
                    />

                    <ContentSpan
                      title="Questionaire type"
                      subTitle={evaluationInfo?.questionaire_type}
                    />
                  </div>

                  {/* tjird column */}
                  <div className="flex flex-col gap-4">
                    <ContentSpan
                      title="Total number of questions"
                      subTitle={evaluationInfo?.number_of_questions}
                    />
                    <ContentSpan
                      title="Consider on report"
                      subTitle={evaluationInfo?.is_consider_on_report ? 'Yes' : 'No'}
                    />{' '}
                    <ContentSpan
                      title="Access type"
                      subTitle={evaluationInfo?.access_type}
                    />
                  </div>
                </div>

                {/* questions */}
                <Heading fontWeight="semibold" fontSize="base" className="pt-6">
                  Evaluation questions
                </Heading>
                <div className="bg-main px-16 pt-5 flex flex-col gap-4 mt-8 w-12/12 pb-5">
                  {evaluationQuestions?.map((question, index: number) =>
                    question.multipleChoiceAnswers.length > 0 ? (
                      <>
                        <div className="mt-3 flex justify-between">
                          <ContentSpan title={`Question ${index + 1}`} className="gap-3">
                            What is the nervous system?
                          </ContentSpan>

                          <Heading fontWeight="semibold" fontSize="sm">
                            5 marks
                          </Heading>
                        </div>
                        <MultipleChoiceAnswer
                          answer_content="This is the first answer"
                          correct={true}
                        />
                        <MultipleChoiceAnswer
                          answer_content="This is the second answer"
                          correct={false}
                        />
                      </>
                    ) : (
                      <div className="mt-3 flex justify-between">
                        <ContentSpan title={`Question ${index + 1}`} className="gap-3">
                          {question.question}
                        </ContentSpan>

                        <Heading fontWeight="semibold" fontSize="sm">
                          {question.mark} marks
                        </Heading>
                      </div>
                    ),
                  )}
                </div>
              </>
            )}
          />
        </TabNavigation>
      </Switch>
    </div>
  );
}
