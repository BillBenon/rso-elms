import { useMutation, useQuery } from 'react-query';

import { academicyearsService } from '../services/administration/academicyears.service';

class AcademyStore {
  createAcademy() {
    return useMutation(academicyearsService.createAcademicYear);
  }

  fetchAcademicYears(academyId: string) {
    return useQuery(['academicyears', academyId], () =>
      academicyearsService.fetchAcademicYears(academyId),
    );
  }

  modifyAcademy() {
    return useMutation(academicyearsService.modifyAcademicYear);
  }
}

export default new AcademyStore();
