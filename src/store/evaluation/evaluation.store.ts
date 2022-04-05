import { useMutation, useQuery } from 'react-query';

import { evaluationService } from '../../services/evaluation/evaluation.service';
import {
  IEvaluationAction,
  IEvaluationOwnership,
} from '../../types/services/evaluation.types';

class EvaluationStore {
  createEvaluation() {
    return useMutation(evaluationService.createEvaluation);
  }
  addEvaluationAttendee() {
    return useMutation(evaluationService.addEvaluationAttendee);
  }

  updateEvaluation() {
    return useMutation(evaluationService.updateEvaluation);
  }

  getEvaluationWorkTime(studentEvaluationId: string) {
    return useQuery(['workTime', studentEvaluationId], () =>
      evaluationService.getEvaluationWorkTime(studentEvaluationId),
    );
  }
  updateEvaluationWorkTime() {
    return useMutation(evaluationService.updateEvaluationWorkTime);
  }

  createEvaluationQuestions() {
    return useMutation(evaluationService.createEvaluationQuestion);
  }

  createEvaluationSettings() {
    return useMutation(evaluationService.createEvaluationSettings);
  }

  createSectionBasedEvaluation() {
    return useMutation(evaluationService.createSectionBasedEvaluation);
  }

  // getEvaluations(academy: string, instructor: string) {
  //   return useQuery(['evaluationsByAcademyInstructor'], () =>
  //     evaluationService.fetchEvaluationsByInstructorAndAcademy(academy, instructor),
  //   );
  // }

  getEvaluationsByCategory(evaluationCategory: IEvaluationOwnership, instructor: string) {
    return useQuery(['evaluations', instructor, evaluationCategory], () =>
      evaluationService.getEvaluationsByInstructorAndCategory(
        evaluationCategory,
        instructor,
      ),
    );
  }

  getModuleEvaluations(module: string) {
    return useQuery(['evaluationsByAcademyInstructor'], () =>
      evaluationService.fetchEvaluationsByModule(module),
    );
  }

  getEvaluationsBySubject(subject: string) {
    return useQuery(['evaluations/subject', subject], () =>
      evaluationService.fetchEvaluationsBySubject(subject),
    );
  }
  getEvaluationsCollectionBySubject(subject: string) {
    return useQuery(['evaluationsCollection/subject', subject], () =>
      evaluationService.fetchEvaluationsCollectionBySubject(subject),
    );
  }

  getEvaluationsByStudent(subject: string) {
    return useQuery(['evaluations/studentNarrower', subject], () =>
      evaluationService.fetchEvaluationsByStudent(subject),
    );
  }

  getStudentEvaluationByStudentIdAndEvaluationId(
    evaluationId: string,
    studentId: string,
  ) {
    return useQuery(['studEvaluation', evaluationId], () =>
      evaluationService.getStudentEvaluationByStudentIdAndEvaluationId(
        evaluationId,
        studentId,
      ),
    );
  }

  getEvaluationById(id: string) {
    return useQuery(['evaluation', id], () => evaluationService.getEvaluationById(id), {
      enabled: !!id,
    });
  }

  getEvaluationByIdAndInstructor(id: string, instructor: string) {
    return useQuery(
      ['evaluation', [id, instructor]],
      () => evaluationService.getEvaluationByIdAndInstructor(id, instructor),
      {
        enabled: !!id,
      },
    );
  }

  getEvaluationApprovalByEvaluationAndInstructor(
    evaluationId: string,
    instructorId: string,
  ) {
    return useQuery(['approvals', evaluationId, instructorId], () =>
      evaluationService.getEvaluationApprovalByEvaluationAndInstructor(
        evaluationId,
        instructorId,
      ),
    );
  }

  getEvaluationReviewByEvaluationAndInstructor(
    evaluationId: string,
    instructorId: string,
  ) {
    return useQuery(['reviewers', evaluationId, instructorId], () =>
      evaluationService.getEvaluationReviewsByEvaluationAndInstructor(
        evaluationId,
        instructorId,
      ),
    );
  }

  getStudentReport(studentId: string) {
    return useQuery(
      ['studentReport', studentId],
      () => evaluationService.getStudentReport(studentId),
      {
        enabled: !!studentId,
      },
    );
  }

  getEvaluationQuestions(id: string) {
    return useQuery(
      ['evaluation/questions', id],
      () => evaluationService.getEvaluationQuestions(id),
      { enabled: !!id },
    );
  }

  getEvaluationQuestionsBySubject(evaluationId: string, subjectId: string) {
    return useQuery(
      ['evaluation/questions', [evaluationId, subjectId]],
      () => evaluationService.getEvaluationQuestionsBySubject(evaluationId, subjectId),
      { enabled: !!evaluationId },
    );
  }

  deleteEvaluationQuestionById() {
    return useMutation(evaluationService.deleteEvaluationQuestionById);
  }

  updateEvaluationModuleSubject() {
    evaluationService.updateEvaluationModuleSubject;
  }

  addQuestionAnswer() {
    return useMutation(evaluationService.addQuestionAnswer);
  }

  publishEvaluation() {
    return useMutation(evaluationService.publishEvaluation);
  }

  reviewEvaluation() {
    return useMutation(evaluationService.reviewEvaluation);
  }

  approveEvaluation() {
    return useMutation(evaluationService.approveEvaluation);
  }

  submitEvaluation() {
    return useMutation(evaluationService.submitEvaluation);
  }
  autoSubmitEvaluation() {
    return useMutation(evaluationService.autoSubmitEvaluation);
  }
  studentEvaluationStart() {
    return useMutation(evaluationService.studentEvaluationStart);
  }
}

export function getEvaluationFeedbacks(
  evaluationId: string,
  actionType: IEvaluationAction,
) {
  return useQuery(
    ['evaluationApprovals', evaluationId],
    () => evaluationService.getEvaluationFeedbacks(evaluationId, actionType),
    { enabled: !!actionType },
  );
}

export const evaluationStore = new EvaluationStore();
