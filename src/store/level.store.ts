import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { queryClient } from '../plugins/react-query';
import { levelService } from '../services/administration/levels.service';
import { Response } from '../types';
import { ILevel } from '../types/services/levels.types';

class Levelstore {
  addLevel() {
    return useMutation(levelService.addLevel, {
      onSuccess(newData) {
        queryClient.setQueryData(['levels'], (old) => {
          const previousData = old as AxiosResponse<Response<ILevel[]>>;
          previousData.data.data.push(newData.data.data);
          return previousData;
        });
      },
    });
  }
  getLevels() {
    return useQuery('levels', levelService.getLevels);
  }

  getLevelById(id: string) {
    return useQuery<AxiosResponse<Response<ILevel>>, Response>(['levels/id', id], () =>
      levelService.getLevelById(id),
    );
  }

  modifyLevel() {
    return useMutation(levelService.modifylevel);
  }
}

export const levelStore = new Levelstore();
