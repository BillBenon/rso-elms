import { useMutation, useQuery } from 'react-query';

import { academyService } from '../services/administration/academy.service';

class AcademyStore {
  createAcademy() {
    return useMutation(academyService.createAcademy);
  }
  fetchAcademies() {
    return useQuery('academies', academyService.fetchAcademies);
  }
}

export default new AcademyStore();
