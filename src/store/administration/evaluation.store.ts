import { useMutation, useQuery } from 'react-query';

import { evaluationService } from '../../services/administration/evaluation.service';

class EvaluationStore {
  createEvaluation() {
    return useMutation(evaluationService.createEvaluation);
  }

  createEvaluationQuestions() {
    return useMutation(evaluationService.createEvaluationQuestion);
  }

  createEvaluationSettings() {
    return useMutation(evaluationService.createEvaluationSettings);
  }

  getEvaluations(academy: string, instructor: string) {
    return useQuery('evaluations', () =>
      evaluationService.fetchEvaluationsByInstructorAndAcademy(academy, instructor),
    );
  }

  getEvaluationsBySubject(subject: string) {
    return useQuery(['evaluations/subject', subject], () =>
      evaluationService.fetchEvaluationsBySubject(subject),
    );
  }

  getEvaluationById(id: string) {
    return useQuery(['evaluation', id], () => evaluationService.getEvaluationById(id));
  }
  getEvaluationQuestions(id: string) {
    return useQuery(['evaluation/questions', id], () =>
      evaluationService.getEvaluationQuestions(id),
    );
  }

  addQuestionAnswer() {
    return useMutation(evaluationService.addQuestionAnswer);
  }
}

export const evaluationStore = new EvaluationStore();
