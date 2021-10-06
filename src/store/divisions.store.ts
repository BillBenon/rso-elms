import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { queryClient } from '../plugins/react-query';
import { divisionService } from '../services/administration/divisions.service';
import { Response } from '../types';
import { DivisionInfo } from '../types/services/division.types';

class DivisionStore {
  createDivision(divisionType: string) {
    return useMutation(divisionService.addDivision, {
      onSuccess(newData) {
        console.log(divisionType);
        queryClient.setQueryData(['divisions/type', divisionType], (old) => {
          const previousData = old as AxiosResponse<Response<DivisionInfo[]>>;
          previousData.data.data.push(newData.data.data);
          return previousData;
        });
      },
    });
  }
  getDivisionByType(type: string) {
    return useQuery(['divisions/type', type], () => divisionService.getDivision(type));
  }

  getDivision(id: string) {
    return useQuery(['divisions/id', id], () => divisionService.getDivisionById(id));
  }

  getDepartmentsInFaculty(id: string) {
    return useQuery(['faculties/departments', id], () =>
      divisionService.getFacultyByDepartment(id),
    );
  }

  updateDivision(divisionType: string) {
    return useMutation(divisionService.modifyDivision, {
      onSuccess(newData) {
        queryClient.setQueryData(['divisions/type', divisionType], (old) => {
          const previousData = old as AxiosResponse<Response<DivisionInfo[]>>;
          previousData.data.data = previousData.data.data.map((fac: DivisionInfo) => {
            if (fac.id === newData.data.data.id) return newData.data.data;
            else return fac;
          });
          return previousData;
        });
      },
    });
  }
}

export const divisionStore = new DivisionStore();
