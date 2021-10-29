import { useMutation, useQuery } from 'react-query';

import { academicPeriodService } from '../services/administration/academicperiods.service';

class AcademyPeriodStore {
  createAcademicPeriod() {
    return useMutation(academicPeriodService.createAcademicPeriod);
  }

  getAcademicPeriodsByAcademicYear(academyId: string) {
    return useQuery(['academicPeriod/years', academyId], () =>
      academicPeriodService.getAcademicPeriodsByAcademicYear(academyId),
    );
  }

  getAcademicPeriodById(id: string) {
    return useQuery(['academicPeriod/id', id], () =>
      academicPeriodService.getAcademicPeriodById(id),
    );
  }

  modifyAcademicPeriod() {
    return useMutation(academicPeriodService.modifyAcademicPeriod);
  }
}

export default new AcademyPeriodStore();
