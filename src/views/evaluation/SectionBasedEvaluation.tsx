import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import PopupMolecule from '../../components/Molecules/Popup';
import EvaluationSubjects from '../../components/Organisms/evaluation/EvaluationSubjects';
import SectionBasedEvaluationContent from '../../components/Organisms/evaluation/SectionBasedEvaluationContent';
import { ParamType } from '../../types';

export default function SectionBasedEvaluation() {
  const { id: evaluationId } = useParams<ParamType>();
  const [showSubjects, setshowSubjects] = useState(false);

  return (
    <>
      <SectionBasedEvaluationContent
        evaluationId={evaluationId}
        actionType="section_based">
        <Button styleType="outline" onClick={() => setshowSubjects(true)}>
          Finish setting
        </Button>
        {/* <Button>Save as template</Button> */}
      </SectionBasedEvaluationContent>

      <PopupMolecule
        onClose={() => setshowSubjects(false)}
        open={showSubjects}
        title="Select subject to add questions">
        <EvaluationSubjects evaluationId={evaluationId} action="finish_setting" />
      </PopupMolecule>
    </>
  );
}
