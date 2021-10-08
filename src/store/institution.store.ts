import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { institutionService } from '../services/administration/institution.service';
import { Response } from '../types';
import { queryClient } from './../plugins/react-query';
import {
  BasicInstitutionInfo,
  InstitutionInfo,
} from './../types/services/institution.types';

class InstitutionStore {
  create() {
    return useMutation(institutionService.create, {
      onSuccess(newData) {
        queryClient.setQueryData(['institutions'], (old) => {
          const previousData = old as AxiosResponse<Response<BasicInstitutionInfo[]>>;
          previousData.data.data.push(newData.data.data);
          return previousData;
        });
      },
    });
  }
  getAll() {
    return useMutation('institutions', institutionService.fetchAll);
  }
  getInstitutionById(id: string) {
    return useQuery(['insitution/id', id], () =>
      institutionService.getInstitutionById(id),
    );
  }
  updateInstitution() {
    return useMutation(institutionService.update, {
      onSuccess(newData) {
        queryClient.setQueryData(['academies'], (old) => {
          const previousData = old as AxiosResponse<Response<InstitutionInfo[]>>;
          previousData.data.data.map((institution: InstitutionInfo, index: number) => {
            if (institution.id == newData.data.data.id)
              previousData.data.data[index] = newData.data.data;
          });
          return previousData;
        });
      },
    });
  }
}

export const institutionStore = new InstitutionStore();
