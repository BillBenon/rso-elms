import { useMutation, useQuery } from 'react-query';

import { lessonService } from '../../services/administration/lesson.service';

class LessonStore {
  addLesson() {
    return useMutation(lessonService.addLesson);
  }
  getLessons() {
    return useQuery('lessons', lessonService.getLessons);
  }

  getLesson(id: string) {
    return useQuery(['lessons/id', id], () => lessonService.getLesson(id));
  }

  getLessonsBySubject(subjectId: string) {
    return useQuery(['lessons/subject/id', subjectId], () =>
      lessonService.getLessonsBySubject(subjectId),
    );
  }

  modifyLesson() {
    return useMutation(lessonService.modifyLesson);
  }
  addLessonPlan() {
    return useMutation(lessonService.addLessonPlan);
  }
  getLessonsPlanByLesson(lessonId: string) {
    return useQuery(['lessonplan/lesson/id', lessonId], () =>
      lessonService.getLessonsPlanByLesson(lessonId),
    );
  }
}

export const lessonStore = new LessonStore();
