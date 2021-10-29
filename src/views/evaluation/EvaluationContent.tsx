import moment from 'moment';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Heading from '../../components/Atoms/Text/Heading';
import { ParamType } from '../../types';
import { IEvaluationInfo } from '../../types/services/evaluation.types';
import ContentSpan from './ContentSpan';

export default function EvaluationContent() {
  const { state } = useLocation<IEvaluationInfo[]>();
  const { id } = useParams<ParamType>();

  const evaluationInfo = state.find((evaluation) => evaluation.id === id);
  return (
    <div className="block pr-24 pb-8 w-11/12">
      <Heading fontWeight="semibold" className="pt-8">
        Evaluation information
      </Heading>
      <div className="bg-main px-7 mt-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-3 pt-5">
        <div>
          {/* first column */}
          <div className="flex flex-col gap-4">
            <ContentSpan title="Evaluation name">{evaluationInfo?.name}</ContentSpan>

            <ContentSpan title="Total number of questions" subTitle="5" />

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
          <ContentSpan title="Number of questions" subTitle="5" />
          <ContentSpan
            title="Consider on report"
            subTitle={evaluationInfo?.is_consider_on_report ? 'Yes' : 'No'}
          />{' '}
          <ContentSpan title="Access type" subTitle={evaluationInfo?.access_type} />
        </div>
      </div>

      {/* questions */}
      <Heading fontWeight="semibold" fontSize="sm" className="pt-6">
        Evaluation question
      </Heading>
      <div className="bg-main px-16 pt-5 flex flex-col gap-4 mt-8 w-12/12 pb-5">
        <div className="mt-7 flex justify-between">
          <ContentSpan title="Question 1" className="gap-3">
            What is the nervous system?
          </ContentSpan>

          <Heading fontWeight="semibold" fontSize="sm">
            5 marks
          </Heading>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex">
            <div className="w-14 h-14 bg-lightblue text-primary-500 border-primary-500 border-2 border-r-0 rounded-tl-md rounded-bl-md right-rounded-md flex items-center justify-center">
              A
            </div>
            <div className="w-80 h-14 bg-lightblue text-primary-500 border-primary-500 border-2 rounded-tr-md rounded-br-md flex items-center px-4">
              This is the first answer
            </div>
          </div>
          <div className="flex">
            <div className="w-14 h-14 border-bcolor border-2 border-r-0 rounded-tl-md rounded-bl-md right-rounded-md flex items-center justify-center">
              B
            </div>
            <div className="w-80 h-14 border-bcolor border-2 rounded-tr-md rounded-br-md flex items-center px-4">
              This is the second answer.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
