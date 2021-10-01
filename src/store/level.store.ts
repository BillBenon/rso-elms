import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { levelService } from '../services/administration/levels.service';
import { Response } from '../types';
import { ILevel } from '../types/services/levels.types';

class Levelstore {
  addLevel() {
    return useMutation(levelService.addLevel);
  }
  getLevels() {
    return useQuery('levels', levelService.getLevels);
  }

  getLevel(id: string) {
    return useQuery<AxiosResponse<Response<ILevel>>, Response>(['levels/id', id], () =>
      levelService.getLevel(id),
    );
  }

  modifyLevel() {
    return useMutation(levelService.modifylevel);
  }
}

export const levelStore = new Levelstore();
