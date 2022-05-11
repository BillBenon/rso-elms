import { AxiosResponse } from 'axios';

import { evaluationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  AttachementInfo,
  IAddprivateAttendee,
  ICreateEvaluationQuestions,
  IEvaluationAction,
  IEvaluationActionInfo,
  IEvaluationApproval,
  IEvaluationCreate,
  IEvaluationInfo,
  IEvaluationInfoCollected,
  IEvaluationOwnership,
  IEvaluationQuestionsInfo,
  IEvaluationSectionBased,
  IEvaluationStatus,
  IEvaluationTemplateInfo,
  InstructorEvaluationAppprovalStatus,
  IStudentAnswer,
  IStudentEvaluationStart,
  IStudentEvaluationStartInfo,
  IUpdateEvaluationApprovalStatus,
} from '../../types/services/evaluation.types';
import { FileAttachment } from '../../types/services/user.types';

class EvaluationService {
  public async createEvaluation(
    evaluationInfo: IEvaluationCreate,
  ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
    return await evaluationAxios.post('/evaluations/add', evaluationInfo);
  }
  public async addEvaluationAttendee(
    attendeeInfo: IAddprivateAttendee,
  ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
    return await evaluationAxios.post('/privateAttendee/add', attendeeInfo);
  }
  public async updateEvaluation(
    evaluationInfo: IEvaluationCreate,
  ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
    return await evaluationAxios.put(
      `/evaluations/modify/${evaluationInfo.id}`,
      evaluationInfo,
    );
  }

  // public async createEvaluationQuestion(
  //   questionsInfo: ICreateEvaluationQuestions[],
  // ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
  //   return await evaluationAxios.post('/evaluationQuestions/add', {
  //     questions: questionsInfo,
  //   });
  // }
  public async createEvaluationQuestion(
    questionsInfo: ICreateEvaluationQuestions[],
  ): Promise<AxiosResponse<Response<IEvaluationQuestionsInfo[]>>> {
    return await evaluationAxios.post('/evaluationQuestions/update-multiple', {
      questions: questionsInfo,
    });
  }
  public async createEvaluationSettings(
    settings: IEvaluationApproval,
  ): Promise<AxiosResponse<Response<IEvaluationApproval>>> {
    return await evaluationAxios.post(
      '/evaluationApprovals/addApprovalToEvaluation',
      settings,
    );
  }

  public async getEvaluationsByInstructorAndCategory(
    evaluationCategory: IEvaluationOwnership,
    instructorId: string,
  ): Promise<AxiosResponse<Response<IEvaluationInfo[]>>> {
    return await evaluationAxios.get(
      `/evaluations/getEvaluationsByInstructorAndCategory/instructor/${instructorId}?category=${evaluationCategory}`,
    );
  }

  public async fetchEvaluationsByInstructorAndAcademy(
    academy: string,
    instructor: string,
  ): Promise<AxiosResponse<Response<IEvaluationInfo[]>>> {
    return await evaluationAxios.get(
      `/evaluations/getEvaluationsByAcademy/${academy}/narrowByInstructor/${instructor}`,
    );
  }

  public async fetchEvaluationsByModule(
    module: string,
  ): Promise<AxiosResponse<Response<IEvaluationInfo[]>>> {
    return await evaluationAxios.get(`/evaluations/getEvaluationsByModule/${module}`);
  }

  public async fetchEvaluationsByModuleForStudent(
    module: string,
  ): Promise<AxiosResponse<Response<IEvaluationInfo[]>>> {
    return await evaluationAxios.get(`/evaluations/module/${module}/all`);
  }
  public async fetchEvaluationsBySubject(
    subject: string,
  ): Promise<AxiosResponse<Response<IEvaluationInfo[]>>> {
    return await evaluationAxios.get(`/evaluations/getEvaluationsBySubject/${subject}`);
  }
  public async fetchEvaluationsCollectionBySubject(
    subject: string,
  ): Promise<AxiosResponse<Response<IEvaluationInfoCollected>>> {
    return await evaluationAxios.get(
      `/evaluations/getEvaluationsBySubject/${subject}/studentNarrower`,
    );
  }

  public async fetchEvaluationsByStudent(
    subject: string,
  ): Promise<AxiosResponse<Response<IEvaluationInfoCollected>>> {
    return await evaluationAxios.get(
      `/evaluations/getEvaluationsBySubject/${subject}/studentNarrower`,
    );
  }

  public async getEvaluationById(
    id: string,
  ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
    return await evaluationAxios.get(`/evaluations/getById/${id}`);
  }

  public async getEvaluationByIdAndInstructor(
    id: string,
    instructor: string,
  ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
    return await evaluationAxios.get(
      `/evaluations/getById/${id}/instructor/${instructor}`,
    );
  }

  public async getEvaluationFeedbacks(
    evaluationId: string,
    actionType: IEvaluationAction,
  ): Promise<AxiosResponse<Response<IEvaluationActionInfo[]>>> {
    return await evaluationAxios.get(
      `/evaluations/getByFeedback/${evaluationId}/feedback?feedback_type=${actionType}`,
    );
  }

  public async getEvaluationApprovalByEvaluationAndInstructor(
    evaluationId: string,
    instructorId: string,
  ): Promise<AxiosResponse<Response<InstructorEvaluationAppprovalStatus>>> {
    return await evaluationAxios.get(
      `/evaluationApprovals/approvals/evaluation/${evaluationId}/instructor/${instructorId}`,
    );
  }

  public async getEvaluationReviewsByEvaluationAndInstructor(
    evaluationId: string,
    instructorId: string,
  ): Promise<AxiosResponse<Response<InstructorEvaluationAppprovalStatus>>> {
    return await evaluationAxios.get(
      `/evaluationApprovals/reviews/evaluation/${evaluationId}/instructor/${instructorId}`,
    );
  }

  public async getStudentReport(
    studentId: string,
  ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
    return await evaluationAxios.get(`/getThreeTermSchoolReport/${studentId}`);
  }

  public async getStudentEvaluationByStudentIdAndEvaluationId(
    evaluationId: string,
    studentId: string,
  ): Promise<AxiosResponse<Response<any>>> {
    return await evaluationAxios.get(
      `/studentEvaluations/studentEvaluation/evaluation/${evaluationId}/student/${studentId}`,
    );
  }

  public async getEvaluationQuestionsByStatus(
    id: string,
    status: IEvaluationStatus,
  ): Promise<AxiosResponse<Response<IEvaluationQuestionsInfo[]>>> {
    return await evaluationAxios.get(
      `/evaluationQuestions/getEvaluationQuestions/${id}/settingStatus/${status}`,
    );
  }

  public async getEvaluationQuestions(
    id: string,
  ): Promise<AxiosResponse<Response<IEvaluationQuestionsInfo[]>>> {
    return await evaluationAxios.get(`/evaluationQuestions/getEvaluationQuestions/${id}`);
  }

  public async getEvaluationQuestionsBySubject(
    evaluationId: string,
    subjectId: string,
  ): Promise<AxiosResponse<Response<IEvaluationQuestionsInfo[]>>> {
    return await evaluationAxios.get(
      `/evaluationQuestions/getEvaluationQuestions/evaluation/${evaluationId}/subject/${subjectId}`,
    );
  }

  public async deleteEvaluationQuestionById(
    id: string,
  ): Promise<AxiosResponse<Response<IEvaluationQuestionsInfo[]>>> {
    return await evaluationAxios.delete(`/evaluationQuestions/deleteQuestion/${id}`);
  }

  public async deleteEvaluationById(
    id: string,
  ): Promise<AxiosResponse<Response<IEvaluationInfo[]>>> {
    return await evaluationAxios.delete(`/evaluations/deleteById/${id}`);
  }

  public async getEvaluationModuleSubjectsByModule(
    evaluationId: string,
    moduleId: string,
  ): Promise<AxiosResponse<Response<IEvaluationSectionBased[]>>> {
    return await evaluationAxios.get(
      `/evaluation-module-subjects/getByEvaluationAndModule/${evaluationId}/module/${moduleId}`,
    );
  }

  public async addQuestionDoc(
    data: FileAttachment,
  ): Promise<AxiosResponse<Response<IEvaluationQuestionsInfo>>> {
    return await evaluationAxios.post(
      `/evaluationQuestions/${data.id}/uploadQuestionFile`,
      data.docInfo,
    );
  }

  public async addQuestionDocAnswer(
    data: FileAttachment,
  ): Promise<AxiosResponse<Response<AttachementInfo>>> {
    return await evaluationAxios.post(
      `/student-answers/student-answer/addAttachmentAnswer`,
      data.docInfo,
    );
  }

  public async updateEvaluationModuleSubject(
    id: string,
    status: IEvaluationStatus,
  ): Promise<AxiosResponse<Response<IEvaluationQuestionsInfo[]>>> {
    return await evaluationAxios.put(
      `evaluation-module-subjects/${id}/changeSettingStatus/${status}`,
    );
  }

  public async modifyEvaluation(
    evaluationInfo: IEvaluationCreate,
  ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
    return await evaluationAxios.put('/evaluations/modifyEvaluation', {
      ...evaluationInfo,
    });
  }

  public async getEvaluationWorkTime(
    studentEvaluationId: string,
  ): Promise<AxiosResponse<Response<any>>> {
    return await evaluationAxios.get(
      `studentEvaluations/studentEvaluation/getWorkTime/${studentEvaluationId}`,
    );
  }

  public async updateEvaluationWorkTime({
    studentEvaluationId = '',
    currentTime = '',
  }): Promise<void> {
    return await evaluationAxios.put(
      `/studentEvaluations/studentEvaluation/${studentEvaluationId}/currentWorkTime/${currentTime}`,
    );
  }

  public async addQuestionAnswer(
    answer: IStudentAnswer,
  ): Promise<AxiosResponse<Response<IStudentAnswer>>> {
    return await evaluationAxios.post('student-answers/add', answer);
  }

  public async updateQuestionChoosen(
    id: string,
    status: IEvaluationStatus,
  ): Promise<AxiosResponse<Response<IEvaluationQuestionsInfo>>> {
    return await evaluationAxios.put(
      `/evaluationQuestions/${id}/changeChooseStatus/${status}`,
    );
  }

  public async submitEvaluation(studentEvaluationId: string): Promise<void> {
    return await evaluationAxios.put(
      `studentEvaluations/studentEvaluation/${studentEvaluationId}/submit`,
    );
  }
  public async autoSubmitEvaluation(studentEvaluationId: string): Promise<void> {
    return await evaluationAxios.put(
      `studentEvaluations/studentEvaluation/${studentEvaluationId}/auto_submit`,
    );
  }

  public async publishEvaluation(data: {
    evaluationId: string;
    status: string;
  }): Promise<void> {
    return await evaluationAxios.put(
      `/evaluations/evaluation/${data.evaluationId}/${data.status}`,
    );
  }

  public async reviewEvaluation(
    updateEvaluation: IUpdateEvaluationApprovalStatus,
  ): Promise<void> {
    return await evaluationAxios.put(`evaluationApprovals/reviews`, updateEvaluation);
  }

  public async approveEvaluation(
    updateEvaluation: IUpdateEvaluationApprovalStatus,
  ): Promise<void> {
    return await evaluationAxios.put(`evaluationApprovals/approvals`, updateEvaluation);
  }

  public async studentEvaluationStart(
    student: IStudentEvaluationStart,
  ): Promise<AxiosResponse<Response<IStudentEvaluationStartInfo>>> {
    return await evaluationAxios.post('studentEvaluations/start', student);
  }

  public async createSectionBasedEvaluation(
    evaluation: IEvaluationSectionBased[],
  ): Promise<AxiosResponse<Response<IEvaluationSectionBased[]>>> {
    return await evaluationAxios.post('evaluation-module-subjects/add-bulk', evaluation);
  }

  public async updateQuestion(
    question: IEvaluationQuestionsInfo,
  ): Promise<AxiosResponse<Response<IEvaluationQuestionsInfo>>> {
    return await evaluationAxios.put(
      `evaluationQuestions/editQuestion/${question.id}`,
      question,
    );
  }

  public async updateMarkersOnModule({
    markerId,
    id,
  }: {
    markerId: string;
    id: string;
  }): Promise<AxiosResponse<Response<IEvaluationQuestionsInfo>>> {
    return await evaluationAxios.put(`evaluation-module-subjects/modifyById/${id}`, {
      marker_id: markerId,
    });
  }

  public async updateQuestionInfo(
    question: IEvaluationQuestionsInfo,
  ): Promise<AxiosResponse<Response<IEvaluationQuestionsInfo>>> {
    return await evaluationAxios.put(
      `evaluationQuestions/editQuestion/${question.id}`,
      question,
    );
  }

  public async getEvaliationTemplates(
    academyId: string,
  ): Promise<AxiosResponse<Response<IEvaluationTemplateInfo[]>>> {
    return await evaluationAxios.get(`evaluation-templates/getByAcademyId/${academyId}`);
  }

  public async uploadQuestionFile({
    questionId,
    file,
  }: {
    questionId: string;
    file: FormData;
  }): Promise<AxiosResponse<Response<IEvaluationQuestionsInfo>>> {
    return await evaluationAxios.post(
      `evaluationQuestions/${questionId}/uploadQuestionFile`,
      file,
    );
  }

  public async deleteTemplate(
    id: string,
  ): Promise<AxiosResponse<Response<IEvaluationTemplateInfo>>> {
    return await evaluationAxios.delete(`evaluation-templates/deleteById/${id}`);
  }

  public getTemplateById(
    id: string,
  ): Promise<AxiosResponse<Response<IEvaluationTemplateInfo>>> {
    return evaluationAxios.get(`evaluation-templates/getById/${id}`);
  }

  public async createTemplate(
    template: Partial<IEvaluationInfo>,
  ): Promise<AxiosResponse<Response<IEvaluationTemplateInfo>>> {
    return await evaluationAxios.post('evaluation-templates/add', {
      ...template,
    });
  }
}

export const evaluationService = new EvaluationService();
