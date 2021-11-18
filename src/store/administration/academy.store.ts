import { useMutation, useQuery } from 'react-query';

import { academyService } from '../../services/administration/academy.service';

class AcademyStore {
  createAcademy() {
    return useMutation(academyService.createAcademy);
  }
  fetchAcademies() {
    return useQuery('academies', academyService.fetchAcademies);
  }
  getAcademiesByInstitution(institutionId: string) {
    return useQuery(['academies/instutionId', institutionId], () =>
      academyService.getAcademiesByInstitution(institutionId),
    );
  }

  getAcademyById(id: string) {
    return useQuery(['academies/id', id], () => academyService.getAcademyById(id));
  }

  modifyAcademy() {
    return useMutation(academyService.modifyAcademy);
  }
}

export default new AcademyStore();