import { useMutation, useQuery } from 'react-query';

import { evaluationService } from '../services/administration/evaluation.service';

class EvaluationStore {
  createEvaluation() {
    return useMutation(evaluationService.createEvaluation);
  }

  getEvaluations() {
    return useQuery('evaluations', evaluationService.fetchEvaluations);
  }
}

export const evaluationStore = new EvaluationStore();
