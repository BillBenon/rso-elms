import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { experienceService } from '../services/administration/experience.service';
import { Response } from '../types';
import { queryClient } from './../plugins/react-query';
import { ExperienceInfo } from './../types/services/experience.types';

class ExperienceStore {
  create() {
    return useMutation(experienceService.create, {
      onSuccess(newData) {
        queryClient.setQueryData(['experiences'], (old) => {
          const previousData = old as AxiosResponse<Response<ExperienceInfo[]>>;
          previousData.data.data.push(newData.data.data);
          return previousData;
        });
      },
    });
  }
  getAll() {
    return useMutation('experiences', experienceService.fetchAll);
  }
  getExperienceById(id: string) {
    return useQuery(['experience/id', id], () => experienceService.getExperienceById(id));
  }
  getPersonExperiences(personId: string) {
    return useQuery(['experience/id', personId], () =>
      experienceService.findPersonExperiences(personId),
    );
  }
  updateExperience() {
    return useMutation(experienceService.update, {
      onSuccess(newData) {
        queryClient.setQueryData(['experiences'], (old) => {
          const previousData = old as AxiosResponse<Response<ExperienceInfo[]>>;
          previousData.data.data.map((experience: ExperienceInfo, index: number) => {
            if (experience.id == newData.data.data.id)
              previousData.data.data[index] = newData.data.data;
          });
          return previousData;
        });
      },
    });
  }
}

export const experienceStore = new ExperienceStore();
