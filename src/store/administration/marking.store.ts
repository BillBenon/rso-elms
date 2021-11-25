import { useMutation, useQuery } from 'react-query';

import { markingService } from '../../services/administration/marking.service';

class MarkingStore {

finishMarking() {
    return useMutation(markingService.finishMarking);
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

getStudentEvaluationById(id: string) {
    return useQuery(['studentEvaluation', id], () => markingService.getStudentEvaluationById(id));
  }

  getEvaluationStudentEvaluations(id: string) {
    return useQuery(['evaluation/studentEvaluations', id], () => markingService.getAllStudentEvaluationsByEvaluation(id));
  }

}


export const markingStore = new MarkingStore();

