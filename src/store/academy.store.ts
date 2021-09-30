import { useMutation, useQuery } from 'react-query';

import { academyService } from '../services/administration/academy.service';

class AcademyStore {
  createAcademy() {
    return useMutation(academyService.createAcademy);
  }
  fetchAcademies() {
    return useQuery('academies', academyService.fetchAcademies);
  }
  getAcademyById(id: string) {
    return useQuery(['roles/id', id], () => academyService.getAcademyById(id));
  }

  modifyAcademy() {
    return useMutation(academyService.modifyAcademy);
  }
}

export default new AcademyStore();
