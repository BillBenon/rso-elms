import { useMutation, useQuery } from 'react-query';

import { evaluationService } from '../services/administration/evaluation.service';

class EvaluationStore {
  createEvaluation() {
    return useMutation(evaluationService.createEvaluation);
  }

  createEvaluationQuestions() {
    return useMutation(evaluationService.createEvaluationQuestion);
  }

  getEvaluations() {
    return useQuery('evaluations', evaluationService.fetchEvaluations);
  }

  getEvaluationById(id: string) {
    return useQuery(['evaluation', id], () => evaluationService.getEvaluationById(id));
  }
  getEvaluationQuestions(id: string) {
    return useQuery(['evaluation/questions', id], () =>
      evaluationService.getEvaluationQuestions(id),
    );
  }
}

export const evaluationStore = new EvaluationStore();
