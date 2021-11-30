import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { CreateLessonPlan, Lesson, LessonInfo } from '../../types/services/lesson.types';

class LessonService {
  public async addLesson(lesson: Lesson): Promise<AxiosResponse<Response<LessonInfo>>> {
    return await adminstrationAxios.post('/lessons/addLesson', lesson);
  }

  public async getLessons(): Promise<AxiosResponse<Response<LessonInfo[]>>> {
    return await adminstrationAxios.get('/lessons/getAllLessons');
  }

  public async getLesson(id: string): Promise<AxiosResponse<Response<LessonInfo>>> {
    return await adminstrationAxios.get(`/lessons/getLessonById/${id}`);
  }

  public async getLessonsBySubject(
    subjectId: string,
  ): Promise<AxiosResponse<Response<LessonInfo[]>>> {
    return await adminstrationAxios.get(`/lessons/getLessonsBySubject/${subjectId}`);
  }

  public async modifyLesson(lesson: Lesson): Promise<AxiosResponse<Response<Lesson>>> {
    return await adminstrationAxios.put('/lessons/modifyLesson', lesson);
  }
  public async addLessonPlan(
    lessonPlan: CreateLessonPlan,
  ): Promise<AxiosResponse<Response<CreateLessonPlan>>> {
    return await adminstrationAxios.post('/lessonPlans/addLessonPlan', lessonPlan);
  }

  public async getLessonsPlanByLesson(
    lessonId: string,
  ): Promise<AxiosResponse<Response<LessonInfo[]>>> {
    return await adminstrationAxios.get(
      `/lessonPlans/getLessonPlansByLesson/${lessonId}`,
    );
  }
}

export const lessonService = new LessonService();
