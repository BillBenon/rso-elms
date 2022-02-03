import { useMutation, useQuery } from 'react-query';

import { diseaseService } from '../../services/administration/chronicdiseases.service';

class DiseaseStore {
  addDisease() {
    return useMutation(diseaseService.addDisease);
  }

  getDiseases() {
    return useQuery('disease', diseaseService.getAllDiseases);
  }

  getDisease(id: string) {
    return useQuery(['disease/id', id], () => diseaseService.getDisease(id));
  }

  modifyDisease() {
    return useMutation(diseaseService.ModifyDisease);
  }

  getUserDisease(id: string) {
    return useQuery(['person/disease/id', id], () => diseaseService.getUserDisease(id));
  }
}

export default new DiseaseStore();
