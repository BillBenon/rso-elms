import { useMutation } from 'react-query';

import { evaluationService } from '../services/administration/evaluation.service';

class EvaluationStore {
  createEvaluation() {
    return useMutation(evaluationService.createEvaluation);
  }
}

export const evaluationStore = new EvaluationStore();
