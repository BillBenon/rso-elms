import { useMutation, useQuery } from 'react-query';

import { classService } from '../../services/administration/class.service';

class ClassStore {
  addClass() {
    return useMutation(classService.addClass);
  }
  addClassStudent() {
    return useMutation(classService.addClassStudent);
  }
  modifyClass() {
    return useMutation(classService.modifyClass);
  }
  getClassById(classId: string) {
    return useQuery(['class/id', classId], () => classService.getClassById(classId));
  }
  getClassByLevel(levelId: string) {
    return useQuery(['class/levelId', levelId], () =>
      classService.getClassByLevel(levelId),
    );
  }
  getStudentsByClass(classId: string) {
    return useQuery(['class/students', classId], () =>
      classService.getStudentsByClass(classId),
    );
  }
}
export const classStore = new ClassStore();
