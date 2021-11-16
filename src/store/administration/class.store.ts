import { useMutation, useQuery } from 'react-query';

import { classService } from '../../services/administration/class.service';

class ClassStore {
  addClass() {
    return useMutation(classService.addClass);
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
}
export const classStore = new ClassStore();
