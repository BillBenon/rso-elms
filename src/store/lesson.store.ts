import { useMutation, useQuery } from 'react-query';

import { lessonService } from '../services/administration/lesson.service';

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

  getLessonsBySubject(moduleId: string) {
    return useQuery(['lessons/id', moduleId], () =>
      lessonService.getLessonsByModule(moduleId),
    );
  }

  modifyLesson() {
    return useMutation(lessonService.modifyLesson);
  }
}

export const lessonStore = new LessonStore();
