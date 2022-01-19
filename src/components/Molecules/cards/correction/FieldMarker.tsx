import React, { Dispatch, SetStateAction, useState } from 'react';

import { TextDecoration, ValueType } from '../../../../types';
import { IEvaluationQuestionsInfo } from '../../../../types/services/evaluation.types';
import { FieldQuestionMarks } from '../../../../types/services/marking.types';
import ContentSpan from '../../../../views/evaluation/ContentSpan';
import Heading from '../../../Atoms/Text/Heading';
import InputMolecule from '../../input/InputMolecule';

interface PropTypes {
  data: IEvaluationQuestionsInfo;
  full?: boolean;
  icon?: boolean;
  questionMarks: FieldQuestionMarks[];
  totalMarks: number;
  index: number;
  updateQuestionPoints: (_question_id: string, _marks: number) => void;
  createCreateNewCorrection: (_question_id: string, _marks: number) => FieldQuestionMarks;
  setTotalMarks: Dispatch<SetStateAction<number>>;
  hoverStyle?: TextDecoration;
  className?: string;
  obtained: number | undefined;
}
export default function FieldMarker({
  updateQuestionPoints,
  data,
  index,
  questionMarks,
  obtained,
  createCreateNewCorrection,
}: PropTypes) {
  const correct: FieldQuestionMarks =
    questionMarks.find((x) => x.question_id === data?.id) ||
    createCreateNewCorrection(data?.id, 0);

  const [obtainedMarks, setObtainedMarks] = useState(
    obtained || correct.obtained_marks || 0,
  );

  function updateCorrectionMarks(e: ValueType) {
    setObtainedMarks(Number(e.value));
    updateQuestionPoints(data.id, obtainedMarks);
  }

  //   function clickUpdateMarks(isCorrect: boolean) {
  //     if (isCorrect && obtainedMarks == 0) {
  //       setObtainedMarks(Number(data?.evaluation_question.mark));
  //       updateQuestionPoints(data.id, obtainedMarks);
  //     } else if (!isCorrect && obtainedMarks != 0) {
  //       setObtainedMarks(Number(0));
  //       updateQuestionPoints(data.id, obtainedMarks);
  //     }
  //   }

  //   useEffect(() => {
  //     setObtainedMarks(data.mark_scored || 0);
  //   }, [data]);
  return (
    <div className={`answer-card-molecule bg-main p-6 rounded-lg `}>
      <div className="mt-3 flex justify-between">
        <ContentSpan title={`Question ${index + 1}`} className="gap-3">
          {data.question}
        </ContentSpan>

        <Heading fontWeight="semibold" fontSize="sm">
          {data.mark} marks
        </Heading>
      </div>

      <div>
        <div className="flex gap-4 mt-2">
          <div></div>
          <div className="flex gap-2 h-12 items-center mt-4 self-start"></div>
        </div>
      </div>

      <div className="float-right flex gap-6 items-center justify-center">
        <Heading fontWeight="semibold" fontSize="sm">
          Obtained marks
        </Heading>
        <InputMolecule
          handleChange={(e: ValueType) => updateCorrectionMarks(e)}
          type="number"
          min={0}
          style={{ width: '80px' }}
          max={Number(data?.mark) || 4}
          value={obtainedMarks}
          name={'question_score'}
        />
      </div>
    </div>
  );
}
