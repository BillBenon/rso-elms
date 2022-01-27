import { useMutation, useQuery } from 'react-query';

import { markingService } from '../../services/administration/marking.service';

class MarkingStore {
  finishMarking() {
    return useMutation(markingService.finishMarking);
  }
  updateStudentAnswer() {
    return useMutation(markingService.updateStudentAnswer);
  }

  fieldMarkingFinish() {
    return useMutation(markingService.fieldMarkingFinish);
  }

  finalizaMarkingWithRemarks() {
    return useMutation(markingService.finalizaMarkingWithRemarks);
  }

  manualMarking() {
    return useMutation(markingService.addManualMarking);
  }

  publishResults() {
    return useMutation(markingService.publishResults);
  }

  publishResult() {
    return useMutation(markingService.publishResult);
  }

  getStudentEvaluationAnswers(id: string) {
    return useQuery(['studentEvaluation/answers', id], () =>
      markingService.getStudentEvaluationAnswers(id),
    );
  }

  getManualMarkingMarks(evaluationId: string, classId: string) {
    return useQuery(['manualMarkingMarks', evaluationId, classId], () =>
      markingService.getManualMarkingMarks(evaluationId, classId),
    );
  }

  getStudentEvaluationById(id: string) {
    return useQuery(['studentEvaluation', id], () =>
      markingService.getStudentEvaluationById(id),
    );
  }

  getEvaluationStudentEvaluations(id: string) {
    return useQuery(['evaluation/studentEvaluations', id], () =>
      markingService.getAllStudentEvaluationsByEvaluation(id),
    );
  }
}

export const markingStore = new MarkingStore();
