import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { queryClient } from '../plugins/react-query';
import { academyService } from '../services/administration/academy.service';
import { Response } from '../types';
import { AcademyCreateInfo, AcademyInfo } from '../types/services/academy.types';

class AcademyStore {
  createAcademy() {
    return useMutation(academyService.createAcademy, {
      onSuccess(newData) {
        queryClient.setQueryData(['academies'], (old) => {
          const previousData = old as AxiosResponse<Response<AcademyCreateInfo[]>>;
          previousData.data.data.push(newData.data.data);
          return previousData;
        });
      },
    });
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
    return useMutation(academyService.modifyAcademy, {
      onSuccess(newData) {
        queryClient.setQueryData(['academies'], (old) => {
          const previousData = old as AxiosResponse<Response<AcademyInfo[]>>;
          previousData.data.data.map((academy: AcademyInfo, index: number) => {
            if (academy.id == newData.data.data.id)
              previousData.data.data[index] = newData.data.data;
          });
          return previousData;
        });
      },
    });
  }
}

export default new AcademyStore();
